import firebase_admin
from firebase_admin import credentials, firestore
from enum import Enum 

cred = credentials.Certificate('ren-ctf-webapp-firebase-adminsdk-cqnpv-648f74930c.json') # replace with your own firebase json cred name 
app = firebase_admin.initialize_app(cred)
db = firestore.client()

class BoardConfigs(Enum):
    EMPTY = ["WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW","WWWWWWWWWW"]
    CORNERS = 3
    SNOW = 2


def clearGame(blue_score=0, red_score=0, red_trace=[], blue_trace=[]):
    """
    
    """

    return 0


print(BoardConfigs.EMPTY.value)