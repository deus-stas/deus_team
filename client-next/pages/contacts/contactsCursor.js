'use client'; // Если вы используете Next.js с папкой `app`

import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import './cursor.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation';

export const Cursor = () => {
    const arrowRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null);

    const [isDesktopCursor, setIsDesktopCursor] = useState(false);

    const pathname = usePathname(); // Аналог useLocation

    const targets = [".cursorTarget"];
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0; // Учитываем рендеринг на сервере

    const handleMoveMouse = (e) => {
        if (e.target.closest(targets.join(',')) && windowWidth <= 1800) {
            gsap.to(arrowRef.current, {
                x: e.clientX - 12,
                y: e.clientY - 12,
            });
        } else if (e.target.closest(targets.join(',')) && windowWidth >= 1800) {
            gsap.to(arrowRef.current, {
                x: e.clientX - 65,
                y: e.clientY - 12,
            });
        } else {
            gsap.to(arrowRef.current, {
                autoAlpha: 0,
            });
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMoveMouse);
        return () => {
            document.removeEventListener('mousemove', handleMoveMouse);
        };
    }, []);

    useEffect(() => {
        const updateCursorVisibility = () => {
            if (windowWidth > 768) {
                setIsDesktopCursor(true);
            } else {
                setIsDesktopCursor(false);
            }
            if (bubbleRef.current) {
                bubbleRef.current.style.opacity = '0';
            }
        };
        updateCursorVisibility();
    }, [targets]);

    useEffect(() => {
        const handleCursorHover = (e) => {
            if (e.target.closest(targets.join(',')) && windowWidth > 768) {
                gsap.to(bubbleRef.current, {
                    opacity: 1,
                    duration: 0.5,
                    width: 120,
                    height: 120,
                });
                e.target.classList.add('cursor__none');
            } else {
                gsap.to(bubbleRef.current, {
                    opacity: 0.6,
                    duration: 0.5,
                    width: 30,
                    height: 30,
                });
                e.target.classList.remove('cursor__none');
            }
        };

        document.addEventListener('mouseover', handleCursorHover);
        return () => {
            document.removeEventListener('mouseover', handleCursorHover);
        };
    }, [pathname]);

    const ArrowSVG = () => (
        <div ref={arrowRef} className="arrowBlock">
            <svg
                className="arrow-element"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.999999 1L21 0.999999M21 0.999999L21 21M21 0.999999L1 21"
                    stroke="#050505"
                />
            </svg>
        </div>
    );

    const Cursor = () => (
        <div className="cursor__block" ref={bubbleRef}>
            <div className="block__for-exclusion">
                <CustomCursor
                    ref={circleRef}
                    targets={targets}
                    customClass="custom-circle-cursor"
                    dimensions={30}
                    fill="#E0FD60"
                    smoothness={{
                        movement: 0.2,
                        scale: 0.1,
                        opacity: 0.2,
                    }}
                    opacity={0.6}
                    targetOpacity={1}
                    targetScale={4}
                />
            </div>
        </div>
    );

    return (
        <>
            <ArrowSVG />
            <Cursor />
        </>
    );
};
