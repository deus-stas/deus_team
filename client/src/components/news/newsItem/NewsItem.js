import { Link } from 'react-router-dom';

import './newsItem.scss';

import newsImg from '../../../img/news-img.png';

const NewsItem = () => {

    return (
        <Link to="/news/detail" className="news__item">
            <div className="news__img-wrap">
                <img src={newsImg} alt="Дизайн" className="news__img" />
            </div>
            <div className="news__text">
                <div className="news__tag">#Дизайн</div>
                <div className="news__name">Как создавать интерфейсы, которые нравятся пользователям</div>
            </div>
        </Link>
    )

}

export default NewsItem;