import React, { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import Breadcrumbs from "../../breadcrubms/Breadcrumbs";
import SectionSocial from '../../sectionSocial/SectionSocial';
import ProjectNext from '../../pages/projects/projectNext/ProjectNext';

import './newsDetail.scss'

const apiUrl = ''

const NewsDetail = () => {

    const [news, setNews] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiUrl}/api/news/${id}`)
            .then((response) => {

                const dataDetail = response.data;
                axios.get(`${apiUrl}/api/newsTags/${response.data.newsTags}`)
                    .then((response) => {
                        dataDetail.newsTags = response.data.name;
                        setDetail(dataDetail);
                        console.log(dataDetail);
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
        axios.get(`${apiUrl}/api/news`)
            .then((response) => {
                const newsWithTags = response.data.map((news) => {
                    return axios.get(`${apiUrl}/api/tags/${news.newsTags}`)
                        .then((tagResponse) => {
                            news.newsTags = tagResponse.data.name;
                            return news;
                        })
                        .catch((error) => {
                            console.log(error);
                            return news;
                        });
                });

                Promise.all(newsWithTags)
                    .then((news) => {
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
    },[]);

    const fileUrl = detail.image ? `${apiUrl}/uploads/${detail.image.filename}` : null;
    const isVideo = detail.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(detail.image.filename) : false;
    const isImage = detail.image ? /\.(jpeg|jpg|gif|png)$/i.test(detail.image.filename) : false;


    return (
        <>
            {!isLoading &&

        <main className="news-detail">
            <section className="news-detail__main">
                <Breadcrumbs />
                <div className="container">
                    <div className="news-detail__main-content">
                        <div className="news-detail__main-tag" dangerouslySetInnerHTML={{ __html: detail.newsTags }}></div>
                        <h1 className="heading-primary" dangerouslySetInnerHTML={{ __html: detail.name }}></h1>
                    </div>
                    {/*<img className="news-detail__main-img" src={detail.image ? `${apiUrl}/uploads/${detail.image.filename}` : null} alt={detail.name} />*/}

                    {isVideo && <video autoPlay muted playsInline
                                       src={fileUrl} alt={detail.name}
                                       className="news-detail__main-img"
                                       autoPlay loop muted
                                       playsInline/>}
                    {isImage && <img src={fileUrl} alt={detail.name}
                                     className="news-detail__main-img"/>}
                </div>
            </section>

            <section className="news-detail__article">
                <div className="container">
                    <div className="news-detail__article-content">
                        <div dangerouslySetInnerHTML={{ __html: detail.body }}></div>
                    </div>
                </div>
            </section>

            <section className="news-detail__more">
                <div className="container">
                    <div className="news-detail__more-content">
                        <h2 className="heading-secondary">Ещё статьи</h2>
                        <div className="news-detail__more-wrap">

                            {news.map((item) => {
                                if (item.id === detail.id) return null;
                                const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;


                                return (
                                    <Link to={`/news/${item.id}`} className="news__item" key={item.id}>
                                        <div className="news__img-wrap">
                                            {isVideo && <video autoPlay muted playsInline
                                                               src={fileUrl} alt={item.name}
                                                               className="news__img"
                                                               autoPlay loop muted
                                                               playsInline/>}
                                            {isImage && <img src={fileUrl} alt={item.name}
                                                             className="news__img"/>}
                                        </div>
                                        <div className="news__text">
                                            <div className="news__tag">{item.newsTags}</div>
                                            <div className="news__name">{item.name}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNext last={true} />

            <SectionSocial />

        </main>
            }
        </>
    )
}

export default NewsDetail;