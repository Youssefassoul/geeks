import React, { useState } from "react";

function Phone() {
  const data = {
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020,
  };
  const [color, setColor] = useState(data.color);

  const handleColorChange = () => {
    setColor(color === "black" ? "blue" : "black");
  };

  return (
    <div>
      <h1>My Phone is a {data.brand}</h1>
      <p>
        It is a {color} {data.model} from {data.year}
      </p>
      <button onClick={handleColorChange}>Change Color</button>
    </div>
  );
}
export default Phone;
