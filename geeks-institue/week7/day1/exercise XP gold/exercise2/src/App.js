import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const planets = ["Mars", "Venus", "Jupiter", "Earth", "Saturn", "Neptune"];

  return (
    <div className="container my-5">
      <h2 className="mb-3 text-center">Planets</h2>
      <ul className="list-group">
        {planets.map((planet, index) => (
          <li key={index} className="list-group-item">
            {planet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
