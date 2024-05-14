import axios, { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

// --------------login-------------------
interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    //maybe used inside of AxiosResponse instead of any
}

export interface ValidationData {
    error: string;
    isEmailInvalid: boolean;
    isPasswordInvalid: boolean;
}

export const validateLogin = (formData: LoginData): ValidationData => {
    let data: ValidationData = {
        error: "",
        isEmailInvalid: false,
        isPasswordInvalid: false,
    }

    if (formData.email === "" && formData.password === "") {
        data.error="Both email and password is empty.";
        data.isEmailInvalid = true;
        data.isPasswordInvalid = true;
        return data;
    }
    if (formData.password === "") {
        data.error = "Password is empty.";
        data.isEmailInvalid=false;
        data.isPasswordInvalid=true;
        return data;
    }
    if (formData.email === "") {
        data.error = "Email is empty.";
        data.isEmailInvalid=true;
        data.isPasswordInvalid=false;
        return data;
    }
    return data;
}

//custom hook
export const useLoginUser = (setLoginInfo: React.Dispatch<React.SetStateAction<string>>) => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data, variables, context) => {
            //succesfull login
            setLoginInfo(data.message);
            localStorage.setItem("token", data.data.token);
            console.log(localStorage.getItem("token"))
            //redirect to home page after successfull login
            setTimeout(() => {
                navigate("/")
            }, 1500)
        },
        onError: (error: AxiosError<Error, any>) => {
            //error login
            setLoginInfo(error.response?.data.message || "An error occurred");
        },
    })
}

export const loginUser = async (loginData: LoginData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/authenticate', loginData);
    return res.data;
}