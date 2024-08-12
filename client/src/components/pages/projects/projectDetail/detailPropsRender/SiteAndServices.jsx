import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from "../../../../icon/Icon";
import {Navigation} from "swiper";
import React, {useEffect, useState} from "react";
import {BannerComponent, ProjectResults, useMobile} from "../ProjectDetail";

import {debounce} from "@material-ui/core";

const SiteAndServices = ({detail}) => {
    const apiUrl = '';
    const [slidesPerView, setSlidesPerView] = useState(1.5);

    const isMobile = useMobile();

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
        <>
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
                                <img
                                    className="borderBlock"
                                    src={`${apiUrl}/uploads/${banner.filename}`}
                                    alt={banner.name}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {detail.taskDescr && detail.taskDescr !== 'undefined' && detail.taskDescr !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary">Цели и задачи</h2>
                        <div>
                            {detail.taskDescr &&
                                <div className="project-target__content l-textReg">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                                </div>
                            }
                            <div className="project-target__item m-text">
                                <div dangerouslySetInnerHTML={{__html: detail.tasksItem}}/>
                            </div>
                        </div>

                    </div>
                </section> : null}

            {detail.bannerSecond ?
                <BannerComponent banner={detail.bannerSecond} detail={detail}/>
                : null}

            {detail.heading && detail.heading !== 'undefined' && detail.heading !== '' ?

                <section style={{backgroundColor: "white"}} className="project-steps padding borderBlock">
                    <div className="project-steps__wrap">
                        <span>
                            <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                            <p className="project-steps__intro l-textReg">{detail.workStepsIntroText}</p>
                        </span>
                        <div>
                            {detail.workSteps.length > 0 && detail.workSteps.map((item, index) => (

                                <div key={index} className="project-steps__s">
                                    <div className="project-steps__subtitle l-textReg">{item.workStepsTitle}</div>
                                    <div className="project-steps__text m-text"
                                         dangerouslySetInnerHTML={{__html: item.workStepsItem}}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> : null}


            {detail.bannerThird ?
                <BannerComponent banner={detail.bannerThird} detail={detail}/>
                : null}

            {!!detail.result &&
                <ProjectResults
                    result={detail.result}
                    awardsURL={detail.awardsURL}
                    isMobile={isMobile}
                />
            }
        </>
    );
};
export default SiteAndServices