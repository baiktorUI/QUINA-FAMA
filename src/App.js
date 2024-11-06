import React, { useState, useEffect } from 'react';
import './App.css';

const BingoBoard = ({ markedNumbers }) => {
  return (
    <div className="bingo-board">
      {[...Array(90).keys()].map(i => {
        const number = i + 1;
        const isMarked = markedNumbers.includes(number);

        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : ''}`}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

const VideoPanel = ({ show }) => {
  return (
    show ? (
      <div className="video-panel">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/uBFdSyDkPOU?autoplay=1"
          title="Bingo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ) : null
  );
};

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // Estado para la pantalla de bienvenida

  const videoNumbers = [5, 12, 45, 34, 65, 22, 54, 32, 78];

  const generateRandomNumber = () => {
    const availableNumbers = [...Array(90).keys()].map(i => i + 1).filter(num => !previousNumbers.includes(num));
    if (availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];

    setCurrentNumber(randomNumber);
    setPreviousNumbers(prev => [randomNumber, ...prev].slice(0, 90));

    if (videoNumbers.includes(randomNumber)) {
      setShowVideo(true);
      setTimeout(() => setShowVideo(false), 40000); // Mostrar video por 40 segundos
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (showWelcomeScreen) {
        setShowWelcomeScreen(false); // Oculta la pantalla de bienvenida al presionar Enter
      } else {
        generateRandomNumber();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [previousNumbers, showWelcomeScreen]);

  return (
    <div className="app-container">
      {showWelcomeScreen ? (
        <div className="welcome-screen">
          <h1>COMENÇEM!</h1>
        </div>
      ) : (
        <>
          <div className="current-number-box">
            <div className="current-number">
              {currentNumber !== null ? currentNumber.toString().padStart(2, '0') : "00"}
            </div>
          </div>
          <div className="previous-numbers-box">
            {previousNumbers.slice(1, 6).map((num, index) => (
              <div key={index} className="previous-number">
                {num.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          <VideoPanel show={showVideo} />
          <BingoBoard markedNumbers={previousNumbers} />
        </>
      )}
    </div>
  );
};

export default App;
// Cambio de prueba para sincronización con GitHub
