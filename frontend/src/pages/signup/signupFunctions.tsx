import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { UseFormSetError, UseFormReturn } from "react-hook-form";


//---------------SIGN UP-----------------------

export interface RegStatus{
    status: string,
    message: string
}

// --------email validation---------

// custom hook
export const useValidateEmail = (setEmailValid: React.Dispatch<React.SetStateAction<boolean>>, setRegInfo: React.Dispatch<React.SetStateAction<RegStatus>>, setError: UseFormSetError<{email: string;}>) => {
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
            setRegInfo({
                message:"An error occurred during registering (email)",
                status:"Error"
            });
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
export const useRegisterUser = (setRegInfo: React.Dispatch<React.SetStateAction<RegStatus>>, registerForm: UseFormReturn<RegisterData>) => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            setRegInfo({
                message:data.message,
                status:"Success"
            });
            registerForm.reset();
        },
        onError: (error: AxiosError<Error, any>) => {
            setRegInfo({
                message:"An error occurred during registering",
                status:"Error"
            });
        },   
    })
}

//registration
export const registerUser = async (userData: RegisterData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/register/user', userData);
    return res.data;
}