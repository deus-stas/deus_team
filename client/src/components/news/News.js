import { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
import { Link, useLocation } from 'react-router-dom';

import './news.scss';
import {connect} from "react-redux";

const News = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    let tagInit = params.get('newsTags') ? params.get('newsTags') : 'Все';

    const [news, setNews] = useState([]);const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;
    const [allTags, setAllTags] = useState(new Set());
    const [selectedTag, setSelectedTag] = useState(tagInit);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/news`)
            .then((response) => {
                const newsWithTags = response.data.map((news) => {
                    return axios.get(`/api/tags/${news.tags}`)
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
                        const tags = new Set(news.flatMap((news) => news.tags));
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

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const filteredNews = selectedTag === 'Все' ? news : news.filter((newsItem) => newsItem.tags === selectedTag);


    return (
        <>
            {!isLoading &&

        <main className="news">
            <section className="news-main">
                <div className="container">
                    <h1 className="heading-primary">Журнал</h1>
                    <div className="news__filters">
                        <div className={`news__filters-btn btn --grey ${selectedTag === 'Все' ? 'active' : ''}`} onClick={() => handleTagClick('Все')}>Все</div>
                        {[...allTags].map((tag) => (
                            <div key={tag} className={`news__filters-btn btn --grey ${tag === selectedTag ? 'active' : ''}`} onClick={() => handleTagClick(tag)}>
                                {`#${tag}`}
                            </div>
                        ))}
                    </div>
                    <div className="news__wrap">
                        {filteredNews.map((item) => {
                            return (
                                <Link to={`/news/${item.id}`} className="news__item" key={item.id}>
                                    <div className="news__img-wrap">
                                        <img src={`/uploads/${item.image.filename}`} alt="Дизайн" className="news__img" />
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
            </section>
        </main>
            }
        </>
    )

}

export default connect()(News)
