import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

// Состояние для размеров экрана
const useMobile = () => {
    const MOBILE_SIZE = 575;
    const TABLET_SIZE = 768;
    const LAPTOP_SIZE = 1024;

    // Начальное значение для SSR (предполагаем, что клиентская версия всегда desktop)
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        // Этот эффект сработает только на клиенте
        if (typeof window !== 'undefined') {
            // Функция, которая обновляет размеры экрана
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            // Обработчик события resize с дебаунсом
            const debouncedResize = debounce(handleResize, 100);

            window.addEventListener("resize", debouncedResize);

            // Вызовем сразу для начальной загрузки
            handleResize();

            return () => {
                window.removeEventListener("resize", debouncedResize);
            };
        }
    }, []);

    // Логика для определения типа устройства
    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE);
        setIsTablet(windowWidth <= TABLET_SIZE);
        setIsLaptop(windowWidth > LAPTOP_SIZE);
        setIsDesktop(windowWidth > LAPTOP_SIZE);
    }, [windowWidth]);

    return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useMobile;
