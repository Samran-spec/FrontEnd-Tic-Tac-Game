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

  useEffect(() =>{
    startNewGame()
  },[])

  return (
    <div className="App">
      <GameControl
        onStartNewGame={startNewGame} //passing props to gameControl component
        currentPlayer={currentPlayer}
      />
      <GameBoard />
      <Notification message={notification} />
    </div>
  );
}

export default App;
