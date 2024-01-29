import { useEffect, useState } from "react";
import "./App.css";
import GameControl from "./components/GameControl.js";
import GameBoard from "./components/GameBoard.js";
import Notification from "./components/Notification.js";

function App() {
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [notification, setNotification] = useState("");

  const startNewGame = async () => {
    try {
      // Call the backend API to start a new game
      const response = await fetch("http://localhost:5000/new-game", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();

      // Update the frontend state with the data from the backend
      setGameId(data._id); // setGameId to id of Game instance
      setBoard(data.board); // Update the board state
      setCurrentPlayer(data.currentPlayer); // Set the current player ('X' or 'O')
      setNotification(""); // Reset/clear any notifications
    } catch (error) {
      console.error("Error starting a new game:", error);
      setNotification("Failed to start a new game.");
    }
  };

  const makeMove = async (gameId, position) => {
    const response = await fetch('http://localhost:5000/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, position })
    });
    return response.json();
  };

  const handleMakeMove = async (position) => {
    console.log("handling move")
    if (!gameId || board[position] !== null) return;
  
    try {
      const updatedGame = await makeMove(gameId, position);
      
      setBoard(updatedGame.board);
      setCurrentPlayer(updatedGame.currentPlayer);
  
      if (updatedGame.status === 'won') {
        setNotification(`The Winner is. ${updatedGame.player}.  Click on Start New Game otherwise wait for 10 seconds`);
        setTimeout(startNewGame, 10000); 
        setBoard(Array(9).fill(null))
        
       
      }
      else if(updatedGame.status === 'tied'){
        setNotification(`Match ${updatedGame.status}. Click on Start New Game otherwise wait for 10 seconds`);
        setTimeout(startNewGame, 10000); 
        setBoard(Array(9).fill(null))
      }
      else if(updatedGame.reply === 'AT'){
        setNotification(`${updatedGame.message}`)
      }
    } catch (error) {
      console.error('Error making a move:', error);
      setNotification('Failed to make a move.');
    }
  };




  useEffect(() =>{
    startNewGame()
  },[])

  return (
    <div className="App">
      <GameControl
        onStartNewGame={startNewGame} //passing props to gameControl component
        currentPlayer={currentPlayer}
      />
      <GameBoard board={board} onMakeMove={handleMakeMove}/>
      <Notification message={notification} />
      

    </div>
  );
}

export default App;
