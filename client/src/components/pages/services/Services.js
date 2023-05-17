import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

import ProjectNext from '../projects/projectNext/ProjectNext';
import Cta from '../../cta/Cta';
import Social from '../../sectionSocial/SectionSocial';
import { Icon } from '../../icon/Icon'

import './services.scss'

import person from '../../../img/discuss-btn.png';
import review from '../../../img/review.png';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/services/`)
            .then((response) => {
                setServices(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                            {
                                services ? services.map(service => {
                                    return (
                                        <Link to={`/services/${service.id}`} className="services-s__item" key={service.id}>
                                            <div className="services-s__name">{service.name}</div>
                                            <div className="services-s__descr">{service.descrTotal}</div>
                                            <div className="services-s__icon">
                                                <Icon icon="corner-arr" />
                                            </div>
                                        </Link>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNext last={true} />

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

            <Cta />

            <Social />

        </main>
    )
}

export default Services;