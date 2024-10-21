import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation, useNavigate,
} from 'react-router-dom';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutuser} from "./actions/authActions";
import { headerData, services, contacts, fetchData  } from "./actions/appActions";
import {Provider, useDispatch} from "react-redux";
import store from "./store";
import {Cursor} from './components/Cursor/Cursor'

import ScrollToTop from "./helpers/ScrollToTop";
import AppHeader from './components/appHeader/AppHeader';
// import AppHeaderAdmin from './components/appHeader/MyLogoutButton';
import AppFooter from './components/appFooter/AppFooter';
import MainPage from './components/pages/mainPage/MainPage';
import Projects from './components/pages/projects/Projects';
import ProjectDetail from './components/pages/projects/projectDetail/ProjectDetail';
import Services from './components/pages/services/Services';
import ServicesDetail from './components/pages/services/servicesDetail/ServicesDetail';
import Agency from './components/pages/agency/Agency';
import Contacts from './components/pages/contacts/Contacts';
import News from './components/news/News';
import NewsDetail from './components/news/newsDetail/NewsDetail';
// import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import PrivateRoute from "./components/privateRoutes/PrivateRoute";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import axios, {AxiosInterceptor} from "./axios";
import {HelmetProvider} from "react-helmet-async";
import HelmetComponent from "./components/helmetComponent";
import WOW from "wowjs";

// import AdminPage from './Admin';

// import GSAP for GSAP animations
import { gsap } from 'gsap';
import {defaultInputTarget} from "concurrently/src/defaults";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        store.dispatch(logoutuser());
        window.location.href = "./login";
    }
};

const apiUrl = '';

