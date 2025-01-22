'use client';

import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "../../components/icon/Icon";
import deus from "../../public/img/deus-circle.png";
import axios from "../../axios";
import "./mainPage.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import "./workingSlider.scss";
import Image from 'next/image';
import useResponsiveSlides from "./useResponsiveSlides";


const WorkingSlider = () => {
  const [working, setWorking] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [swipped, setSwipped] = useState([-1]);

  const slidesPerView = useResponsiveSlides();
//   const [slidesPerView, setSlidesPerView] = useState(1);

//   useEffect(() => {
//     // Проверяем, есть ли доступ к window
//     const isClient = typeof window !== "undefined";

//     if (!isClient) return; // Не выполняем код на сервере

//     const updateSlidesPerView = () => {
//       const width = window.innerWidth;
//       if (width > 1345) {
//         setSlidesPerView(3);
//       } else if (width >= 576) {
//         setSlidesPerView(2);
//       } else {
//         setSlidesPerView(1.2);
//       }
//     };

//     updateSlidesPerView(); // Set the initial value
//     window.addEventListener('resize', updateSlidesPerView);

//     return () => {
//       window.removeEventListener('resize', updateSlidesPerView);
//     };
//   }, []);

  useEffect(() => {
    axios
      .get("/api/working/")
      .then((response) => {
        setWorking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const prevSlide = () =>
    setCurrentSlide((currentSlide - 1 + working.length) % working.length);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % working.length);

  return (
    <section className="main-working">
        <div className="container">
            <div className="main-working__wrap">
                <div className="main-working__wrap-info">
                    <p className="heading-secondary">
                        В работе {working.length} активных<br /> проектов
                    </p>
                    <div className="slide-arrow">
                        <div
                        className={`prev ${currentSlide === 0 ? "disabled" : ""}`}
                        onClick={currentSlide > 0 ? prevSlide : null}
                        onMouseEnter={() => setIsPrevHovered(true)}
                        onMouseLeave={() => setIsPrevHovered(false)}
                        >
                        <Icon
                            icon={isPrevHovered ? "slider-black" : "slider"}
                            viewBox="0 0 40 40"
                        />
                        </div>
                        <div
                        className={`next ${
                            currentSlide >= working.length - 1 ? "disabled" : ""
                        }`}
                        onClick={currentSlide < working.length - 1 ? nextSlide : null}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        >
                        <Icon
                            icon={isHovered ? "slider-black" : "slider"}
                            viewBox="0 0 40 40"
                        />
                        </div>
                    </div>
                </div>
                <p className="heading-secondary mobile">
                    В работе {working.length} активных проектов
                </p>
                <Swiper
                    className="swiper_wrapper_mainp main-working__wrapperSlide"
                    spaceBetween={0}
                    slidesOffsetBefore={20}
                    slidesPerView={slidesPerView}
                    loop={false}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        576: { slidesPerView: 2 },
                        1345: { slidesPerView: 3 },
                        2000: { slidesPerView: 3 },
                      }}
                >
                    {working.map((item, index) => (
                        <SwiperSlide
                            className="padding-slider"
                            key={item.id}
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                transition: "transform 0.3s ease-out",
                            }}
                        >
                            <div
                            className={`main-working__wrapperSlide-item ${
                                swipped.includes(index) ? "swipped" : ""
                            }`}
                            key={index}
                            >
                            <div className="wrapp">
                                <div className="greenBall">
                                <div className="animateBall">
                                    <Icon icon="greenBall" viewBox="0 0 16 16" />
                                </div>
                                <p>{item.name}</p>
                                </div>
                                <p className="m-text">{item.descr}</p>
                            </div>
                            <div className="wrapp-circle">
                                <Image src={deus} alt="" className="circle" />
                                <img src={`/uploads/${item.file.filename}`} alt="" className="circle" />
                            </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    <div className="swiper_wrapper_mainp__blur-left"></div>
                    <div className="swiper_wrapper_mainp__blur-right"></div>

                </Swiper>
                <div className="slide-arrow mobile">
                    <div
                        className={`prev ${currentSlide === 0 ? "disabled" : ""}`}
                        onClick={currentSlide > 0 ? prevSlide : null}
                        onMouseEnter={() => setIsPrevHovered(true)}
                        onMouseLeave={() => setIsPrevHovered(false)}
                        >
                        <Icon
                            icon={isPrevHovered ? "slider-black" : "slider"}
                            viewBox="0 0 40 40"
                        />
                    </div>
                    <div
                        className={`next ${
                            currentSlide >= working.length - 1 ? "disabled" : ""
                        }`}
                        onClick={currentSlide < working.length - 1 ? nextSlide : null}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Icon
                            icon={isHovered ? "slider-black" : "slider"}
                            viewBox="0 0 40 40"
                        />
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
};

export default WorkingSlider;
