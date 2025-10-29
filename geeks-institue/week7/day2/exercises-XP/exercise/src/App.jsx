import React from "react";
import Car from "./components/Car";
import Events from "./components/Events";
import Phone from "./components/Phone";
import Color from "./components/Color";

function App() {
  const carinfo = { name: "Ford", model: "Mustang" };

  return (
    <div>
      {/* Exercise 1: */}
      <Car carInfo={carinfo} />

      {/* Exercise 2: */}
      <Events />

      {/* Exercise 3: */}
      <Phone />

      {/* Exercise 4: */}
      <Color />
    </div>
  );
}

export default App;
