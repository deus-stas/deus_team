"use client";

import React, { useEffect, useState } from "react"; // Добавлен импорт хуков React
import { store } from '../store';
import { usePathname } from "next/navigation";

import {Provider} from "react-redux";

import AppHeader from '../components/appHeader/AppHeader';
import AppFooter from "../components/appFooter/AppFooter";
import "custom-cursor-react/dist/index.css";

import '../style/style.scss'

import YandexMetrikaScript from '../public/custom/yandex_head'; // Импортируем компонент скрипта
import YandexMetrikaNoscript from '../public/custom/yandex_body'; // Импортируем компонент noscript

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


  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setTransitioning(false);
    }, 1000); 

    return () => clearTimeout(timeout); 
  }, [pathname]);

  return (
    <html lang="ru">  
     <head>
        <YandexMetrikaScript />
      </head>
      <body id='root'>
        <YandexMetrikaNoscript />
        <Provider store={store}>

          {/* Прелоадер */}
          <div
            id="preloader"
            className={`preloader ${transitioning ? 'transitioning' : ''}`}
          ></div>

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
