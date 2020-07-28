import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:8080/",
})
Api.defaults.headers.common['Autorization'] = "token "+window.localStorage.getItem("accessToken");

Api.interceptors.request.use(
    config => {
        // console.log(config);   
        return config;
    },
    error => {
        Promise.reject(error);
    }
);


Api.interceptors.response.use(
    response => {
    // console.log(response);
    return response;
    },  
    error => {
    console.log(error);
    Promise.reject(error);
});
export default Api

