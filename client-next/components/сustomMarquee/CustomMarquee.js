import React, { useEffect, useRef } from 'react';
import './customMarquee.scss';

const CustomMarquee = ({ children, direction = 'left', reverse = false, speed = 50 }) => {
  const marqueeRef = useRef();

  useEffect(() => {
    const marqueeElement = marqueeRef.current;

    if (marqueeElement) {
      const { scrollWidth, clientWidth } = marqueeElement;

      console.log('scrollWidth:', scrollWidth, 'clientWidth:', clientWidth);

      // Если содержимое меньше видимой области, анимация не нужна
      if (scrollWidth <= clientWidth) {
        console.warn('Контент слишком мал для анимации.');
        return;
      }

      const animationSpeed = scrollWidth / speed; // Время анимации в секундах

      marqueeElement.style.animation = `
        ${direction === 'left' ? 'marquee-left' : 'marquee-right'} 
        ${animationSpeed}s linear infinite`;

      if (reverse) {
        marqueeElement.style.animationDirection = 'reverse';
      }
    }
  }, [children, direction, reverse, speed]);

  return (
    <div className="custom-marquee">
      <div ref={marqueeRef} className="marquee-content">
        {children}
        {children} {/* Дублируем для бесшовной анимации */}
      </div>
    </div>
  );
};

export default CustomMarquee;
