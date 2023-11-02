import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import {useInView} from "react-intersection-observer";

const RoundButton = ({children, fromX, rotateZ, delay}) => {
    const [inViewRef, inView] = useInView();


    const [styles, api] = useSpring(() => ({
        opacity: 0,
        x: fromX,
        rotateZ: 0,
        config: { duration: 1000 },
    }));
    const isAnimated = useRef(false);

    useEffect(() => {
        if (inView && !isAnimated.current ) {
            isAnimated.current = true;
            setTimeout(() => {
                api.start({
                    to: [
                        { x: 0, rotateZ: rotateZ, opacity: 1 },
                    ],
                    config: { duration: 1000 },
                    onRest: () => {
                        isAnimated.current = false;
                    },
                });
            }, delay);
        }
    }, [inView, api]);
    console.log("inV",inView)
    return (
        <>
        <animated.div
            ref={inViewRef}
            style={{
                ...styles,
            }}>
            {children}
        </animated.div>
        </>
    );
};

export default RoundButton;
