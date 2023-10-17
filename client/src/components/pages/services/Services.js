import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import axios from '../../../axios'

import ProjectNext from '../projects/projectNext/ProjectNext';
import Cta from '../../cta/Cta';
import Social from '../../sectionSocial/SectionSocial';
import { Icon } from '../../icon/Icon'

import './services.scss'

import person from '../../../img/discuss-btn.png';
import RetryImage from "../../../helpers/RetryImage";

const apiUrl = process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_LOCALHOST_URI;

const Services = () => {
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openImage, setOpenImage] = useState(null);
    const [headerData, setHeaderData] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/headerData/`)
            .then((response) => {
                setHeaderData(response.data[0]);
                console.log('header data', response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                const reviews = response.data;
                const projectIds = reviews.map((review) => review.reviewProject);
                const serviceIds = reviews.map((review) => review.reviewService);

                Promise.all([
                    axios.get(`${apiUrl}/api/projects/?ids=${projectIds.join(',')}`),
                    axios.get(`${apiUrl}/api/services/?ids=${serviceIds.join(',')}`)
                ])
                    .then((results) => {
                        const projects = results[0].data;
                        const services = results[1].data;

                        const updatedReviews = reviews.map((review) => {
                            const project = projects.find((p) => p.id === review.reviewProject);
                            const service = services.find((s) => s.id === review.reviewService);

                            return {
                                ...review,
                                reviewProject: project,
                                reviewService: service
                            };
                        });

                        setReviews(updatedReviews);
                        console.log(updatedReviews);
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
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)

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

    useEffect(() => {
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)

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


    const handleImageClick = (filename) => {
        setOpenImage(filename);
    };

    const handleCloseImage = () => {
        setOpenImage(null);
    };

    return (
        <>
            {!isLoading &&
                <main className="services">

            <section className="services-s">
                <div className="container">
                    <h1 className="heading-primary">Услуги</h1>
                    <div className="services-s__wrap">
                        <div className="services-s__content">
                            <div className="services-s__subtitle">Отвечаем за качество своих услуг. Гордимся каждым проектом.</div>
                            <div className="services-s__dir">
                                {
                                    headerData && headerData.headerPhoto ?
                                    (
                                        <RetryImage src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`} alt="Брижань Вячеслав" className="services-s__dir-img" />
                                    ) :
                                    (
                                        <img src={person} alt="Брижань Вячеслав" className="services-s__dir-img" />
                                    )
                                }
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
                                        service.isInvisible ?
                                            <Link to={`/services/${service.path}`} className="services-s__item" key={service.id}>
                                                <div className="services-s__name">{service.name}</div>
                                                <div className="services-s__descr">{service.descrTotal}</div>
                                                <div className="services-s__icon">
                                                    <Icon icon="corner-arr" />
                                                </div>
                                            </Link> : null
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
                            const fileName = !!review.reviewFile ? review.reviewFile.mimetype : "";
                            const extension = fileName.split('/').pop().toLowerCase();

                            return (
                                <div to="/" className="services-reviews__item" onClick={() => handleImageClick(review.reviewFile.filename)} key={review.id}>
                                    <div className="services-reviews__name">{review.name}</div>
                                    <div className="services-reviews__s">{review.service}</div>
                                    <div className="services-reviews__type">{review.type}</div>
                                    {
                                        review.reviewFile ?  (
                                            <>
                                                <div className="services-reviews__file"> {extension} </div>
                                                <iframe src={`${apiUrl}/uploads/${review.reviewFile.filename}#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0`}
                                                        scrolling="no"
                                                        alt={review.name}
                                                        className="iframe-height services-reviews__r "
                                                />
                                            </>
                                        ) : null
                                    }

                                </div>
                            )
                        }) : null}

                        {openImage && (
                            <div className="modal">
                                <div className="modal-content">
                                    <iframe src={`${apiUrl}/uploads/${openImage}#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0`}
                                            alt="Отзыв"
                                            scrolling="no"
                                            className="iframe-modal-size"/>
                                    <button onClick={handleCloseImage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Cta formName={'services'} />

            <Social />

                </main>
            }
        </>
    )
}

export default Services;