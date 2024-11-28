import { useState, useEffect } from "react";

const useResponsiveSlides = () => {
  const [slidesPerView, setSlidesPerView] = useState(1); // Начальное значение по умолчанию

  useEffect(() => {
    // Проверяем, есть ли доступ к window
    const isClient = typeof window !== "undefined";

    if (!isClient) return; // Не выполняем код на сервере

    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width > 1345) {
        setSlidesPerView(3);
      } else if (width >= 576) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1.2);
      }
    };

    updateSlidesPerView(); // Устанавливаем значение при первом рендере
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return slidesPerView;
};

export default useResponsiveSlides;
