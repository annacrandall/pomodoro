import React, { useState, useEffect, useRef} from "react";
import ControlTime from "./ControlTime";
import TimeLeft from "./TimeLeft";
import accurateInterval from "accurate-interval";



const StudyClock = () => {
  const audio = useRef();
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [timer, setTimer] = useState(sessionTime);
  const [intervalId, setIntervalId] = useState(null);
  const [sessionType, setSessionType] = useState("Session");
  const seconds = Math.floor(timer % 60);
  const intervalOn = intervalId !== null 

  
  const isNegativeTimer = timer === -1; 
  useEffect(() => {
    if (timer === -1 ) {
      audio.current.play()
      if (sessionType === "Session") {
        setSessionType("Break");
        setTimer(breakTime);
      } else if (sessionType === "Break") {
        setSessionType("Session");
        setTimer(sessionTime)
      }
      } 
    },[isNegativeTimer]) // eslint-disable-line

  useEffect(() => {
    setTimer(sessionType ? sessionTime : breakTime)
  }, [sessionTime, breakTime, sessionType]) //use Effect for the session/break up + down buttons + changing timer start 

  const handleStartStop = () => {
    if (intervalOn) {
      intervalId?.clear()
      setIntervalId(null)
    } else {
      const newIntervalId = accurateInterval(() => {
        setTimer(prevTimeLeft => {
          const newTime = prevTimeLeft - 1; 
            return newTime;
        });
      }, 1000);
      setIntervalId(newIntervalId)
      }
      
  }


  const controlReset = () => {
    audio.current.currentTime = 0; 
    audio.current.pause();
    intervalId?.clear()
    setIntervalId(null);
    setSessionTime(25 * 60);
    setBreakTime(5 * 60);
    setTimer(sessionTime);
    setSessionType("Session");
  }
  console.log({audio})
  return (
    <div id="container" className="flex h-screen justify-center items-center ">

      <ControlTime
        setTime={setBreakTime}
        time={breakTime}
        type="break" />

      <TimeLeft
        timer={timer}
        sessionType={sessionType}
        handleStartStop={handleStartStop}
        seconds={seconds}
        intervalOn={intervalOn}
        TimeLeft={TimeLeft}
      />

      <ControlTime
        setTime={setSessionTime}
        time={sessionTime}
        type="session" />

      <button onClick={controlReset} className="border-2 border-stone-400 rounded m-2 p-2 font-mono hover:border-red-700" id="reset">reset</button>

      <audio ref={audio} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>

    </div>
  );
}

export default StudyClock;
