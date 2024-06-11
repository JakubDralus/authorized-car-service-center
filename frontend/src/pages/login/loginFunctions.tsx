import axios, { AxiosError } from "axios";
import axiosInstance from "../../api/AxiosInstance";
import { UseFormReturn } from "react-hook-form";
import { useMutation } from "react-query";


// --------------login-------------------
export interface LoginStatus{
    status: string,
    message: string
}

export interface LoginData {
    email: string;
    password: string;
}


//custom hook
export const useLoginUser = (setLoginInfo: React.Dispatch<React.SetStateAction<LoginStatus>>, loginForm: UseFormReturn<LoginData, any, undefined>) => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data, variables, context) => {
            setLoginInfo({
                status: "Success",
                message: data.message
            });
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("firstName", data.data.firstName);
            localStorage.setItem("lastName", data.data.lastName);
            localStorage.setItem("role", data.data.role);
            localStorage.setItem("id", data.data.id);
            loginForm.reset()
        },
        onError: (error: AxiosError<Error, any>) => {
            //error login
            setLoginInfo({
                status: "Error",
                message: "Error while logging in."
            });
        },
    })
}

export const loginUser = async (loginData: LoginData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/authenticate', loginData);
    return res.data;
}