import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import './cursor.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation"; // Используем Next.js хук

export const Cursor = () => {
    const arrowRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null);

    const [isDesktopCursor, setIsDesktopCursor] = useState(false);
    const pathname = usePathname(); // Получаем текущий путь

    const targets = [
        '.news-main__1',
        '.news-main__2',
        '.news-main__3',
        '.news-main__4',
        '.news-main__5',
        '.news-main__6',
        '.news-main__7',
        '.news-main__8',
        '.news-main__9',
        '.news-main__10',
        '.projects__item',
        '.agency-about__wrapp-btn',
        '.cursorTarget',
    ];

    const handleMoveMouse = (e) => {
        if (e.target.closest(targets.join(',')) && window.innerWidth > 768) {
            gsap.to(arrowRef.current, {
                x: e.clientX - 12,
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
        const mobileVersion = () => {
            if (window.innerWidth > 768) {
                setIsDesktopCursor(true);
            } else {
                setIsDesktopCursor(false);
            }
        };
        const cursorVisibility = () => {
            arrowRef.current.style.opacity = '0';
            bubbleRef.current.style.opacity = '0';
        };
        mobileVersion();
        cursorVisibility();
    }, [targets]);

    useEffect(() => {
        const handleCursorHover = (e) => {
            if (e.target.closest(targets.join(',')) && window.innerWidth > 768) {
                gsap.to(bubbleRef.current, {
                    opacity: 1,
                    mixBlendMode: 'difference',
                    duration: 0.5,
                    cursor: "none",
                    width: 120,
                    height: 120,
                });
                e.target.classList.add('cursor__none');
            } else {
                gsap.to(bubbleRef.current, {
                    opacity: 0.6,
                    mixBlendMode: 'normal',
                    duration: 0.5,
                    width: 30,
                    height: 30,
                });
                e.target.classList.remove('cursor__none');
            }
        };

        document.addEventListener('mouseover', handleCursorHover);
        document.addEventListener('mouseout', handleCursorHover);

        return () => {
            document.removeEventListener('mouseover', handleCursorHover);
            document.removeEventListener('mouseout', handleCursorHover);
        };
    }, [pathname]); // Зависимость на pathname для обновления курсора при смене маршрута

    useEffect(() => {
        const handleArrowHover = (e) => {
            if (e.target.closest(targets.join(',')) && window.innerWidth > 768) {
                gsap.to(arrowRef.current, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.5,
                    rotation: 90,
                });
            } else {
                gsap.to(arrowRef.current, {
                    autoAlpha: 0,
                    scale: 0,
                    duration: 0.5,
                    rotation: 270,
                });
            }
        };

        document.addEventListener('mouseover', handleArrowHover);
        document.addEventListener('mouseout', handleArrowHover);

        return () => {
            document.removeEventListener('mouseover', handleArrowHover);
            document.removeEventListener('mouseout', handleArrowHover);
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
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0.999999 1L21 0.999999M21 0.999999L21 21M21 0.999999L1 21"
                    stroke="#050505"
                />
            </svg>
        </div>
    );

    const CursorBubble = () => (
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
            <CursorBubble />
        </>
    );
};
