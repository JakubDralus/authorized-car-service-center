import "./Signup.css";
import "../../assets/index.css"
import { useState } from "react";
import { useMutation } from "react-query";
import { validateEmail, registerUser } from "../../api/auth";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
    //registration
    const [emailValid, setEmailValid] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
        telephoneNumber: '',
    })

    //
    const emailValidationMutation = useMutation({
        mutationFn: validateEmail,
        onSuccess: (data, variables, context) => {
            //data retrieved
            console.log(variables)
            if(data.data === true)
                setEmailValid(true);
            else
                setEmailValid(false);

            console.log(data)
            console.log("Email data obtained!");
        },
        onError: (error: AxiosError<Error, any>) => {
            //error login
            setError(error.response?.data.message || "An error occurred (email)");
        },     
    })

    const handleEmailValidation = () => {
        try{
            emailValidationMutation.mutate(formData.email)
        }
        catch(error){
            console.log(error);
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            console.log(data)
            console.log("User registered!");
        },
        onError: (error: AxiosError<Error, any>) => {
            setError(error.response?.data.message || "An error occurred (register)");
        },   
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //password validation etc

        registerMutation.mutate(formData);
    }

    return (
        <>
        <div className="w-full h-screen flex">
            <div className="h-full w-3/5 bg-white transition-width duration-500 ease-in-out">
                <div className="h-full flex justify-center items-center flex-col gap-10">
                    <h1 className="text-5xl">Sign Up</h1>
                    <div className="reg-line">Dive into the world of car repairs!</div>
                    <div className="flex flex-col justify-center items-center">
                        {emailValid ? (
                            <>
                                <form className=" flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit}>
                                    <input className="reg-input valid-input" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}></input>
                                    <input className="reg-input valid-input" type="password" placeholder="Retype password" name="rePassword" value={formData.rePassword} onChange={handleChange}></input>
                                    <input className="reg-input valid-input" type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                                    <input className="reg-input valid-input" type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                                    <input className="reg-input valid-input" type="phone" placeholder="Phone number" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleChange}></input>
                                    <button className="auth-button" type="submit">Sign Up</button>
                                </form>
                                <div className="mt-3 cursor-pointer" onClick={() => {setEmailValid(false)}}>Back</div>
                            </>
                        ) : (
                            <div className="flex flex-col justify-center items-center gap-5">
                                <input className="reg-input valid-input" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
                                <button className="auth-button" onClick={handleEmailValidation}>Continue</button>
                            </div>
                        )}
                        <div className="flex items-center justify-center flex-col gap-2 mt-5">
                            <div className="text-gray-400">Already have an account?</div>                            
                            <Link to="/login" className="text-gray-400">Log in</Link>        
                        </div>
                    </div>
                    {/* <div className="login-error">{error ? error : ""}</div> */}
                </div>
            </div>
            <div className="h-full w-2/5 right-bgcolor">
                <div className="h-full text-center flex flex-col justify-center items-center gap-10 text-white">
                    <h1 className="text-4xl">Let us handle your car properly!</h1>
                    <div className="text-base">We offer services in various of categories:</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup