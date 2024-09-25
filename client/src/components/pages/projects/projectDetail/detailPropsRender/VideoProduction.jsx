import React, {useEffect, useState} from 'react';
import {BannerComponent, useMobile} from "../ProjectDetail";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

const VideoProduction = ({detail}) => {
    const apiUrl = '';
    const [slidesPerView, setSlidesPerView] = useState(1.5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) { // adjust the breakpoint as needed
                setSlidesPerView(1.1);
            } else {
                setSlidesPerView(1.5);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // initial call
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="project-videoProduction">
            {!!detail.bannerSeconds && detail.bannerSeconds.length > 0 && (
                <section
                    style={{ backgroundColor: "black" }}
                    className="borderBlock"
                >
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={slidesPerView}
                        centeredSlides={true}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {detail.bannerSeconds.filter(val => !!val).map((banner, index) => (
                            <SwiperSlide key={index}>
                                <video autoPlay={true} loop={true} muted
                                    className="slider-img"
                                    src={`${apiUrl}/uploads/${banner.filename}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {detail.bannerSecond ?
                <BannerComponent  banner={detail.bannerSecond} detail={detail}/>
                : null}
            {detail.bannerThird ?
                <BannerComponent banner={detail.bannerThird} detail={detail}/>
                : null}
        </div>
    );
};

export default VideoProduction;