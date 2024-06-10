import "./Signup.css";
import "../../assets/index.css"
import { useState } from "react";
import { useValidateEmail, useRegisterUser, RegisterData, RegStatus } from "./signupFunctions";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthPopup from "../../components/popups/AuthPopup";

const Signup = () => {
    const nav = useNavigate()
    // if(localStorage.getItem('token')){
    //     nav("/")
    // }

    //popup
    const [showPopup, setShowPopup] = useState<boolean>(false);

    //animation
    const [expandedSide, setExpandedSide] = useState<'left' | 'right' | null>(null);
    const handleMouseEnter = (side: 'left' | 'right') => {
        setExpandedSide(side);
    };
    const handleMouseLeave = () => {
        setExpandedSide(null);
    };

    //registration
    const [emailValid, setEmailValid] = useState(false);
    const [regInfo, setRegInfo] = useState<RegStatus>({
        message: "",
        status: ""
    });

    //register form
    const registerForm = useForm<RegisterData>({
        defaultValues: {
            email: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: '',
            telephoneNumber: ''
        }
    })

    //email form
    const emailForm = useForm({
        defaultValues: {
            email: ''
        }
    });

    //---------------email
    const emailValidationMutation = useValidateEmail(setEmailValid, setRegInfo, emailForm.setError);

    const handleEmailValidation = (data: { email: string }) => {
        try {
            registerForm.setValue("email", data.email);
            emailValidationMutation.mutate(data.email)
        }
        catch (error) {
            console.log(error);
        }
    }

    //----------------register
    const registerMutation = useRegisterUser(setRegInfo, registerForm);

    const onSubmit = async (data: RegisterData) => {
        try {
            registerMutation.mutate(data, {
                onSuccess: () => {
                    setShowPopup(true);
                },
                onError: () => {
                    setShowPopup(true);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Link to="/" className="absolute top-5 left-5 flex items-center">
                <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"/>
                <div className="ml-3 font-semibold text-lg  hover:text-gray-600">Go back</div>
            </Link>
            
            <div className="w-full h-screen flex max-[680px]:flex-col">
                
                <div
                    className={`h-full w-3/5 bg-white transition-width duration-500 ease-in-out  max-[680px]:w-full`}
                    onMouseEnter={() => handleMouseEnter('left')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="h-full flex justify-center items-center flex-col gap-5">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <h1 className="text-5xl max-[680px]:mt-10">Sign Up</h1>
                            <div className="reg-line">Dive into the world of car repairs!</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {emailValid ? (
                                <>
                                    <form className=" flex flex-col justify-center items-center gap-1" onSubmit={registerForm.handleSubmit(onSubmit)}>
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${registerForm.formState.errors.password?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{registerForm.formState.errors.password?.message}</span>
                                            <input className={`reg-input ${registerForm.formState.errors.password?.message ? 'invalid-input' : 'valid-input'}`} type="password" placeholder="Password" {...registerForm.register("password", { required: "Field required", minLength: { value: 8, message: "Password must be at least 8 characters" }, pattern: { value: /[!@#$%^&*(),.?":{}|<>]/, message: "Password must contain at least one special character" } })}></input>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${registerForm.formState.errors.rePassword?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{registerForm.formState.errors.rePassword?.message}</span>
                                            <input className={`reg-input ${registerForm.formState.errors.rePassword?.message ? 'invalid-input' : 'valid-input'}`} type="password" placeholder="Retype password" {...registerForm.register("rePassword", { required: "Field required", validate: (value) => value === registerForm.getValues('password') || 'Passwords do not match' })} ></input>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${registerForm.formState.errors.firstName?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{registerForm.formState.errors.firstName?.message}</span>
                                            <input className={`reg-input ${registerForm.formState.errors.firstName?.message ? 'invalid-input' : 'valid-input'}`} type="text" placeholder="First Name" {...registerForm.register("firstName", { required: "Field required" })}></input>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${registerForm.formState.errors.lastName?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{registerForm.formState.errors.lastName?.message}</span>
                                            <input className={`reg-input ${registerForm.formState.errors.lastName?.message ? 'invalid-input' : 'valid-input'}`} type="text" placeholder="Last name" {...registerForm.register("lastName", { required: "Field required" })} ></input>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${registerForm.formState.errors.telephoneNumber?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{registerForm.formState.errors.telephoneNumber?.message}</span>
                                            <input className={`reg-input ${registerForm.formState.errors.telephoneNumber?.message ? 'invalid-input' : 'valid-input'}`} type="phone" placeholder="Phone number" {...registerForm.register("telephoneNumber", { required: "Field required", minLength: { value: 9, message: "Not a proper phone number." }, maxLength: { value: 9, message: "Not a proper phone number." } })} ></input>
                                        </div>
                                        <button className="auth-button" type="submit">Sign Up</button>
                                    </form>
                                    <div className="mt-3 cursor-pointer" onClick={() => { setEmailValid(false); registerForm.reset(); }}>Go back</div>
                                </>
                            ) : (
                                <form className="flex flex-col justify-center items-center gap-4" onSubmit={emailForm.handleSubmit(handleEmailValidation)}>
                                    <div className="flex flex-col items-start">
                                        <span className={`text-sm min-h-5 ml-3 text-red-400 transition-all ${emailForm.formState.errors.email?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{emailForm.formState.errors.email?.message}</span>
                                        <input {...registerForm.register("email")} {...emailForm.register("email", { required: "Field required", pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format", } })} className={`reg-input ${emailForm.formState.errors.email?.message ? 'invalid-input' : 'valid-input'}`} type="email" placeholder="Email"></input>
                                    </div>
                                    <button className="auth-button" type="submit">Continue</button>
                                </form>
                            )}
                            <div className="flex items-center justify-center flex-col gap-2 mt-5 text-sm">
                                <div className="text-gray-400">Already have an account?</div>
                                <Link to="/login" className="text-gray-400 transition-all hover:text-black">Log in</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`h-full w-2/5 right-bgcolor transition-width duration-500 ease-in-out ${expandedSide === 'right' ? 'w-3/5' : ''} max-[680px]:w-full max-[680px]:min-h-64`}
                    onMouseEnter={() => handleMouseEnter('right')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="h-full text-center flex flex-col justify-center items-center gap-10 text-white">
                        <h1 className="text-4xl">Let us handle your car properly!</h1>
                        <div className="text-base">We offer services in various of categories:</div>
                    </div>
                </div>
            </div>
            {/* popup */}
            {showPopup && (
                <AuthPopup status={regInfo.status} message={regInfo.message} onClose={() => {setShowPopup(false); nav("/login")}} />
            )}
        </>
    )
}
export default Signup