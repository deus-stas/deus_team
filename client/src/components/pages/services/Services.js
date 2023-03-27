import { Link } from 'react-router-dom';

import ProjectNext from '../projects/projectNext/ProjectNext';
import Cta from '../../cta/Cta';
import Social from '../../sectionSocial/SectionSocial';
import {Icon} from '../../icon/Icon'

import './services.scss'

import person from '../../../img/discuss-btn.png';
import review from '../../../img/review.png';

const Services = () => {
    return (
        <main className="services">

            <section className="services-s">
                <div className="container">
                    <h1 className="heading-primary">Услуги</h1>
                    <div className="services-s__wrap">
                        <div className="services-s__content">
                            <div className="services-s__subtitle">Отвечаем за качество своих услуг. Гордимся каждым проектом.</div>
                            <div className="services-s__dir">
                                <img src={person} alt="Брижань Вячеслав" className="services-s__dir-img" />
                                <div className="services-s__dir-name">
                                    Брижань Вячеслав <br />
                                    генеральный директор
                                </div>
                            </div>
                        </div>
                        <div className="services-s__list">
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">Фирменный стиль</div>
                                <div className="services-s__descr">Гайдбуки • Айдентика • Видео-ролики • Иллюстрации</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">Сайты и сервисы</div>
                                <div className="services-s__descr">Корпоративные • Лендинги • Интернет-магазины • Сервисы</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">SEO-продвижение</div>
                                <div className="services-s__descr">Вырастим органический трафик на сайт</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">Лидогенерация</div>
                                <div className="services-s__descr">Таргетированная реклама • Контекстная реклама</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">Контент-маркетинг</div>
                                <div className="services-s__descr">Создание разного вида контента</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                            <Link to="/services/detail" className="services-s__item">
                                <div className="services-s__name">Поддержка и развитие</div>
                                <div className="services-s__descr">От мелки до крупных задач</div>
                                <div className="services-s__icon">
                                    <Icon icon="corner-arr"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNext />

            <section className="services-reviews">
                <div className="container">
                    <h2 className="heading-secondary">Отзывы</h2>
                    <div className="services-reviews__wrap">
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                        <Link to="/" className="services-reviews__item">
                            <div className="services-reviews__name">Ростелеком</div>
                            <div className="services-reviews__s">Разработка сайта</div>
                            <div className="services-reviews__type">Корпоративный сайт</div>
                            <div className="services-reviews__file">pdf</div>
                            <img src={review} alt="Ростелеком" className="services-reviews__r" />
                        </Link>
                    </div>
                </div>
            </section>

            <Cta/>

            <Social/>

        </main>
    )
}

export default Services;