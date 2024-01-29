import React, { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
import { Link, useLocation } from 'react-router-dom';

import './news.scss';
import {connect} from "react-redux";
import DelayedLink from "../appHeader/DelayedLink";
import agencyBanner from "../../img/agency-main.mp4";
import {Icon} from "../icon/Icon";

const News = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    let tagInit = params.get('newsTags') ? params.get('newsTags') : 'Все';

    const [news, setNews] = useState([]);
    const apiUrl = process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_LOCALHOST_URI;
    const [allTags, setAllTags] = useState(new Set());
    const [selectedTag, setSelectedTag] = useState(tagInit);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/news/`)
            .then((response) => {
                const newsWithTags = response.data.map((news) => {
                    return axios.get(`/api/newsTags/${news.newsTags}`)
                        .then((tagResponse) => {
                            news.newsTags = tagResponse.data.name;
                            return news;
                        })
                        .catch((error) => {
                            console.log(error);
                            return news;
                        });
                });
                console.log("tags:", newsWithTags)

                Promise.all(newsWithTags)
                    .then((news) => {
                        setNews(news);
                        const tags = new Set(news.flatMap((news) => news.newsTags));
                        setAllTags(tags);
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

    const double =  <Icon icon="arrowGo" viewBox="0 0 30 31"/>

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const filteredNews = selectedTag === 'Все' ? news : news.filter((newsItem) => newsItem.newsTags === selectedTag);


    return (
        <>
            {!isLoading &&

                <main className="news">
                    <section className="news-start whiteHeader">
                        <div className="news-start__video">
                            <video autoPlay playsInline muted loop>
                                <source src={agencyBanner} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                            </video>
                        </div>
                        <div className="container">
                            <h1 className="heading-primary">Делимся полезным контентом с вами</h1>
                        </div>

                        {/*{*/}
                        {/*    foundShowreel ? <Showreel data={foundShowreel} key={foundShowreel.id} isMain={true} /> : null*/}
                        {/*}*/}
                    </section>
                    <section className="news-main">
                        <div className="container">
                            <div className="news__filters">
                                <div className={`news__filters-btn  ${selectedTag === 'Все' ? 'active' : ''}`}
                                     onClick={() => handleTagClick('Все')}>
                                    <p className="type-name">Все</p>
                                </div>
                                {[...allTags].map((tag, index) => {
                                    const num = index < 9 ? '0' + (index + 1) : index + 1;

                                    return (
                                        <div key={tag}
                                             className={`news__filters-btn type-name ${tag === selectedTag ? 'active' : ''}`}
                                             onClick={() => handleTagClick(tag)}>
                                            <p className="type-name">{`#${tag}`}</p>
                                            <div className="num-btn">
                                                <span className="num">{num}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="news__wrap">
                                {filteredNews.map((item, index) => {
                                    const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                    const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                    const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;
                                    const shouldAutoPlay = item.mainControl;

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
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            }
        </>
    )

}

export default connect()(News)
