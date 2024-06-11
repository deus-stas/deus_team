import {Link} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import 'wowjs/css/libs/animate.css';
import {Icon} from '../../icon/Icon'

import './services.scss'

import RetryImage from "../../../helpers/RetryImage";
import {connect, useSelector} from "react-redux";
import agencyBanner from "../../../img/agency-main.mp4";
import pentagon from "../../../img/pentagon.png"
import octagon from "../../../img/octagon.png"
import elipse from "../../../img/elipse.png"
import spiral from "../../../img/spiral.png"
import includes from "validator/es/lib/util/includes";
import {gotoAnchor} from "../../anchors";
import MarqueeComponent from "../../MarqueeComponent";
import DelayedLink from "../../appHeader/DelayedLink";

const apiUrl = '';

const Services = (props) => {

    // const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openImage, setOpenImage] = useState(null);
    const [openList, setOpenList] = useState([])

    // useEffect(() => {
    //     axios.get(`${apiUrl}/api/reviews/`)
    //         .then((response) => {
    //             const reviews = response.data;
    //             const projectIds = reviews.map((review) => review.reviewProject);
    //             const serviceIds = reviews.map((review) => review.reviewService);
    //
    //             Promise.all([
    //                 axios.get(`${apiUrl}/api/projects/?ids=${projectIds.join(',')}`),
    //                 axios.get(`${apiUrl}/api/services/?ids=${serviceIds.join(',')}`)
    //             ])
    //                 .then((results) => {
    //                     const projects = results[0].data;
    //                     const services = results[1].data;
    //
    //                     const updatedReviews = reviews.map((review) => {
    //                         const project = projects.find((p) => p.id === review.reviewProject);
    //                         const service = services.find((s) => s.id === review.reviewService);
    //
    //                         return {
    //                             ...review,
    //                             reviewProject: project,
    //                             reviewService: service
    //                         };
    //                     });
    //
    //                     setReviews(updatedReviews);
    //                     console.log(updatedReviews);
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

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
    }, []);

    const handleImageClick = (filename) => {
        setOpenImage(filename);
    };

    const handleItemClick = (index) => {
        setOpenList(index === openList ? -1 : index);
    };


    const handleCloseImage = () => {
        setOpenImage(null);
    };
    const {headerData, services, team, projects} = props;

    return (
        <>
            {!isLoading &&
                <main className="services" style={{padding: "inherit"}}>

                    <section className="services-s whiteHeader">
                        <div className="services-s__video">
                            <video autoPlay playsInline muted loop>
                                <source src={agencyBanner} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                            </video>
                        </div>
                        <div className="container">
                            <h1 className="heading-primary hidden-mobile">Персональные решения для <br/>эффективного результата</h1>
                            <h1 className="heading-primary hidden-desktop">Персональные решения<br/>для эффективного результата</h1>
                        </div>
                    </section>
                    <section className="services-about">
                        <div className="container">
                            <h2 className="heading-secondary">Работая с нами, вы получите...</h2>
                            <div className="services-about__wrap">
                                <div className="services-about__descr">максимальную эффективность вашего бизнеса
                                    за счет объединения инструментов аналитики, маркетинга, дизайна и современных
                                    методов разработки
                                </div>
                                <div className="services-about__adv hidden-mobile">
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Работаем<br/> с 2016 года
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Входим в ТОП-40<br/> креативности студий
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Комплексные решения<br/> для различных индустрий
                                    </div>
                                </div>

                                <div className="services-about__adv hidden-desktop">
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Работаем с 2016 года
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Входим в ТОП-40<br/> креативности студий
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        Комплексные решения для<br/> различных индустрий
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>

                    <section className="services-list">
                        <div className="services-list__wrapp">

                            {
                                !!services && services.filter((service) => service.isInvisible).map((service, index) => {
                                    return (
                                        <div className={`${index === openList ? 'active' : ''}`}>
                                            <div className="container">
                                                <div to={`/services/${service.path}`}
                                                     className="services-list__wrapp-item "
                                                     key={service.id}
                                                     onClick={() => {
                                                         handleItemClick(index);
                                                     }}>
                                                    <div className="services-s__name">{service.name}</div>
                                                    <Icon icon="plus"/>
                                                </div>
                                            </div>

                                            <div className="describe">
                                                {!!service.descrImg &&
                                                    <img src={`${apiUrl}/uploads/${service.descrImg.filename}`} alt=""/>}
                                                <div className="container">
                                                    <p className="describe-title">{service.blockTitle}</p>
                                                    {/*<Marquee speed="50">*/}
                                                    <MarqueeComponent >
                                                        <div className="describe-services ">
                                                                    {!!service.tariffs && service.tariffs.map((tariffs, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {tariffs.tariffsCategory && (
                                                                                <>
                                                                                    <p>{tariffs.tariffsCategory}</p>
                                                                                    <p className="dot">•</p>
                                                                                </>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))}

                                                        </div>
                                            </MarqueeComponent>
                                                    {/*</Marquee>*/}

                                                    <div className="describe__wrapp ">
                                                        <div className="describe__wrapp-btn hidden-mobile ">
                                                            <DelayedLink to={`/projects?type=${service.types}`}
                                                                         disabled={!service.types || service.types.length === 0}
                                                                         className="btn --b-white " datahash="projectNav"
                                                                         onClick={(e) => gotoAnchor(e)}>
                                                                Посмотреть кейсы
                                                            </DelayedLink>

                                                            <DelayedLink to="/contacts" className="btn --white"
                                                                         datahash="contactUs"
                                                                         onClick={(e) => gotoAnchor(e)}>Обсудить
                                                                проект</DelayedLink>
                                                        </div>
                                                        <div>
                                                            <h3 className="heading-tertiary">
                                                                {service.descr}
                                                            </h3>
                                                            <div className="describe__wrapp-benefits">
                                                                {!!service.tariffs && service.tariffs.map(tariffs => {
                                                                    return (
                                                                        <div className="tariffs">
                                                                            {tariffs.tariffsCategory}
                                                                            {tariffs.tariffsItems.map(tariffsItem => {
                                                                                    return (
                                                                                        <p className="p-style-grey">
                                                                                            {tariffsItem.tariffPrice} &nbsp;/&nbsp; {tariffsItem.tariffDeadline}

                                                                                        </p>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>

                                                        </div>
                                                        <div className="describe__wrapp-btn__mob hidden-desktop ">

                                                            <DelayedLink to={`/projects?type=${service.id}`}
                                                                         className="btn --b-white " datahash="projectNav"
                                                                         onClick={(e) => gotoAnchor(e)}>Посмотреть
                                                                кейсы</DelayedLink>


                                                            <DelayedLink to="/contacts" className="btn --white"
                                                                         datahash="contactUs"
                                                                         onClick={(e) => gotoAnchor(e)}>Обсудить
                                                                проект</DelayedLink>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    </section>

                    <section className="services-principle whiteHeader">
                        <div className="container">
                            <h2 className="heading-secondary">Как мы работаем</h2>
                            <div className="services-principle__wrap">
                                <div className="services-principle__wrap-item">
                                    <img src={pentagon} alt=""/>
                                    <div>
                                        <h3 className="heading-tertiary">Прозрачность</h3>
                                        <p className="p-style-white">
                                            Подробно и простым языком рассказываем о результатах каждого этапа работы.
                                            Делаем фокус на результат, а не на чек, поэтому предлагаем только те услуги,
                                            которые приведут к достижению цели.

                                        </p>
                                    </div>
                                </div>
                                <div className="services-principle__wrap-item">
                                    <img src={octagon} alt=""/>
                                    <div>
                                        <h3 className="heading-tertiary">Индивидуальность</h3>
                                        <p className="p-style-white">
                                            Разрабатываем уникальные проекты, соответствующие индивидуальности бренда и
                                            вашим интересам.
                                            Не останавливаемся на достигнутом и постоянно подбираем идеи для улучшения
                                            результата,
                                            опираясь на глубокую экспертизу и опыт.
                                        </p>
                                    </div>
                                </div>
                                <div className="services-principle__wrap-item">
                                    <img src={elipse} alt=""/>
                                    <div>
                                        <h3 className="heading-tertiary">Персональный подход</h3>
                                        <p className="p-style-white">
                                            Предлагаем персональные решения на основе детального изучения вашего бизнеса
                                            и рынка.
                                            Выделяем проектные команды, условия работы и оплаты на основе ваших
                                            интересов. </p>
                                    </div>
                                </div>
                                {/*<div className="services-principle__wrap-item">*/}
                                {/*    <img src={elipse} alt=""/>*/}
                                {/*    <div>*/}
                                {/*        <h3 className="heading-tertiary">Вектор в вашу пользу</h3>*/}
                                {/*        <p className="p-style-white">*/}
                                {/*            Предложим несколько форматов работы с учетом особенностей вашего проекта, найдем гибкий подход для достижения результата.*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                    </section>

                    <section className="services-team">
                        <div className="container">
                            <div className="services-team__wrap">
                                <div>
                                    <h2 className="heading-secondary">
                                        Как мы работаем?
                                    </h2>
                                    <p className="p-style-black">Предлагаем форматы работы с учётом особенностей
                                        проекта. Если разработка требует большей гибкости, миксуем подходы.
                                    </p>
                                </div>
                                <div></div>
                                <div>
                                    <h2 className="heading-secondary">Команда</h2>
                                    <div className="services-team__wrapper">
                                        {team.filter(team => team.serviceControl).map((team, index) => {
                                            return (
                                                <div className="worker">

                                                    <img className="worker-img"
                                                         src={team.mainImg ? `${apiUrl}/uploads/${team.mainImg.filename}` : null}
                                                         alt=""/>
                                                    <span>
                                                      <div className="worker-name heading-tertiary">{team.name}</div>
                                                    <p className="worker-descr">{team.post}</p>
                                                    <p className="worker-descr">{team.sign}</p>
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="services-team__table">
                                        <div className="item">
                                            <h3 className="heading-tertiary">Менеджмент и управления</h3>
                                            <p>4 человека</p>
                                        </div>
                                        <div className="item">
                                            <h3 className="heading-tertiary">Дизайн</h3>
                                            <p>6 человека</p>
                                        </div>
                                        <div className="item">
                                            <h3 className="heading-tertiary">Верстка и разработка</h3>
                                            <p>8 человека</p>
                                        </div>
                                        <div className="item">
                                            <h3 className="heading-tertiary">SEO</h3>
                                            <p>2 человека</p>
                                        </div>
                                        <div className="item">
                                            <h3 className="heading-tertiary">Редакция</h3>
                                            <p>4 человека</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                    {/*<section className="services-reviews wow fadeIn"*/}
                    {/*         data-wow-offset="100"*/}
                    {/*         data-wow-duration="0.5s"*/}
                    {/*         data-wow-delay="0.1s">*/}
                    {/*    <div className="container">*/}
                    {/*        <h2 className="heading-secondary">Отзывы</h2>*/}
                    {/*        <div className="services-reviews__wrap">*/}
                    {/*            {reviews ? reviews.map(review => {*/}
                    {/*                const fileName = !!review.reviewFile ? review.reviewFile.mimetype : "";*/}
                    {/*                const extension = fileName.split('/').pop().toLowerCase();*/}

                    {/*                return (*/}
                    {/*                    <div to="/" className="services-reviews__item"*/}
                    {/*                         onClick={() => handleImageClick(review.reviewFile.filename)}*/}
                    {/*                         key={review.id}>*/}
                    {/*                        <div className="services-reviews__name">{review.name}</div>*/}
                    {/*                        <div className="services-reviews__s">{review.service}</div>*/}
                    {/*                        <div className="services-reviews__type">{review.type}</div>*/}
                    {/*                        {*/}
                    {/*                            review.reviewFile ? (*/}
                    {/*                                <>*/}
                    {/*                                    <div className="services-reviews__file"> {extension} </div>*/}
                    {/*                                    <iframe*/}
                    {/*                                        src={`${apiUrl}/uploads/${review.reviewFile.filename}#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0`}*/}
                    {/*                                        scrolling="no"*/}
                    {/*                                        alt={review.name}*/}
                    {/*                                        className="iframe-height services-reviews__r "*/}
                    {/*                                    />*/}
                    {/*                                </>*/}
                    {/*                            ) : null*/}
                    {/*                        }*/}

                    {/*                    </div>*/}
                    {/*                )*/}
                    {/*            }) : null}*/}

                    {/*            {openImage && (*/}
                    {/*                <div className="modal">*/}
                    {/*                    <div className="modal-content">*/}
                    {/*                        <iframe*/}
                    {/*                            src={`${apiUrl}/uploads/${openImage}#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0`}*/}
                    {/*                            alt="Отзыв"*/}
                    {/*                            scrolling="no"*/}
                    {/*                            className="iframe-modal-size"/>*/}
                    {/*                        <button onClick={handleCloseImage}>*/}
                    {/*                            <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">*/}
                    {/*                                <path*/}
                    {/*                                    d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>*/}
                    {/*                            </svg>*/}
                    {/*                        </button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                </main>
            }
        </>
    )
}

export default connect(
    (state) => (
        {
            headerData: state.app.headerData,
            services: state.app.services,
            projects: state.app.projects,
            team: state.app.team,
        }
    )
)(Services)