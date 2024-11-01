import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Icon } from "../../../../icon/Icon";
import React, {useEffect, useState} from "react";
import {BannerComponent, ProjectResults, useMobile} from "../ProjectDetail";

import {debounce} from "@material-ui/core";

const SiteAndServices = ({detail}) => {
    const apiUrl = '';
    const [slidesPerView, setSlidesPerView] = useState(1.99);
    const [swiperRef, setSwiperRef] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPrevHovered, setIsPrevHovered] = useState(false);

    const isMobile = useMobile();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) { // adjust the breakpoint as needed
                setSlidesPerView(1.1);
            } else {
                setSlidesPerView(1.99);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // initial call
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const prevHandler = () => {
        console.log(swiperRef);
        swiperRef.slidePrev();
    };

    const nextHandler = () => {
        swiperRef.slideNext();
    };

    return (
        <>
            {detail.tasksItem && detail.tasksItem !== 'undefined' && detail.tasksItem !== '' ?

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
                    style={{backgroundColor: "black", overflow: "hidden", position: "relative"}}
                    className="borderBlock"
                >
                    <Swiper
                        spaceBetween={80}
                        slidesPerView={slidesPerView}
                        centeredSlides={true}
                        loop={true}
                        onSwiper={(swiper) => setSwiperRef(swiper)}
                        style={{ padding: '20px 0' }}
                    >
                        {detail.bannerSeconds.filter(val => !!val).map((banner, index) => (
                            <SwiperSlide
                                key={banner.name}
                            >
                                <img
                                    className="slider-img"
                                    src={`${apiUrl}/uploads/${banner.filename}`}
                                    alt={banner.name}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="slide-arrow">
                        <div
                            className='prev'
                            onClick={prevHandler}
                            onMouseEnter={() => setIsPrevHovered(true)}
                            onMouseLeave={() => setIsPrevHovered(false)}
                        >
                            <Icon icon={"slider-white"} viewBox="0 0 40 40" />
                        </div>
                        <div
                            className='next'
                            onClick={nextHandler}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Icon icon={"slider-white"} viewBox="0 0 40 40" />
                        </div>
                    </div>
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
                    detail.bannerFourths.length > 2 && !!detail.control1 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerFourths.filter(val => !!val).map((banner, index) =>
                        <span className="project-banner borderBlock" key={banner.filename}>
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
                    detail.bannerFifths.length > 2 && !!detail.control2 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerFifths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail}/>
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
                    detail.bannerSixths.length > 2 && !!detail.control3 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerSixths.filter(val => !!val).map((banner, index) =>
                        <span className="project-banner borderBlock" key={banner.filename}>
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
                    detail.bannerSevenths.length > 2 && !!detail.control4 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerSevenths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail}/>
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
                    detail.bannerEighths.length > 2 && !!detail.control5 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerEighths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail} />
                            </span>

                    ))}
                </div>

            ) : null}

            {detail.taskDo4 && detail.taskDo4 !== 'undefined' && detail.taskDo4 !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task4}}/>
                        <div>
                            {detail.taskDo4 &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo4}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerNinths ? (
                <div className={
                    detail.bannerNinths.length > 2 && !!detail.control6 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerNinths.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail} />
                            </span>

                    ))}
                </div>

            ) : null}

            {detail.taskDo5 && detail.taskDo5 !== 'undefined' && detail.taskDo5 !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task5}}/>
                        <div>
                            {detail.taskDo5 &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo5}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerTenth ? (
                <div className={
                    detail.bannerTenth.length > 2 && !!detail.control7 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerTenth.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail}/>
                            </span>

                    ))}
                </div>

            ) : null}

            {detail.taskDo6 && detail.taskDo6 !== 'undefined' && detail.taskDo6 !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task6}}/>
                        <div>
                            {detail.taskDo6 &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo6}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerEleventh ? (
                <div className={
                    detail.bannerEleventh.length > 2 && !!detail.control8 ? "banner-grid" : "banner-list"
                }>
                    {detail.bannerEleventh.filter(val => !!val).map((banner, index) => (
                        <span className="project-banner borderBlock" key={banner.filename}>
                                 <BannerComponent banner={banner} detail={detail}/>
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
