import React, { useState } from 'react';

const TruncatedSentence = ({ sentence }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const truncateSentence = (sentence) => {
        if (!sentence || typeof sentence !== 'string') {
            return ''; // Возвращаем пустую строку, если sentence недоступен
        }

        const words = sentence.split(' ');
        if (words.length <= 20) {
            return sentence; // Если менее 20 слов, возвращаем полное предложение
        } else {
            const truncatedWords = words.slice(0, 20);
            return truncatedWords.join(' '); // Трёхточие добавляется в компоненте ниже
        }
    };

    if (!sentence || typeof sentence !== 'string') {
        return <p>No sentence provided.</p>; // Обработка случая, если sentence недоступен
    }

    return (
        <div>
            {expanded ? (
                <p>{sentence}</p>
            ) : (
                <p>
                    {truncateSentence(sentence)}
                    {sentence.split(' ').length > 20 && (
                        <span onClick={toggleExpand} style={{ cursor: 'pointer', color: 'blue' }}>
                            ... Show more
                        </span>
                    )}
                </p>
            )}
        </div>
    );
};

export default TruncatedSentence;