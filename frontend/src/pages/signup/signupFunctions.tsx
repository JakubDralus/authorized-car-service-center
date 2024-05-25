import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import { UseFormSetError, UseFormReturn } from "react-hook-form";


//---------------SIGN UP-----------------------

// --------email validation---------

// custom hook
export const useValidateEmail = (setEmailValid: React.Dispatch<React.SetStateAction<boolean>>, setRegInfo: React.Dispatch<React.SetStateAction<string>>, setError: UseFormSetError<{email: string;}>) => {
    return useMutation({
        mutationFn: validateEmail,
        onSuccess: (data, variables, context) => {
            //data retrieved
            if(data.data === true){
                setEmailValid(true);
            } 
            else{
                setEmailValid(false);
                setError('email', {
                    type: 'manual',
                    message: 'Provided email is taken.'
                })
            }
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

export interface RegisterData {
    email: string,
    password: string,
    rePassword: string,
    firstName: string,
    lastName: string,
    telephoneNumber: string,
}

//custom hook
export const useRegisterUser = (setRegInfo: React.Dispatch<React.SetStateAction<string>>, registerForm: UseFormReturn<RegisterData>) => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            setRegInfo(data.message);
            registerForm.reset();
        },
        onError: (error: AxiosError<Error, any>) => {
            setRegInfo(error.response?.data.message || "An error occurred during registering");
        },   
    })
}

//registration
export const registerUser = async (userData: RegisterData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/register/user', userData);
    return res.data;
}