import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import './stylesheets/App.css';

import Context from "./context/Context";
import AppRouter from "./AppRouter";
import Navbar from "./Navbar";

const App = () => {

  return (
      <Context>
        <Router>
            <Navbar/>
            <AppRouter/>
        </Router>
      </Context>
  )
}

export default App;