import serial.tools.list_ports
import firebase_admin
from firebase_admin import credentials, firestore

ports = serial.tools.list_ports.comports()

cred = credentials.Certificate('ren-ctf-webapp-firebase-adminsdk-cqnpv-648f74930c.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

state_ref = db.collection("matrix_state").document("STATE")

states = {
    "BF40FF00" : "lead",
    "BE41FF00" : "game",
    "A25DFF00" : "gifs"
}

for port, desc, hwid in sorted(ports):
        print("{}: {} [{}]".format(port, desc, hwid))

ser = serial.Serial(input("Port WHAT??: "), baudrate=9600)

if ser.is_open:
    print("Serial port is open")

try:
    while True:
        if ser.in_waiting > 0:  # Check if there is data waiting to be read
            data = ser.read(ser.in_waiting).decode('utf-8')  # Read and decode the data
            code = data[0:len(data)-2]

            print(code)

            state_ref.update({"state": states[code]})
            

            

except KeyboardInterrupt:
    print("Interrupted by user")

finally:
    ser.close()
    print("Serial port closed")