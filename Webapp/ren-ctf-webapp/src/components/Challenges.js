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
import Grid from "./chal-components/Grid"
import Trace from "./chal-components/Trace"
import GameStats from "./chal-components/GameStats"

// const socket = io.connect("https://renctf-server-bbb0e859baa9.herokuapp.com/");
const socket = io.connect("http://localhost:3001");

const keysCollectionRef = collection(db, "keys");

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

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const cellSize = board.length > 0 && containerHeight > 0
    ? Math.floor((containerHeight * 0.8) / board.length)
    : 0;

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
      <div className="chal-board-section">

        <div
          ref={containerRef}
          style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', alignSelf: 'stretch', margin: "30px" }}
        >
          {cellSize > 0 && <Grid array={board} cellSize={cellSize} team={team} moves={moves}/>}
          {board.length > 0 && cellSize > 0 && (
            <div style={{ flex: 1, minHeight: 0, marginTop: '10px'}}>
              <Trace/>
            </div>
          )}
        </div>

        <GameStats/>

        

          {/* <div className="chal-moves-row">

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
          </div> */}
        {/* </div> */}

      </div>

    </main>
  );
};

export default Challenges;
