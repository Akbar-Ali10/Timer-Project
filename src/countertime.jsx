import React, { useEffect, useState, useRef } from 'react';

function Countertime() {
    const [time, settime] = useState(0);
    const [Active, setActive] = useState(false);
    const [ispause, setpause] = useState(false);
    const intervalRef = useRef(null);

    const handleinput = (event) => {
        settime(parseInt(event.target.value * 60));
    };

    const formatTime = () => {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        return `${min} : ${sec}`;
    };

    const handlestart = () => {
        setActive(true);
        setpause(false);
    };

    useEffect(() => {
        if (Active && !ispause && time > 0) {
            intervalRef.current = setInterval(() => {
                settime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(intervalRef.current);
            setActive(false);
            alert('Time is up');
        }
        return () => clearInterval(intervalRef.current);
    }, [Active, ispause, time]);

    const handlepause = () => {
        setpause(!ispause);
    };

    const handlereset = () => {
        clearInterval(intervalRef.current);
        setActive(false);
        setpause(false);
        settime(0);
    };

    return (
        <div className="counter-time">
            <h1>CountDown Timer</h1>
            <div className="timer-display">
                <input type="number" placeholder="Enter time in minutes" onChange={handleinput} />
                <div>{formatTime()}</div>
            </div>
            <div className="timer-controls">
                <button onClick={handlestart} disabled={Active && !ispause}>
                    Start
                </button>
                <button onClick={handlepause} disabled={!Active}>
                    {ispause ? 'Resume' : 'Pause'}
                </button>
                <button onClick={handlereset}>Reset</button>
            </div>
        </div>
    );
}

export default Countertime;
