import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  doc, 
  getDocs,
  getDoc
} from "firebase/firestore";
import { db, auth } from "../firebase";
import io from 'socket.io-client';
import Leaderboard from "./Leaderboard"
import Swal from 'sweetalert2'

const socket = io.connect("https://renctf-server-bbb0e859baa9.herokuapp.com/");
// const socket = io.connect("http://localhost:3001");

const keysCollectionRef = collection(db, "keys");

const colors = {
  W: '/icons/W.png',
  P: '/icons/P.gif',
  R: '/icons/Red.gif',
  B: '/icons/Blue.gif'
};

const cellC = {
  W: '1px dashed white',
  R: '1px dashed #ff2200',
  P: '1px dashed #a200ff',
  B: '1px dashed #00aeff'
}

const Grid = ({ array, team, moves}) => {
  const gridSize = array.length;

  const placeCell = (rowIndex, cellIndex, team, moves) => {
    if(moves > 0){
      socket.emit("place_cell", {x: cellIndex, y: rowIndex, team: team[0], moves: moves, user: auth.currentUser});
    } else{
      Swal.fire({
        icon: "warning",
        title: "Out of moves!",
        iconColor: "#fcba03",
        color: '#fcba03',
        background: 'black',
        text: "You don't have any moves. Complete challenges or wait for new challenges to gain moves!",
        showCloseButton: false,
        confirmButtonColor: "#fcba03",
        confirmButtonText: "Ok :)"
      });
    }
    
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 35px)`, gridGap: '0px', backgroundColor: 'black'}}>
      {array.map((row, rowIndex) => (
        row.split('').map((cell, cellIndex) => (
          <img
            onClick={() => placeCell(rowIndex, cellIndex, team, moves)}
            key={`${rowIndex}-${cellIndex}`}
            class="pixel-art"
            src= {colors[cell] || "/icons/Q.gif"}
            width={35}
            height={35}
            style={{ border: cellC[cell]}}
          />
        ))
      ))}
    </div>
  );
};

const Challenges = () => {

  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

  async function openChal(diff) {
    try {
      const docRef = doc(db, "flags", diff);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        openInNewTab(docSnap.data().link);
      } else{
        console.log("Could not find game", diff);
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  const sendGuess = async (event, diff, id) => {

    event.preventDefault(); // prevent page from refreshing 
    
    try {
        const docRef = doc(db, "flags", diff);
        const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        var flag = docSnap.data().flag;
        var guess = document.getElementById(id).value;

        if(guess.startsWith(flag)){
          socket.emit("guess_correct", {user: auth.currentUser, chal: docSnap.data().tag});
          Swal.fire({
            icon: "success",
            title: "Correct guess!",
            iconColor: "#00ff7b",
            color: '#00ff7b',
            background: 'black',
            text: "You've completed this challenge!",
            showCloseButton: false,
            confirmButtonColor: "#00ff7b",
            confirmButtonText: ":D"
          });
        } else{
          Swal.fire({
            icon: "error",
            title: "Incorrect guess!",
            iconColor: "#ff006f",
            color: '#ff006f',
            background: 'black',
            text: "Try again! I believe in you!",
            showCloseButton: false,
            confirmButtonColor: "#ff006f",
            confirmButtonText: ":D"
          });
          // socket.emit("signed_in", auth.currentUser);
        }
        
      } else{
        console.log("Could not find game", diff);
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const [board, setBoard] = useState([]);
  const [RedScore, setRedScore] = useState();
  const [BlueScore, setBlueScore] = useState();
  const [multiplier, setMultiplier] = useState();

  const [moves, setMoves] = useState();
  const [team, setTeam] = useState();

  const [descEasy, setdescEasy] = useState();
  const [descMed, setdescMed] = useState();
  const [descHard, setdescHard] = useState();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "games", "TIC-TAC-TOE"), (doc) => {
      setBoard(doc.data().board);
      setRedScore(doc.data().RedScore);
      setBlueScore(doc.data().BlueScore);
      setMultiplier(doc.data().multiplier);
    });

    const unsub2 = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setMoves(doc.data().moves);
      setTeam(doc.data().team)
    });

    const easySub = onSnapshot(doc(db, "flags", "easy"), (doc) => {
      setdescEasy(doc.data().desc);
    });

    const medSub = onSnapshot(doc(db, "flags", "medium"), (doc) => {
      setdescMed(doc.data().desc);
    });

    const hardSub = onSnapshot(doc(db, "flags", "hard"), (doc) => {
      setdescHard(doc.data().desc);
    });
  }, []);


  

  return (
    <main style={{ width: '100%', height: '100%', display: "flex",  alignItems: "center", flexDirection: 'column'}}>

      <div style={{height: '10%', justifyContent: "center", width: '100%', alignItems: "center", display: "flex", marginTop: '30px', justifyContent: 'center'}}>
        <h2 style ={{fontSize: 50, marginRight: '10px'}}>Challenges </h2>
        <h2 style={{color: '#ff1c77', fontSize: 40}}> ( Week 2 November )</h2>
      </div>

      <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <div style={{width: '35%', height: '100%', display: "flex", backgroundColor: 'black',border: '1px dashed #ffffff', flexDirection: 'column'}}>
          <h2 style={{width: '100%', justifyContent: 'center', textAlign: 'center', borderColor: 'white', borderBottom: '1px dashed #ffffff', height: '10%'}}>Leaderboard</h2>
          <div style ={{flexDirection: 'column', overflow: 'scroll'}}><Leaderboard/></div>
        </div>
        <div style={{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', display: "flex", flexDirection: 'column'}}>


          <div style={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
            <t style={{fontSize: '26px', color:'#00aeff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              BLUE TEAM: <t style={{color:'white'}}>&nbsp;{BlueScore}</t>
              &nbsp;
              {RedScore <= BlueScore && (
                <img src="/icons/CBlue.gif" alt="Pixel Art" class="pixel-art" width={26} height={26}/>
              )}
            </t>

            <t style={{fontSize: '26px', color:'#ff2200', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              RED TEAM: <t style={{color:'white'}}>&nbsp;{RedScore}</t>
              &nbsp;
              {RedScore >= BlueScore && (
                <img src="/icons/CRed.gif" alt="Pixel Art" class="pixel-art" width={26} height={26}/>
              )}
            </t>
          </div>

          <Grid array={board} team={team} moves={moves} style={{backgroundColor: 'white', width: '50%', justifyContent: 'center'}}/>

          <div style={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px'}}>
            

            {team == "Red" && (
              <t style={{fontSize: '26px', color:'#ff2200', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              YOUR MOVES: &nbsp;<t style={{color: 'white'}}>{moves}</t>
              &nbsp;
              <img src="/icons/Red.gif" alt="Pixel Art" class="pixel-art" width={25} height={25}/>

              </t>
            )}

            {team == "Blue" && (
              <t style={{fontSize: '26px', color:'#00aeff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              YOUR MOVES: &nbsp;<t style={{color: 'white'}}>{moves}</t>
              &nbsp;
              <img src="/icons/Blue.gif" alt="Pixel Art" class="pixel-art" width={25} height={25}/>

              </t>

              
            )}

            

            {(team != "Blue" && team != "Red") && (
              <t style={{fontSize: '40px', color:'#ff7300ff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                USE YOUR RIT EMAIL! SIGN OUT AND SIGN BACK IN!
              </t>
            )}

              
            
          </div>
          
          <div style={{fontSize: '15px', color:'#00ff62ff'}}>
            <t>CURRENT MULTIPLIER: </t>{multiplier}<t>x!</t>
          </div>
        </div>

        
        {/* <button onClick={sendMessage}>Hello</button> */}
      </div>

      <div style={{width: '100%', height: '40%', display: 'flex'}}>
        <div style={{width: '33.33%', display: "flex",  alignItems: "center", flexDirection: 'column', paddingTop: '10px'}}> 
          <img src="/icons/Easy.gif" alt="Pixel Art" class="pixel-art-button" width={200} height= 'auto' onClick={() => openChal('easy')}/>

          <div style = {{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>

            <form onSubmit={(event) => sendGuess(event, "easy", "guess_easy")} style={{width: '70%', marginRight: '10px'}}>
              <input id = "guess_easy" placeholder="Paste Flag..." style ={{textAlign: 'center', width: '100%', color: 'white', backgroundColor: 'black', borderRadius: '5px', border: '0px', height: '20px', fontFamily: '"Jersey 15", sans-serif'}}/>
            </form>

            <img src="/icons/EEas.gif" alt="Pixel Art" class="pixel-art-button" width={30} height= 'auto' onClick={(event) => sendGuess(event, "easy", "guess_easy")}/>
          </div>

          <div style ={{height: '20%', width: '90%', textAlign: 'center', paddingTop: '10px'}}>
            <t style = {{color: '#aa75ff'}}>Challenge Hint:</t> {descEasy} <br></br><br></br>
            Grants  <t style = {{color: '#88ff00'}}> +1 moves!</t>
          </div>

        </div>

        <div style={{width: '33.33%', display: "flex",  alignItems: "center", flexDirection: 'column', paddingTop: '10px'}}> 
          <img src="/icons/Mid.gif" alt="Pixel Art" class="pixel-art-button" width={200} height= 'auto' onClick={() => openChal('medium')}/>

          <div style = {{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <form onSubmit={(event) => sendGuess(event, "medium", "guess_medium")} style={{width: '70%', marginRight: '10px'}}>
              <input id = "guess_medium" placeholder="Paste Flag..." style ={{textAlign: 'center', width: '100%', color: 'white', backgroundColor: 'black', borderRadius: '5px', border: '0px', height: '20px', fontFamily: '"Jersey 15", sans-serif'}}/>
            </form>

            <img src="/icons/EMed.gif" alt="Pixel Art" class="pixel-art-button" width={30} height= 'auto' onClick={(event) => sendGuess(event, "medium", "guess_medium")}/>
          </div>
          
          <div style ={{height: '20%', width: '90%', textAlign: 'center', paddingTop: '10px'}}>
            <t style = {{color: '#aa75ff'}}>Challenge Hint:</t> {descMed} <br></br> <br></br>
            Grants  <t style = {{color: '#ff8c00'}}> +2 moves!</t>
          </div>

        </div>

        <div style={{width: '33.33%', display: "flex",  alignItems: "center", flexDirection: 'column', paddingTop: '10px'}}> 
          <img src="/icons/Hard2.gif" alt="Pixel Art" class="pixel-art-button" width={200} height= {125} onClick={() => openChal('hard')}/>

          <div style = {{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <form onSubmit={(event) => sendGuess(event, "hard", "guess_hard")} style={{width: '70%', marginRight: '10px'}}>
              <input id = "guess_hard" placeholder="Paste Flag..." style ={{textAlign: 'center', width: '100%', color: 'white', backgroundColor: 'black', borderRadius: '5px', border: '0px', height: '20px', fontFamily: '"Jersey 15", sans-serif'}}/>
            </form>
            <img src="/icons/EHard.gif" alt="Pixel Art" class="pixel-art-button" width={30} height= 'auto' onClick={(event) => sendGuess(event, "hard", "guess_hard")}/>
          </div>

          <div style ={{height: '20%', width: '90%', textAlign: 'center', paddingTop: '10px'}}>
            <t style = {{color: '#aa75ff'}}>Challenge Hint:</t> {descHard} <br></br> <br></br>
            Grants  <t style = {{color: '#ff0037'}}> +3 moves!</t>
          </div>
        </div>
      </div>
        
    </main>
  );
};

export default Challenges;