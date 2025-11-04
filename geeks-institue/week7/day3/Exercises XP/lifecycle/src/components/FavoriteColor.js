import React from "react";

class FavoriteColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    // After 2 seconds, change color to yellow
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  shouldComponentUpdate() {
    console.log("In shouldComponentUpdate");
    return true; // Try false to see that the color won't change
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("In getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("After update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-[350px]">
        <h1 className="text-2xl font-bold mb-2">My Favorite Color is:</h1>
        <p className="text-blue-600 font-semibold text-xl mb-4">
          {this.state.favoriteColor}
        </p>
        <button
          onClick={this.changeColor}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Change Color to Blue
        </button>
      </div>
    );
  }
}

export default FavoriteColor;