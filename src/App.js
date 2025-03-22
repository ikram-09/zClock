import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Components/Main.jsx";

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Router>
          <Main />
        </Router>
      </div>
    </div>
  );
}

export default App;
