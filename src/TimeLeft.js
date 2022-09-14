import React from "react";


const TimeLeft = ({ seconds, timer, intervalOn, sessionType, handleStartStop }) => {
    return (
        < div id="timer-container" className="border-2 border-black uppercase rounded">
            <p id="timer-label" className="text-center font-mono text-sm m-2">{sessionType}</p>
            <p className="text-center m-2 font-mono">Time Remaining:</p>
            <div id="time-left" className="text-center font-mono m-5">
            {Math.floor(timer / 60) < 10 ? "0" + Math.floor(timer/60): Math.floor(timer / 60)}:{seconds < 10 ? "0" + seconds : seconds}
            </div>
            <button onClick={handleStartStop} className="border-2 border-black p-1 rounded m-2" id="start_stop">{intervalOn? "Stop": "Start"}</button>
        </div>
    )
}
export default TimeLeft; 
