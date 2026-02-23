import math 

print("(1) Polar 2 Rect")
print("(2) Rect 2 Polar")

if (input(": : : :") == "1"):
    r = float(input("r: "))
    phi = float(input("phi: "))

    print("x: " + str(r*math.cos(math.radians(phi))))
    print("y: " + str(r*math.sin(math.radians(phi))))

    pass 
else: 
    x = float(input("x: "))
    y = float(input("y: "))

    print("r: " + str(math.sqrt((x**2) + y**2)))
    print("phi: " + str(math.degrees(math.atan(y/x))))