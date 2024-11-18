"use client";

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import './globals.css';
import MainPage from './page';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import { setCurrentUser, logoutuser } from '../actions/authActions';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import ScrollToTop from '../helpers/ScrollToTop';
import AppHeader from '../components/appHeader/AppHeader';
import AppFooter from '../components/appFooter/AppFooter';
import { HelmetProvider } from 'react-helmet-async';

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Проверка JWT токена и настройка пользователя
  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      // Важно: здесь нужно будет использовать вашу логику для установки токена (setAuthToken)
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));

      // Проверка на истечение срока действия токена
      const currentTime = Date.now() / 1000; 
      if (decoded.exp < currentTime) {
        store.dispatch(logoutuser());
        window.location.href = "./login"; // перенаправление на страницу логина
      }
    }
    setIsLoading(false);
  }, []);

  // Выводим спиннер или индикатор загрузки, пока выполняется эффект
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <HelmetProvider>
            {/* Обертка MainPage с рендерингом дочерних элементов */}
            <ScrollToTop />
            <AppHeader />
            <MainPage>
              {children} {/* Рендерим дочерние компоненты */}
            </MainPage>
            <AppFooter />
            <CustomCursor />
          </HelmetProvider>
        </Provider>
      </body>
    </html>
  );
}
