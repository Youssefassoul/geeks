// App.js
import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }

    return (
      <div
        onClick={this.handleClick}
        className="cursor-pointer bg-blue-100 hover:bg-blue-200 transition-all rounded-2xl px-5 py-3 text-lg font-semibold shadow-sm text-blue-800 select-none"
      >
        Counter: {this.state.counter}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center p-10">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8">
          🧠 React Error Boundary Simulation
        </h1>

        {/* --- Simulation 1 --- */}
        <section className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Simulation 1
          </h3>
          <p className="text-gray-600 mb-4">
            Both counters are inside <b>one</b> ErrorBoundary. If one crashes,
            both disappear.
          </p>
          <div className="flex gap-6 justify-center">
            <ErrorBoundary>
              <BuggyCounter />
              <BuggyCounter />
            </ErrorBoundary>
          </div>
        </section>

        {/* --- Simulation 2 --- */}
        <section className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Simulation 2
          </h3>
          <p className="text-gray-600 mb-4">
            Each counter has its <b>own</b> ErrorBoundary. If one crashes, the
            other keeps working.
          </p>
          <div className="flex gap-6 justify-center">
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </div>
        </section>

        {/* --- Simulation 3 --- */}
        <section className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Simulation 3
          </h3>
          <p className="text-gray-600 mb-4">
            This counter is <b>not</b> wrapped by any ErrorBoundary. When it
            crashes, the whole app breaks.
          </p>
          <BuggyCounter />
        </section>

        <footer className="mt-10 text-gray-500 text-sm">
          Created by <span className="font-semibold text-blue-600">Youssef Assoul</span> 💡
        </footer>
      </div>
    );
  }
}

export default App;