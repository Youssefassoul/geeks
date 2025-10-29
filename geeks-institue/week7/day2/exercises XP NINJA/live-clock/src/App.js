import React, { useState, useEffect } from "react";
import "./App.css";
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <h1>Hello, world!</h1>
      <h2>It is {time.toLocaleTimeString()}.</h2>
    </div>
  );
}

export default LiveClock;
