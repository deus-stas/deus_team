import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = ({ children }) => {
    return (
        <Marquee speed={50}>
            {children}
        </Marquee>
    );
};

export default MarqueeComponent;