import React, { useEffect, useState } from "react";
import "./styles/countdown.css";
import { time } from "./utils/timeout";


function Countdown({ started, setFinished }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = async () => {
      try {
        await time(1000);
        setCountdown(2);
        await time(1000);
        setCountdown(1);
        await time(1000);
        setCountdown(0);
        await time(100)
        setFinished(true);
      }
      catch (error) {
        console.error(error);
      }
    }
    timer()
  }, [started]);

  return (
    <>
      <div className="countdown-div-h1">
        <h1 className="countdown-h1">{countdown}</h1>
      </div>
    </>
  );
}

export default Countdown;
