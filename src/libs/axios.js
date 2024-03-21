import axios from "axios";

const Axios = axios.create({
  responseType: 'json'
});
Axios.interceptors.request.use(function (config) {
  const accessToken = JSON.parse(localStorage.getItem('token'));
  accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
  return config;
});

export default Axios;


