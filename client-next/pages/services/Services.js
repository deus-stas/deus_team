'use client'; // Если вы используете Next.js с папкой `app`

import React from 'react';
import {useEffect, useRef, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
// import 'wowjs/css/libs/animate.css';
import {Icon} from '../../components/icon/Icon'
import Image from 'next/image';
import './services.scss'

// import RetryImage from "../../helpers/RetryImage";
// import {connect, useSelector} from "react-redux";
// import pentagon from "../../public/img/pentagon.png"
// import elipse from "../../public/img/elipse.png"
// import octagon from "../../public/img/octagon.png"
// import spiral from "../../public/img/spiral.png"
// import includes from "validator/es/lib/util/includes";
import {gotoAnchor} from "../../components/anchors";
// import MarqueeComponent from "../../MarqueeComponent";
import Link from 'next/link'; // Используем Link из Next.js для навигации
// import {useMediaQuery} from "@material-ui/core";
import {Cursor} from "../../components/cursor/cursor";
// import {fetchData } from "../../actions/appActions";
// import {connect, useDispatch, useSelector } from 'react-redux';

const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

const Services = () => {

    // const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [services, setservices] = useState([]);
    const [team, setTeam] = useState([]);


    useEffect(() => {
        setIsLoadingMainPageEvent(true)
        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        setIsLoading(false)
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/services/`)
            .then((response) => {
                setservices(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/team/`)
            .then((response) => {
                setTeam(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // const { headerData, services, contacts, team } = useSelector((state) => ({
    //         headerData: state.app.headerData,
    //         services: state.app.services,
    //         projects: state.app.projects,
    //         team: state.app.team,
    //   }));

    // useEffect(() => {
    //     dispatch(fetchData());
    //   }, [dispatch]);


    useEffect(() => {
        const handleLoad = (e) => {
          if (e.detail.isLoading !== isLoading) {
            setIsLoading(e.detail.isLoading);
          }
        };
        console.log('isLoading',isLoading)
        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
          window.removeEventListener('isLoadingMainPage', handleLoad);
        };

      }, [isLoading]);


    const sizeLarge = 'DEUS — это не шаблонные решения, а подход, который <br/> строится под ваш конкретный запрос. Мы не просто <br/> выполняем задачи, а работаем с проектом <br/> от начала до конца: изучаем ваши цели, <br/> предлагаем решения, внедряем их и помогаем <br/> поддерживать результат. Наша задача — сделать так, <br/> чтобы все работало именно для вас, <br/> без лишней сложности и абстрактных обещаний.'
    // const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн, разработку<br/> и интеграции в единую систему для получения<br/> максимальной эффективности для вашего бизнеса'
    const sizeSmall = 'Объединяем аналитику, маркетинг, дизайн,<br/> разработку и интеграции в единую систему<br/> для получения максимальной эффективности<br/> для вашего бизнеса'
    const sizeXSmall = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения максимальной эффективности для вашего бизнеса'

    // const matches1440 = useMediaQuery('(min-width:1025px)');
    // const matches1024 = useMediaQuery('(min-width:940px)');
    // const matches768 = useMediaQuery('(min-width:420px)');
    // const matches360 = useMediaQuery('(min-width:0px)');
    const principleText = '(min-width:1025px)' ? "s-text" : '(min-width:940px)' ? "m-text" : "m-text"


    // const matches1440 = useMediaQuery('(min-width:1025px)');
    // const matches1024 = useMediaQuery('(min-width:940px)');
    // const matches768 = useMediaQuery('(min-width:420px)');
    // const matches360 = useMediaQuery('(min-width:0px)');

    let text = sizeLarge
    // if (matches1440 || matches1024 ){
    //     text = sizeLarge
    // } else if (matches768) {
    //     text = sizeSmall
    // } else if (matches360){
    //     text = sizeXSmall
    // }

    // const {headerData, services, team, projects} = props;
    // const checkService = () => {
    //     switch(key) {
    //         case '66d1bb8ca3db9fa6832bea54':
    //             return 'tech-support';
    //         case '66d1bb21a3db9fa6832be9d3':
    //             return 'site-and-services';
    //         case '66d1bb8ca3db9fa6832bea54':
    //             return 'tech-support';
    //         case '66d1bb8ca3db9fa6832bea54':
    //             return 'tech-support';
    //     }
    // }

    return (
        <>
            <Cursor/>
            {!isLoading &&
            // {true &&
                <main className="services">
                    <div className="container">

                        <section className="services-s">
                         <span className="services-s__text">
                                <p className="breadcrumb">Услуги</p>
                                <h1 className="heading-primary">Наши решения для <br/> вашего бизнеса</h1>
                         </span>
                        </section>

                        <section className="services-about borderBlock padding">
                            <div className="services-about__wrap">
                                <span className="info">
                                   <h2 className="heading-secondary">Почему стоит работать с нами?</h2>
                                <div className="descr s-text" dangerouslySetInnerHTML={{__html: text}}/>
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
                                        console.log('service',service);
                                        return (
                                            <div className="services-list__wrapp-item" key={`$services-list-${index}`}>
                                                <div className="describe">
                                                    <h2 href={`/services/${service.path}`}
                                                         className="heading-secondary hover-flip service-title"
                                                         key={service.id}>
                                                        {service.path !== 'null' ?
                                                            // <Link href={`/projects/type/${service.path.toLowerCase()}`}
                                                            <Link href={`/services/${service.path}`}
                                                                        disabled={!service.path || service.path === 0 }
                                                                        datahash="projectNav"
                                                                        onClick={(e) => gotoAnchor(e)}>
                                                                <div className="services-s__name">
                                                                    <span data-hover={service.name}>{service.name}</span>
                                                                </div>
                                                            </Link>
                                                        :
                                                            <div
                                                                datahash="projectNav"
                                                                >
                                                                <div className="services-s__name">{service.name}</div>
                                                            </div>
                                                        }
                                                    </h2>
                                                    <div className="describe__wrapp ">
                                                        <p className="s-text" dangerouslySetInnerHTML={{ __html: service.descr}} /> 
                                                     
                                                    </div>
                                                </div>
                                                <div className="describe__content">
                                                    <div className="describe__wrapp-benefits">
                                                    {!!service.tariffs && service.tariffs.map((tariffs, index) => {
                                                        const num = (index + 1).toString().padStart(2, '0');
                                                        return (
                                                            <div className="describe__wrapp-benefits__item"  key={`$describe__wrapp-benefits-key-${index}`}>
                                                                <p className="num m-text">{num}</p>
                                                                <div className="tariffs">
                                                                    <span className="tariffs__span">

                                                                        <p className="m-text">{tariffs.tariffsCategory}</p>
                                                                    </span>
                                                                    <p className="price s-text">
                                                                        {tariffs.tariffPrice} &nbsp;/&nbsp; {tariffs.tariffDeadline}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                                    <div className="describe__wrapp-content-trigger">
                                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="20" cy="20" r="20" fill="#E0FD60"/>
                                                            <path d="M20 15.25V25.25M15 20.25H25" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </section>

                        
                        <section className="services-principle borderBlock padding whiteHeader">
                            <h2 className="heading-secondary">Принципы управления<br/> проектами</h2>
                            <div className="services-principle__wrap">
                                <div className="services-principle__wrap-item">
                                    <img src="/img/pentagon.png" alt=""/>
                                    <div>
                                        <p className="l-textMed">Прозрачность</p>
                                        <p className="s-text">
                                            Подробно и понятно рассказываем, что клиент получает по итогам каждого этапа
                                            — держим фокус и не отклоняемся от стратегической цели проекта

                                        </p>
                                    </div>
                                </div>
                                <div className="services-principle__wrap-item">
                                    <img src="/img/octagon.png" alt=""/>
                                    <div>
                                        <p className="l-textMed">Индивидуальность</p>
                                        <p className="s-text">
                                            Всесторонне изучаем рынок и бизнес клиента, предлагаем уникальные решения, шиюко подбираем команду, условия работы и оплаты на основе интересов клиента
                                            </p>
                                        </div>
                                    </div>
                                    <div className="services-principle__wrap-item">
                                        <img src='/img/elipse.png' alt=""/>
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
                                <div className="info">
                                    <h2 className="heading-secondary">
                                        Как мы работаем?
                                    </h2>
                                    <p className="intro s-text">Предлагаем форматы работы с учётом особенностей проекта.
                                        Если разработка требует большей гибкости, миксуем подходы.

                                    </p>
                                </div>
                                <div>
                                    <h2 className="heading-secondary">Команда</h2>
                                    <div className="services-team__wrapper">
                                        {team.filter(team => team.serviceControl).map((team, index) => {
                                            return (
                                                <div className="worker" key={`worker-key-${index}`}>
                                                    <img className="worker-img"
                                                         src={team.image ? `${apiUrl}/uploads/${team.image?.filename}` : null}
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

export default Services
// export default connect(
//     (state) => (
//         {
//             headerData: state.app.headerData,
//             services: state.app.services,
//             projects: state.app.projects,
//             team: state.app.team,
//         }
//     )
// )(Services)
