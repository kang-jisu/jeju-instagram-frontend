import axios from "axios"

const Api = axios.create({
    // baseURL: "http://localhost:8080/",
})

Api.interceptors.request.use(
    config => {
        if(config.url.match("posts")){
        config.headers['Authorization'] = "Bearer "+window.localStorage.getItem("accessToken");
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Api.interceptors.response.use(
//     response => {
//     // console.log(response);
//     return response;
//     },  
//     error => {
//     return Promise.reject(error.response);
// });
export default Api

