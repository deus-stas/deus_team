'use client';

import { useState, useEffect } from 'react';
import './cookies.scss';

export default function CookieConsent({
                                          message = "Мы используем файлы cookie для улучшения работы сайта.",
                                          policyLink = "/privacy-policy",
                                          onAccept,
                                          onDecline
                                      }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Проверяем, не давал ли пользователь уже согласие
        const consentGiven = localStorage.getItem('cookieConsent');

        if (!consentGiven) {
            // Показываем баннер с задержкой для лучшего UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
        if (onAccept) onAccept();

        // Инициализируем аналитику
        initializeAnalytics();
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
        if (onDecline) onDecline();

        // Отключаем ненужные cookies
        disableNonEssentialCookies();
    };

    const initializeAnalytics = () => {
        // Инициализация аналитических сервисов
        if (typeof window !== 'undefined') {
            // Пример для Google Analytics
            // if (window.gtag) {
            //   window.gtag('config', 'GA_MEASUREMENT_ID');
            // }
            console.log('Analytics initialized - cookies accepted');
        }
    };

    const disableNonEssentialCookies = () => {
        // Удаляем или блокируем ненужные cookies
        const cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            const [name] = cookie.split('=');
            const cookieName = name.trim();

            // Удаляем аналитические cookies (пример)
            if (cookieName.includes('_ga') || cookieName.includes('_gid')) {
                document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            }
        });

        console.log('Non-essential cookies disabled');
    };

    if (!isVisible) return null;
    return (
        <div className="overlay">
            <div className="banner">
                <div className="content">
                    <p className="message">
                        {message}
                        {policyLink && (
                            <a
                                href={policyLink}
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Узнать больше
                            </a>
                        )}
                    </p>

                    <div className="buttons">
                        <button
                            onClick={handleAccept}
                            className="acceptButton"
                            type="button"
                        >
                            Принять
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}