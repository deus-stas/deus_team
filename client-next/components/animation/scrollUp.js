import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import {useInView} from "react-intersection-observer";

const ScrollUp = ({children, fromY, delay, fromX}) => {

    const [inViewRef, inView] = useInView({
        triggerOnce: true, // Запускать анимацию только один раз
    });
    const [styles, api] = useSpring(() => ({
        opacity: 0,
        y: fromY,
        x: fromX? fromX : 0,
        config: { duration: 300 },
    }));
    const isAnimated = useRef(false);

    useEffect(() => {
        if (inView && !isAnimated.current) {
            isAnimated.current = true;
            setTimeout(() => {
            api.start({
                opacity: 1,
                y: 0,
                x: 0,
                onRest: () => {
                    isAnimated.current = false;
                },
            });
            }, delay);
        }
    }, [inView, api]);

    return (
        <>
            <animated.div
                ref={inViewRef}
                style={{
                    ...styles,
                    top: styles.y,
                    transition: "opacity 0.5s easy-in-out, transform 0.8s easy-in-out",
                }}>
                {children}
            </animated.div>
        </>
    );
};

export default ScrollUp;