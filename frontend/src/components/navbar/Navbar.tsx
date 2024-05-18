import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests

const Navbar = () => {

    // Function to send GET request and log result
    const getUsersData = async () => {
        let token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTUxNjc2ODIsImV4cCI6MTcxNTc3MjQ4Mn0.67ojoH8w0ZaAszBMQ7_bkpOc71rPgzJaBn8hk8fNRwo';
        try {
            const response = await axios.get('http://localhost:8081/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Users data:', response.data);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    return (
        <div className="navbar">
            <div className="wrapper-normal flex-nav">
                <div className="left-navbar">
                    {/* here sidebar */}
                    <p>&#9776;Menu</p>
                </div>
                <div className="mid-navbar">
                    <p>Logo</p>
                </div>
                <div className="right-navbar">
                    <div className="nav-search-bar">
                        &#128269;
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={getUsersData}>
                        Get Users
                    </button>
                    <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go to Dashboard
                    </Link>
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