import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'

import Breadcrumbs from '../../../breadcrubms/Breadcrumbs'
import Cta from '../../../cta/Cta';
import { Icon } from '../../../icon/Icon'
import { Link } from 'react-router-dom';

import './serviceDetail.scss'

const onAcc = (e) => {
    let accItem = e.target.closest('.tab-parent');
    if (accItem.classList.contains('active')) {
        accItem.classList.remove('active');
    } else {
        accItem.classList.add('active');
    }
}

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const ServicesDetail = () => {

    const { id } = useParams();
    const [service, setService] = useState([]);
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/services/${id}`)
            .then((response) => {
                console.log(response.data);
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
                        const subServices = results.slice(response.data.benefits.length, response.data.servicesServices.length+response.data.benefits.length);
                        const subProjects = results.slice(response.data.benefits.length + response.data.servicesServices.length)
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

    const [expandedItems, setExpandedItems] = useState([]);

    const toggleExpand = (index) => {
        setExpandedItems(prevExpandedItems => {
            const newExpandedItems = [...prevExpandedItems];
            newExpandedItems[index] = !newExpandedItems[index];
            return newExpandedItems;
        });
    };

    return (
        <main className="service">

            <Breadcrumbs />

            <section className="service-main">
                <div className="container">
                    <div className="service-main__wrap">
                        <h1 className="heading-primary">{service.name}</h1>
                        <div className="service-main__descr">{service.descr}</div>
                    </div>
                </div>
            </section>

            <section className="service-adv">
                <div className="container">
                    <div className="service-adv__wrap">
                        <h2 className="heading-secondary">{service.benefitsTitle}</h2>
                        <div className="service-adv__content">
                            {
                                service.benefits ? service.benefits.map((item, index) => {
                                    return (
                                        <div className="service-adv__item tab-parent" key={index}>
                                            <div className="service-adv__head" onClick={onAcc}>
                                                <div className="service-adv__head-elem">
                                                    <div className="service-adv__num">0{index + 1}</div>
                                                    <div className="service-adv__name">{item.benefitsName}</div>
                                                </div>
                                                <div className="service-adv__head-elem">
                                                    <div className="service-adv__person">
                                                        {item.benefitsPersonsImage ?
                                                            <img src={`${apiUrl}/uploads/${item.benefitsPersonsImage.filename}`} alt={item.benefitsPersons} className="service-adv__person-img" />
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
                                <h2 className="heading-secondary">
                                    {service.blockTitle}
                                </h2>
                                <div className={`service-s__content ${service.servicesServices.length % 2 === 0 ? 'even' : 'odd'}`}>
                                    {
                                        service.servicesServices.map(item => {
                                            return (
                                                <div className="service-s__item" key={item.id}>
                                                    {item.image ?
                                                        <img src={`${apiUrl}/uploads/${item.image.filename}`} alt={item.name} className="service-s__img" />
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
                                <h2 className="heading-secondary">Как проходит работа</h2>
                                <div className="service-work__content">
                                    {service.work.map((item, index) => {
                                        return (
                                            <div className="service-work__item" key={index}>
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
                        <h2 className="heading-secondary">Портфолио</h2>
                        <div className="projects__wrap">
                            {
                                service.subProjects && service.subProjects.length > 0 ?
                                service.subProjects.map(project => {
                                    return (
                                        <Link to={`/projects/${project.nameInEng}`} className="projects__item" key={project.id} style={{ background: project.color }}>
                                            <div className="projects__item-img-wrap">
                                                {
                                                    project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null' 
                                                        ?
                                                    <video autoPlay loop muted playsInline controls>
                                                        <source src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                                    </video> : 
                                                    project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                        ?
                                                        <div dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                        :
                                                        <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-projects__img" />
                                                }

                                            </div>
                                            <div className="projects__item-name">{project.name}</div>
                                        </Link>
                                    )
                                }) :
                                projects.map(project => {
                                    return (
                                        <Link to={`/projects/${project.nameInEng}`} className="projects__item" key={project.id} style={{ background: project.color }}>
                                            <div className="projects__item-img-wrap">
                                                {
                                                    project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                        ?
                                                        <div dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                        :
                                                        <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-projects__img" />
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
                                <TabList className="service-price__info">
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
                                            <TabPanel className="service-price__tab" key={index}>
                                                <div className="service-price__content">
                                                    {
                                                        tariff.tariffsItems.map((item, index) => {
                                                            return (
                                                                <div className={`service-price__item ${expandedItems[index] ? 'expanded' : ''}`} key={index}>
                                                                    <h2 className="heading-secondary">{item.tariffName}</h2>
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
                                                                            <p className='show__more' onClick={() => toggleExpand(index)}>
                                                                                {expandedItems[index] ? 
                                                                                    <div className="bottom">
                                                                                        <Icon icon="arr-acc" />
                                                                                    </div> : 
                                                                                    <div className="top">
                                                                                        <Icon icon="arr-acc" />
                                                                                    </div>}
                                                                            </p>
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

            {
                reviews ?
                    <section className="service-review">
                        <div className="container">
                            <h2 className="heading-secondary">Отзывы</h2>
                            <div className="service-review__wrap">
                                {
                                    reviews.map(review => {
                                        if (review.reviewService.id === service.id) {
                                            return (
                                                <div className="service-review__item" style={{ background: review.reviewProject.color }} key={review.id}>
                                                    <div className="service-review__content">
                                                        <div className="service-review__person">
                                                            {
                                                                review.reviewImage ? <img src={`${apiUrl}/uploads/${review.reviewImage.filename}`} alt={review.reviewName} className="service-review__person-img" /> : null
                                                            }

                                                            <div className="service-review__person-p">
                                                                {review.reviewName}, <span>{review.reviewPost}</span>
                                                            </div>
                                                        </div>
                                                        <div className="service-review__descr">{review.review} </div>
                                                        <Link to={`/projects/${review.reviewProject.nameInEng}`} className="btn --white">Смотреть проект</Link>
                                                    </div>
                                                    { review.reviewBg ?  <img src={`${apiUrl}/uploads/${review.reviewBg.filename}`} alt={review.name} className="service-review__bg" /> :
                                                    review.reviewProject.image ? <img src={`${apiUrl}/uploads/${review.reviewProject.image.filename}`} alt={review.name} className="service-review__bg" /> : null}
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

            <Cta formName={'services'} />

        </main>
    )
}

export default ServicesDetail;