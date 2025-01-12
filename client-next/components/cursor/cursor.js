import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import './cursor.scss';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const Cursor = () => {
    const arrowRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null);

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const [isDesktopCursor, setIsDesktopCursor] = useState(false);

    const location = usePathname();

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
        '.sub-cursor-target',
        '.video-target',
        '.main-projects__img',
        '.next__project_img',
    ];

    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
        }
    };

    const handleMoveMouse = (e) => {
        if (e.target.closest(targets.join(',')) && windowWidth <= 1800) {
            arrowRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
            arrowRef.current.style.opacity = '1';
        } else if (e.target.closest(targets.join(',')) && windowWidth > 1800) {
            arrowRef.current.style.transform = `translate(${e.clientX - 67}px, ${e.clientY - 12}px)`;
            arrowRef.current.style.opacity = '1';
        } else {
            arrowRef.current.style.opacity = '0';
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const mobileVersion = () => {
            setIsDesktopCursor(windowWidth > 768);
        };

        const cursorVisibility = () => {
            if (arrowRef.current && bubbleRef.current) {
                arrowRef.current.style.opacity = '0';
                bubbleRef.current.style.opacity = '0';
            }
        };

        mobileVersion();
        cursorVisibility();
    }, [windowWidth, targets]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMoveMouse);
        return () => {
            document.removeEventListener('mousemove', handleMoveMouse);
        };
    }, [windowWidth]);

    useEffect(() => {
        const handleCursorHover = (e) => {
            
            if (e.target.closest(targets.join(',')) && windowWidth > 768) {
                bubbleRef.current.style.opacity = '1';
                bubbleRef.current.style.mixBlendMode = 'difference';
                bubbleRef.current.style.width = '120px';
                bubbleRef.current.style.height = '120px';
                e.target.classList.add('cursor__none');
                document.querySelector('.arrow-element').style.transform = 'rotate(90deg)';
            } else {
                bubbleRef.current.style.opacity = '0.6';
                bubbleRef.current.style.mixBlendMode = 'normal';
                bubbleRef.current.style.width = '30px';
                bubbleRef.current.style.height = '30px';
                e.target.classList.remove('cursor__none');
                document.querySelector('.arrow-element').style.transform = 'rotate(0deg)';

            }
        };

        document.addEventListener('mouseover', handleCursorHover);
        document.addEventListener('mouseout', handleCursorHover);
        return () => {
            document.removeEventListener('mouseover', handleCursorHover);
            document.removeEventListener('mouseout', handleCursorHover);
        };
    }, [location, windowWidth]);

    useEffect(() => {
        const cursorHoverShowreel = (e) => {
            const showreel = document.getElementById('mainVideo');
            const circle = document.querySelector('.cursor__block');
     
            circle.classList.remove('cursor__block_hidden');
            if (e.target === showreel || e.target.classList.contains('playing')) {
                circle.classList.add('cursor__block_hidden');
            } else {
                circle.classList.remove('cursor__block_hidden');
            }
        };

        document.addEventListener('mouseover', cursorHoverShowreel);
        return () => {
            document.removeEventListener('mouseover', cursorHoverShowreel);
        };
    }, [targets]);

    const ArrowSVG = () => {
        return (
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
    };

    const Cursor = () => {
        return (
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
    };

    const CursorBlock = () => {
        return (
            <>
                <ArrowSVG />
                <Cursor />
            </>
        );
    };

    return CursorBlock();
};
