import React from 'react';
import './BingoBoard.css';

const BingoBoard = ({ currentNumber, markedNumbers }) => {
  return (
    <div className="bingo-board">
      {[...Array(90).keys()].map(i => {
        const number = i + 1;
        const isActive = number === currentNumber;
        const isMarked = markedNumbers.includes(number);

        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : ''} ${isActive ? 'active' : ''}`}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;
