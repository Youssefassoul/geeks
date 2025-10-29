import React, { useState } from "react";

export default function Forms() {
  // ---- PART I & IV ----
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [textarea, setTextarea] = useState("This is a default text.");
  const [car, setCar] = useState("Volvo");
  const mySubmitHandler = (e) => {
    e.preventDefault();
    alert(`Your name: ${username}, Your age: ${age}`);
  };
  let header;
  if (username) {
    header = <h3>Hello {username}!</h3>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      if (value && !Number(value)) {
        setErrormessage("Age must be a number");
      } else {
        setErrormessage("");
      }
      setAge(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };
  const handleTextareaChange = (e) => {
    setTextarea(e.target.value);
  };
  const handleCarChange = (e) => {
    setCar(e.target.value);
  };
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>React Form Example</h1>
      <form onSubmit={mySubmitHandler}>
        <div>
          <label>Enter your name: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Enter your age: </label>
          <input
            type="text"
            name="age"
            value={age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>
        {errormessage && <p style={{ color: "red" }}>{errormessage}</p>}

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      {username && age && !errormessage && (
        <h4>
          Welcome {username}! You are {age} years old.
        </h4>
      )}
      <div style={{ marginTop: "20px" }}>
        <label>Write something: </label>
        <br />
        <textarea
          value={textarea}
          onChange={handleTextareaChange}
          rows="4"
          cols="40"
        />
        <p>You wrote: {textarea}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Choose your car: </label>
        <select value={car} onChange={handleCarChange}>
          <option value="Volvo">Volvo</option>
          <option value="Saab">Saab</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Audi">Audi</option>
        </select>
        <p>Your selected car: {car}</p>
      </div>
    </div>
  );
}
