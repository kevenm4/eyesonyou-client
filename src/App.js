import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1>Eyes On You</h1>
    </div>
  );
}

export default App;
