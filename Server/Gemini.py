from google import genai
import os
import firebase_admin
from firebase_admin import credentials, firestore
import time
from Prompts import getTreePrompt, getCatPrompt
from google.cloud.firestore_v1.base_query import FieldFilter
from taskParser import update_task_status_counts

client = genai.Client(api_key=os.environ["GENAI_API_KEY"])

cred = credentials.Certificate('ren-ctf-webapp-firebase-adminsdk-cqnpv-648f74930c.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

task_cat_ref = db.collection('task_categories')
users_ref = db.collection('users')


def getTaskCategories():
    cat_list = []
    docs = task_cat_ref.stream()

    for doc in docs:
        cat_list.append(doc.id)

    return cat_list

def updateTaskCat_Instantiation(task):
    if task not in getTaskCategories(): # python is crazy dude 
        # create new task category, with reset stats
        db.collection("task_categories").document(task).set({
            "instantiated": 1,
            "pending": 0,
            "skipped": 0,
            "success": 0,
            "failure": 0,
        })
    else:
        # create new task category, with reset stats
        db.collection("task_categories").document(task).update({
            "instantiated": firestore.Increment(1),
        })

def send_message(text, doc):
    displayName = "STT Co-Pilot"
    photoURL = "https://media.tenor.com/BpYyKwOu2ngAAAAj/coob.gif"
    uid = doc.to_dict()["uid"]

    # Add document
    db.collection("messages").add({
        "text": text,
        "name": displayName,
        "avatar": photoURL,
        "createdAt": firestore.SERVER_TIMESTAMP,
        "uid": uid,
    })

def updateTaskCat_stats():

    users_docs = users_ref.stream()

    users = []
    task_dict = {}

    for user in users_docs:
        users.append(user.id)

    for uid in users:
        user_ref = db.collection("users").document(uid)

        try: 
            # print(user_ref.get().to_dict()['task_tree'])
            response = client.models.generate_content(
                model="gemini-2.5-flash", contents=getCatPrompt(user_ref.get().to_dict()['task_tree'], getTaskCategories())
            )

            update_task_status_counts(response.text, task_dict)


        except KeyError:
            pass

    input(f"task_dict after: {task_dict}")

    for sub_task in task_dict:
        status_dict = task_dict[sub_task]

        for status in status_dict:
            db.collection("task_categories").document(sub_task).update({
                status: status_dict[status],
            })

    input("END")
   

while(0):
    updateTaskCat_stats()

recent_query = db.collection("messages")\
                 .order_by("createdAt", direction=firestore.Query.DESCENDING)\
                 .limit(1)

def on_snapshot(col_snapshot, changes, read_time):
    print("\n--- Collection Updated ---")
    for doc in col_snapshot:
        print("------------")

        if(doc.to_dict()["text"].startswith("!") and doc.to_dict()["name"] != "STT Co-Pilot"):
            print("Generating response...")
            
            send_message("![Thinking...](https://media.tenor.com/Ok_dN1WFmrAAAAAi/thinking.gif)", doc)

            user_ref = db.collection("users").document(doc.to_dict()["uid"])
            
            user_doc = user_ref.get().to_dict()

            name = user_doc["display_name"]
            name = name[:len(name)-2]

            try:
                tree = user_doc["task_tree"]

            except:
                tree = ""

            response = client.models.generate_content(
                    model="gemini-2.5-flash", contents=getTreePrompt(doc.to_dict()["text"], tree, name)
            )

            print(response.text)

            user_ref.set({"task_tree": response.text.split("===")[1]}, merge=True)
            
            # send_message( ("Current directive: " + response.text.split("===")[0], "\nTask Tree: " + response.text.split("===")[1]), doc )
            message_str = (response.text.split("===")[0])
            message_str += ("<br> Current task tree: " + response.text.split("===")[1])

            task_cat = response.text.split("===")[2].strip()

            print(f"({task_cat})")

            if(task_cat != "N_A"):
                updateTaskCat_Instantiation(task_cat)
            
            
            send_message(message_str, doc)

query_watch = recent_query.on_snapshot(on_snapshot)

# Keep the script alive
import time
try:
    while True:
        time.sleep(60)
except KeyboardInterrupt:
    print("Listener stopped.")

