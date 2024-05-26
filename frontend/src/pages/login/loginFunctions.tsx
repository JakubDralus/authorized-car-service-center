import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";

// --------------login-------------------
export interface LoginData {
    email: string;
    password: string;
}


//custom hook
export const useLoginUser = (setLoginInfo: React.Dispatch<React.SetStateAction<string>>) => {
    //const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data, variables, context) => {
            //succesfull login
            setLoginInfo(data.message);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("firstName", data.data.firstName);
            localStorage.setItem("lastName", data.data.lastName);
            localStorage.setItem("role", data.data.role);
            //redirect to home page after successfull login
            // setTimeout(() => {
            //     navigate("/")
            // }, 1500)
        },
        onError: (error: AxiosError<Error, any>) => {
            //error login
            setLoginInfo("User does not exist");
        },
    })
}

export const loginUser = async (loginData: LoginData) => {
    const res = await axios.post('http://localhost:8081/api/v1/auth/authenticate', loginData);
    return res.data;
}