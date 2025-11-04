import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      dayOfWeek: new Date().getDay(),
      dayOfMonth: new Date().getDate(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds()
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.setState({
        year: now.getFullYear(),
        month: now.getMonth(),
        dayOfWeek: now.getDay(),
        dayOfMonth: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getMonthName(monthIndex) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
  }

  // Generate spiral elements with proper positioning
  generateSpiralElements() {
    const elements = [];
    let currentAngle = -90; // Start from top
    let currentRadius = 380; // Start radius
    const radiusDecrement = 1.8; // How much radius decreases per element
    const angleIncrement = 2.8; // Degrees to rotate per element

    // Generate seconds (0-59) - outermost
    for (let i = 0; i < 60; i++) {
      elements.push({
        type: 'second',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'sec'
      });
      currentAngle += angleIncrement;
      currentRadius -= radiusDecrement;
    }

    // Generate minutes (0-59)
    for (let i = 0; i < 60; i++) {
      elements.push({
        type: 'minute',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'min'
      });
      currentAngle += angleIncrement;
      currentRadius -= radiusDecrement;
    }

    // Generate hours (0-23)
    for (let i = 0; i < 24; i++) {
      elements.push({
        type: 'hour',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'hr'
      });
      currentAngle += angleIncrement;
      currentRadius -= radiusDecrement;
    }

    // Generate days (1-31)
    for (let i = 1; i <= 31; i++) {
      elements.push({
        type: 'day',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'day'
      });
      currentAngle += angleIncrement;
      currentRadius -= radiusDecrement;
    }

    // Generate weeks (1-5)
    for (let i = 1; i <= 5; i++) {
      elements.push({
        type: 'week',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'week'
      });
      currentAngle += angleIncrement * 2;
      currentRadius -= radiusDecrement * 2;
    }

    // Generate months (1-12)
    for (let i = 1; i <= 12; i++) {
      elements.push({
        type: 'month',
        value: i,
        angle: currentAngle,
        radius: currentRadius,
        unit: 'month'
      });
      currentAngle += angleIncrement * 3;
      currentRadius -= radiusDecrement * 3;
    }

    return elements;
  }

  render() {
    const { year, month, dayOfMonth, hour, minute, second } = this.state;
    const elements = this.generateSpiralElements();
    const currentWeek = Math.ceil(dayOfMonth / 7);

    return (
      <div className="clock-container">
        {/* Year display */}
        <div className="year-display">
          {year} <span className="year-label">/ Year</span>
        </div>

        {/* Month display */}
        <div className="month-display">
          {this.getMonthName(month)}
        </div>

        {/* Main clock spiral */}
        <div className="clock-spiral">
          {elements.map((element, idx) => {
            const x = Math.cos(element.angle * Math.PI / 180) * element.radius;
            const y = Math.sin(element.angle * Math.PI / 180) * element.radius;
            
            // Check if this is the current value
            let isCurrent = false;
            if (element.type === 'second' && element.value === second) isCurrent = true;
            if (element.type === 'minute' && element.value === minute) isCurrent = true;
            if (element.type === 'hour' && element.value === hour) isCurrent = true;
            if (element.type === 'day' && element.value === dayOfMonth) isCurrent = true;
            if (element.type === 'week' && element.value === currentWeek) isCurrent = true;
            if (element.type === 'month' && element.value === month + 1) isCurrent = true;
            
            return (
              <div
                key={`${element.type}-${idx}`}
                className={`spiral-element ${element.type} ${isCurrent ? 'current' : ''}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${element.angle + 90}deg)`,
                }}
              >
                {element.value} {element.unit}
              </div>
            );
          })}

          {/* Center card display */}
          <div className="center-card">
            <div className="card-line">
              {month + 1} month week {currentWeek}
            </div>
            <div className="card-line main">
              {dayOfMonth} day {hour} hr
            </div>
            <div className="card-line">
              {minute} min {second} sec
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;