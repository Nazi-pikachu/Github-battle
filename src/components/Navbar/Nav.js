import { NavLink } from "react-router-dom";
import "./nav.css";
function Navbar() {
  var Btn = ["Home", "Battle", "Popular"];
  return (
    <ul className="nav">
      {Btn.map((itm) => {
        return (
          <li key={itm}>
            <NavLink
              exact
              activeClassName="active"
              to={itm !== "Home" ? `/${itm}` : `/`}
            >
              {itm}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
export default Navbar;
