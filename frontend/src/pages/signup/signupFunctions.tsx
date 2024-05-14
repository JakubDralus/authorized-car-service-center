import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";


//---------------SIGN UP-----------------------

// --------email validation---------

// custom hook
export const useValidateEmail = (setEmailValid: React.Dispatch<React.SetStateAction<boolean>>, setRegInfo: React.Dispatch<React.SetStateAction<string>>) => {
    return useMutation({
        mutationFn: validateEmail,
        onSuccess: (data, variables, context) => {
            //data retrieved
            console.log(variables)
            if(data.data === true){
                setEmailValid(true);
                setRegInfo("")
            } 
            else{
                setEmailValid(false);
                setRegInfo("Provided email is taken.")
            }

            console.log(data)
            console.log("Email data obtained!");
        },
        onError: (error: AxiosError<Error, any>) => {
            //error login
            setRegInfo(error.response?.data.message || "An error occurred (email)");
        },     
    })
}

//email validation
export const validateEmail = async (email: string) => {
    const res = await axios.post(`http://localhost:8081/api/v1/auth/check-email?email=${email}`);
    return res.data;
}



// --------register---------

interface RegisterData {
    email: string,
    password: string,
    rePassword: string,
    firstName: string,
    lastName: string,
    telephoneNumber: string,
}

export interface FormError {
    // passwordError: string,
    // rePasswordError: string,
} 

// needs testing
interface RegisterResponse {
    emailValid: boolean
}

//password validation
export const registerFormValidation = (formData: RegisterData): FormError => {

    return {};
}

//custom hook
export const useRegisterUser = (setRegInfo: React.Dispatch<React.SetStateAction<string>>) => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            setRegInfo(data.message)
        },
        onError: (error: AxiosError<Error, any>) => {
            setRegInfo(error.response?.data.message || "An error occurred (register)");
        },   
    })
}

//registration
export const registerUser = async (userData: RegisterData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/register/user', userData);
    return res.data;
}