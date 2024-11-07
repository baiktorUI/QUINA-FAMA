import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Logo from './images/Logo-UuhQE.png';

const BingoBoard = ({ markedNumbers, showQuinaMessage }) => {
  return (
    <div className="bingo-board">
      {[...Array(90).keys()].map(i => {
        const number = i + 1;
        const isMarked = markedNumbers.includes(number);
        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : ''} ${!isMarked && showQuinaMessage ? 'faded' : ''}`}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

const VideoPanel = ({ showVideo, videoUrl, showQuinaMessage }) => {
  return (
    <div className="video-box">
      {showQuinaMessage ? (
        <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
      ) : (
        showVideo && (
          <iframe
            width="100%"
            height="100%"
            src={`${videoUrl}?autoplay=1`}
            title="Bingo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      )}
    </div>
  );
};

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [showLiniaCantada, setShowLiniaCantada] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);
  const [enterEnabled, setEnterEnabled] = useState(true);
  const [pressCountQ, setPressCountQ] = useState(0);
  const [pressCountL, setPressCountL] = useState(0);

  const videoLinks = useMemo(() => ({
    1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    2: 'https://www.youtube.com/embed/sample2',
    3: 'https://www.youtube.com/embed/sample3',
  }), []);

  const generateRandomNumber = useCallback(() => {
    if (!enterEnabled) return;
    if (markedNumbers.length === 90) {
      setMarkedNumbers([]);
      setPreviousNumbers([]);
      setCurrentNumber(null);
      return;
    }

    const availableNumbers = [...Array(90).keys()]
      .map(i => i + 1)
      .filter(num => !markedNumbers.includes(num));

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];

    setCurrentNumber(randomNumber);
    setPreviousNumbers(prev => [randomNumber, ...prev]);
    setMarkedNumbers(prev => [...prev, randomNumber]);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (videoLinks[randomNumber]) {
      setVideoUrl(videoLinks[randomNumber]);
      setTimeout(() => setShowVideo(true), 1500);
      setTimeout(() => setShowVideo(false), 40000);
    }
  }, [markedNumbers, videoLinks, enterEnabled]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && enterEnabled) {
        generateRandomNumber();
      }
      if (event.key === 'l' || event.key === 'L') {
        setPressCountL(prev => prev + 1);
        setShowLiniaCantada(prev => !prev);
      }
      if (event.key === 'q' || event.key === 'Q') {
        setPressCountQ(prev => prev + 1);
        setShowQuinaMessage(prev => !prev);
        setEnterEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [generateRandomNumber, showLiniaCantada, enterEnabled, pressCountL, pressCountQ]);

  return (
    <div className="app-container">
      <div className="current-number-box">
        {showQuinaMessage ? (
          <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
        ) : (
          <div className={`current-number ${animate ? 'animate-flash' : ''}`}>
            {currentNumber !== null ? currentNumber.toString().padStart(2, '0') : "?"}
          </div>
        )}
      </div>

      <div className="side-box">
        <div className="side-content">
          {showQuinaMessage ? (
            <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
          ) : (
            previousNumbers
              .filter((num) => num !== currentNumber)
              .slice(0, 5)
              .map((num, index) => (
                <span key={index} className={`previous-number opacity-${index}`}>
                  {num.toString().padStart(2, '0')}
                </span>
              ))
          )}
        </div>
      </div>

      <VideoPanel showVideo={showVideo} videoUrl={videoUrl} showQuinaMessage={showQuinaMessage} />

      <div className={`large-box ${showQuinaMessage ? 'highlight' : ''}`}>
        <BingoBoard markedNumbers={markedNumbers} showQuinaMessage={showQuinaMessage} />
      </div>

      <div className="small-box">
        {showQuinaMessage ? (
          <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
        ) : (
          <span className={`linia-cantada ${showLiniaCantada ? 'show' : ''}`}>LÍNIA CANTADA!! 🎉🎉</span>
        )}
      </div>

      <div className="additional-box">
        <img src={Logo} alt="Logo UuhQE" className="logo-image" />
      </div>
    </div>
  );
};

export default App;
