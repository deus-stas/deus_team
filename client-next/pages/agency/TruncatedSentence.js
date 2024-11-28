import React, { useState } from 'react';

const TruncatedSentence = ({ sentence }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const truncateSentence = (sentence) => {
        const words = sentence.split(' ');
        if (words.length <= 20) {
            return sentence;
        } else {
            const truncatedWords = words.slice(0, 20);
            const truncatedSentence = truncatedWords.join(' ');
            return truncatedSentence;
        }
    };

    return (
        <div>
            {expanded ? (
                <p>{sentence}</p>
            ) : (
                <p>
                    {truncateSentence(sentence)}
                    {sentence.split(' ').length > 20 && <span onClick={toggleExpand}>...</span>}
                </p>
            )}
        </div>
    );
};

export default TruncatedSentence;