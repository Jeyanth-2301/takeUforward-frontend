import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Timer = ({
  initialMinutes,
  onComplete,
}: {
  initialMinutes: number;
  onComplete: () => void;
}) => {

  const [seconds, setSeconds] = useState<number>(initialMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      onComplete();
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs} remaining`;
  };

  return <div>
    <Typography color={"black"} onClick={() => setIsActive(true)}>{formatTime(seconds)}</Typography>
  </div>;
};

export default Timer;
