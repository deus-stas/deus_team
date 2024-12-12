"use client";

import React, { useEffect, useState } from "react"; // Добавлен импорт хуков React
import { store } from '../store';
import { usePathname } from "next/navigation";
import Head from 'next/head';

import {Provider} from "react-redux";

import AppHeader from '../components/appHeader/AppHeader';
import AppFooter from "../components/appFooter/AppFooter";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";

import '../style/style.scss'

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const adminBasePath = "/admin/";
  const hiddenRoutes = [adminBasePath];

  const [seoInfo, setSeoInfo] = useState(null);
  const [transitioning, setTransitioning] = useState(true); // Состояние для анимации

  // Определяем, нужно ли скрывать хедер и футер
  const shouldHideHeaderFooter = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

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

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setTransitioning(false);
    }, 2000); 

    return () => clearTimeout(timeout); 
  }, [pathname]);

  return (
    <html lang="ru">  
     <Head>
        <title>{seoInfo?.seoTitle || "Deus"}</title>
        <meta name="description" content={seoInfo?.description || "Deus"} />
        <meta name="key" content={seoInfo?.seoKeywords || "Deus"} />
      </Head>
      <body id='root'>

        <Provider store={store}>
          {/* Прелоадер */}
          <div
            id="preloader"
            className={`preloader ${transitioning ? 'transitioning' : ''}`}
          ></div>

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
          {!shouldHideHeaderFooter && <AppFooter />}
        </Provider>
      </body>
    </html>
  );
}




