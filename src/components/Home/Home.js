import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="Home-container">
      <h1>Github Battle: Battle your friends... and Stuff</h1>
      <Link className="Button" to="/battle">
        Battle
      </Link>
    </div>
  );
}
export default Home;
