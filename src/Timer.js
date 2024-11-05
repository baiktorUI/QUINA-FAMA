import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => setTime(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setTime(10); // Reinicia el temporizador cada 10 segundos
    }
  }, [time]);

  return (
    <div className="timer">
      <div className="timer-circle" style={{ strokeDashoffset: 440 - (440 * time) / 10 }} />
    </div>
  );
};

export default Timer;
