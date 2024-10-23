import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import './cursor.scss'
import { gsap } from 'gsap';
import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

export const Cursor = () => {

    const arrowRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null)

    const location = useLocation();

    const targets = [
        // '.projects__item__1',
        // '.projects__item__2',
        // '.projects__item__3',
        // '.projects__item__4',
        // '.projects__item__5',
        // '.projects__item__6',
        // '.projects__item__7',
        // '.projects__item__8',
        // '.projects__item__9',
        // '.projects__item__10',
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
        '.main-agency__item',
        '.projects__item',
        '.agency-about__wrapp-btn'
    ]

    const handleMoveMouse = (e) => {
        gsap.to(arrowRef.current, {
            x: e.clientX - 12,
            y: e.clientY - 12,
        });
    };

    // useEffect for moving
    useEffect(() => {
        // Add Listener
        document.addEventListener('mousemove', handleMoveMouse);
        document.addEventListener('scroll', handleMoveMouse);
    }, []);

    // useEffect for customCursor
    useEffect(() => {
        const handleCursorHover = (e) => {
            if (e.target.closest(targets.join(','))) {
                gsap.to(bubbleRef.current, {
                    opacity: 1,
                    mixBlendMode: 'difference',
                    duration: 0.5,
                    cursor: "none",
                    width: 120,
                    height: 120
                });
                e.target.classList.add('cursor__none')
            } else {
                gsap.to(bubbleRef.current, {
                    opacity: 0.6,
                    mixBlendMode: 'normal',
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

    // useEffect for arrow
    useEffect(() => {
        const handleArrowHover = (e) => {
            if (e.target.closest(targets.join(','))) {
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
    }

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
