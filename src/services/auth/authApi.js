import axios from "axios";
const baseUrl = "http://localhost:3000/api/"
export function signIn (email, password){
    return axios.post(baseUrl+"auth/login", {email:email, password:password});
}

export function signUp (user){
    return axios.post(baseUrl+"auth/signup", user);
}