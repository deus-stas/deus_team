import { useState, useEffect, useCallback, useRef } from 'react';

const TypeWriterText = ({ text }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const elementRef = useRef(null);
    const intervalRef = useRef(null);

    const typeText = useCallback(() => {
        if(currentIndex < text.length) {
            setCurrentText(prevText => prevText + text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [currentIndex, text.length]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    intervalRef.current = setInterval(typeText, 15);
                }
            });
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [typeText]);

    return <div ref={elementRef}>{currentText}</div>;
};

export default TypeWriterText;