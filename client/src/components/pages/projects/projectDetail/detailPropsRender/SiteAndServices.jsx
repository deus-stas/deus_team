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

            {!!detail.bannerSeconds && detail.bannerSeconds.length > 0 && (
                <section
                    style={{backgroundColor: "black", overflow: "hidden"}}
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

            <section className="project-steps-header padding borderBlock heading-secondary">Этапы работ</section>

            {detail.workIntroText && detail.workIntroText !== 'undefined' && detail.workIntroText !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                        <div>
                            {detail.workIntroText &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.workIntroText}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section> : null}

            {detail.bannerFourths ?
                <div className={
                    detail.bannerFourths.length > 2 && !!detail.control2 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerFourths.filter(val => !!val).map((banner, index) =>
                        <span className="project-banner borderBlock">
                            <BannerComponent banner={banner} detail={detail}/>
                        </span>
                    )}
                </div>
                : null
            }

            {detail.taskDo && detail.taskDo !== 'undefined' && detail.taskDo !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task}}/>
                        <div>
                            {detail.taskDo &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerFifths ? (
                <div className={
                    detail.bannerFifths.length > 2 && !!detail.control3 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerFifths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock">
                                 <BannerComponent banner={banner} detail={detail} key={index}/>
                            </span>

                    ))}
                </div>

            ) : null}

            {detail.approach && detail.approach !== 'undefined' && detail.approach !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.stageName}}/>
                        <div>
                            {detail.approach &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.approach}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section> : null}

            {detail.bannerSixths ?
                <div className={
                    detail.bannerSixths.length > 2 && !!detail.control4 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerSixths.filter(val => !!val).map((banner, index) =>
                        <span className="project-banner borderBlock">
                            <BannerComponent banner={banner} detail={detail}/>
                        </span>
                    )}
                </div>
                : null
            }

            {detail.taskDo2 && detail.taskDo2 !== 'undefined' && detail.taskDo2 !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task2}}/>
                        <div>
                            {detail.taskDo2 &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo2}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerSevenths ? (
                <div className={
                    detail.bannerSevenths.length > 2 && !!detail.control3 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerSevenths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock">
                                 <BannerComponent banner={banner} detail={detail} key={index}/>
                            </span>

                    ))}
                </div>

            ) : null}

            {detail.taskDo3 && detail.taskDo3 !== 'undefined' && detail.taskDo3 !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task3}}/>
                        <div>
                            {detail.taskDo3 &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo3}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerEighths ? (
                <div className={
                    detail.bannerEighths.length > 2 && !!detail.control3 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerEighths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock">
                                 <BannerComponent banner={banner} detail={detail} key={index}/>
                            </span>

                    ))}
                </div>

            ) : null}



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