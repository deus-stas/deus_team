"use client";

import { Provider } from 'react-redux';
import { store } from '../store';
import { usePathname } from "next/navigation";

import AppHeader from '../components/appHeader/AppHeader';
// import AppFooter from "../components/appFooter/AppFooter";
// import CustomCursor from "custom-cursor-react";
// import ScrollToTop from "../helpers/ScrollToTop";
import "custom-cursor-react/dist/index.css";

import '../style/style.scss'

export default function RootLayout({ children }) {


  
  return (
    <html lang="ru">
      <body>
        <Provider store={store}>
            <AppHeader />
            {children} {/* Здесь рендерятся дочерние компоненты */}
            
        </Provider>
      </body>
    </html>
  );
}


