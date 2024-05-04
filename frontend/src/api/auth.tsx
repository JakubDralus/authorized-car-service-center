import axios, { AxiosResponse } from "axios";
// --------------login-------------------
interface LoginData {
    email: string;
    password: string;
}

interface ApiResponse {
    //maybe used inside of AxiosResponse instead of any
}

export const validateLogin = (formData: LoginData): string => {
    if(formData.email==="" && formData.password===""){
        return "Both email and password is empty.";
    }
    if(formData.password===""){
        return "Password is empty.";
    }
    if(formData.email===""){
        return "Email is empty.";
    }

    return "";
}

export const loginUser = (loginData: LoginData) => {
    return axios.post<AxiosResponse>('http://localhost:8081/api/auth/login', loginData).then((res) => res.data);
}

//---------------register-----------------------

interface RegisterData {

}