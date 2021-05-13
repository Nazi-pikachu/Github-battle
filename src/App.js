import "./App.css";
import Popular from "./components/popular/popular";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import Home from "./components/Home/Home";
import Battle from "./components/Battle/Battle";
import Results from "./components/Results/Results";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Battle" component={Battle}></Route>
      <Route path="/Battle/results" component={Results}></Route>
      <Route path="/popular" component={Popular}></Route>
    </div>
  );
}
export default App;
