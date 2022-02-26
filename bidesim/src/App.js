import logo from "./logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rules from "./components/Rules";
import Simulation from "./components/Simulation";
import Logo from "./components/Images/bide_logo.jpg";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-custom">
        <img src={Logo} width="50" height="50" alt="" />
        <a className="navbar-brand">Bide Simulation</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Rules
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sim"} className="nav-link">
              Simulation
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link"></Link>
          </li>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Rules} />
        <Route path="/sim" component={Simulation} />
      </Switch>
    </>
  );
}

export default App;
