const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// FIREBASE STUFFFFF 

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore, serverTimestamp } = require('firebase/firestore');
const { doc, setDoc, onSnapshot, getDoc, updateDoc, collection, addDoc} = require('firebase/firestore');
const { copyFileSync, access } = require("fs");

const diffs = {
    E: "easy",
    M: "medium",
    H: "hard"
  };

const ops = {
    "R": "B",
    "B": "R"
}

const firebaseConfig = {
    apiKey: "AIzaSyBY4PmE2Fsl0dIzGoZ1ZDEYc1Wfd6L3LI0",
    authDomain: "ren-ctf-webapp.firebaseapp.com",
    projectId: "ren-ctf-webapp",
    storageBucket: "ren-ctf-webapp.appspot.com",
    messagingSenderId: "191118208644",
    appId: "1:191118208644:web:3767bae6311f32510f1cd1",
    measurementId: "G-7VBYFNJM47"
};

const app2 = initializeApp(firebaseConfig);
const db = getFirestore(app2);
const docRef = doc(db, "games", "TIC-TAC-TOE");

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function getTimeScore() {
  // Get the current time in America/New_York
  const now = new Date();
  const options = { timeZone: "America/New_York", hour12: false };
  const parts = new Intl.DateTimeFormat("en-US", {
    ...options,
    hour: "2-digit",
    minute: "2-digit"
  }).formatToParts(now);

  const hour = Number(parts.find(p => p.type === "hour").value);

  if (hour < 10) return 5;              // Before 10 AM
  if (hour === 10) return 4;            // 10 AM – 10:59 AM
  if (hour === 11) return 3;            // 11 AM – 11:59 AM
  if (hour === 12 || hour === 13) return 2;  // 12 PM – 1:59 PM

  return 1;                              // 2 PM and later
}



function getRandomColor(){

    accent = (Math.floor(Math.random() * (255 - 0) + 0)).toString(16).toUpperCase();

    if(accent.length == 1){
        accent = "0".concat(accent)
    }

    bytes = [accent.substring(0,3), '00', 'FF']

    for (let i = bytes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bytes[i], bytes[j]] = [bytes[j], bytes[i]];
    }

    return bytes.join("")
}

function getRandomTeam() {
    if(Math.floor(Math.random() * 2) == 0){
        return "Red"
    } else{
        return "Blue"
    }
}

function fixUsername(username){
    const lastWhitespaceIndex = username.indexOf(' ') + 2;

    if (lastWhitespaceIndex === -1) {
        return username;
    }

    // Get the substring from the beginning to the last whitespace
    return username.substring(0, lastWhitespaceIndex);
}

function getChallengeString(name, challenge, team){
    colorSpan = "<span style=\"color: #ff0000;\">";

    if(team === "Blue"){
        colorSpan = "<span style=\"color: #2f59ffff;\">";
    }

    const text =  "✅ " + name + " completed challenge: <span style=\"color: #b536ff;\">" + challenge + "</span>";

    return text;
}

function tookCellCount(name, team, count){
    colorSpan = "<span style=\"color: #ff0000;\">";

    if(team === "Blue"){
        colorSpan = "<span style=\"color: #2f59ffff;\">";
    }

    const text = "🔥 " + name + " scored " + colorSpan + count + "</span> points for " + colorSpan + team +" Team </span>";

    return text;
}

function userRegistered(name){
    const text = "👋 " + name + " signed up!";
    return text;
}

function userLogin(name){
    const text = "🦞 " + name + " started playing!";
    return text;
}


async function checkUserExists(data){
    try{
        const userRef = doc(db, "users", data.uid);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()){
            console.log("User is already registered!");

            await addDoc(collection(db, "console-messages"), {
                text:  userLogin(data.displayName), 
                createdAt: serverTimestamp(),
            });
        }   
        else if(!(data.email.endsWith("rit.edu"))){
            console.log("User is not from an RIT domain!");
        
        } else{
            
            console.log(data.email, " is not registered!");
            console.log("Creating user!");

            await addDoc(collection(db, "console-messages"), {
                text:  userRegistered(data.displayName), 
                createdAt: serverTimestamp(),
            });

            getRandomColor();

            await setDoc(doc(db, "users", data.uid), {
                comp_chal: {
                    easy: [],
                    medium: [],
                    hard: []
                },

                display_name: fixUsername(data.displayName),
                color: getRandomColor(),
                total_moves: 0,
                moves: 0,
                team: getRandomTeam()
            });
        }
    } catch(error){
        console.error("Error getting document:", error);
        return null;
    }
}

