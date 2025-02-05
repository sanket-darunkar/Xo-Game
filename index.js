const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let current A FUNCTION WHO INI THE GAME
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
  
    // Reset UI
    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("win"); // Remove the winning highlight
      box.style.pointerEvents = "all"; // Enable clicking again
    });
  
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
  }
   
initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    //swap kardo turn ko
    swapTurn();
    //check karo kai jeeta to nahi
    checkGameOver();
  }
}
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //ui chanhe top
  gameInfo.innerText = `Current Player ${currentPlayer}`;
}
newGamebtn.addEventListener("click", initGame);

function checkGameOver() {
  let answer = "";

  winningPostions.forEach((position) => {
    //all 3 box are empty and have a exact same value
    if (
        gameGrid[position[0]] !== "" && 
        gameGrid[position[0]] === gameGrid[position[1]] && 
        gameGrid[position[1]] === gameGrid[position[2]]
      ) {
      
      //check winner is X

      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      //disable pointer events 
      boxes.forEach((box)=>{
        box.style.pointerEvents="none";
      })
      //now we know the winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it we have winner 
  if(answer!==""){
    gameInfo.innerText=`Winner Player -${answer}`;
    newGamebtn.classList.add("active");
    return;
  }


  //when there no winner
  let fillCount =0;
  gameGrid.forEach((box)=>{
    if(box!==""){
        fillCount++;
    }
  });

  //board is filled , Game is TIE
  if(fillCount ===9){
    gameInfo.innerText="Game Draw !";
    newGamebtn.classList.add("active");
  }
}
