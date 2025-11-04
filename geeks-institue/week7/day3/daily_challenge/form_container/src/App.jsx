import React, { useState } from "react";
import FormComponent from "./FormComponent";
import "./App.css";

function App() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    nutsFree: false,
    lactoseFree: false,
    vegan: false
  });

  // Handle all input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  // On submit, update URL with query string
  function handleSubmit(e) {
    e.preventDefault();
    const query = new URLSearchParams(data).toString();
    window.history.pushState({}, "", "?" + query);
    alert("Form submitted successfully!");
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container shadow-lg rounded-4 bg-white p-5">
        <FormComponent 
          data={data} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}

export default App;