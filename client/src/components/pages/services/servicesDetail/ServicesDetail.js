import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios, {setIsLoadingMainPageEvent} from '../../../../axios'

import Breadcrumbs from '../../../breadcrubms/Breadcrumbs'
import Cta from '../../../cta/Cta';
import { Icon } from '../../../icon/Icon'
import { Link } from 'react-router-dom';

import './serviceDetail.scss'
import HelmetComponent from "../../../helmetComponent";
import RetryImage from "../../../../helpers/RetryImage";
import {Cursor} from "../../../Cursor/Cursor";

const onAcc = (e) => {
    let accItem = e.target.closest('.tab-parent');
    if (accItem.classList.contains('active')) {
        accItem.classList.remove('active');
    } else {
        accItem.classList.add('active');
    }
}

const apiUrl = '';

const ServicesDetail = () => {

    const { id } = useParams();
    const [service, setService] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/services/${id}`)
            .then((response) => {
                const benefitsPersonsPromises = response.data.benefits.map((item) => {
                    return axios.get(`${apiUrl}/api/persons/${item.benefitsPersons}`)
                        .then((benefitsResponse) => {
                            item.benefitsPersons = benefitsResponse.data.name;
                            item.benefitsPersonsImage = benefitsResponse.data.image;
                            item.benefitsPersonsPost = benefitsResponse.data.post;
                            return item;
                        })
                        .catch((error) => {
                            console.log(error);
                            return item;
                        });
                });

                const subServicesPromises = response.data.servicesServices.map((subServiceId) => {
                    return axios.get(`${apiUrl}/api/subServices/${subServiceId}`)
                        .then((subServiceResponse) => {
                            return subServiceResponse.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                });

                const subProjectsPromises = response.data.subProjects.map((subProjectId) => {
                    return axios.get(`${apiUrl}/api/projects/${subProjectId}`)
                        .then((subProjectResponse) => {
                            return subProjectResponse.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                });

                Promise.all([...benefitsPersonsPromises, ...subServicesPromises, ...subProjectsPromises])
                    .then((results) => {
                        const persons = results.slice(0, response.data.benefits.length);
                        const subServices = results.slice(response.data.benefits.length, response.data.servicesServices.length + response.data.benefits.length);
                        const subProjects = results.slice(response.data.benefits.length + response.data.servicesServices.length);
                        const updatedData = {
                            ...response.data,
                            benefits: persons,
                            servicesServices: subServices,
                            subProjects: subProjects
                        };
                        setService(updatedData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            axios.get(`${apiUrl}/api/reviews/`)
                .then((response) => {
                    const reviewPromises = response.data.map((review) => {
                        let reviewProjectUrl = review.reviewProject
                        let arrReviews = []

                        if (review.reviewProject.includes(',')) {
                            reviewProjectUrl = review.reviewProject.split(',');
                            arrReviews.push(...reviewProjectUrl);
                        } else {
                            arrReviews.push(reviewProjectUrl);
                        }

                        arrReviews = arrReviews.map(reviewUrl => axios.get(`${apiUrl}/api/projects/${reviewUrl}`)
                            .then((projectResponse) => {
                                review.reviewProject = projectResponse.data;
                                return review;
                            })
                            .catch((error) => {
                                console.log(error);
                                return review;
                            }))

                        const servicePromise = axios.get(`${apiUrl}/api/services/${review.reviewService}`)
                            .then((serviceResponse) => {
                                review.reviewService = serviceResponse.data;
                                return review;
                            })
                            .catch((error) => {
                                console.log(error);
                                return review;
                            });

                        return Promise.all([...arrReviews, servicePromise])
                            .then((results) => {
                                const updatedReview = results[0];
                                console.log('result:',updatedReview)
                                return updatedReview;
                            });
                    });

                    Promise.all(reviewPromises)
                        .then((reviewsAll) => {
                            setReviews(reviewsAll);
                            console.log('reviewsAll',reviewsAll);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        },1000)

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

    const [expandedItems, setExpandedItems] = useState([]);

    const toggleExpand = (index) => {
        setExpandedItems(prevExpandedItems => {
            const newExpandedItems = [...prevExpandedItems];
            newExpandedItems[index] = !newExpandedItems[index];
            return newExpandedItems;
        });
    };

    return (
        <>
            <HelmetComponent pageKeywords={service.seoKeywords} pageTitle={service.seoTitle} pageDescription={service.seoDescription}/>
            <Cursor/>
            {!isLoading &&
        <main className="service">

            <Breadcrumbs />

            <section className="service-main wow fadeIn"
                     data-wow-duration="0.1s"
                     data-wow-delay="0.1s">
                <div className="container">
                    <div className="service-main__wrap">
                        <h1 className="heading-primary wow slideInLeft"
                            data-wow-duration="0.5s"
                            data-wow-delay="0.1s">{service.name}</h1>
                        <div className="service-main__descr wow slideInRight"
                             data-wow-duration="0.5s"
                             data-wow-delay="0.1s">{service.descr}</div>
                    </div>
                </div>
            </section>

            <section className="service-adv">
                <div className="container">
                    <div className="service-adv__wrap">
                        <h2 className="heading-secondary wow slideInLeft"
                            data-wow-duration="0.5s"
                            data-wow-delay="0.1s">{service.benefitsTitle}</h2>
                        <div className="service-adv__content">
                            {
                                service.benefits ? service.benefits.map((item, index) => {
                                    const benefitsDelay = index < 1 ? '0.1' : index*0.2
                                    return (
                                        <div className="service-adv__item tab-parent wow fadeInUp"
                                             data-wow-duration="0.5s"
                                             data-wow-delay={`${benefitsDelay}s`}
                                             key={index}>
                                            <div className="service-adv__head" onClick={onAcc}>
                                                <div className="service-adv__head-elem">
                                                    <div className="service-adv__num">0{index + 1}</div>
                                                    <div className="service-adv__name">{item.benefitsName}</div>
                                                </div>
                                                <div className="service-adv__head-elem">
                                                    <div className="service-adv__person">
                                                        {item.benefitsPersonsImage ?
                                                            <RetryImage src={`${apiUrl}/uploads/${item.benefitsPersonsImage.filename}`} alt={item.benefitsPersons} className="service-adv__person-img" />
                                                            : null}

                                                        <div className="service-adv__person-name">{item.benefitsPersons}, <br />{item.benefitsPersonsPost}</div>
                                                    </div>
                                                    <div className="service-adv__icon">
                                                        <Icon icon="arr-acc" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="service-adv__tab">{item.benefitsDescr}</div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
            </section>

            {
                service.servicesServices ?
                    <section className="service-s">
                        <div className="container">
                            <div className="service-s__wrap">
                                <h2 className="heading-secondary  wow fadeIn"
                                    data-wow-duration="1s"
                                    data-wow-delay="0.2s"
                                    data-wow-offset="100">
                                    {service.blockTitle}
                                </h2>
                                <div className={`service-s__content ${service.servicesServices.length % 2 === 0 ? 'even' : 'odd'}`}>
                                    {
                                        service.servicesServices.map((item, index) => {
                                            const serviceDelay = index < 1 ? `0.1` : 0.4 + (index - 1 ) * 0.15
                                            return (
                                                <div className="service-s__item wow slideInRight"
                                                     data-wow-duration="0.5s"
                                                     data-wow-delay={`${serviceDelay}s`}
                                                     data-wow-offset="100"
                                                     key={item.id}>
                                                    {item.image ?
                                                        <RetryImage src={`${apiUrl}/uploads/${item.image.filename}`} alt={item.name} className="service-s__img" />
                                                        : null}
                                                    <div className="service-s__name">{item.name}</div>
                                                    <div className="service-s__descr">{item.descr}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    : null
            }

            {
                service.work ?
                    <section className="service-work">
                        <div className="container">
                            <div className="service-work__wrap">
                                <h2 className="heading-secondary wow slideInLeft"
                                    data-wow-duration="0.5s"
                                    data-wow-delay="0.1s">Как проходит работа</h2>
                                <div className="service-work__content">
                                    {service.work.map((item, index) => {
                                        const workDelay = index < 1 ? `0.1` :  (index - 1)* 0.15
                                        return (
                                            <div className="service-work__item wow fadeInUp"
                                                 data-wow-duration="0.5s"
                                                 data-wow-delay={`${workDelay}s`}
                                                 key={index}>
                                                <div className="service-work__num">{index + 1}</div>
                                                <div className="service-work__text">
                                                    <div className="service-work__name">{item.workName}</div>
                                                    <div className="service-work__descr">{item.workDescr}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                    : null
            }

            {projects ?
                <section className="service-portfolio">
                    <div className="container">
                        <h2 className="heading-secondary wow fadeIn"
                            data-wow-duration="0.5s"
                            data-wow-delay="0.1s">Портфолио</h2>
                        <div className="projects__wrap">
                            {
                                service.subProjects && service.subProjects.length > 0 ?
                                service.subProjects.map((project,i) => {
                                    const portfolioDelay= i < 7 ? (i * 0.1 + 0.1) : 0.1
                                    return (
                                        <div>
                                            {!!project && !!project.nameInEng &&
                                                <Link to={`/projects/${project.nameInEng}`}
                                                      className="projects__item wow fadeInUp"
                                                      data-wow-duration="0.5s"
                                                      data-wow-delay={`${portfolioDelay}s`}
                                                      key={project.id} style={{background: project.color}}>
                                                    <div className="projects__item-img-wrap">
                                                        {
                                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                                ?
                                                                <video autoPlay loop muted playsInline>
                                                                    <source
                                                                        src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}
                                                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                                </video> :
                                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                                    ?
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>
                                                                    :
                                                                    <RetryImage key={project.image.filename}
                                                                                src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                                                alt={project.name}
                                                                                className="main-projects__img"/>
                                                        }

                                                    </div>
                                                    <div className="projects__item-name">{project.name}</div>
                                                </Link>
                                            }
                                        </div>

                                    )
                                }) :
                                projects.map((project,i) => {
                                    return (
                                        <Link to={`/projects/${project.nameInEng}`} className="projects__item" key={project.id} style={{ background: project.color }}>
                                            <div className="projects__item-img-wrap">
                                                {
                                                    project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                        ?
                                                        <div dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                        :
                                                        <RetryImage src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                             alt={project.name} className="main-projects__img" />
                                                }

                                            </div>
                                            <div className="projects__item-name">{project.name}</div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                : null}



            {
                service.tariffs ?
                    <section className="service-price">
                        <div className="container">
                            <Tabs className="service-price__wrap" selectedTabClassName="active">
                                <TabList className="service-price__info wow slideInLeft"
                                         data-wow-duration="0.5s"
                                         data-wow-delay="0.1s">
                                    <h2 className="heading-secondary">Тарифы</h2>
                                    <div className="service-price__info-wrap">
                                        {
                                            service.tariffs.map((tariff, index) => {
                                                return (
                                                    <Tab className="service-price__info-btn" key={index}>{tariff.tariffsCategory}</Tab>
                                                )
                                            })
                                        }
                                    </div>
                                </TabList>
                                <div className="service-price__tariffs">
                                    {service.tariffs.map((tariff, index) => {
                                        return (
                                            <TabPanel className="service-price__tab wow fadeIn"
                                                      data-wow-duration="0.5s"
                                                      data-wow-delay="0.1s"
                                                      key={index}>
                                                <div className="service-price__content">
                                                    {
                                                        tariff.tariffsItems.map((item, index) => {
                                                            const tariffsDelay = index < 1 ? '0.1' : index*0.2
                                                            return (
                                                                <div className="service-price__item tab-parent wow fadeIn"
                                                                     data-wow-duration="0.5s"
                                                                     data-wow-delay={`${tariffsDelay}s`}
                                                                     key={index}>
                                                                    <div className="service-price__acc" onClick={onAcc}>
                                                                        <h2 className="heading-secondary" >{item.tariffName}</h2>
                                                                        {item.tariffList.length > 4 ? (
                                                                            <div className="service-price__p">
                                                                                <p className='show__more'>
                                                                                    <div className="top">
                                                                                        <Icon icon="arr-acc" />
                                                                                    </div>
                                                                                </p>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                    <div className="service-price__subtitle">Что входит в тариф:</div>
                                                                    <div className="service-price__elem">
                                                                        <div className="service-price__type">
                                                                            {
                                                                                item.tariffList.map((type, index) => {
                                                                                    return (
                                                                                        <div className="service-price__type-item" key={index}>
                                                                                            <Icon icon="task" />
                                                                                            {type.tariffWork}
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <div className="service-price__p">
                                                                            <div className="service-price__p-item">
                                                                                <div className="service-price__p-title">Срок работы</div>
                                                                                <div className="service-price__p-descr">{item.tariffDeadline}</div>
                                                                            </div>
                                                                            <div className="service-price__p-item">
                                                                                <div className="service-price__p-title">Стоимость</div>
                                                                                <div className="service-price__p-descr">{item.tariffPrice}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabPanel>
                                        )
                                    })}
                                </div>
                            </Tabs>
                        </div>
                    </section>
                    : null
            }
            {console.log('reviewsAll',reviews)}
            {
                reviews  ?
                    <section className="service-review">
                        <div className="container">
                            <h2 className="heading-secondary wow fadeIn"
                                data-wow-offset="100"
                                data-wow-duration="0.5s"
                                data-wow-delay="0.1s">Отзывы</h2>
                            <div className="service-review__wrap">
                                {
                                    reviews.map((review, index) => {
                                        const reviewsDelay = index < 1? '0.1' : index*0.2
                                        if (review.reviewService.id === service.id) {
                                            console.log('review',review)
                                            return (
                                                <div className="service-review__item wow fadeInUp"
                                                     data-wow-offset="100"
                                                     data-wow-duration={`${reviewsDelay}s`}
                                                     data-wow-delay="0.1s"
                                                     style={{ background: review.reviewProject.color }} key={review.id}>
                                                    <div className="service-review__content">
                                                        <div className="service-review__person">
                                                            {
                                                                review.reviewImage ? <RetryImage src={`${apiUrl}/uploads/${review.reviewImage.filename}`} alt={review.reviewName} className="service-review__person-img" /> : null
                                                            }

                                                            <div className="service-review__person-p">
                                                                {review.reviewName}, <span>{review.reviewPost}</span>
                                                            </div>
                                                        </div>
                                                        <div className="service-review__descr">{review.review} </div>
                                                        <Link to={`/projects/${review.reviewProject.nameInEng}`} className="btn --white">Смотреть проект</Link>
                                                    </div>
                                                    { review.reviewBg ?  <RetryImage src={`${apiUrl}/uploads/${review.reviewBg.filename}`} alt={review.name} className="service-review__bg" /> :
                                                    review.reviewProject.image ? <RetryImage src={`${apiUrl}/uploads/${review.reviewProject.image.filename}`} alt={review.name} className="service-review__bg" /> : null}
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                    : null
            }
            <div className="wow fadeIn"
                 data-wow-offset="0"
                 data-wow-duration="0.5s"
                 data-wow-delay="0.1s">
                <Cta formName={'services'} />
            </div>

        </main>
            }
        </>
    )
}

export default ServicesDetail;
