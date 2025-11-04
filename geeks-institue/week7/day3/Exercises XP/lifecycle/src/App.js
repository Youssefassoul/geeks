import React from "react";
import FavoriteColor from "./components/FavoriteColor";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-extrabold mb-8">🎨 React Lifecycle Demo</h1>
      <FavoriteColor />
    </div>
  );
}

export default App;