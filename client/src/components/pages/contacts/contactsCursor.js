import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import './cursor.scss'
import { gsap } from 'gsap';
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";

export const Cursor = () => {

    const arrowRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null)

    const [isDesktopCursor, setIsDesktopCursor] = useState(false);

    const location = useLocation();

    const targets = [".cursorTarget"]

    const windowWidth = window.innerWidth;

    const handleMoveMouse = (e) => {
        // Проверяем, находится ли курсор над элементом, соответствующим одному из селекторов (targets), и ширина окна больше 768 пикселей
        if (e.target.closest(targets.join(',')) && windowWidth > 768) {
            // Если да, то перемещаем стрелку в соответствии с положением курсора
            gsap.to(arrowRef.current, {
                x: e.clientX - 12,
                y: e.clientY - 12,
            });
        } else {
            // Если нет, то скрываем стрелку
            gsap.to(arrowRef.current, {
                autoAlpha: 0,
            });
        }
    };
    // useEffect for moving
    useEffect(() => {
        // Add Listener
        document.addEventListener('mousemove', handleMoveMouse);
    }, []);

    useEffect(() => {
        const mobileVersion = () => {
            if (windowWidth > 768 ) {
                setIsDesktopCursor(true);
                console.log('Получилось')
            }
            else {
                setIsDesktopCursor(false);
                console.log('брал')
            }
        }
        const cursorVisibility = () => {
            arrowRef.current.style.opacity = '0'
            bubbleRef.current.style.opacity = '0'
        }
        mobileVersion();
        cursorVisibility();
    }, [targets]);

    // useEffect for customCursor
    useEffect(() => {
        const handleCursorHover = (e) => {
            if (e.target.closest(targets.join(',')) && windowWidth > 768) {
                gsap.to(bubbleRef.current, {
                    opacity: 1,
                    duration: 0.5,
                    cursor: "none",
                    width: 120,
                    height: 120
                });
                e.target.classList.add('cursor__none')
            } else {
                gsap.to(bubbleRef.current, {
                    opacity: 0.6,
                    duration: 0.5,
                    width: 30,
                    height: 30
                });
                e.target.classList.remove('cursor__none')
            }
        };
        document.addEventListener('mouseover', handleCursorHover);
        return () => {
            document.removeEventListener('mouseover', handleCursorHover);
        };
    }, [location]);

    useEffect(() => {
        const cursorHoverShowreel = (e) => {
            const showreel = document.getElementById('mainVideo')
            const circle = document.querySelector('.cursor__block');
            if (e.target === showreel || e.target.classList.contains('playing')) {
                circle.classList.add('cursor__block_hidden');
            } else {
                circle.classList.remove('cursor__block_hidden');
                console.log(e.target)
            }
        }
        document.addEventListener('mouseover', cursorHoverShowreel)
    }, [targets]);

    // useEffect for arrow
    useEffect(() => {
        const handleArrowHover = (e) => {
            if (e.target.closest(targets.join(',')) && windowWidth > 768) {
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
                    rotation: 270
                });
            }
        };
        document.addEventListener('mouseover', handleArrowHover);
        document.addEventListener('mouseout', handleArrowHover);
        return () => {
            document.removeEventListener('mouseover', handleArrowHover);
            document.removeEventListener('mouseout', handleArrowHover);
        };
    }, [location]);

    const ArrowSVG = () => {
        return (
            <div ref={arrowRef} className="arrowBlock">
                <svg
                    className={"arrow-element"}
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
        )
    };

    const Cursor = () => {
        return (
            <div className={'cursor__block'} ref={bubbleRef}>
                <div className={"block__for-exclusion"}>
                    <CustomCursor
                        ref={circleRef}
                        targets={targets}
                        customClass={'custom-circle-cursor'}
                        dimensions={30}
                        fill='#E0FD60'
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
        )
    };

    const CursorBlock = () => {
        return (
            <>
                <ArrowSVG/>
                <Cursor/>
            </>
        )
    };

    return CursorBlock()
}
