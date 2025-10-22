import React from "react";
import Header from "./components/header";
import Card from "./components/card";
import Contact from "./components/contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="Company" subtitle="We specialize in branding" />
      <div className="row  my-4">
        <div className="row ">
          <Card
            icon="fa-solid fa-building"
            title="About the Company"
            text="We are a creative agency focused on delivering quality."
          />
          <Card
            icon="fa-globe"
            title="Our Values"
            text="Innovation and excellence drive us forward."
          />
          <Card
            icon="fa-university"
            title="Our Mission"
            text="To build impactful brands through strategy and design."
          />
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default App;
