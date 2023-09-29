import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const instance = axios.create()

const resInterceptor = response => {
    console.log('response:', response)

    const event = new CustomEvent("isLoadingMainPage", { detail: { isLoading: false } });
    setTimeout(() => window.dispatchEvent(event), 0)
    return response;
}

const errInterceptor = error => {
    return Promise.reject(error);
}
instance.interceptors.response.use(resInterceptor, errInterceptor);

const AxiosInterceptor = ({children}) => {

    return children;
}


export default instance;
export {AxiosInterceptor}