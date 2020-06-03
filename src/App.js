import React from 'react';
import logo from './logo.svg';
// import './App.css';
import "@/styles/index.scss";
import 'antd/dist/antd.css';
import MainRouter from "~";

function App() {
  return (
    <div className="App box">
       <MainRouter/>
    </div>
  );
}

export default App;
