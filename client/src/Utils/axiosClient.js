import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager'
import store from '../redux/store'
import { setLoading, showToast } from '../redux/Slice/appConfigSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../App'

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true

})


axiosClient.interceptors.request.use((request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        store.dispatch(setLoading(true))
        return request
    }
)



axiosClient.interceptors.response.use(
    async (response) => {
        store.dispatch(setLoading(false))

        const data = response.data;
        console.log('axios client data',data)
        if (data.status === 'ok') {
            return data
        }
        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;

        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))

        


        // when refresh token require and user to login page
        if (statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`) {

            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login', "_self")
            return Promise.reject(error)
        }

        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await axios.create({
                withCredentials:true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)

            console.log('response from backend 2', response)
            if (response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken)
                originalRequest.headers['Authorization'] =`Bearer ${response.data.result.accessToken}`
                console.log('original Request',originalRequest)
                return axios(originalRequest)
            }else {
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace("/login", "_self");
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)



    },async(error)=>{
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))
        store.dispatch(setLoading(false))
        return Promise.reject(error)
    }
)