async function addChal(data){
    try{
        const userRef = doc(db, "users", data.user.uid);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()){
           
            if(!(userSnap.data().comp_chal[diffs[data.chal[0]]].includes(data.chal)) ){ // why do I code like this dude 
                console.log("User does NOT have this challenge");
                const newChalls = userSnap.data().comp_chal[diffs[data.chal[0]]];
                const moves = userSnap.data().moves;
                const total_moves = userSnap.data().total_moves;

                newChalls.push(data.chal);

                if(data.chal[0] == "E"){
                    await updateDoc(userRef, {
                        "comp_chal.easy": newChalls,
                        moves: moves + 1*getTimeScore(),
                        total_moves: total_moves + 1*getTimeScore()
                    })

                } else if(data.chal[0] == "M"){
                    await updateDoc(userRef, {
                        "comp_chal.medium": newChalls,
                        moves: moves + 2*getTimeScore(),
                        total_moves: total_moves + 2*getTimeScore()
                    })

                } else if(data.chal[0] == "H"){
                    await updateDoc(userRef, {
                        "comp_chal.hard": newChalls,
                        moves: moves + 3*getTimeScore(),
                        total_moves: total_moves + 3*getTimeScore()
                    })
                }

                await addDoc(collection(db, "console-messages"), {
                          text:  getChallengeString(userSnap.data().display_name, data.chal, userSnap.data().team), 
                          createdAt: serverTimestamp(),
                });
                
            } else{
                console.log("User already has this challenge")
            }
        } else{
            console.log("Ermmm this user doesn't exist, i honestly dont know how but just incase");
        }
    } catch(error){
        console.error("Error getting document:", error);
        return null;
    }
}

async function getBoard() {
    
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().board;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

async function getAffectedCells(board, data, userSnap){
    const dir = [-1,0,1,0,-1]

    affectedCoords = []
    count = 0;

    for(let i = 0; i < 4; i++){

        dirX = data.x+dir[i]
        dirY = data.y+dir[i+1]
        
        possAffected = []

        while (( dirX >= 0 && dirX <= 7) && (dirY >= 0 && dirY <= 7)){
            if(board[dirY][dirX] == ops[data.team]){
                possAffected.push([dirX, dirY])
            } else if(board[dirY][dirX] == data.team){
                for(x in possAffected){
                    if(possAffected[x] != []){
                        affectedCoords.push(possAffected[x]);
                        count += 1;
                    }
                }
                break
            } else{
                break
            }
            
            dirX += dir[i]
            dirY += dir[i+1]
        }
    }

    if(count + 1 > 2){
        await addDoc(collection(db, "console-messages"), {
            text:  tookCellCount(userSnap.data().display_name, userSnap.data().team, count + 1), 
            createdAt: serverTimestamp(),
        });
    }
    

    return affectedCoords;
}

async function updateCount(board){
    red = 0
    blue = 0 
    for(i in board){
        for(j in board[i]){
            if(board[i][j] == "R"){
                red += 1;
            } else if(board[i][j] == "B"){
                blue += 1
            }
        }
    }
    updateDoc(docRef, {
        BlueScore: blue,
        RedScore: red,
        multiplier: getTimeScore()
    })

    console.log(getTimeScore()); 

}

async function setPossible(board){
    
    for(let y = 0; y < board.length; y++){
        for(let x = 0; x < board[y].length; x++){

            if(board[y][x] == "R" || board[y][x] == "B"){

                const dir = [-1,0,1,0,-1]

                for(let i = 0; i < dir.length-1; i++){
                    
                    dirX = x + dir[i]
                    dirY = y + dir[i+1]

                    if(( dirX >= 0 && dirX <= 7) && (dirY >= 0 && dirY <= 7)){
                        
                        if(board[dirY][dirX] == "W"){
                            board[dirY] = board[dirY].replaceAt(dirX,"P")
                        }
                    }
                }
            }
        }
    }

    return board;
}
async function setBoard(board, data){

    const newBoard = board
    
    const userRef = doc(db, "users", data.user.uid);
    const userSnap = await getDoc(userRef);
    
    


    if((board[data.y][data.x] == "P")){

        if(userSnap.exists()){
            const moves = userSnap.data().moves;
    
            await updateDoc(userRef, {
                moves: moves - 1
            })
        } 
        
        getAffectedCells(board, data, userSnap).then(flippedCells => {
            newBoard[data.y] = newBoard[data.y].replaceAt(data.x, data.team);
            for(x in flippedCells){
                newBoard[flippedCells[x][1]] = newBoard[flippedCells[x][1]].replaceAt(flippedCells[x][0], data.team);
            }

            setPossible(board).then(updatedMoves => {
                updateDoc(docRef, {
                    board: updatedMoves
                });
                updateCount(newBoard);
            })
        });

    } else{
        console.log("Cant place here :P")
    }
}

app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://ren-ctf-webapp.web.app"],
        methods: ["GET", "POST"],
    },
});


app.get('/', function (req, res) {
    res.render('index', {});
});

io.on("connection", (socket) => {
    
    socket.on("place_cell", (data) => {
        console.log(data)
        getBoard().then(board => {
            if(board !== null && (data.moves > 0)){
                setBoard(board, data);
            }

        });
    })

    socket.on("signed_in", (data) => {
        console.log("User signed in - UID:", data.uid, "Email:", data.email, "Display Name:", data.displayName);
        checkUserExists(data);
    })

    socket.on("guess_correct", (data) => {
        addChal(data);
    })
})


server.listen(process.env.PORT || 3001, () => {
    console.log("Server running yahaaaao");
})