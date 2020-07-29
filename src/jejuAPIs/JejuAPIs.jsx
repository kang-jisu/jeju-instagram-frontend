import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:8080/",
})

Api.interceptors.request.use(
    config => {
        if(config.url.match("posts")){
        config.headers.common['Autorization'] = "token "+window.localStorage.getItem("accessToken");
        // console.log(config);
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
//     console.log(error);
//     return Promise.reject(error);
// });
export default Api

