import React from "react";
import "../styles/GameControl.css";
const GameControl = ({ onStartNewGame, currentPlayer }) => {
  return (
    <div className="game-control">
      <button onClick={onStartNewGame}>Start New Game</button>
      {currentPlayer && <p>Current Player: {currentPlayer}</p>}
    </div>
  );
};

export default GameControl;
