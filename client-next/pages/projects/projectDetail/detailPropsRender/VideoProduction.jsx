import React, {useEffect, useState} from 'react';
import {BannerComponent} from "../ProjectDetail";
import {Swiper, SwiperSlide} from "swiper/react";

const VideoProduction = ({detail}) => {
    const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;
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
            {!!detail?.bannerSeconds && detail?.bannerSeconds.length > 0 && (
                <section
                    style={{ backgroundColor: "black" }}
                    className="borderBlock"
                >
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={slidesPerView}
                        centeredSlides={true}
                        navigation
                    >
                        {detail?.bannerSeconds.filter(val => !!val).map((banner, index) => (
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

            {detail?.bannerSecond ?
                <BannerComponent  banner={detail?.bannerSecond} detail={detail}/>
                : null}
            {detail?.bannerThird ?
                <BannerComponent banner={detail?.bannerThird} detail={detail}/>
                : null}
        </div>
    );
};

export default VideoProduction;