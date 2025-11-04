import React, { Component } from "react";

class Child extends Component {
  componentWillUnmount() {
    alert("Child component is being unmounted!");
  }

  render() {
    return (
      <div className="bg-green-100 text-green-800 p-6 rounded-2xl shadow-md w-64 text-center transition-all">
        <h2 className="text-xl font-bold mb-2">Hello World!</h2>
        <p className="text-green-700">This is the Child component.</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8">
          🚀 React Unmounting Demo
        </h1>

        {/* Child Component */}
        <div className="mb-6">
          {this.state.show ? <Child /> : <p className="text-gray-600 italic">Child component removed</p>}
        </div>

        {/* Delete Button */}
        <button
          onClick={this.deleteChild}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Delete Child
        </button>

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-sm">
          Lifecycle Demo - <span className="font-semibold text-blue-600">Youssef</span>
        </footer>
      </div>
    );
  }
}

export default App;