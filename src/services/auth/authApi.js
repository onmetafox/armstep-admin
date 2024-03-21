import axios from "axios";
export function signIn ({email, password}){
    return axios.post(process.env.REACT_APP_BACKEND_URL+"auth/login", {email, password});
}

export function signUp (user){
    return axios.post(process.env.REACT_APP_BACKEND_URL+"auth/signup", user);
}
