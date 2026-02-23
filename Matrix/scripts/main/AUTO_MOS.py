#   ___  _   _ _____ _____ ___  ________ _____ 
#  / _ \| | | |_   _|  _  ||  \/  |  _  /  ___|
# / /_\ \ | | | | | | | | || .  . | | | \ `--. 
# |  _  | | | | | | | | | || |\/| | | | |`--. \
# | | | | |_| | | | \ \_/ /| |  | \ \_/ /\__/ /
# \_| |_/\___/  \_/  \___/ \_|  |_/\___/\____/ 

import math

def LCM_NMOS(VG, VD, VS, VB, VTNO, y, Φ2f, kn, λ):
    VGS = VG - VS
    VSB = VS - VB
    VDS = VD - VS 
    VTN = VTNO

    if(VS != VB):
        VTN = VTNO + y*(math.sqrt(abs(Φ2f)+VSB) - math.sqrt(abs(Φ2f)))
    
    VDSSAT = VGS - VTN 

    if(VGS < VTN):
        print("Device is off!")
        return 0
    elif(VDS <= VDSSAT):
        print("Device is in TRIODE!")
        return kn*((VGS-VTN)*VDS-(VDS**2)/2)
    else:
        print("Device is in SATURATION!")
        return (kn/2)*((VGS-VTN)**2)*(1+λ*(VDS-VDSSAT))

def LCM_PMOS(VG, VD, VS, VB, VTPO, y, Φ2f, kp, λ):
    VSG = VS - VG
    VBS = VB - VS
    VSD = VS - VD 
    VTP = VTPO

    if(VS != VB):
        VTP = VTPO - y*(math.sqrt(abs(Φ2f)+VBS) - math.sqrt(abs(Φ2f)))
    
    VDSSAT = VSG + VTP 

    if(VSG < -VTP):
        print("Device is off!")
        return 0
    elif(VSD <= VDSSAT):
        print("Device is in TRIODE!")
        return kp*((VSG+VTP)*VSD-(VSD**2)/2)
    else:
        print("Device is in SATURATION!")
        return (kp/2)*((VSG+VTP)**2)*(1+λ*(VSD-VDSSAT))
    

while 1:
    print("Enter device parameters...")

    y = float(input("y = ")) 
    Φ2f = float(input("Φ2f = ")) 
    λ = float(input("λ = "))

    while 1:

        print("(1) LCM NMOS ")
        print("(2) LCM PMOS ")
        print("(3) Change device parameters ")
        
        inp = input("(1), (2), (3): ")

        if(inp == "1"):
            VG = float(input("VG = ")) 
            VD = float(input("VD = ")) 
            VS = float(input("VS = ")) 
            VB = float(input("VB = ")) 
            VTNO = float(input("VTNO = ")) 
            
            kn = float(input("kn = ")) 

            print("ID = " + str(LCM_NMOS(VG, VD, VS, VB, VTNO, y, Φ2f, kn, λ)) + " Amps")

        elif(inp == "2"):
            VG = float(input("VG = ")) 
            VD = float(input("VD = ")) 
            VS = float(input("VS = ")) 
            VB = float(input("VB = ")) 
            VTPO = float(input("VTPO = ")) 

            kp = float(input("kp = "))             
            
            print("ID = " + str(LCM_PMOS(VG, VD, VS, VB, VTPO, y, Φ2f, kp, λ)) + " Amps")
            
        else:
            break

        input("Enter to continue...")