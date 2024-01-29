import React from 'react'
import '../styles/GameBoard.css';
const GameBoard = ({ board, onMakeMove }) => {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <button 
          key={index} 
          className={cell === 'X' ? 'cell-x' : cell === 'O' ? 'cell-o' : ''} 
          onClick={() => onMakeMove(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  )
}

export default GameBoard