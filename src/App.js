import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './App.css';
import Logo from './images/Logo-UuhQE.png';
import confetti from 'canvas-confetti';

const launchFireworks = (intervalRef) => {
  const end = Date.now() + 3 * 1000;

  intervalRef.current = setInterval(() => {
    confetti({
      particleCount: 150,
      startVelocity: 30,
      spread: 360,
      ticks: 160,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      zIndex: 1000,
    });
    if (Date.now() >= end) clearInterval(intervalRef.current);
  }, 250);
};

const launchSchoolPride = (animationFrameRef) => {
  const colors = ['#E94E18', '#312C86', '#FFFFFF'];
  const end = Date.now() + 10 * 1000;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    if (Date.now() < end) {
      animationFrameRef.current = requestAnimationFrame(frame);
    }
  })();
};

const stopConfetti = (intervalRef, animationFrameRef) => {
  clearInterval(intervalRef.current);
  cancelAnimationFrame(animationFrameRef.current);
  confetti.reset();
};

const BingoBoard = ({ markedNumbers, showQuinaMessage }) => {
  return (
    <div className="bingo-board">
      {[...Array(90).keys()].map((i) => {
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
        showVideo && videoUrl && (
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
  const [showLiniaCantadaPersist, setShowLiniaCantadaPersist] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);
  const [enterEnabled, setEnterEnabled] = useState(true);
  const [pressCountQ, setPressCountQ] = useState(0);
  const [pressCountL, setPressCountL] = useState(0);

  const fireworksIntervalRef = useRef(null);
  const schoolPrideAnimationRef = useRef(null);
  const liniaCantadaFireworksRef = useRef(null);
  const videoTimeoutRef = useRef(null);

  const videoLinks = useMemo(
    () => ({
      1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      2: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
      3: 'https://www.youtube.com/embed/ZXsQAXx_ao0',
      4: 'https://www.youtube.com/embed/V-_O7nl0Ii0',
      5: 'https://www.youtube.com/embed/lDK9QqIzhwk',
      6: 'https://www.youtube.com/embed/tVj0ZTS4WF4',
      7: 'https://www.youtube.com/embed/04854XqcfCY',
      8: 'https://www.youtube.com/embed/9jK-NcRmVcw',
      9: 'https://www.youtube.com/embed/ZZ5LpwO-An4',
      10: 'https://www.youtube.com/embed/hTWKbfoikeg',
      11: 'https://www.youtube.com/embed/J---aiyznGQ',
      12: 'https://www.youtube.com/embed/eVTXPUF4Oz4',
      13: 'https://www.youtube.com/embed/kXYiU_JCYtU',
      14: 'https://www.youtube.com/embed/ktvTqknDobU',
      15: 'https://www.youtube.com/embed/L_jWHffIx5E',
      16: 'https://www.youtube.com/embed/4fndeDfaWCg',
      17: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
      18: 'https://www.youtube.com/embed/RoXe9DmYO8s',
      19: 'https://www.youtube.com/embed/yR9i9fDBPxs',
      20: 'https://www.youtube.com/embed/Sa72rZULXj0',
      21: 'https://www.youtube.com/embed/X2R4Fiz8H_M',
      22: 'https://www.youtube.com/embed/Rbm6GXllBiw',
      23: 'https://www.youtube.com/embed/SBjQ9tuuTJQ',
      24: 'https://www.youtube.com/embed/WpYeekQkAdc',
      25: 'https://www.youtube.com/embed/ZbZSe6N_BXs',
      26: 'https://www.youtube.com/embed/CevxZvSJLk8',
      27: 'https://www.youtube.com/embed/8SbUC-UaAxE',
      28: 'https://www.youtube.com/embed/o1tj2zJ2Wvg',
      29: 'https://www.youtube.com/embed/dvgZkm1xWPE',
      30: 'https://www.youtube.com/embed/uxpDa-c-4Mc',
      31: 'https://www.youtube.com/embed/rYEDA3JcQqw',
      32: 'https://www.youtube.com/embed/QC_7b5tgBsg',
      33: 'https://www.youtube.com/embed/60ItHLz5WEA',
      34: 'https://www.youtube.com/embed/ktvTqknDobU',
      35: 'https://www.youtube.com/embed/Mb1ZvUDvLDY',
      36: 'https://www.youtube.com/embed/1Cgh_KJFqXg',
      37: 'https://www.youtube.com/embed/soL2nnF-gzA',
      38: 'https://www.youtube.com/embed/GRxofEmo3HA',
      39: 'https://www.youtube.com/embed/LsoLEjrDogU',
      40: 'https://www.youtube.com/embed/S0Z7mBTphLM',
      41: 'https://www.youtube.com/embed/Kp7eSUU9oy8',
      42: 'https://www.youtube.com/embed/lnXXf9E2m2Y',
      43: 'https://www.youtube.com/embed/ZZY-0HkT9TE',
      44: 'https://www.youtube.com/embed/IoPVoWYMhDg',
      45: 'https://www.youtube.com/embed/oRdxUFDoQe0',
      46: 'https://www.youtube.com/embed/09R8_2nJtjg',
      47: 'https://www.youtube.com/embed/V4xtI0shF9E',
      48: 'https://www.youtube.com/embed/rRwhm-B6yNI',
      49: 'https://www.youtube.com/embed/U9Kq1gA7ZpE',
      50: 'https://www.youtube.com/embed/CX11yw6YL1w',
      51: 'https://www.youtube.com/embed/1DWiB7ZuLvI',
      52: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
      53: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      54: 'https://www.youtube.com/embed/lX44CAz-JhU',
      55: 'https://www.youtube.com/embed/KJyxQX5PJx8',
      56: 'https://www.youtube.com/embed/xV-ZMCs__r4',
      57: 'https://www.youtube.com/embed/BvV2s-5btok',
      58: 'https://www.youtube.com/embed/Q6ADSdcNwJc',
      59: 'https://www.youtube.com/embed/JRfuAukYTKg',
      60: 'https://www.youtube.com/embed/YQHsXMglC9A',
      61: 'https://www.youtube.com/embed/fRh_vgS2dFE',
      62: 'https://www.youtube.com/embed/fC7oUOUEEi4',
      63: 'https://www.youtube.com/embed/4VpwzJjLOAo',
      64: 'https://www.youtube.com/embed/RiqVtHkNmLo',
      65: 'https://www.youtube.com/embed/MFv_VRh_2Zw',
      66: 'https://www.youtube.com/embed/XKEMHeE1JuM',
      67: 'https://www.youtube.com/embed/ChC_s8FFu_w',
      68: 'https://www.youtube.com/embed/fnG2n8W-9hA',
      69: 'https://www.youtube.com/embed/N9DQ3rBwe2I',
      70: 'https://www.youtube.com/embed/e8P0Ygkm4uE',
      71: 'https://www.youtube.com/embed/QKljXY7nn-I',
      72: 'https://www.youtube.com/embed/3mbBbFH9fAg',
      73: 'https://www.youtube.com/embed/2vjPBrBU-TM',
      74: 'https://www.youtube.com/embed/RnMeG2eNlEU',
      75: 'https://www.youtube.com/embed/nCkpzqqog4k',
      76: 'https://www.youtube.com/embed/lsN9KwEAsak',
      77: 'https://www.youtube.com/embed/gsz6Uyf09y0',
      78: 'https://www.youtube.com/embed/RdEm1K2h8U0',
      79: 'https://www.youtube.com/embed/OdcRA0Yp0oE',
      80: 'https://www.youtube.com/embed/4vl2lZVpb8c',
      81: 'https://www.youtube.com/embed/b6J5Vge5ZbE',
      82: 'https://www.youtube.com/embed/WpQ5QY_aYL4',
      83: 'https://www.youtube.com/embed/W-VXdxmPNno',
      84: 'https://www.youtube.com/embed/VXe0toZ42ns',
      85: 'https://www.youtube.com/embed/XVEcYo27SRA',
      86: 'https://www.youtube.com/embed/eoydrr78JZ0',
      87: 'https://www.youtube.com/embed/VH17mXfs-9M',
      88: 'https://www.youtube.com/embed/v_TWDBuUYYo',
      89: 'https://www.youtube.com/embed/Fa2g6cNY2fA',
      90: 'https://www.youtube.com/embed/lcfz2ITbLOs',
      // Añade más enlaces según sea necesario para cubrir 90 números
    }),
    []
  );

  const generateRandomNumber = useCallback(() => {
    if (!enterEnabled) return;
    if (markedNumbers.length === 90) {
      setMarkedNumbers([]);
      setPreviousNumbers([]);
      setCurrentNumber(null);
      return;
    }

    const availableNumbers = [...Array(90).keys()]
      .map((i) => i + 1)
      .filter((num) => !markedNumbers.includes(num));

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];

    setCurrentNumber(randomNumber);
    setPreviousNumbers((prev) => [randomNumber, ...prev]);
    setMarkedNumbers((prev) => [...prev, randomNumber]);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (videoLinks[randomNumber]) {
      setVideoUrl(videoLinks[randomNumber]);
      setShowVideo(true); // Muestra el video inmediatamente

      // Reinicia el temporizador
      if (videoTimeoutRef.current) clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = setTimeout(() => {
        setShowVideo(false); // Oculta el video después de 2 minutos
      }, 120000);
    }
  }, [markedNumbers, videoLinks, enterEnabled]);

  // Este efecto se activa cuando se cambia videoUrl y controla la visibilidad del video
  useEffect(() => {
    if (videoUrl) {
      setShowVideo(true);
      return () => {
        setShowVideo(false); // Oculta el video cuando se desmonta el componente o se cambia la URL
      };
    }
  }, [videoUrl]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && enterEnabled) {
        generateRandomNumber();
      }
      if (event.key === 'l' || event.key === 'L') {
        setPressCountL((prev) => prev + 1);
        setShowLiniaCantada((prev) => !prev);
        setShowLiniaCantadaPersist((prev) => !prev);
      }
      if (event.key === 'q' || event.key === 'Q') {
        setPressCountQ((prev) => prev + 1);
        setShowQuinaMessage((prev) => !prev);
        setEnterEnabled((prev) => !prev);
        if (!showQuinaMessage && showLiniaCantadaPersist) {
          setShowLiniaCantada(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    generateRandomNumber,
    showLiniaCantada,
    enterEnabled,
    pressCountL,
    pressCountQ,
    showQuinaMessage,
    showLiniaCantadaPersist,
  ]);

  useEffect(() => {
    if (showLiniaCantada) {
      launchFireworks(liniaCantadaFireworksRef);
    } else {
      stopConfetti(liniaCantadaFireworksRef, { current: null });
    }
  }, [showLiniaCantada]);

  useEffect(() => {
    if (showQuinaMessage) {
      launchFireworks(fireworksIntervalRef);
      launchSchoolPride(schoolPrideAnimationRef);
    } else {
      stopConfetti(fireworksIntervalRef, schoolPrideAnimationRef);
    }
  }, [showQuinaMessage]);

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
          showLiniaCantada && (
            <span className={`linia-cantada ${showLiniaCantada ? 'show' : ''}`}>LÍNIA CANTADA!! 🎉🎉</span>
          )
        )}
      </div>

      <div className="additional-box">
        <img src={Logo} alt="Logo UuhQE" className="logo-image" />
      </div>
    </div>
  );
};

export default App;
