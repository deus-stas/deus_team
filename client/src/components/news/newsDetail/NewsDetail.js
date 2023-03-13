import Breadcrumbs from "../../breadcrubms/Breadcrumbs";
import { Icon } from '../../icon/Icon';
import SectionSocial from '../../sectionSocial/SectionSocial';
import NewsItem from '../newsItem/NewsItem';
import ProjectNext from '../../pages/projects/projectNext/ProjectNext';

import './newsDetail.scss'

import newsImg from '../../../img/news-img.png';

const NewsDetail = () => {
    return (
        <main className="news-detail">

            <section className="news-detail__main">
                <Breadcrumbs />
                <div className="container">
                    <div className="news-detail__main-content">
                        <div className="news-detail__main-tag">#Реклама</div>
                        <h1 className="heading-primary">Как работать с рекламой Google Ads из РФ в 2023 году</h1>
                    </div>
                </div>
                <img src={newsImg} alt="#Реклама" className="news-detail__main-img" />
            </section>

            <section className="news-detail__article">
                <div className="container">
                    <div className="news-detail__article-content">
                        <h2>Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи, увеличения охвата поисковых запросов. </h2>
                        <p>Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи, увеличения охвата поисковых запросов. Сложность работы заключалась в том, что мы не имели доступа к технической части сайта и все работы осуществлялись силами клиента после предварительного согласования.</p>
                        <p>Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи, увеличения охвата поисковых запросов. Сложность работы заключалась в том, что мы не имели доступа к технической части сайта и все работы осуществлялись силами клиента после предварительного согласования.</p>
                        <div className="news-detail__adv">
                            <div className="news-detail__adv-item">
                                <Icon icon="task" />
                                Максимально охватить поисковую выдачу в области кибербезопасности.
                            </div>
                            <div className="news-detail__adv-item">
                                <Icon icon="task" />
                                Увеличить узнаваемость продуктов и решений компании.
                            </div>
                            <div className="news-detail__adv-item">
                                <Icon icon="task" />
                                Увеличить узнаваемость бренда на российском рынке.
                            </div>
                        </div>
                        <img src={newsImg} alt="Как работать с рекламой Google Ads из РФ в 2023 году" />
                        <h3>Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи</h3>
                        <p>Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи, увеличения охвата поисковых запросов. Сложность работы заключалась в том, что мы не имели доступа к технической части сайта и все работы осуществлялись силами клиента после предварительного согласования.</p>
                        <h4>Lorem ipsum dolor sit amet.</h4>
                        <ul>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                        </ul>
                        <ol>
                            <li>Lorem ipsum dolor sit.</li>
                            <li>Lorem, ipsum dolor.</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section className="news-detail__more">
                <div className="container">
                    <div className="news-detail__more-content">
                        <h2 className="heading-secondary">Ещё статьи</h2>
                        <div className="news-detail__more-wrap">
                            <NewsItem />
                            <NewsItem />
                            <NewsItem />
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNext />

            <SectionSocial />

        </main>
    )
}

export default NewsDetail;