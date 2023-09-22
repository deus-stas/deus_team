import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import Breadcrumbs from "../../breadcrubms/Breadcrumbs";
import SectionSocial from '../../sectionSocial/SectionSocial';
import ProjectNext from '../../pages/projects/projectNext/ProjectNext';

import './newsDetail.scss'

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const NewsDetail = () => {

    const [news, setNews] = useState([]);
    const [detail, setDetail] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiUrl}/api/news/${id}`)
            .then((response) => {

                const dataDetail = response.data;
                axios.get(`${apiUrl}/api/tags/${response.data.tags}`)
                    .then((response) => {
                        dataDetail.tags = response.data.name;
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
                    return axios.get(`${apiUrl}/api/tags/${news.tags}`)
                        .then((tagResponse) => {
                            news.tags = tagResponse.data.name;
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



    return (
        <main className="news-detail">
            <section className="news-detail__main">
                <Breadcrumbs />
                <div className="container">
                    <div className="news-detail__main-content">
                        <div className="news-detail__main-tag" dangerouslySetInnerHTML={{ __html: detail.tags }}></div>
                        <h1 className="heading-primary" dangerouslySetInnerHTML={{ __html: detail.name }}></h1>
                    </div>
                    <img className="news-detail__main-img" src={detail.image ? `${apiUrl}/uploads/${detail.image.filename}` : null} alt={detail.name} />
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
                                return (
                                    <Link to={`/news/${item.id}`} className="news__item" key={item.id}>
                                        <div className="news__img-wrap">
                                            <img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн" className="news__img" />
                                        </div>
                                        <div className="news__text">
                                            <div className="news__tag">{item.tags}</div>
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
    )
}

export default NewsDetail;