import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import WOW from "wowjs";
import {usePrevious} from "react-admin";

const instance = axios.create()

const resInterceptor = response => {
    console.log('event:response:',)
    const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: false}});
    window.dispatchEvent(event)


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
        console.log('XXXX:diff', diffTime, isVisible)
        setTimeout(() => {
            console.log('event:time', diffTime, isVisible)
            const element = document.querySelector("#preloader.preloader-hidden");
            const scroll = document.documentElement.style;

            if (!!element) {
                element.style.display = isVisible ? 'block' : 'none';
                scroll.setProperty('--scrollbar-width', isVisible ? '0px' : '0.5rem');
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

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };

    }, [])

    return children;
}


export default instance;
export {AxiosInterceptor}