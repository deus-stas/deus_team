"use client";
import React, { useEffect, useState } from "react"; // Добавлен импорт хуков React
import { Provider } from 'react-redux';
import { store } from '../store';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import setAuthToken  from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import jwtDecode from "jwt-decode";
import Head from 'next/head';

import AppHeader from '../components/appHeader/AppHeader';
import HeadComponent from '../components/Head/Head';
// import AppFooter from "../components/appFooter/AppFooter";
import CustomCursor from "custom-cursor-react";
// import ScrollToTop from "../helpers/ScrollToTop";
import "custom-cursor-react/dist/index.css";

import '../style/style.scss'

export default function RootLayout({ children }) {


  const pathname = usePathname();
  const adminBasePath = "/admin/";
  const hiddenRoutes = [adminBasePath];

  const [isLoading, setIsLoading] = useState(true);
  const [seoInfo, setSeoInfo] = useState(null);


  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");

  //   if (token) {
  //     setAuthToken(token);

  //     try {
  //       const decoded = jwtDecode(token);
  //       store.dispatch(setCurrentUser(decoded));

  //       const currentTime = Date.now() / 1000; // Переводим в секунды
  //       if (decoded.exp < currentTime) {
  //         store.dispatch(logoutUser());
  //         router.push("/login"); // Используем Next.js router для навигации
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при обработке токена:", error);
  //       store.dispatch(logoutUser());
  //       router.push("/login");
  //     }
  //   }
  // }, [router]); // Депенденси на `router` для стабильной навигации


  // Определяем, нужно ли скрывать хедер и футер
  const shouldHideHeaderFooter = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Эффект для имитации прелоадера
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Время прелоадера
    return () => clearTimeout(timer);
  }, []);

  // SEO-запрос
  useEffect(() => {
    async function fetchSeoData() {
      try {
        const response = await fetch("/api/seo");
        const data = await response.json();
        console.log(data);
        const currentSeoInfo = data.find((item) => item.seoPages === pathname);
        setSeoInfo(currentSeoInfo);
      } catch (error) {
        console.error("Ошибка загрузки SEO данных:", error);
        
      }
    }
    fetchSeoData();
  }, [pathname]);

  return (
    <html lang="ru">  
     <head>
        <title>{seoInfo?.seoTitle || "Deus"}</title>
        <meta name="description" content={seoInfo?.description || "Deus"} />
        <meta name="key" content={seoInfo?.seoKeywords || "Deus"} />
      </head>
      <body id='root'>

        <Provider store={store}>
          {/* Прелоадер */}
          {isLoading && (
            <div id="preloader" className="preloader">
              <p>Загрузка...</p>
            </div>
          )}

          {/* Кастомный курсор */}
          <CustomCursor
            targets={["a", "button"]}
            customClass="custom-cursor"
            dimensions={30}
            fill="#000"
            strokeColor="#FFF"
            strokeWidth={1}
            zIndex={9999}
            smoothness={{ movement: 0.1, scale: 0.1, opacity: 0.1 }}
          />

          {/* Хедер */}
          {!shouldHideHeaderFooter && <AppHeader />}

          {/* Основное содержимое */}
          <main>
            <div className="wrapper"> 
              {/* <ScrollToTop /> */}
              {children}
            </div>
          </main>

          {/* Футер */}
          {/* {!shouldHideHeaderFooter && <AppFooter />} */}
        </Provider>
      </body>
    </html>
  );
}


