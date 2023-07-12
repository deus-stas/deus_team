import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

import ProjectNext from '../projects/projectNext/ProjectNext';
import Cta from '../../cta/Cta';
import Social from '../../sectionSocial/SectionSocial';
import { Icon } from '../../icon/Icon'

import './services.scss'

import person from '../../../img/discuss-btn.png';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';

const Services = () => {
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [openImage, setOpenImage] = useState(null);

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

    useEffect(() => {
        axios.get(`${apiUrl}/api/reviews/`)
            .then((response) => {
                const reviewPromises = response.data.map((review) => {
                    const projectPromise = axios.get(`${apiUrl}/api/projects/${review.reviewProject}`)
                        .then((projectResponse) => {
                            review.reviewProject = projectResponse.data;
                            return review;
                        })
                        .catch((error) => {
                            console.log(error);
                            return review;
                        });

                    const servicePromise = axios.get(`${apiUrl}/api/services/${review.reviewService}`)
                        .then((serviceResponse) => {
                            review.reviewService = serviceResponse.data;
                            return review;
                        })
                        .catch((error) => {
                            console.log(error);
                            return review;
                        });

                    return Promise.all([projectPromise, servicePromise])
                        .then((results) => {
                            const updatedReview = results[0];
                            return updatedReview;
                        });
                });

                Promise.all(reviewPromises)
                    .then((reviewsAll) => {
                        setReviews(reviewsAll);
                        console.log(reviewsAll);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleImageClick = (filename) => {
        setOpenImage(filename);
    };

    const handleCloseImage = () => {
        setOpenImage(null);
    };

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
                        {reviews ? reviews.map(review => {
                            return (
                                <div to="/" className="services-reviews__item" onClick={() => handleImageClick(review.reviewFile.filename)} key={review.id}>
                                    <div className="services-reviews__name">{review.name}</div>
                                    <div className="services-reviews__s">{review.service}</div>
                                    <div className="services-reviews__type">{review.type}</div>
                                    {
                                        review.reviewFile ?  (
                                            <>
                                                <div className="services-reviews__file">{review.reviewFile.mimetype}</div>
                                                <img src={`${apiUrl}/uploads/${review.reviewFile.filename}`} alt={review.name} className="services-reviews__r" />
                                            </>
                                        ) : null
                                    }
                                    
                                </div>
                            )
                        }) : null}

                        {openImage && (
                            <div className="modal">
                                <div className="modal-content">
                                    <img src={`${apiUrl}/uploads/${openImage}`} alt="Отзыв" />
                                    <button onClick={handleCloseImage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Cta formName={'project'} />

            <Social />

        </main>
    )
}

export default Services;