const AppWrapper = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const adminBasePath = "/admin/";
    const [seoInfo, setSeoInfo] = useState(null);
    const currentId = location.pathname;
    const [isLoading, setIsLoading] = useState(false);

    const targets = [
        '.projects__item__1',
        '.projects__item__2',
        '.projects__item__3',
        '.projects__item__4',
        '.projects__item__5',
        '.projects__item__6',
        '.projects__item__7',
        '.projects__item__8',
        '.projects__item__9',
        '.projects__item__10',
        '.news-main__1',
        '.news-main__2',
        '.news-main__3',
        '.news-main__4',
        '.news-main__5',
        '.news-main__6',
        '.news-main__7',
        '.news-main__8',
        '.news-main__9',
        '.news-main__10',
        '.main-agency__item',
        '.agency-about__wrapp-btn'
    ]

    let footerKey = 'footer_' + Date.now();

    // useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //     wow.sync();
    // });

 // fetchData
    useEffect(() => {
        const timeout = setTimeout(() => dispatch(fetchData()), 1200)
        ;
        return () => clearTimeout(timeout)
    }, []);

    // Check if the current route starts with the adminBasePath
    const isOnAdminRoute = location.pathname.startsWith(adminBasePath);

    // Define an array of paths where the header and footer should be hidden
    const hiddenRoutes = [adminBasePath];

    // Check if the current route matches the hidden routes
    const shouldHideHeaderFooter = isOnAdminRoute && hiddenRoutes.some(route => location.pathname.startsWith(route));

    const classArray = document.querySelectorAll('.main-agency__item');
 // Seo pages
    useEffect(() => {
        axios.get(`${apiUrl}/api/seo`)
            .then((response) => {
                const currentSeoInfo = response.data.find((item) => item.seoPages === currentId);
                setSeoInfo(currentSeoInfo);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [location]);

    return (
        <>
            <div id="preloader" className="hide-preloader preloader-hidden">
                {/*<svg width="290" height="115" viewBox="0 0 290 115" fill="none"*/}
                {/*     xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <g id="logo">*/}
                {/*        <path id="Vector"*/}
                {/*              d="M68.5968 6.94125V111.48C68.6014 111.719 68.5436 111.954 68.4292 112.164C68.3148 112.373 68.1478 112.549 67.9446 112.674C67.7414 112.799 67.5092 112.869 67.2707 112.877C67.0323 112.885 66.7959 112.83 66.585 112.719L46.8891 102.853C46.6597 102.74 46.4662 102.566 46.3306 102.349C46.195 102.132 46.1227 101.882 46.1219 101.626V16.8012C46.1227 16.5456 46.195 16.2953 46.3306 16.0786C46.4662 15.8619 46.6597 15.6874 46.8891 15.5748L66.5789 5.72083C66.789 5.60991 67.0242 5.55543 67.2616 5.56274C67.499 5.57005 67.7305 5.63889 67.9333 5.76252C68.1361 5.88616 68.3033 6.06035 68.4186 6.26803C68.5338 6.47572 68.5932 6.70978 68.5908 6.94729L68.5968 6.94125ZM223.759 44.4117V111.492C223.758 111.727 223.697 111.957 223.583 112.161C223.468 112.366 223.303 112.537 223.103 112.66C222.904 112.783 222.676 112.853 222.442 112.863C222.208 112.873 221.975 112.824 221.765 112.719L202.045 102.853C201.817 102.739 201.625 102.564 201.49 102.348C201.356 102.131 201.284 101.881 201.284 101.626V44.4117C201.284 44.0479 201.428 43.6991 201.686 43.4419C201.943 43.1847 202.292 43.0402 202.655 43.0402H222.387C222.751 43.0402 223.1 43.1847 223.357 43.4419C223.614 43.6991 223.759 44.0479 223.759 44.4117ZM196.771 109.136L196.384 109.426C194.113 111.09 191.54 112.297 188.808 112.979C185.489 113.836 182.017 113.923 178.659 113.231C175.301 112.54 172.146 111.088 169.436 108.989C166.726 106.889 164.532 104.197 163.024 101.118C161.515 98.04 160.731 94.6569 160.732 91.2285V44.5929C160.732 44.2302 160.876 43.8823 161.132 43.6253C161.388 43.3683 161.735 43.2231 162.098 43.2215L174.749 43.4269H181.794C181.872 43.4192 181.951 43.4192 182.029 43.4269C182.339 43.4895 182.618 43.6572 182.818 43.9016C183.018 44.146 183.128 44.4521 183.129 44.7681V60.9779C183.122 61.0644 183.122 61.1513 183.129 61.2377V97.7717C183.132 100.535 184.231 103.184 186.185 105.138C188.139 107.091 190.788 108.19 193.551 108.194H196.275C196.364 108.176 196.455 108.18 196.541 108.205C196.627 108.23 196.706 108.276 196.771 108.338C196.836 108.4 196.884 108.478 196.913 108.563C196.941 108.648 196.948 108.739 196.934 108.828C196.913 108.943 196.856 109.055 196.771 109.136ZM41.1737 51.5106C39.9443 51.0178 38.6316 50.7655 37.3071 50.7675H35.7362C34.3624 50.7675 33.0021 51.0385 31.7331 51.565C30.4642 52.0914 29.3115 52.8631 28.3412 53.8356C27.3709 54.8082 26.6019 55.9626 26.0784 57.2328C25.5549 58.5029 25.287 59.8639 25.2902 61.2377V97.7717C25.2982 100.537 26.4023 103.186 28.3604 105.139C30.3186 107.091 32.971 108.188 35.7362 108.188H38.461C38.549 108.177 38.6383 108.188 38.7211 108.219C38.8039 108.251 38.8777 108.302 38.9361 108.369C38.9945 108.436 39.0356 108.516 39.056 108.602C39.0764 108.688 39.0754 108.778 39.0531 108.864C39.0251 108.978 38.9616 109.079 38.8719 109.154L38.4912 109.444C35.1389 111.876 31.1796 113.333 27.0509 113.656C22.9221 113.978 18.7846 113.153 15.0955 111.271C11.4063 109.389 8.30924 106.524 6.14635 102.993C3.98346 99.4609 2.83897 95.4001 2.83936 91.2588V66.2825C2.83936 53.8488 13.0196 43.3544 25.4473 43.4208C28.5203 43.4407 31.5563 44.0924 34.3668 45.3355C37.1772 46.5786 39.7019 48.3864 41.7839 50.6467C41.8578 50.7394 41.8997 50.8535 41.9033 50.972C41.907 51.0905 41.8723 51.207 41.8044 51.3042C41.7364 51.4013 41.6389 51.4739 41.5264 51.5111C41.4138 51.5483 41.2862 51.5482 41.1737 51.5106ZM287.1 90.2679C287.1 96.4304 285.426 101.53 282.073 105.565C281.572 106.145 281.106 106.683 280.52 107.227C276.551 111.094 271.458 113.172 265.271 113.571C265.254 113.58 265.234 113.585 265.214 113.585C265.194 113.585 265.174 113.58 265.156 113.571L264.576 113.613H262.184C258.202 113.477 254.239 112.99 250.342 112.157L249.786 112.036C246.91 111.292 244.091 110.341 241.352 109.19C240.361 108.755 239.513 108.047 238.909 107.149C238.304 106.25 237.968 105.198 237.939 104.115L237.395 91.0715C237.391 90.973 237.407 90.8746 237.442 90.7824C237.477 90.6902 237.53 90.606 237.598 90.5349C237.666 90.4638 237.748 90.4072 237.839 90.3686C237.93 90.33 238.027 90.3101 238.126 90.3102C238.682 90.3102 239.189 90.6244 239.443 91.1138C242.181 96.3618 245.763 101.124 250.046 105.209C253.671 108.653 257.453 110.695 261.405 111.341C262.323 111.492 263.253 111.571 264.184 111.565C264.649 111.565 265.15 111.565 265.573 111.504H265.803C265.969 111.503 266.135 111.486 266.298 111.456C267.162 111.384 268.02 111.196 268.836 110.912C269.186 110.81 269.525 110.695 269.857 110.55C270.117 110.447 270.376 110.338 270.618 110.211C272.151 109.44 273.504 108.353 274.587 107.021C274.805 106.78 275.01 106.526 275.192 106.26C275.379 105.982 275.572 105.716 275.735 105.451C276.34 104.037 276.63 102.514 276.599 100.98C276.678 99.3822 276.346 97.7911 275.635 96.3581C274.924 94.9251 273.858 93.6979 272.539 92.7933C268.971 90.5213 265.055 88.8497 260.945 87.8452C257.267 86.8878 253.662 85.6642 250.161 84.184C248.368 83.3548 246.671 82.3338 245.098 81.139C244.645 80.8127 244.192 80.4321 243.739 80.0696C239.648 76.6802 237.6 71.43 237.6 64.3069C237.588 62.011 237.951 59.7273 238.676 57.5462C238.772 57.2865 238.869 57.0267 238.984 56.7608C239.322 55.8787 239.715 55.0208 240.162 54.181C240.162 54.1327 240.21 54.0783 240.241 54.0179C241.225 52.3142 242.434 50.7433 243.823 49.3538C246.789 46.4018 250.581 44.4211 254.698 43.6746C256.704 43.2758 258.746 43.0825 260.788 43.0946C261.936 43.0946 263.138 43.155 264.329 43.2638C267.049 43.5302 269.739 44.048 272.364 44.8104C275.76 45.8375 279.07 47.1425 282.248 48.7073C282.264 48.7153 282.276 48.7276 282.285 48.7425C282.293 48.7575 282.297 48.7746 282.297 48.7919L282.581 56.7729L282.798 63.2435C282.801 63.3381 282.785 63.4323 282.751 63.5206C282.717 63.6088 282.665 63.6892 282.599 63.757C282.533 63.8247 282.454 63.8784 282.367 63.9148C282.28 63.9511 282.186 63.9694 282.091 63.9685C281.838 63.968 281.59 63.9 281.372 63.7714C281.155 63.6429 280.975 63.4586 280.853 63.2375C279.101 60.0838 277.107 57.075 274.89 54.2354C273.887 52.9539 272.816 51.7276 271.681 50.5621L271.416 50.3023C267.99 46.8706 264.268 45.1608 260.251 45.1608C256.233 45.1608 253.109 46.0852 250.886 47.94C249.815 48.8509 248.965 49.9931 248.4 51.2803C247.835 52.5676 247.569 53.9664 247.623 55.3713C247.574 56.8108 247.917 58.2368 248.613 59.4975C249.31 60.7581 250.336 61.8063 251.581 62.5306C254.62 64.3541 257.909 65.7239 261.344 66.5967L263.277 67.1223C266.075 67.8835 267.96 68.4273 268.963 68.7535C270.171 69.1402 271.681 69.6719 273.476 70.3606C275.016 70.9165 276.497 71.6415 277.886 72.5115C279.161 73.3633 280.375 74.3119 281.511 75.351C282.72 76.4204 283.735 77.7012 284.49 79.1331C286.308 82.5588 287.208 86.3952 287.1 90.274V90.2679ZM149.513 79.2358V78.4504V77.4113V76.6621C149.513 76.1304 149.452 75.5867 149.398 75.055L149.338 74.4629L149.283 74.0098C149.281 73.7158 149.241 73.4232 149.162 73.1398C149.162 72.8498 149.078 72.5598 149.024 72.2819C148.963 72.004 148.957 71.9073 148.915 71.714L148.764 70.9406C148.616 70.2462 148.445 69.557 148.25 68.8744L148.021 68.0769L147.749 67.2552C147.658 66.9894 147.567 66.7235 147.465 66.4577C147.272 65.9213 147.066 65.3895 146.849 64.8627L146.589 64.2465C146.451 63.9161 146.296 63.5934 146.124 63.2798C145.96 62.9898 145.749 62.4823 145.531 62.1077C144.979 61.0224 144.361 59.9713 143.683 58.96C143.414 58.5532 143.136 58.1523 142.849 57.7577L142.432 57.1898L142.172 56.8515C141.337 55.7651 140.437 54.7301 139.478 53.7521L138.952 53.2265C138.337 52.6157 137.696 52.0311 137.031 51.4744L136.886 51.3475C136.502 51.022 136.115 50.6998 135.726 50.3808L135.061 49.8733C134.386 49.3717 133.691 48.898 132.977 48.4535C132.741 48.3085 132.5 48.1515 132.258 48.0185L131.533 47.5956C131.289 47.4533 131.041 47.3183 130.79 47.1908C130.542 47.07 130.3 46.931 130.047 46.8042L129.285 46.4296C129.032 46.303 128.774 46.1861 128.512 46.0792L127.739 45.7408C127.213 45.5212 126.681 45.3158 126.144 45.1246L125.34 44.8406L124.519 44.5808L123.697 44.3392C123.145 44.1835 122.589 44.0425 122.029 43.9163L121.353 43.7713L120.326 43.5779C119.749 43.4717 119.168 43.3851 118.586 43.3181L117.716 43.2094L116.447 43.1006H112.568C107.046 43.3387 101.656 44.8657 96.83 47.5596C92.0037 50.2534 87.8748 54.0392 84.7734 58.6143C81.6721 63.1894 79.6844 68.4268 78.9693 73.9075C78.2543 79.3882 78.8317 84.9603 80.6555 90.1779C82.4792 95.3955 85.4986 100.114 89.4723 103.956C93.4459 107.798 98.2634 110.657 103.54 112.303C108.816 113.95 114.404 114.34 119.858 113.44C125.311 112.541 130.478 110.378 134.946 107.124L135.508 106.701C135.961 106.351 136.415 106.013 136.837 105.656C136.982 105.547 137.121 105.433 137.26 105.306L137.611 104.979L137.72 104.889C140.289 102.586 142.513 99.9242 144.323 96.9863C144.341 96.95 144.353 96.9017 144.323 96.8654C144.31 96.8501 144.293 96.8377 144.275 96.8292C144.254 96.8197 144.231 96.8156 144.208 96.8171C144.187 96.8202 144.166 96.8285 144.148 96.8412L144.027 96.9319L142.915 97.9469C140.64 100.231 137.927 102.032 134.94 103.243C131.952 104.455 128.751 105.051 125.527 104.998C121.741 105.001 118.008 104.108 114.632 102.394C111.257 100.679 108.334 98.1907 106.104 95.1315C103.075 91.018 101.444 86.0418 101.451 80.9335V79.2419H149.513V79.2358ZM113.523 46.3329C116.71 46.3393 119.765 47.6101 122.017 49.8664C124.269 52.1227 125.534 55.1802 125.534 58.3679V77.8583H101.488V58.3679C101.489 55.1765 102.758 52.1163 105.014 49.8597C107.271 47.603 110.331 46.3345 113.523 46.3329Z"*/}
                {/*              fill="#191B1D"/>*/}
                {/*    </g>*/}
                {/*</svg>*/}
            </div>

            {/*<ScrollToTop/>*/}
            <AxiosInterceptor>
                {!shouldHideHeaderFooter && <AppHeader/>}
                {!!seoInfo &&
                    <HelmetComponent
                        pageDescription={seoInfo.seoDescription}
                        pageTitle={seoInfo.seoTitle}
                        pageKeywords={seoInfo.seoKeywords}
                    />}
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path='/projects' element={<Projects/>}/>
                    <Route exact path='/projects/:id' element={<ProjectDetail/>}/>
                    <Route exact path='/services' element={<Services/>}/>
                    <Route exact path='/services/:id' element={<ServicesDetail/>}/>
                    <Route exact path='/agency' element={<Agency/>}/>
                    <Route exact path='/contacts' element={<Contacts/>}/>
                    <Route exact path='/news' element={<News/>}/>
                    <Route exact path='/news/:id' element={<NewsDetail/>}/>
                    <Route exact path='/admin/*' element={<PrivateRoute/>}/>
                    {/* <Route path='/admin/*' element={<AdminPage />} /> */}
                    {/* <Route exact path='/register' element={<Register/>} /> */}
                    <Route exact path='/login' element={<Login/>}/>
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>
                {!shouldHideHeaderFooter && <AppFooter key={footerKey}/>}
            </AxiosInterceptor>
        </>
    );

}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <HelmetProvider>
                    <AppWrapper/>
                </HelmetProvider>
            </Router>
        </Provider>
    )

}

export default App;
