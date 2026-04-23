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
import Tutorial from "./Tutorial";

// const socket = io.connect("https://renctf-server-bbb0e859baa9.herokuapp.com/");
const socket = io.connect("http://localhost:3001");

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
    <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 35px)` }}>
      {array.map((row, rowIndex) => (
        row.split('').map((cell, cellIndex) => (
          <img
            onClick={() => placeCell(rowIndex, cellIndex, team, moves)}
            key={`${rowIndex}-${cellIndex}`}
            className="pixel-art grid-cell"
            src={colors[cell] || "/icons/Q.gif"}
            width={35}
            height={35}
            style={{ border: cellC[cell] }}
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
    <main className="chal-main">

      <div className="section-header">
        <h2 className="section-title">Challenges </h2>
        <h2 className="chal-subtitle"> ( Week ? April )</h2>
      </div>

      <div className="chal-board-section">
        <div className="chal-leaderboard-box">
          <h2 className="chal-leaderboard-title">Leaderboard</h2>
          <div className="chal-leaderboard-scroll"><Leaderboard/></div>
        </div>
        <div className="chal-game-area">

          <div className="chal-score-row">
            <t className="team-label team-blue">
              BLUE TEAM: <t className="text-white">&nbsp;{BlueScore}</t>
              &nbsp;
              {RedScore <= BlueScore && (
                <img src="/icons/CBlue.gif" alt="Pixel Art" className="pixel-art" width={26} height={26}/>
              )}
            </t>

            <t className="team-label team-red">
              RED TEAM: <t className="text-white">&nbsp;{RedScore}</t>
              &nbsp;
              {RedScore >= BlueScore && (
                <img src="/icons/CRed.gif" alt="Pixel Art" className="pixel-art" width={26} height={26}/>
              )}
            </t>
          </div>

          <Grid array={board} team={team} moves={moves}/>

          <div className="chal-moves-row">

            {team == "Red" && (
              <t className="team-label team-red">
                YOUR MOVES: &nbsp;<t className="text-white">{moves}</t>
                &nbsp;
                <img src="/icons/Red.gif" alt="Pixel Art" className="pixel-art" width={25} height={25}/>
              </t>
            )}

            {team == "Blue" && (
              <t className="team-label team-blue">
                YOUR MOVES: &nbsp;<t className="text-white">{moves}</t>
                &nbsp;
                <img src="/icons/Blue.gif" alt="Pixel Art" className="pixel-art" width={25} height={25}/>
              </t>
            )}

            {(team != "Blue" && team != "Red") && (
              <t className="chal-warning">
                USE YOUR RIT EMAIL! SIGN OUT AND SIGN BACK IN!
              </t>
            )}

          </div>

          <div className="chal-multiplier">
            <t>CURRENT MULTIPLIER: </t>{multiplier}<t>x!</t>
          </div>
        </div>

        {/* <button onClick={sendMessage}>Hello</button> */}
      </div>

      <div className="chal-challenges-row">
        <div className="chal-col">
          <img src="/icons/Easy.gif" alt="Pixel Art" className="pixel-art-button" width={200} height='auto' onClick={() => openChal('easy')}/>

          <div className="chal-input-row">
            <form onSubmit={(event) => sendGuess(event, "easy", "guess_easy")} className="chal-form">
              <input id="guess_easy" placeholder="Paste Flag..." className="chal-flag-input"/>
            </form>
            <img src="/icons/EEas.gif" alt="Pixel Art" className="pixel-art-button" width={30} height='auto' onClick={(event) => sendGuess(event, "easy", "guess_easy")}/>
          </div>

          <div className="chal-desc">
            <t className="chal-hint-label">Challenge Hint:</t> {descEasy} <br/><br/>
            Grants <t className="moves-easy"> +1 moves!</t>
          </div>
        </div>

        <div className="chal-col">
          <img src="/icons/Mid.gif" alt="Pixel Art" className="pixel-art-button" width={200} height='auto' onClick={() => openChal('medium')}/>

          <div className="chal-input-row">
            <form onSubmit={(event) => sendGuess(event, "medium", "guess_medium")} className="chal-form">
              <input id="guess_medium" placeholder="Paste Flag..." className="chal-flag-input"/>
            </form>
            <img src="/icons/EMed.gif" alt="Pixel Art" className="pixel-art-button" width={30} height='auto' onClick={(event) => sendGuess(event, "medium", "guess_medium")}/>
          </div>

          <div className="chal-desc">
            <t className="chal-hint-label">Challenge Hint:</t> {descMed} <br/><br/>
            Grants <t className="moves-medium"> +2 moves!</t>
          </div>
        </div>

        <div className="chal-col">
          <img src="/icons/Hard2.gif" alt="Pixel Art" className="pixel-art-button" width={200} height={125} onClick={() => openChal('hard')}/>

          <div className="chal-input-row">
            <form onSubmit={(event) => sendGuess(event, "hard", "guess_hard")} className="chal-form">
              <input id="guess_hard" placeholder="Paste Flag..." className="chal-flag-input"/>
            </form>
            <img src="/icons/EHard.gif" alt="Pixel Art" className="pixel-art-button" width={30} height='auto' onClick={(event) => sendGuess(event, "hard", "guess_hard")}/>
          </div>

          <div className="chal-desc">
            <t className="chal-hint-label">Challenge Hint:</t> {descHard} <br/><br/>
            Grants <t className="moves-hard"> +3 moves!</t>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Challenges;
