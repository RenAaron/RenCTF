import io from 'socket.io-client';
import Swal from 'sweetalert2'
import { db, auth } from "../../firebase";

// const socket = io.connect("https://renctf-server-bbb0e859baa9.herokuapp.com/");
const socket = io.connect("http://localhost:3001");

const cellIcon = {
  W: '/icons/W.png',
  P: '/icons/P.gif',
  R: '/icons/Red.gif',
  B: '/icons/Blue.gif'
};

const cellBorder = {
  W: '1px dashed #ffffff64',
  R: '1px dashed #ff2200',
  P: '1px dashed #a200ff',
  B: '1px dashed #00aeff'
}

const cellFill = {
  W: '#00000000',
  R: '#00000000',
  P: '#00000000',
  B: '#00000000'
}

const Grid = ({ array, team, moves, cellSize }) => {
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
    <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`, alignItems: 'center', justifyContent: 'center'}}>
      {array.map((row, rowIndex) => (
        row.split('').map((cell, cellIndex) => (
          <img
            onClick={() => placeCell(rowIndex, cellIndex, team, moves)}
            key={`${rowIndex}-${cellIndex}`}
            className="pixel-art grid-cell"
            src={cellIcon[cell] || "/icons/Q.gif"}
            width={cellSize}
            height={cellSize}
            style={{ border: cellBorder[cell], backgroundColor: cellFill[cell] }}
          />
        ))
      ))}
    </div>
  );
};

export default Grid;