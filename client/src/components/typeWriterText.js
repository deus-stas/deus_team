import React, { useState, useEffect } from 'react';

const TypeWriterText = ({ text }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = text.charAt(currentIndex) === "\n" ? 100 : 30;

            const timer = setTimeout(() => {
                setCurrentText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [text, currentIndex]);

    return <div>{currentText}</div>;
};

export default TypeWriterText;