import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function App() {
  return (
    <Carousel className="crsl" infiniteLoop interval={1000}>
      <div>
        <img
          src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg"
          alt="Hong Kong"
        />
        <p className="caption">Hong Kong</p>
      </div>
      <div>
        <img
          src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp"
          alt="Macao"
        />
        <p className="caption">Macao</p>
      </div>
      <div>
        <img
          src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp"
          alt="Japan"
        />
        <p className="caption">Japan</p>
      </div>
      <div>
        <img
          src="https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp"
          alt="Las Vegas"
        />
        <p className="caption">Las Vegas</p>
      </div>
    </Carousel>
  );
}

export default App;
