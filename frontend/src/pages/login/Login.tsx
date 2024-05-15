// import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"
import "./Login.css"
import { LoginData, useLoginUser } from "./loginFunctions"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Login = () => {
    // animation
    const [expandedSide, setExpandedSide] = useState<'left' | 'right' | null>(null);
    const handleMouseEnter = (side: 'left' | 'right') => {
        setExpandedSide(side);
    };
    const handleMouseLeave = () => {
        setExpandedSide(null);
    };

    //form
    const [loginInfo, setLoginInfo] = useState("");

    const loginForm = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    //mutation
    const loginMutation = useLoginUser(setLoginInfo);

    const onSubmit = async (data: LoginData) => {
        console.log(data)
        try {
            loginMutation.mutate(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* <Navbar/> */}
            <div className="login-container">
                <div className="login-logo"><Link to="/">LOGO</Link></div>
                <div
                    className={`login-left `}
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
                                <form className="flex-column-center" onSubmit={loginForm.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col items-start">
                                        <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${loginForm.formState.errors.email?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{loginForm.formState.errors.email?.message}</span>
                                        <input className={loginForm.formState.errors.email ? "invalid-input" : "valid-input"} type="email" placeholder="Email" {...loginForm.register("email", { required: "Field required", pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format", } })}></input>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${loginForm.formState.errors.password?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{loginForm.formState.errors.password?.message}</span>
                                        <input className={loginForm.formState.errors.password ? "invalid-input" : "valid-input"} type="password" placeholder="Password" {...loginForm.register("password", { required: "Field required" })}></input>
                                    </div>
                                    <button className="auth-button" type="submit">Sign in</button>
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