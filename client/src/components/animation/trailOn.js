import React, { useEffect, useRef } from 'react';
import { useTrail, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const TrailOn = ({ children, fromY, fromX, delay }) => {
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

    const trail = useTrail(1, {
        from: {
            opacity: 0,
            y: fromY? fromY : 0,
            x: fromX? fromX : 0
        },
        to: {
            opacity: inView ? 1 : 0,
            y: inView ? 0 : fromY,
            x: inView ? 0 : fromX,
        },
        config: {
            duration: 500,
        },
    });

    const isAnimated = useRef(false);

    useEffect(() => {
        const startAnimation = () => {
            if (inView && !isAnimated.current) {
                isAnimated.current = true;
                setTimeout(() => {
                    isAnimated.current = false;
                }, delay);
            }
        };
        startAnimation();
    }, [inView, delay]);

    return (
        <>
            {trail.map((styles, index) => (
                <animated.div
                    key={index}
                    ref={inViewRef}
                    style={{
                        ...styles,
                        top: styles.y,
                    }}
                >
                    {children}
                </animated.div>
            ))}
        </>
    );
}

export default TrailOn;