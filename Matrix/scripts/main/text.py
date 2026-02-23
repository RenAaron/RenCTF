# we want to take the 8x8 grid right? and we wanna print the corresponding cells of the grid with a color pertaining to a dictionary right? That makes sense ? 

from chars import chars
from colors import colorss
import random 
from beemovie import beeMovieScript

tag = ["\033[", "m", "\033[0m"]

words = beeMovieScript.split()

moves = {
    "R" : ["%", "red"],
    "B" : ["#", "blue"],
    "P" : ["-", "purple"],
    "W" : [".", "white"]
}

def colorText(text, color):
    text = text.upper()
    new_row = ""
    for i in range(1,7):
        for x in text:
            if(x in chars):
                new_row += tag[0]
                new_row += colorss[color]
                new_row += tag[1]
                new_row += chars[x].splitlines()[i]
                new_row += tag[2]
        new_row += "\n"        
    return(new_row)

def convertRow(row):
    new_row = ""
    for i in range(1,7):
        for x in row:
            if(x in moves):
                new_row += tag[0]
                new_row += colorss[moves[x][1]]
                new_row += tag[1]
                new_row += chars[moves[x][0]].splitlines()[i]
                new_row += tag[2]
                new_row += chars[" "].splitlines()[i]
        new_row += "\n"        
    return(new_row)

def colorBoard(board):
    
    new_board = []
    
    for x in board:
        row = convertRow(x)
        new_board.append(row)

    return new_board

def printBoard(board):
    for x in (colorBoard(board)):
        print(x)

def printText(text, color):
    print(colorText(text, color))

# printBoard(board)
# printText("GOOD MO", "blue")


# for x in words:
#     print(colorText(x, random.choice(list(colorss.keys()))))

# print(words)
# print(colorText(text, "blue"))
