import React from "react";

import Header from "../../components/header/header";
import Chat from "../Chat/Chat";

import "../../assets/icons/flaticon.css";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />

      <Chat />
    </div>
  );
};

export default App;
