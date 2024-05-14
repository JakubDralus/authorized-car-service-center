import axios, { AxiosResponse } from "axios";
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

export const loginUser = async (loginData: LoginData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/authenticate', loginData);
    return res.data;
}

//---------------register-----------------------

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

//email validation
export const validateEmail = async (email: string) => {
    const res = await axios.post(`http://localhost:8081/api/v1/auth/check-email?email=${email}`);
    return res.data;
}

//password validation
export const registerFormValidation = (formData: RegisterData): FormError => {

    return {};
}

//registration
export const registerUser = async (userData: RegisterData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/register/user', userData);
    return res.data;
}

// export const useRegisterUser