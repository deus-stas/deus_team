// app/layout.js
"use client";

import { Provider } from 'react-redux';
import { store } from './store';
import './globals.css';
import MainPage from './pages/mainPage/MainPage';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Provider store={store}>
          {/* Добавляем рендеринг дочерних элементов */}
          <MainPage>
            {children} {/* Здесь рендерятся дочерние компоненты */}
          </MainPage>
        </Provider>
      </body>
    </html>
  );
}


