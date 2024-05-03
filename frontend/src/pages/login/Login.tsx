// import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"
import "./Login.css"

const Login = () => {

    return(
        <>
            {/* <Navbar/> */}
            <div className="login-container">
                <div className="login-logo"><Link to="/">LOGO</Link></div>
                <div className="login-left">
                    <div className="login-items-container flex-column-center">
                        <h1>Login to Your Account</h1>
                        <div className="login-socials flex-column-center">
                            <div className="login-google-text">
                                Log in using Google
                            </div>
                            <div className="login-google-button">
                                aaaa
                            </div>
                        </div>
                        <div className="login-break">
                            ----------or----------
                        </div>
                        <div className="login-form">
                            <form className="flex-column-center" onSubmit={() => console.log("login")}>
                                <input type="text" placeholder="Email"></input>
                                <input type="password" placeholder="Password"></input>
                                <button type="submit">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-right-items flex-column-center">
                        <h1>Don't have an account yet?</h1>
                        <div>Sign up and discover a great amount of new oppurtunities!</div>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login