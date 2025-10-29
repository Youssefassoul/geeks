import React from "react";

function Events() {
  const clickMe = () => {
    alert("I was clicked");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert("The ENTER key was pressed, your input is: " + e.target.value);
    }
  };
  const [isToggleOn, setIsToggleOn] = React.useState(true);
  const handleClick = () => {
    setIsToggleOn(!isToggleOn);
  };
  return (
    <div>
      <button onClick={clickMe}>Click me</button>
      <br />
      <input
        type="text"
        placeholder="Press the ENTER key!"
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={handleClick}>{isToggleOn ? "ON" : "OFF"}</button>
    </div>
  );
}
export default Events;
