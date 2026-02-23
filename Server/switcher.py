from google import genai

import firebase_admin
from firebase_admin import credentials, firestore
import time

cred = credentials.Certificate('ren-ctf-webapp-firebase-adminsdk-cqnpv-648f74930c.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

states = ["gifs","lead","game"]

state_ref = db.collection("matrix_state").document("STATE")

while (1):
    for x in states:
        print(f'Showing state {x}')
        state_ref.update({"state": x})
        time.sleep(60*3)

