import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

class BuggyComponent extends React.Component {
  constructor() {
    super();
    this.state = { throwError: false };
  }

  render() {
    if (this.state.throwError) {
      throw new Error("An intentional error!");
    }

    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <button
          onClick={() => this.setState({ throwError: true })}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
        >
          Occur an error
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;