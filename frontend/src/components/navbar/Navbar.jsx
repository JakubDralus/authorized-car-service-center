import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <div className="navbar">
            <div className="wrapper-normal flex">
                <div className="left-navbar">
                    <p>&#9776;Menu</p>
                </div>
                <div className="mid-navbar">
                    <p>Logo</p>
                </div>
                <div className="right-navbar">
                    <div className="nav-search-bar">
                        &#128269;
                    </div>
                    <div className="nav-user">
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar