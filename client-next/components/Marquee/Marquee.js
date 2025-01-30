'use client';

import React, {useEffect, useRef} from 'react';
import './marquee.scss';

// type Direction = 'left' | 'right' | 'up' | 'down';

const Marquee = ({direction = 'left', speed = 30, children}) => {
    // Задаем класс для направления
    const getAnimationClass = () => {
        switch (direction) {
            case 'right':
                return 'marquee-right';
            case 'up':
                return 'marquee-up';
            case 'down':
                return 'marquee-down';
            default:
                return 'marquee-left';
        }
    };

    // Стили для управления скоростью анимации
    const animationStyle = {
        animationDuration: `${speed}s`,
    };

    return (

    <div className="main-clients__marquee">
        <div className={`marquee-container ${getAnimationClass()}`} style={animationStyle}>
            {children}
        </div>
        {/* Дублируем содержимое для бесшовной анимации */}
        <div className={`marquee-container ${getAnimationClass()}`} style={animationStyle}>
            {children}
        </div>
    </div>
)
    ;
};

export default Marquee;

