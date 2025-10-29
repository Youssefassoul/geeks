import { useState } from "react";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const addVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vote Your Language!</h1>
      <div style={{ width: "300px", margin: "auto" }}>
        {languages.map((lang, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #333",
              padding: "10px",
              marginTop: "10px",
              background: "#f1e4bd",
            }}
          >
            <strong>{lang.votes}</strong>
            <span>{lang.name}</span>
            <button onClick={() => addVote(index)}>Click Here</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
