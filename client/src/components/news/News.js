import NewsItem from './newsItem/NewsItem';

import './news.scss';

const News = () => {

    return (
        <main className="news">
            <section className="news-main">
                <div className="container">
                    <h1 className="heading-primary">Блог</h1>
                    <div className="news__filters">
                        <div className="news__filters-btn btn --grey active">Все</div>
                        <div className="news__filters-btn btn --grey">#Разработка</div>
                        <div className="news__filters-btn btn --grey">#Реклама</div>
                        <div className="news__filters-btn btn --grey">#Аналитика</div>
                        <div className="news__filters-btn btn --grey">#Дизайн</div>
                    </div>
                    <div className="news__wrap">
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                        <NewsItem />
                    </div>
                </div>
            </section>
        </main>
    )

}

export default News;