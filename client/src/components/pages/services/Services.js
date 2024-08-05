import {Link} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import 'wowjs/css/libs/animate.css';
import {Icon} from '../../icon/Icon'

import './services.scss'

import RetryImage from "../../../helpers/RetryImage";
import {connect, useSelector} from "react-redux";
import pentagon from "../../../img/pentagon.png"
import octagon from "../../../img/octagon.png"
import elipse from "../../../img/elipse.png"
import spiral from "../../../img/spiral.png"
import includes from "validator/es/lib/util/includes";
import {gotoAnchor} from "../../anchors";
import MarqueeComponent from "../../MarqueeComponent";
import DelayedLink from "../../appHeader/DelayedLink";
import {useMediaQuery} from "@material-ui/core";

const apiUrl = '';

const Services = (props) => {

    // const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openImage, setOpenImage] = useState(null);

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


    const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн, разработку<br/> и интеграции в единую систему для получения<br/> максимальной эффективности для вашего бизнеса'
    const sizeSmall = 'Объединяем аналитику, маркетинг, дизайн,<br/> разработку и интеграции в единую систему<br/> для получения максимальной эффективности<br/> для вашего бизнеса'
    const sizeXSmall = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения максимальной эффективности для вашего бизнеса'

    const matches1440 = useMediaQuery('(min-width:1025px)');
    const matches1024 = useMediaQuery('(min-width:940px)');
    const matches768 = useMediaQuery('(min-width:420px)');
    const matches360 = useMediaQuery('(min-width:0px)');

    let text
    if (matches1440 || matches1024 ){
        text = sizeLarge
    } else if (matches768) {
        text = sizeSmall
    } else if (matches360){
        text = sizeXSmall
    }

    const {headerData, services, team, projects} = props;

    return (
        <>
            {!isLoading &&
                <main className="services">
                    <div className="container">
                        <section className="services-s">
                         <span className="services-s__text">
                                <p className="breadcrumb">Услуги</p>
                                <h1 className="heading-primary">Отвечаем за качество <br/> своих услуг</h1>
                         </span>
                        </section>
                        <section className="services-about borderBlock padding">
                            <div className="services-about__wrap">
                                <span>
                                   <h2 className="heading-secondary">Почему стоит заказать<br/> разработку сайта в DEUS?</h2>
                                <div className="services-about__descr s-text" dangerouslySetInnerHTML={{__html: text}}/>
                                </span>
                                <div className="services-about__adv">
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        <p className="m-text">Работаем<br/> с 2016 года</p>
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        <p className="m-text"> Входим в ТОП-40<br/> креативности студий</p>
                                    </div>
                                    <div className="services-about__adv-item">
                                        <Icon icon="star"></Icon>
                                        <p className="m-text">Комплексные решения<br/> для различных индустрий</p>
                                    </div>
                                </div>

                            </div>

                        </section>

                        <section className="services-list">
                            <div className="services-list__wrapp borderBlock padding">
                                {
                                    !!services && services.filter((service) => service.isInvisible).map((service, index) => {
                                        return (
                                            <div className="services-list__wrapp-item">
                                                <div className="describe">
                                                    <h2 to={`/services/${service.path}`}
                                                         className="heading-secondary"
                                                         key={service.id}
                                                    >
                                                        <DelayedLink to={`/projects?type=${service.types}`}
                                                                     disabled={!service.types || service.types.length === 0}
                                                                     datahash="projectNav"
                                                                     onClick={(e) => gotoAnchor(e)}>
                                                            <div className="services-s__name">{service.name}</div>
                                                        </DelayedLink>

                                                    </h2>
                                                    <div className="describe__wrapp ">
                                                        <div>
                                                            <p className="s-text">
                                                                {service.descr}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
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
                                        )
                                    })
                                }

                            </div>
                        </section>

                        <section className="services-principle borderBlock padding whiteHeader">
                            <h2 className="heading-secondary">Как мы работаем</h2>
                            <div className="services-principle__wrap">
                                <div className="services-principle__wrap-item">
                                    <img src={pentagon} alt=""/>
                                    <div>
                                        <p className="l-textMed">Прозрачность</p>
                                        <p className="s-text">
                                            Подробно и понятно рассказываем, что клиент получает по итогам каждого этапа
                                            — держим фокус и не отклоняемся от стратегической цели проекта

                                        </p>
                                    </div>
                                </div>
                                <div className="services-principle__wrap-item">
                                    <img src={octagon} alt=""/>
                                    <div>
                                        <p className="l-textMed">Индивидуальность</p>
                                        <p className="s-text">
                                            Всесторонне изучаем рынок и бизнес клиента, предлагаем уникальные решения, шиюко подбираем команду, условия работы и оплаты на основе интересов клиента
                                            </p>
                                        </div>
                                    </div>
                                    <div className="services-principle__wrap-item">
                                        <img src={elipse} alt=""/>
                                        <div>
                                            <p className="l-textMed">Персональный подход</p>
                                            <p className="s-text">
                                                Проактивность — ключ к достойному результату. В ходе проекта мы постоянно предлагаем улучшения и идеи, опираясь на глубокую экспертизу и многолетний опыт</p>
                                        </div>
                                    </div>
                                </div>

                        </section>

                        <section className="services-team borderBlock padding">
                                <div className="services-team__wrap">
                                    <div>
                                        <h2 className="heading-secondary">
                                            Как мы работаем?
                                        </h2>
                                        <p className="s-text">Предлагаем форматы работы с учётом особенностей проекта.
                                            Если разработка требует большей гибкости, миксуем подходы.

                                        </p>
                                    </div>
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
                                                      <p className="m-text">{team.name}</p>
                                                    <p className="s-text">{team.post}</p>
                                                    </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="services-team__table">
                                            <div className="item">
                                                <p className="m-text">Менеджмент</p>
                                                <p className="s-text">4 человека</p>
                                            </div>
                                            <div className="item">
                                                <p className="m-text">Дизайн</p>
                                                <p className="s-text">6 человека</p>
                                            </div>
                                            <div className="item">
                                                <p className="m-text">Верстка и разработка</p>
                                                <p className="s-text">8 человека</p>
                                            </div>
                                            <div className="item">
                                                <p className="m-text">SEO</p>
                                                <p className="s-text">2 человека</p>
                                            </div>
                                            <div className="item">
                                                <p className="m-text">Редакция</p>
                                                <p className="s-text">4 человека</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                        </section>
                    </div>
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