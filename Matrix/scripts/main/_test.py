import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('ren-ctf-webapp-firebase-adminsdk-cqnpv-648f74930c.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection("games").document("TIC-TAC-TOE")
state_ref = db.collection("matrix_state").document("STATE")
users_ref = db.collection("users")

state = state_ref.get()