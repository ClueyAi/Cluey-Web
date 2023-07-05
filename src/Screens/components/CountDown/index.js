import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const CountDown = ({ seconds, endTime }) => {
  const storedRemainingSeconds = parseInt(localStorage.getItem('remainingSeconds'));
  const [remainingSeconds, setRemainingSeconds] = useState(storedRemainingSeconds || seconds);

  useEffect(() => {
    localStorage.setItem('remainingSeconds', remainingSeconds.toString());

    if (remainingSeconds > 0) {
      const timer = setInterval(() => {
        setRemainingSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        localStorage.removeItem('remainingSeconds');
      };
    } else {
      endTime();
      localStorage.removeItem('remainingSeconds');
    }
  }, [remainingSeconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Text>{formatTime(remainingSeconds)}</Text>
  );
};

export default CountDown;
