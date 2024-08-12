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

const apiUrl = ''

const NewsDetail = () => {

    const [news, setNews] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

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

    const double = <Icon icon="arrowGo" viewBox="0 0 30 31"/>

    const fileUrl = detail.mainNewsImage ? `${apiUrl}/uploads/${detail.mainNewsImage.filename}` : null;
    const isVideo = detail.mainNewsImage ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(detail.mainNewsImage.filename) : false;
    const isImage = detail.mainNewsImage ? /\.(jpeg|jpg|gif|png)$/i.test(detail.mainNewsImage.filename) : false;
    const shouldAutoPlay = detail.detailControl;


    return (
        <>
            {!isLoading &&
                <main className="news-detail">
                    <div className="container">
                        <section className="news-detail__main borderBlock">
                            <div className="news-detail__main-content padding">
                                <div className="news-detail__main-tag m-text">
                                    {`${detail.newsTags}`}
                                </div>
                                <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: detail.name}}></h1>
                                {detail.body && detail.body !== 'undefined' && detail.body !== 'null' &&
                                    <p className="m-text" dangerouslySetInnerHTML={{__html: detail.aboutClient}}/>}
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
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body}}/>
                                    {detail.bannerSecond ? (
                                        <>
                                            <BannerComponent banner={detail.bannerSecond} detail={detail}/>
                                            <p>{detail.aboutImg}</p>
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

                            {detail.photoSlider && detail.photoSlider.length > 0 &&
                                <div className="news-detail__article-photos">
                                    {detail.photoSlider ? (
                                        <>
                                            {detail.photoSlider.filter(val => !!val).map((banner, index) => (
                                                <BannerComponent key={index} banner={banner} detail={detail}/>
                                            ))}
                                        </>
                                    ) : null}
                                </div>
                            }

                            {detail.body4 && detail.body4 !== 'undefined' && detail.body4 !== 'null' &&
                                <div className="news-detail__article-content">
                                    <h2 className="heading-secondary"
                                        dangerouslySetInnerHTML={{__html: detail.aboutClient3}}/>
                                    <div className="news-detail__article-about m-text"
                                         dangerouslySetInnerHTML={{__html: detail.body4}}/>
                                </div>
                            }

                        </section>

                        <section className="news-detail__more">
                            <div className="news-detail__more-content">
                                <h2 className="heading-secondary">Ещё статьи</h2>
                                <div className="news-detail__more-wrap">

                                    {news.map((item) => {
                                        if (item.id === detail.id) return null;
                                        const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                        const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                        const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;


                                        return (
                                            <DelayedLink to={`/news/${item.urlName}`} className="news__item"
                                                         key={item.id}>
                                                <div className="news__img-wrap">

                                                    {isVideo && <video autoPlay={shouldAutoPlay} muted playsInline
                                                                       src={fileUrl} alt={item.name}
                                                                       className="news__img-wrap"
                                                                       loop
                                                    />}
                                                    {isImage && <img src={fileUrl} alt={item.name}
                                                                     className="news__img-wrap"/>}

                                                </div>

                                                <div className="news__text">
                                                    <div className="tag">#{item.newsTags}</div>
                                                </div>
                                                <div className="news__descr">
                                                    <div className="name">{item.name}</div>
                                                </div>
                                                <div className="news__arrow">
                                                    <div className="hover-flip-circle">
                                                    <span>
                                                        <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                        <div className="hover-circle">
                                                            {double}
                                                        </div>
                                                    </span>
                                                    </div>
                                                </div>


                                            </DelayedLink>
                                        )
                                    }).slice(0, 3)}
                                </div>
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