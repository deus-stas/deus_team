"use client"; // Обязательно для Next.js компонентов клиента

import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
//import WOW from "wowjs";
import {usePrevious} from "react-admin";

const instance = axios.create({
    maxRequests: 10, // устанавливаем максимальное количество одновременных запросов
})

const IS_LOADING_MAIN_PAGE_KEY = "isLoadingMainPage";
const setIsLoadingMainPageEvent = (isLoading) => {
    window.dispatchEvent(new CustomEvent(IS_LOADING_MAIN_PAGE_KEY, {detail: {isLoading: isLoading}}));
}


const resInterceptor = response => {
    // console.log('event:response:',)
    setIsLoadingMainPageEvent(false)

    // setTimeout(() => window.dispatchEvent(event), 1700)
    return response;
}

const errInterceptor = error => {
    return Promise.reject(error);
}
instance.interceptors.response.use(resInterceptor, errInterceptor);


const AxiosInterceptor = ({children}) => {
    const [timeSVG, setTimeSVG] = useState(Date.now())
    const [memoLoading, setMemoLoading] = useState(true)
    const previousIsLoading = usePrevious(memoLoading);
    const updatePreloader = (isVisible = true) => {
        const now = new Date().getTime()
        if (isVisible) {
            setTimeSVG(now)
        }
        const delayTime = 1500
        const diffTime = Date.now() - timeSVG
        // console.log('XXXX:diff', diffTime, isVisible)
        setTimeout(() => {
            // console.log('event:time', diffTime, isVisible)
            const element = document.querySelector("#preloader.preloader-hidden");
            const scroll = document.documentElement.style;
            const footer = document.querySelector(".footer");

            if (!!element) {
                setTimeout(() => {
                    if (footer) {
                        footer.style.opacity = isVisible ? '0' : '1';
                    }
                }, delayTime);
                element.style.transform = isVisible ? 'translateY(0)' : 'translateY(120%)'; // Добавляем плавное изменение положения
                scroll.setProperty('--scrollbar-width', isVisible ? '0px' : '0.5rem');
                element.style.opacity = isVisible ? '1' : '.95'; // Добавляем плавное изменение прозрачности
            }


        }, isVisible ? 0 : delayTime - (diffTime % delayTime))
    }


    useEffect(() => {
        if (previousIsLoading !== memoLoading) {
            updatePreloader(memoLoading)
        }
    }, [memoLoading])

    useEffect((response) => {
        const handleLoad = (e) => {
            setMemoLoading(e.detail.isLoading)
        };

        window.addEventListener(IS_LOADING_MAIN_PAGE_KEY, handleLoad);
        return () => {
            window.removeEventListener(IS_LOADING_MAIN_PAGE_KEY, handleLoad);
        };

    }, [])

    return children;
}


export default instance;
export {AxiosInterceptor}
export {setIsLoadingMainPageEvent}