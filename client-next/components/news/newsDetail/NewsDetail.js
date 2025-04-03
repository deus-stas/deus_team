import React, {useEffect, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';

import Breadcrumbs from "../../breadcrubms/Breadcrumbs";
import SectionSocial from '../../sectionSocial/SectionSocial';
import ProjectNext from '../../pages/projects/projectNext/ProjectNext';

import './newsDetail.scss'
import DelayedLink from "../../appHeader/DelayedLink";
import {Icon} from "../../icon/Icon";
import {useMobile} from "../../pages/projects/projectDetail/ProjectDetail";
import {Swiper, SwiperSlide} from "swiper/react";
import {Cursor} from "../../cursor/cursor";
import Image from 'next/image';

const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`

const NewsDetail = () => {

    const isMobile = useMobile();

    const [news, setNews] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(1.5);
    const {id} = useParams();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);

    const newsSlides = news.filter((item) => item.id !== detail.id).slice(-6);

    const prevSlide = () => setCurrentSlide((currentSlide - 1 + newsSlides.length) % newsSlides.length);

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % newsSlides.length);

    const handleTouchStart = (event) => setTouchStart(event.touches[0].clientX);


    const handleTouchEnd = ({ changedTouches: [{ clientX }] }) =>
        (clientX - touchStart < 0) ? nextSlide() : prevSlide();

    useEffect(() => {
        axios.get(`${apiUrl}/api/news/url/${id}`)
            .then((response) => {

                const dataDetail = response.data;
                axios.get(`${apiUrl}/api/newsTags/${response.data.newsTags}`)
                    .then((response) => {
                        dataDetail.newsTags = response.data.name;
                        setDetail(dataDetail);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/newsTags`)
            .then((tagResponse) => {
                const tags = tagResponse.data.reduce((obj, tag) => {
                    obj[tag._id] = tag.name;
                    return obj;
                }, {});

                // Получить все новости
                axios.get(`${apiUrl}/api/news`)
                    .then((response) => {
                        const news = response.data.map((newsItem) => {
                            newsItem.newsTags = tags[newsItem.newsTags];
                            return newsItem;
                        });
                        setNews(news);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setIsLoadingMainPageEvent(true)

        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    }, []);

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


    const fileUrl = detail.mainNewsImage ? `${apiUrl}/uploads/${detail.mainNewsImage?.filename}` : null;
    const isVideo = detail.mainNewsImage ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(detail.mainNewsImage?.filename) : false;
    const isImage = detail.mainNewsImage ? /\.(jpeg|jpg|gif|png)$/i.test(detail.mainNewsImage?.filename) : false;
    const shouldAutoPlay = detail.detailControl;


    return (
        <>
            <Cursor/>
            {!isLoading &&
                <main className="news-detail">
                    <div className="container">
                        <section className="news-detail__main">
                            <div className="news-detail__main-content">
                                <div className="news-detail__main-tag m-text">
                                    {`${detail.newsTags}`}
                                </div>
                                <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: detail.name}}></h1>
                                {detail.body && detail.body !== 'undefined' && detail.body !== 'null' &&
                                    <p style={{color:"#757677"}} className="m-text" dangerouslySetInnerHTML={{__html: detail.description}}/>}
                                <a className="m-text telegram"
                                   href="https://t.me/deusagency"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    Читайте нас в Telegram <Icon icon="telegram" viewBox="0 0 24 24"/>
                                </a>

                            </div>
                            {isVideo && <video autoPlay={shouldAutoPlay} muted playsInline
                                               src={fileUrl}
                                               className="news-detail__main-img"
                                               loop/>}
                            {isImage && <img src={fileUrl} alt={detail.name}
                                             className="news-detail__main-img"/>}
                        </section>

                        <section className="news-detail__article">

                            {detail.body && detail.body !== 'undefined' && detail.body !== 'null' &&
                                <div className="news-detail__article-content">
                                    <h2 style={{marginBottom:"2rem"}} className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient}}/>
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.underAboutClient}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body}}/>
                                    {detail.bannerSecond ? (
                                        <>
                                            <BannerComponent banner={detail.bannerSecond} detail={detail}/>
                                            <p style={{textAlign:'center', margin:'1rem 0', color:'rgba(117, 118, 119, 1)'}}>{detail.aboutImg}</p>
                                        </>

                                    ) : null}
                                    <div className="news-detail__article-about  m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body2}}/>
                                </div>
                            }

                            {detail.body3 && detail.body3 !== 'undefined' && detail.body3 !== 'null' &&
                                <div className="news-detail__article-content">
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient2}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body3}}/>
                                </div>
                            }

                            {!!detail.photoSlider && detail.photoSlider.length > 0 && (
                                <section
                                    style={{ backgroundColor: "black" }}
                                    className="news-detail__slider borderBlock"
                                >
                                    <Swiper
                                        spaceBetween={50}
                                        slidesPerView={slidesPerView}
                                        centeredSlides={true}
                                        navigation={true}
                                    >
                                        {detail.photoSlider.filter(val => !!val).map((banner, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    className=""
                                                    src={`${apiUrl}/uploads/${banner.filename}`}
                                                    alt={banner.name}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </section>
                            )}

                            {detail.body4 && detail.body4 !== 'undefined' && detail.body4 !== 'null' &&
                                <div className="news-detail__article-content">
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient3}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body4}}/>
                                </div>
                            }

                            {detail.bannerThird ? (
                                <>
                                    <BannerComponent banner={detail.bannerThird} detail={detail}/>
                                    <p style={{textAlign:'center', margin:'1rem 0', color:'rgba(117, 118, 119, 1)'}}>{detail.aboutImg2}</p>
                                </>

                            ) : null}

                            {detail.body5 && detail.body5 !== 'undefined' && detail.body5 !== 'null' &&
                                <div className="news-detail__article-content">
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient4}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body5}}/>
                                </div>
                            }

                        </section>

                        <section className="news-detail__more">
                            <div className="news-detail__more-content">
                                <div className="news-detail__more-content__info">
                                    <h2 className="heading-secondary">Ещё статьи</h2>
                                    {!isMobile && (
                                        <span className="slide-arrow">
                                        <span className={`prev ${currentSlide === 0 ? 'disabled' : ''}`}
                                              onClick={currentSlide > 0 ? prevSlide : null}>
                                            <Icon icon="slider" viewBox="0 0 40 40"/>
                                        </span>
                                        <span
                                            className={`next ${currentSlide >= newsSlides.length - 1 ? 'disabled' : ''}`}
                                            onClick={currentSlide < newsSlides.length - 1 ? nextSlide : null}>
                                            <Icon icon="slider" viewBox="0 0 40 40"/>
                                        </span>

                                    </span>
                                    )}

                                </div>

                                <div className="news-detail__more-wrap">
                                    {news
                                        .filter((item) => item.id !== detail.id)
                                        .slice(-5)
                                        .map((item, index) => {
                                            const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                            const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                            const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;

                                                return (
                                                    <div className={`flex-wrap ${index === currentSlide ? 'active' : ''}`}
                                                        key={item.id}
                                                         style={{transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.3s ease-out'}}
                                                    >
                                                        <DelayedLink to={`/blog/${item.urlName}`}
                                                                     className="news__item  slider">
                                                                {isVideo && (
                                                                    <video
                                                                        autoPlay={shouldAutoPlay}
                                                                        muted
                                                                        playsInline
                                                                        src={fileUrl}
                                                                        loop
                                                                    />
                                                                )}
                                                                {isImage && (
                                                                    <img
                                                                        src={fileUrl}
                                                                        alt={item.name}
                                                                    />
                                                                )}
                                                        </DelayedLink>
                                                        <span>
                                                          <p className="news-main__text s-text">{item.newsTags}</p>
                                                          <p className="news-main__descr m-text">{item.name}</p>
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    <div
                                        className="slider-touch-area"
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                    />
                                </div>
                                {isMobile && (
                                    <span className="slide-arrow">
                                        <span className={`prev ${currentSlide === 0 ? 'disabled' : ''}`}
                                              onClick={currentSlide > 0 ? prevSlide : null}>
                                            <Icon icon="slider" viewBox="0 0 40 40"/>
                                        </span>
                                        <span
                                            className={`next ${currentSlide >= newsSlides.length - 1 ? 'disabled' : ''}`}
                                            onClick={currentSlide < newsSlides.length - 1 ? nextSlide : null}>
                                            <Icon icon="slider" viewBox="0 0 40 40"/>
                                        </span>

                                    </span>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            }
        </>
    )
}

export default NewsDetail;

const BannerComponent = ({banner, detail}) => {
    const isVideo = banner.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(banner.image.filename) : false;
    return (
        <>
            {!isVideo
                ?
                <img src={`${apiUrl}/uploads/${banner.filename}`} alt={detail.name} className="image"/>
                :
                <video className="image" autoPlay loop muted playsInline>
                    <source src={`${apiUrl}/uploads/${banner.filename}`}
                            type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                </video>
            }
        </>
    )
}
