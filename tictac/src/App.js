import {  useState } from "react";
import "./App.css";
import GameControl from "./components/GameControl.js";
import GameBoard from "./components/GameBoard.js";
import Notification from "./components/Notification.js"

function App() {

  const [notification, setNotification] = useState("");

  return (
    <div className="App">
   <GameControl/>
   <GameBoard/>
   <Notification message={notification}/>
    </div>
  );
}

export default App;
