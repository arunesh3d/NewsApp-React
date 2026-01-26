import React, { Component } from 'react'
import { BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;