import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function HomeScreen() {
  return <h1>Home Screen</h1>;
}

function ProfileScreen() {
  return <h1>Profile Screen</h1>;
}

function ShopScreen() {
  throw new Error("Shop failed");
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <NavLink to="/" className="m-2">
          Home
        </NavLink>
        <NavLink to="/profile" className="m-2">
          Profile
        </NavLink>
        <NavLink to="/shop" className="m-2">
          Shop
        </NavLink>
      </nav>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
