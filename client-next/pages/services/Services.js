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

                        <section className="services-detail-start">
                            <div className="services-about__wrap">
                                <h1 className="heading-primary">Быстрый запуск сайтов</h1>
                                <div className="services-detail-start__content">
                                    <p  className="services-detail-start__text">Сделаем сайт за несколько недель с минимальными затратами! Идеальное решение для малого бизнеса, стартапов и тех, кто ценит время. Мы разрабатываем сайты на основе готовых шаблонов Аспро, сочетая скорость, качество и индивидуальный подход.</p>
                                    <button className="services-detail-start__btn" type="submit">Расчитать стоимость</button>
                                </div>
                            </div>
                        </section>

                        <section className="services-detail-banner">
                            <img className="services-detail-banner__img" src="img/section-banner/banner.png"/>
                        </section>

                        <section className="services-detail-aspro">
                            <div className="services-detail-aspro__wrap">
                                <div className="services-detail-aspro__title">
                                    <h2 className="heading-secondary">
                                        Почему выбирают шаблоны Аспро?
                                    </h2>
                                    <p className="services-detail-aspro__subtitle">
                                        Мощность системы рассчитана на работу по новым<br/> автомобилям, а также автомобилям с пробегом.
                                    </p>
                                </div>
                                <div className="services-detail-aspro__wrapp">
                                    <div className="services-detail-aspro__wrap-item">
                                        <p className="num">01</p>
                                        <span className="flex-wrap">
                                        <p className="text l-textMed">Экономия времени и бюджета</p>
                                        <p className={principleText}>Готовые решения позволяют запустить сайт за 5-7 дней</p>
                                    </span>
                                    </div>
                                    <div className="services-detail-aspro__wrap-item">
                                        <p className="num">02</p>
                                        <span className="flex-wrap">
                                    <p className="text l-textMed">Современный дизайн</p>
                                        <p className={principleText}>Адаптивные шаблоны с мобильной версией и чистым кодом.</p>
                                    </span>

                                    </div>
                                    <div className="services-detail-aspro__wrap-item">
                                        <p className="num">03</p>
                                        <span className="flex-wrap">
                                        <p className="text l-textMed">SEO-оптимизация</p>
                                        <p className={principleText}>Базовая настройка под требования поисковых систем.</p>
                                    </span>
                                    </div>
                                    <div className="services-detail-aspro__wrap-item">
                                        <p className="num">04</p>
                                        <span className="flex-wrap">
                                    <p className="text l-textMed">Простота управления</p>
                                        <p className={principleText}>Интуитивная CMS для самостоятельного обновления контента.</p>
                                    </span>

                                    </div>
                                    <div className="services-detail-aspro__wrap-item">
                                        <p className="num">05</p>
                                        <span className="flex-wrap">
                                        <p className="text l-textMed">Безопасность</p>
                                        <p className={principleText}>Надежная платформа с защитой от угроз.</p>
                                    </span>
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section className="services-detail-type">
                            <div className="services-detail-type__wrap">
                                <div className="services-detail-type__title">
                                    <h2 className="heading-secondary">
                                        Что входит в услугу?
                                    </h2>
                                    <p className="services-detail-aspro__subtitle">
                                        Прозрачность — наш принцип. Каждый<br/> компонент услуги продуман до мелочей, чтобы<br/> вы чувствовали уверенность на каждом шагу.
                                    </p>
                                    <button className="services-form__btn --accent" type="submit">Расчитать стоимость</button>
                                </div>
                                <div className="services-detail-type__info">
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Подбор шаблона
                                        </div>
                                        <div className="type-item__bottom">
                                            <div className="type-item__subtitle">Выбор дизайна, соответствующего тематике вашего бизнеса.</div>
                                        </div>
                                    </div>
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Индивидуальная настройка
                                        </div>
                                        <div className="type-item__bottom">
                                            <div className="type-item__subtitle">Изменение цветов, шрифтов, добавление логотипа и фирменного стиля.</div>
                                        </div>
                                    </div>
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Наполнение контентом
                                        </div>
                                        <div className="type-item__bottom">
                                            <div className="type-item__subtitle">Размещение текстов, фото, видео и товаров (при необходимости).</div>
                                        </div>
                                    </div>
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Интеграция сервисов
                                        </div>
                                        <div className="type-item__bottom">
                                            <div className="type-item__subtitle">Подключение форм обратной связи, соцсетей, онлайн-чата, Яндекс.Метрики и Google Analytics.</div>
                                        </div>
                                    </div>
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Тестирование и запуск
                                        </div>
                                        <div className="type-item__bottom">
                                            <div className="type-item__subtitle">Проверка на всех устройствах и браузерах, исправление ошибок.</div>
                                        </div>
                                    </div>
                                    <div className="services-detail-type__item type-item">
                                        <div className="type-item__title">
                                            Дополнительные опции
                                        </div>
                                        <div className="type-item__bottom">
                                            <ul className="type-item__sub-list">
                                                <li className="type-item__sub-item">Продвинутая SEO-оптимизация.</li>
                                                <li className="type-item__sub-item">Настройка онлайн-оплаты или интеграция с CRM.</li>
                                                <li className="type-item__sub-item">Регулярная техническая поддержка.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="services-detail-type__bg">
                                    <img className="services-detail-type__img" src="img/services-detail/bg-1.svg"/>
                                </div>
                            </div>
                        </section>

                        <section className="services-detail-price">
                            <div className="services-detail-price__wrapp borderBlock padding">
                                <div className="services-detail-price__wrapp-item">
                                    <div className="describe">
                                        <div className="describe__top">
                                            <h2 className="heading-secondary">
                                                Примерная стоимость
                                            </h2>
                                            <div className="describe__wrapp ">
                                                <p className="s-text">
                                                    Объединяем аналитику, маркетинг, дизайн, разработку<br/> и интеграции в единую систему для получения<br/> максимальной эффективности для вашего бизнеса
                                                </p>
                                            </div>
                                        </div>
                                        <button className="services-form__btn --accent" type="submit">Расчитать стоимость</button>
                                    </div>
                                    <div className="describe__wrapp-benefits">
                                        <div className="describe__wrapp-benefits__item">
                                            <p className="num m-text">01</p>
                                            <div className="tariffs">
                                                <span className="tariffs__span">

                                                    <p className="m-text">Интернет магн</p>
                                                </span>
                                                <p className="price s-text">
                                                    от 250 000₽ / от 24 дней
                                                </p>
                                            </div>
                                        </div>
                                        <div className="describe__wrapp-benefits__item">
                                            <p className="num m-text">02</p>
                                            <div className="tariffs">
                                                <span className="tariffs__span">

                                                    <p className="m-text">Графический дизайн</p>
                                                </span>
                                                <p className="price s-text">
                                                    от 250 000₽ / от 24 дней
                                                </p>
                                            </div>
                                        </div>
                                        <div className="describe__wrapp-benefits__item">
                                            <p className="num m-text">03</p>
                                            <div className="tariffs">
                                                <span className="tariffs__span">

                                                    <p className="m-text">Веб-дизайн</p>
                                                </span>
                                                <p className="price s-text">
                                                    от 250 000₽ / от 24 дней
                                                </p>
                                            </div>
                                        </div>
                                        <div className="describe__wrapp-benefits__item">
                                            <p className="num m-text">04</p>
                                            <div className="tariffs">
                                                <span className="tariffs__span">

                                                    <p className="m-text">Дизайн-поддержка</p>
                                                </span>
                                                <p className="price s-text">
                                                    от 250 000₽ / от 24 дней
                                                </p>
                                            </div>
                                        </div>
                                        <div className="describe__wrapp-benefits__item">
                                            <p className="num m-text">05</p>
                                            <div className="tariffs">
                                                <span className="tariffs__span">

                                                    <p className="m-text">Motion-дизайн</p>
                                                </span>
                                                <p className="price s-text">
                                                    от 250 000₽ / от 24 дней
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="services-detail-cases">
                            <div className="services-detail-cases__wrap cases-wrap">
                                <div className="cases-wrap__header">
                                    <h2 className="heading-secondary">Кейсы</h2>
                                    <a href="#" className="article__link">Все кейсы</a>
                                </div>
                                <div className="cases-wrap__body">
                                    <div className="cases-wrap__item">
                                        <img className="cases-wrap__img" src="img/cases/1.png"/>
                                        <div className="cases-wrap__info">
                                            <div className="cases-wrap__subtitle">2023 • Embryo</div>
                                            <div className="cases-wrap__title">Мы гордимся каждым выполненным проектом</div>
                                        </div>
                                    </div>
                                    <div className="cases-wrap__item">
                                        <img className="cases-wrap__img" src="img/cases/2.png"/>
                                        <div className="cases-wrap__info">
                                            <div className="cases-wrap__subtitle">2023 • Embryo</div>
                                            <div className="cases-wrap__title">Мы гордимся каждым выполненным проектом</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="services-detail-faq">
                            <div className="services-detail-faq__wrap faq-wrap">
                                <div className="faq-wrap__info">
                                    <h2 className="heading-secondary">Часто задаваемые вопросы</h2>
                                    <div className="faq-wrap__subtitle">Если вы не нашли ответ на ваш вопрос напишите нашему руководителю и он на них ответит</div>
                                    <div className="faq-wrap__person">
                                        <img className="faq-wrap__person-img" src="img/faq/1.png"/>
                                        <div className="faq-wrap__person-info">
                                            <div className="faq-wrap__person-name">Брижань Вячеслав</div>
                                            <div className="faq-wrap__person-work">Генеральный директор</div>
                                        </div>
                                    </div>
                                    <div className="faq-wrap__btns">
                                        <a className="faq-wrap__btn -tg">
                                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.755 0.719483C15.5598 0.479724 15.2667 0.347656 14.9296 0.347656C14.7478 0.347656 14.5552 0.38572 14.3571 0.460754L0.81115 5.59313C0.0909044 5.86608 -0.00603664 6.27694 0.000276097 6.49754C0.00655758 6.71705 0.125656 7.11875 0.85062 7.35063L3.72338 8.40339L5.23741 11.8691C5.3896 12.3484 5.70761 12.6846 6.1135 12.7937C6.20707 12.8189 6.3026 12.8312 6.39883 12.8312C6.72846 12.8312 7.06598 12.6861 7.35745 12.4123L8.61181 11.2338L11.6724 13.3404C11.948 13.5441 12.2479 13.6517 12.5404 13.6516C13.134 13.6516 13.6074 13.2171 13.7465 12.5446L15.9619 1.82977C16.053 1.38941 15.9795 0.995118 15.755 0.719483ZM4.67545 8.24073L8.58469 6.14437L5.86021 8.64349C5.76321 8.73247 5.70918 8.85782 5.70902 8.98845C5.70883 8.99326 5.70824 8.99795 5.70821 9.00276L5.6988 10.5832L4.67545 8.24073ZM6.71556 11.729C6.68665 11.7561 6.65768 11.78 6.62905 11.8008L6.64052 9.87695L7.82153 10.6899L6.71556 11.729ZM15.0438 1.63992L12.8284 12.3548C12.8061 12.4628 12.7332 12.7141 12.5403 12.7141C12.4502 12.7141 12.3385 12.6677 12.2257 12.5835C12.2208 12.5799 12.2159 12.5764 12.2109 12.573L8.83679 10.2505C8.83632 10.2502 8.83585 10.2499 8.83542 10.2496L6.92772 8.93651L11.9671 4.31396C12.1413 4.15424 12.1693 3.88988 12.0325 3.69719C11.8957 3.50449 11.6369 3.44374 11.4287 3.5554L4.03643 7.51961L1.1636 6.46685C1.16151 6.46607 1.15941 6.46532 1.15729 6.46457L14.6893 1.33747C14.8034 1.29425 14.883 1.28519 14.9296 1.28519C14.9528 1.28519 15.0087 1.28775 15.0281 1.3115C15.0528 1.34191 15.084 1.44532 15.0438 1.63992Z" fill="white"/>
                                            </svg>
                                            <span>Telegram</span>
                                        </a>
                                        <a className="faq-wrap__btn -wa">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_5119_21830)">
                                                    <path d="M10.1395 12.5702C9.84455 12.5702 9.52789 12.5348 9.19293 12.4629C8.06708 12.2217 6.83808 11.5913 5.73212 10.6879C4.62628 9.7843 3.76447 8.70667 3.30573 7.65332C2.80243 6.49805 2.83295 5.48718 3.39142 4.80701C3.40766 4.78748 3.40766 4.78748 4.36237 3.81738L4.74408 3.42969L6.85199 6.22522L6.10785 7.13147C6.4704 7.63269 6.89887 8.16724 7.43939 8.60889C7.97992 9.05054 8.58991 9.36414 9.15399 9.62L9.90363 8.70715L13.0184 10.282L12.7205 10.7212C11.9897 11.7992 11.9897 11.7992 11.9732 11.8191C11.5666 12.3142 10.9317 12.5702 10.1395 12.5702ZM4.10529 5.41382C3.79718 5.80505 3.81854 6.48413 4.16547 7.28076C4.5661 8.20032 5.33344 9.15344 6.32624 9.96448C7.31903 10.7755 8.40705 11.3381 9.38983 11.5487C10.2407 11.7311 10.9121 11.6184 11.2368 11.24C11.2831 11.1718 11.4586 10.9132 11.6462 10.6366L10.1517 9.88086L9.42792 10.7621L9.1026 10.6205C8.39765 10.3135 7.5838 9.93542 6.8454 9.33228C6.107 8.729 5.57514 8.00757 5.13458 7.37878L4.93134 7.0885L5.66046 6.20056L4.64984 4.86023C4.39984 5.11426 4.16486 5.35303 4.10529 5.41382Z" fill="white"/>
                                                    <path d="M0.0104981 16L1.49402 12.6229C0.515625 11.2638 0 9.66431 0 7.97925C0 5.8479 0.832153 3.84412 2.34314 2.33704C3.85413 0.829956 5.86316 0 8 0C10.1368 0 12.1459 0.829956 13.6569 2.33704C15.1678 3.84412 16 5.8479 16 7.97925C16 10.1106 15.1678 12.1144 13.6569 13.6215C12.1459 15.1285 10.1368 15.9585 8 15.9585C6.47449 15.9585 5 15.5317 3.72046 14.7219L0.0104981 16ZM3.85352 13.6869L4.04761 13.818C5.21631 14.6066 6.58301 15.0236 8 15.0236C9.88647 15.0236 11.66 14.2908 12.994 12.9603C14.3279 11.6298 15.0625 9.86084 15.0625 7.97925C15.0625 6.09778 14.3279 4.32874 12.9939 2.99829C11.66 1.66785 9.88647 0.935059 8 0.935059C6.11353 0.935059 4.33997 1.66785 3.0061 2.99829C1.67212 4.32874 0.9375 6.09766 0.9375 7.97925C0.9375 9.54944 1.44458 11.0354 2.40393 12.2762L2.57349 12.4956L1.72864 14.4188L3.85352 13.6869Z" fill="white"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_5119_21830">
                                                        <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="faq-wrap__list">
                                    <div className="faq-wrap__item">
                                        <div className="faq-wrap__top">
                                            <div className="faq-wrap__title">Можно ли запустить интернет магазин за 1 месяц?</div>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="20" cy="20" r="20" fill="#EEEEEE"/>
                                                <path d="M15 20.25H25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="faq-wrap__content">Да, можно, но с ограниченным функционалом</div>
                                    </div>
                                    <div className="faq-wrap__item">
                                        <div className="faq-wrap__top">
                                            <div className="faq-wrap__title">Можно ли запустить интернет магазин за 1 месяц?</div>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="20" cy="20" r="20" fill="#E0FD60"/>
                                                <path d="M20 15.25V25.25M15 20.25H25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="faq-wrap__content">Да, можно, но с ограниченным функционалом</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="services-detail-why-us">
                            <div className="services-detail-why-us__wrap why-us padding borderBlock">
                                <h2 className="heading-secondary">Почему стоит выбрать нас?</h2>
                                <div className="why-us__body">
                                    <div className="why-us__item">
                                        <div className="why-us__number">
                                            <div className="why-us__number-value">01</div>
                                            <img className="why-us__number-bg" src="img/why-us/1.svg"/>
                                        </div>
                                        <div className="why-us__info">
                                            <div className="why-us__title">Гарантия соблюдения сроков</div>
                                            <div className="why-us__subtitle">Мы гарантируем четкое следование утвержденным срокам, чтобы проект был завершен точно в срок. Каждый этап работ планируется детально, а процесс контролируется на всех стадиях — это позволяет избежать задержек и обеспечить прозрачность выполнения задач.</div>
                                        </div>
                                    </div>
                                    <div className="why-us__item">
                                        <div className="why-us__number">
                                            <div className="why-us__number-value">02</div>
                                            <img className="why-us__number-bg" src="img/why-us/1.svg"/>
                                        </div>
                                        <div className="why-us__info">
                                            <div className="why-us__title">Экспертный подход</div>
                                            <div className="why-us__subtitle">Над вашим проектом работают сертифицированные специалисты 1С-Битрикс с глубоким опытом в разработке. Мы фокусируемся на качестве, инновационных решениях и полном соответствии требованиям клиента, чтобы результат превзошел ожидания.</div>
                                        </div>
                                    </div>
                                    <div className="why-us__item">
                                        <div className="why-us__number">
                                            <div className="why-us__number-value">03</div>
                                            <img className="why-us__number-bg" src="img/why-us/1.svg"/>
                                        </div>
                                        <div className="why-us__info">
                                            <div className="why-us__title">Прозрачность коммуникации</div>
                                            <div className="why-us__subtitle">Вы всегда в курсе прогресса: мы предоставляем регулярные отчеты, фиксируем этапы и оперативно отвечаем на вопросы. Наши клиенты получают полный доступ к информации о проекте — от технических нюансов до стратегических решений.</div>
                                        </div>
                                    </div>
                                    <div className="why-us__item">
                                        <div className="why-us__number">
                                            <div className="why-us__number-value">04</div>
                                            <img className="why-us__number-bg" src="img/why-us/1.svg"/>
                                        </div>
                                        <div className="why-us__info">
                                            <div className="why-us__title">Безопасность обновлений и сопровождение</div>
                                            <div className="why-us__subtitle">Мы сохраняем архитектуру вашего сайта и системы в соответствии с требованиями 1С-Битрикс. Это позволяет беспрепятственно получать технические обновления, обеспечивать стабильность работы и пользоваться официальной поддержкой платформы даже после завершения проекта.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                            <Link href={`/projects/type/${service.path.toLowerCase()}`}
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
                                                        <p className="s-text">
                                                            {service.descr}
                                                        </p>
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
                                                            <path d="M20 15.25V25.25M15 20.25H25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
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

                        <section className="services-form borderBlock padding whiteHeader">
                            <h2 className="heading-secondary">Вам интересно, но нужно больше конкретики?</h2>
                            <form className="services-form__form">

                                <div className="services-form__title">Выберите услугу</div>

                                <div className="services-form__btns">
                                    <button type="button" className="services-form__btn" data-service="Услуга 1">Дизайн
                                    </button>
                                    <button type="button" className="services-form__btn" data-service="Услуга 2">Сайты и сервисы
                                    </button>
                                    <button type="button" className="services-form__btn" data-service="Услуга 3">SEO
                                    </button>
                                    <button type="button" className="services-form__btn" data-service="Услуга 1">Видеопродакшн
                                    </button>
                                    <button type="button" className="services-form__btn" data-service="Услуга 2">Контент-маркетинг
                                    </button>
                                    <button type="button" className="services-form__btn" data-service="Услуга 3">Техническая поддержка
                                    </button>
                                </div>

                                <input type="hidden" name="service" id="service-input" required/>

                                <input type="text" name="name" placeholder="Ваше имя" required/>
                                <input type="tel" name="phone" placeholder="Номер телефона" required pattern="[\d\+\-\(\) ]+"/>

                                <button className="services-form__btn --accent" type="submit">Отправить заявку</button>
                            </form>
                        </section>

                        <section className="services-article article">
                            <div className="article__header">
                                <h2 className="heading-secondary">Полезные статьи</h2>
                                <a href="#" className="article__link">Все статьи</a>
                            </div>
                            <div className="article__body">
                                <div className="article__list">
                                    <div className="article__item">
                                        <div className="article__picture">
                                            <img className="article__img" src="img/article/article1.png"/>
                                        </div>
                                        <div className="article__subtitle">Советы эксперта</div>
                                        <div className="article__title">Внутренний проект менеджер: необходимые знания, навыки, качества и как искать идеального ПМа</div>
                                    </div>
                                    <div className="article__item">
                                        <div className="article__picture">
                                            <img className="article__img" src="img/article/article2.png"/>
                                        </div>
                                        <div className="article__subtitle">SEO</div>
                                        <div className="article__title">Как выбрать разработчика сайта</div>
                                    </div>
                                    <div className="article__item">
                                        <div className="article__picture">
                                            <img className="article__img" src="img/article/article3.png"/>
                                        </div>
                                        <div className="article__subtitle">Инсайты</div>
                                        <div className="article__title">Честный ритейл: какие магазины интересны налоговой и как не нарушить права клиентов</div>
                                    </div>
                                    <div className="article__item">
                                        <div className="article__picture">
                                            <img className="article__img" src="img/article/article4.png"/>
                                        </div>
                                        <div className="article__subtitle">Приколы</div>
                                        <div className="article__title">Как развивать E-commerce-направление в 2023 году</div>
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
