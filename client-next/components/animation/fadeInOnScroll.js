import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeInOnScroll = ({ children }) => {
    const sectionRef = useRef(null);

    // useEffect(() => {
    //     const section = sectionRef.current;
    //     const anim = gsap.fromTo(section, {autoAlpha: 0, y: 100}, {duration: 1, autoAlpha: 1, y: 0});
    //     ScrollTrigger.create({
    //         trigger: section,
    //         animation: anim,
    //         toggleActions: 'play none none none',
    //         once: true,
    //     });
    // });

    return <section ref={sectionRef}>{children}</section>;
};

export default FadeInOnScroll;