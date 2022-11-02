import axios from  'axios';

export default (history = null) => {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    let headers = {};
    
    //console.log("baseURL:",baseURL);
    
    if(localStorage.token) {
        headers.Authorization = `Bearer ${localStorage.token}`;
    }
    
    const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: baseURL,
        headers,
    });
    
    axiosInstance.interceptors.response.use(
        (response) => new Promise((resolve, resject) => {
            resolve(response);
        }),
        (error) => {
            if(!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
    
            if(error.response.status === 403) {
                localStorage.removeItem("token");
                if(history){
                    history.push("/login");
                } else {
                    window.location("/login");
                }
            } else{
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
    );

    return axiosInstance;
}

