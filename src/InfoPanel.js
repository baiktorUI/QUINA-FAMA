import React from 'react';
import './InfoPanel.css';

const InfoPanel = ({ currentNumber, previousNumbers, lineMessage }) => {
  return (
    <div className="info-panel">
      <div className="current-number">
        {currentNumber !== null ? currentNumber.toString().padStart(2, '0') : "00"}
      </div>
      <div className="previous-numbers">
        {previousNumbers.map((num, index) => (
          <div key={index} className="previous-number">{num.toString().padStart(2, '0')}</div>
        ))}
      </div>
      <div className="line-message">{lineMessage}</div>
    </div>
  );
};

export default InfoPanel;
