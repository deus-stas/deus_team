'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CursorCircle.css'; // Подключаем CSS файл для стилизации

const CursorCircle = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorCircleRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorCircleRef.current) {
                cursorCircleRef.current.style.left = `${e.clientX}px`;
                cursorCircleRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };

        const items = document.querySelectorAll('.main-agency__item');
        items.forEach(item => {
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
        });

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            items.forEach(item => {
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isHovered]);

    return (
        <div className={`cursor-circle ${isHovered ? 'visible' : ''}`} ref={cursorCircleRef}>
            <svg
                className="arrow-element"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0.999999 1L21 0.999999M21 0.999999L21 21M21 0.999999L1 21"
                    stroke="#050505"
                />
            </svg>
        </div>
    );
};

export default CursorCircle;
