import React, {useEffect, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
import {Link, useLocation} from 'react-router-dom';
import Image from 'next/image';

import './news.scss';
import {connect} from "react-redux";
import DelayedLink from "../appHeader/DelayedLink";
import {Icon} from "../icon/Icon";
import {Cursor} from "../cursor/cursor";

const News = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    let tagInit = params.get('newsTags') ? params.get('newsTags') : 'Все';

    const [news, setNews] = useState([]);
    const apiUrl = ''

    const [allTags, setAllTags] = useState(new Set());
    const [selectedTag, setSelectedTag] = useState(tagInit);
    const [isLoading, setIsLoading] = useState(true);
    const [allNewsCount, setAllNewsCount] = useState(0);



    useEffect(() => {
        axios.get(`/api/newsTags`)
            .then((tagResponse) => {
                const tags = tagResponse.data.reduce((obj, tag) => {
                    obj[tag._id] = tag.name;
                    return obj;
                }, {});
                console.log('tags', tags)

                // Получить все новости
                axios.get(`/api/news`)
                    .then((response) => {
                        const news = response.data.map((newsItem) => {
                            newsItem.newsTags = tags[newsItem.newsTags];
                            return newsItem;
                        });
                        console.log('news', news)
                        setNews(news);
                        setAllNewsCount(news.length);
                        setAllTags(new Set(news.flatMap((news) => news.newsTags)));
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

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const filteredNews = selectedTag === 'Все' ? news : news.filter((newsItem) => newsItem.newsTags === selectedTag);

    return (
        <>
            <Cursor/>
            {!isLoading &&

                <main className="news">
                    <div className="container">
                        <section className="news-start">
                         <span className="news-start__text">
                            <p className="breadcrumb">Блог</p>
                            <h1 className="heading-primary">Делимся полезной<br/> информацией</h1>
                         </span>

                        </section>
                        <section className="news-main">
                            <div className="news-main__wrap">
                                {filteredNews.map((item, index) => {
                                    const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                    const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                    const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;
                                    const shouldAutoPlay = item.mainControl;

                                    return (
                                        <div className="flex-wrap">
                                            <DelayedLink to={`/news/${item.urlName}`}  className={`news-main__item news-main__${index + 1}`}
                                                         key={item.id}>
                                                {isVideo && <video autoPlay={shouldAutoPlay}
                                                                   muted
                                                                   playsInline
                                                                   src={fileUrl}
                                                                   loop/>}
                                                {isImage && <img src={fileUrl} alt={item.name}/>}
                                            </DelayedLink>
                                            <span>
                                                <p className="news-main__text s-text">{item.newsTags}</p>
                                                <p className="news-main__descr m-text">{item.name}</p>
                                            </span>

                                        </div>

                                    )
                                })}
                                <div className="flex-wrap filter">
                                    <div className="news-main__filters borderBlock padding">
                                        <div
                                            className={`news-main__filters-btn m-text  ${selectedTag === 'Все' ? 'active' : ''}`}
                                            onClick={() => handleTagClick('Все')}
                                        >
                                            <span className="news-main__filters-btn__flexWrap">
                                                <p className="name">Все</p>
                                                <p className="num xs-text">{formatNumber(allNewsCount)}</p>
                                            </span>
                                        </div>
                                        {[...allTags].map((tag, index) => {
                                            const tagNews = news.filter((newsItem) => newsItem.newsTags === tag); // используем исходный массив новостей
                                            return (
                                                <div key={tag}
                                                     className={`news-main__filters-btn m-text ${tag === selectedTag ? 'active' : ''}`}
                                                     onClick={() => handleTagClick(tag)}
                                                >
                                            <span className="news-main__filters-btn__flexWrap">
                                                <p className="name">{tag}</p>
                                                <p className="num xs-text">{formatNumber(tagNews.length)}</p>
                                            </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </main>
            }
        </>
    )

}

export default connect()(News)
