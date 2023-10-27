import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import WOW from "wowjs";

const instance = axios.create()

const resInterceptor = response => {
    console.log('response:', response)
    const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: false}});
    setTimeout(() => window.dispatchEvent(event), 1700)
    return response;
}

const errInterceptor = error => {
    return Promise.reject(error);
}
instance.interceptors.response.use(resInterceptor, errInterceptor);

const AxiosInterceptor = ({children}) => {
    const updatePreloader = (isVisible = true) => {
        const element = document.querySelector("#preloader.preloader-hidden");
        element.style.display = isVisible ? 'block' : 'none';
    }

    useEffect(() => {
        updatePreloader()
    }, [])

    useEffect((response) => {
        const handleLoad = (e) => {
            updatePreloader(e.detail.isLoading)
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };

    }, [])

    return children;
}


export default instance;
export {AxiosInterceptor}