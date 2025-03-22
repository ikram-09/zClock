import React, { useState, useEffect, useRef } from "react";
import "./Clock.css";
import WorldMap from "./WorldMap";

// ✅ Move this outside to prevent unnecessary re-renders
const cityTimeZones = {
    Paris: "Europe/Paris",
    "New York City": "America/New_York",
    London: "Europe/London",
    Tokyo: "Asia/Tokyo",
    Dubai: "Asia/Dubai",
};

function Clock() {
    const [time, setTime] = useState(new Date());
    const [userTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [isWallClockFullscreen, setIsWallClockFullscreen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const clockHolderRef = useRef(null);
    const [isClockFaceFullscreen, setIsClockFaceFullscreen] = useState(false);
    const [cityTimes, setCityTimes] = useState({});

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes}:${seconds} ${ampm}`;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getCityTimeAndDate = (timeZone) => {
        const options = { timeZone, hour12: true, hour: "numeric", minute: "numeric", second: "numeric" };
        const dateOptions = { timeZone, weekday: "long", year: "numeric", month: "long", day: "numeric" };
        
        return {
            time: new Date().toLocaleString("en-US", options),
            date: new Date().toLocaleString("en-US", dateOptions),
        };
    };

    const getTimeDifference = (cityTimeZone) => {
        const now = new Date();
        const cityTime = new Date(now.toLocaleString("en-US", { timeZone: cityTimeZone }));
        const userTime = new Date(now.toLocaleString("en-US", { timeZone: userTimeZone }));
    
        const diff = (cityTime - userTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        const diffHours = Math.round(diff);
    
        return diffHours === 0 ? "Same time" : `${Math.abs(diffHours)} hours ${diffHours > 0 ? "ahead" : "behind"}`;
    };
    

    const getWallClockHandsRotation = () => {
        const now = new Date();
        return {
            hourRotation: ((now.getHours() % 12) + now.getMinutes() / 60) * 30,
            minuteRotation: (now.getMinutes() + now.getSeconds() / 60) * 6,
            secondRotation: now.getSeconds() * 6,
        };
    };

    // ✅ This runs every second to update `time`
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // ✅ This updates `cityTimes` every second, but doesn't cause an infinite loop
    useEffect(() => {
        const newCityTimes = {};
        for (const city in cityTimeZones) {
            newCityTimes[city] = getCityTimeAndDate(cityTimeZones[city]);
        }
        setCityTimes(newCityTimes);
    }, [time]); // ✅ Removed `cityTimeZones` from dependencies

    const toggleWallClockFullscreen = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsWallClockFullscreen(!isWallClockFullscreen);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const toggleClockFaceFullscreen = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsClockFaceFullscreen(!isClockFaceFullscreen);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const { hourRotation, minuteRotation, secondRotation } = getWallClockHandsRotation();

    return (
        <section>
            <div className="container">
                <div className={`app-container ${isWallClockFullscreen || isClockFaceFullscreen ? "fullscreen" : ""}`}>
                    <div className="clock-section">
                        <div className={`clock-container ${isClockFaceFullscreen ? "fullscreen-clock-container" : ""}`} onClick={toggleClockFaceFullscreen}>
                            <div className="clock-face">{formatTime(time)}</div>
                            <div className="date-display">{formatDate(time)}</div>
                        </div>
                        <div
                            className={`wall-clock-holder ${isWallClockFullscreen ? "fullscreen-clock-holder" : ""}`}
                            onClick={toggleWallClockFullscreen}
                            ref={clockHolderRef}
                        >
                            <div className="wall-clock-container">
                                <div className="wall-clock-hand wall-clock-hour-hand" style={{ transform: `rotate(${hourRotation}deg)` }} />
                                <div className="wall-clock-hand wall-clock-minute-hand" style={{ transform: `rotate(${minuteRotation}deg)` }} />
                                <div className="wall-clock-hand wall-clock-second-hand" style={{ transform: `rotate(${secondRotation}deg)` }} />
                            </div>
                        </div>
                    </div>
                    {!(isWallClockFullscreen || isClockFaceFullscreen) && (
                        <>
                            <div className="city-time-container">
                                {Object.entries(cityTimeZones).map(([city, timeZone]) => {
                                    const { time: cityTime, date: cityDate } = cityTimes[city] || {};
                                    return (
                                        <div className="city-time-card" key={city}>
                                            <h3 className="city-name">{city}</h3>
                                            <p className="city-time">{cityTime}</p>
                                            <p className="city-date">{cityDate}</p>
                                            <p className="time-difference">{getTimeDifference(timeZone)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <WorldMap />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Clock;
