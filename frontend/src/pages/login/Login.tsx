// import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"
import "./Login.css"
import { useLoginUser, validateLogin, ValidationData } from "./loginFunctions"
import { useState } from "react"

const Login = () => {
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    // left and right animation
    const [expandedSide, setExpandedSide] = useState<'left' | 'right' | null>(null);

    const handleMouseEnter = (side: 'left' | 'right') => {
        setExpandedSide(side);
    };

    const handleMouseLeave = () => {
        setExpandedSide(null);
    };

    //form
    const [loginInfo, setLoginInfo] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //mutation
    const loginMutation = useLoginUser(setLoginInfo);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validation
        const validationData: ValidationData = validateLogin(formData);

        setInvalidEmail(validationData.isEmailInvalid);
        setInvalidPassword(validationData.isPasswordInvalid);

        setLoginInfo(validationData.error);
        if (validationData.error !== "") {
            return;
        }

        //api call
        loginMutation.mutate(formData);
    }

    return (
        <>
            {/* <Navbar/> */}
            <div className="login-container">
                <div className="login-logo"><Link to="/">LOGO</Link></div>
                <div
                    className={`login-left ${expandedSide === 'left' ? 'expanded' : ''}`}
                    onMouseEnter={() => handleMouseEnter('left')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="login-items-container flex-column-center">
                        <h1>Login to Your Account</h1>
                        <div className="flex-column-center gap">
                            <div className="login-socials flex-column-center">
                                <div className="login-google-text">
                                    Login using Google
                                </div>
                                <div className="login-google-button">
                                    <img src={require('./google.png')} alt="Google"></img>
                                </div>
                            </div>
                            <div className="login-line">
                                or
                            </div>
                            <div className="login-form flex-column-center">
                                <form className="flex-column-center" onSubmit={handleSubmit}>
                                    <input className={invalidEmail ? "invalid-input" : "valid-input"} type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
                                    <input className={invalidPassword ? "invalid-input" : "valid-input"} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}></input>
                                    <button type="submit">Sign in</button>
                                </form>
                                <div className="login-error">{loginInfo ? loginInfo : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`login-right ${expandedSide === 'right' ? 'expanded' : ''}`}
                    onMouseEnter={() => handleMouseEnter('right')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="login-right-items flex-column-center">
                        <h1>Don't have an account yet?</h1>
                        <div>Sign up and discover a great amount of new oppurtunities!</div>
                        <Link to="/signup"><button>Sign up</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login