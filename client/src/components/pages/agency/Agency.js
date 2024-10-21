import React, { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { Icon } from '../../icon/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'reactjs-popup/dist/index.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import hh from "../../../img/hh_icon.png"
import './agency.scss';
import {connect} from "react-redux";
import TruncatedSentence from "./TruncatedSentence";
import {useMediaQuery} from "@material-ui/core";
import DelayedLink from "../../appHeader/DelayedLink";
import { Marquee as MarqueeTeam} from "@devnomic/marquee";
import "./marquee.scss";
import {useMobile} from "../projects/projectDetail/ProjectDetail";
import {Cursor} from "../../Cursor/Cursor";


const Agency = (props) => {

    const [awards, setAwards] = useState([]);
    const [diplomas, setDiplomas] = useState([]);
    const [raitings, setRaitings] = useState([]);
    const [clients, setClients] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [showreels, setShowreels] = useState([]);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [current, setCurrent] = useState(4);
    const [total, setTotal] = useState(0);
    const [endSlider, setEndSlider] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(0);
    const [reviews, setReviews] = useState([]);
    const {isTablet, isMobile} = useMobile()

    useEffect(() => {
        axios.get(`/api/awards/`)
            .then((response) => {
                setAwards(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/diplomas/`)
            .then((response) => {
                setDiplomas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/raitings/`)
            .then((response) => {
                setRaitings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/clients/`)
            .then((response) => {
                setClients(response.data);
                setTotal(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/vacancies/`)
            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/reviews/`)
            .then((response) => {
                const reviews = response.data;
                const projectIds = reviews.map((review) => review.reviewProject);
                const serviceIds = reviews.map((review) => review.reviewService);

                Promise.all([
                    axios.get(`/api/projects/?ids=${projectIds.join(',')}`),
                    axios.get(`/api/services/?ids=${serviceIds.join(',')}`)
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


    const slideChange = (slider) => {
        if (slider.touches.diff > 0) {
            if (endSlider) {
                setCurrent(current - 1);
                setEndSlider(false);
            } else {
                setCurrent(current - 2);
            }
        } else {
            if (current + 1 === total) {
                setCurrent(total);
                setEndSlider(true);
            } else {
                setCurrent(current + 2);
            }
        }
    }


    const clientsPerRow = 7;
    const rows = Math.ceil(clients.length / clientsPerRow);

    const double =  <Icon icon="arrowGo" viewBox="0 0 30 30"/>

    const foundShowreel = showreels.find(showreel => showreel.mainShowreel === true);

    const changePerson = (index) => {
        setCurrentPerson(index);
    };

    const sendEmail = async (values) => {
        try {
            const response = await axios.post(`/api/mail`, values);
        } catch (error) {
            console.error(error);
        }
    };
    const {headerData, team } = props;
    const agencyControlTeam = team.filter((item) => !!item.agencyControl)

    const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн,<br/> разработку и интеграции в единую<br/> систему для получения максимальной,<br/> эффективности для вашего бизнеса';
    const size768 = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения<br/> максимальной, эффективности для вашего бизнеса';
    const size360 = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения максимальной, эффективности для вашего бизнеса';

    const matches1440 = useMediaQuery('(min-width:1025px)');
    const matches1024 = useMediaQuery('(min-width:940px)');
    const matches768 = useMediaQuery('(min-width:420px)');
    const matches360 = useMediaQuery('(min-width:0px)');
    const principleText = matches1440 ? "s-text" : matches1024 ? "m-text" : "m-text"

    let text;
    if (matches1440 || matches1024) {
        text = sizeLarge;
    } else if (matches768) {
        text = size768;
    } else if (matches360) {
        text = size360;
    }

    return (
        <>
            <Cursor/>
            {!isLoading &&
        <main className="agency">
            <div className="container">
            <section className="agency-start">
                     <span className="agency-start__text">
                    <p className="breadcrumb">О компании</p>
                    <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: text}}/>
                     </span>
            </section>

                <section id='agency' className="agency-about">
                    <div className="agency-about__wrap">
                        <div className="agency-about__adv-item m-text">
                            <Icon icon="star"></Icon>
                            <p className="m-text">Работаем<br/> с 2016 года</p>
                        </div>
                        <div className="agency-about__adv-item  m-text">
                            <Icon icon="star"></Icon>
                            <p className="m-text">Входим в ТОП-40<br/> креативности студий</p>
                        </div>
                        <div className="agency-about__adv-item  m-text">
                            <Icon icon="star"></Icon>
                            <p className="m-text">Комплексные решения<br/> для различных индустрий</p>
                        </div>
                        <div className="agency-about__adv-item  m-text">
                            <Icon icon="star"></Icon>
                            <p className="m-text">50% клиентов приходят<br/> к нам по рекомендаци</p>
                        </div>
                    </div>
                    {awards &&
                        <div className="agency-about__wrapp whiteHeader">
                            {awards.map(award => {
                                const getAwardIcon = (awardName) => {
                                    const iconMap = {
                                        awwwads: <Icon icon="awwwards" viewBox="0 0 40 40"/>,
                                        ratingruneta: <Icon icon="rating" viewBox="0 0 40 40"/>,
                                        'css design awards': <Icon icon="cssAwards" viewBox="0 0 40 40"/>,
                                    };

                                    const iconName = Object.keys(iconMap).find(key => awardName.toLowerCase().includes(key.toLowerCase()));
                                    if (iconName) {
                                        return iconMap[iconName];
                                    }
                                    return null;
                                };

                                return (
                                    <DelayedLink to={`/news/${award.blogUrl}`} className="agency-about__wrapp-btn"
                                                 key={award.id}>
                                        <img src={award.image ? `/uploads/${award.image.filename}` : null}
                                             alt={award.name}/>
                                        <span className="content">
                                            {getAwardIcon(award.name)}
                                             <p className="name m-text">{award.name}</p>
                                        </span>

                                    </DelayedLink>
                                );
                            })}
                        </div>}

                </section>

            <section id='principle' className="agency-principle">
                    <div className="agency-principle__wrap">
                        <h2 className="heading-secondary">
                           <p className="">
                               Принципы, которых мы<br/> придерживаемся в работе
                           </p>
                        </h2>
                        <div className="agency-principle__wrapp">
                            <div className="agency-principle__wrap-item">
                                <p className="num">01</p>
                                <span className="flex-wrap">
                                    <p className="text l-textMed">Цена слова</p>
                                     <p className={principleText}>Верим в силу рукопожатия. Форма договоренности не имеет значения —
                                    мы выполняем свои обещания. Всегда.</p>
                                </span>
                            </div>
                            <div className="agency-principle__wrap-item">
                                <p className="num">02</p>
                                <span className="flex-wrap">
                                   <p className="text l-textMed">Доверие и ответственность</p>
                                    <p className={principleText}>Основа наших отношений с клиентами — взаимное доверие. Мы всегда
                                    берем на себя ответственность за результат.</p>
                                </span>

                            </div>
                            <div className="agency-principle__wrap-item">
                                <p className="num">03</p>
                                <span className="flex-wrap">
                                    <p className="text l-textMed">Процесс имеет значение</p>
                                    <p className={principleText}>Для нас результаты, достигнутые путем нарушения этических норм,
                                    недопустимы.</p>
                                </span>
                            </div>

                        </div>
                    </div>

            </section>
            {
                clients ? <section className="agency-clients"
                                   id="clients">
                        <div className="agency-clients__head">
                            <h2 className="heading-secondary">Работаем с разными<br/> клиентами по всему миру</h2>
                            <div className="agency-clients__pag hidden-desktop">
                            </div>
                        </div>
                    {!isMobile?
                    <div className="agency-clients__marquee">
                        {[...Array(rows)].map((_, rowIndex) => {
                            const endIndex = (rowIndex + 1) * clientsPerRow
                            const slicedClients = clients.slice(rowIndex * clientsPerRow, (rowIndex + 1) * clientsPerRow)
                            if (clients.length - endIndex < clientsPerRow) {
                                slicedClients.push(clients.slice(endIndex))
                            }
                            if (slicedClients.length < clientsPerRow) {
                                return <></>
                            }
                            return (
                                <MarqueeTeam key={rowIndex} direction={'left'} reverse={rowIndex % 2 !== 0}>
                                    {slicedClients.filter(client => !!client.image).map(client => (
                                        <div className='agency-clients__img'>
                                            <div className='container-img'>
                                                <img
                                                    src={client.image ? `/uploads/${client.image.filename}` : null}
                                                    alt={client.name} key={client.id}/>
                                            </div>

                                        </div>

                                    ))
                                    }
                                </MarqueeTeam>
                            )
                        })}
                    </div>
                        :
                        <div className="agency-swiper">
                        <Swiper
                            slidesPerView={2}
                            grid={{
                                rows: 3,
                            }}

                            spaceBetween={10}
                            modules={[Grid, Pagination]}
                            pagination={{
                                clickable: true,
                                renderBullet: (index, className) => (
                                    `<span class="${className} swiper-pagination-bullet-custom"></span>`
                                ),
                            }}
                            onSlideChange={(e) => slideChange(e)}
                            className="agency-clients__slider"
                        >
                            {
                                clients.map(client => {
                                    return (
                                        <SwiperSlide className="agency-clients__item" key={client.id}>
                                            <div>
                                                <img className='agency-clients__img'
                                                     src={client.image ? `/uploads/${client.image.filename}` : null}
                                                     alt={client.name}/>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        </div>
                    }
                </section> : null
            }

            {team && (
                <section id="agency" className="agency-team borderBlock">
                    <div className="agency-team__wrap">
                        <div className="intro">
                            <p className="heading heading-secondary">Мы уверены, что проекты делают {isTablet? '' :<br/>} не компании, а люди.
                                Поэтому особое внимание уделяем формированию команды.</p>
                            <p className="descr m-text">Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в
                                единую систему для получения максимальной эффективности для вашего бизнеса</p>
                        </div>
                        <div className="agency-team__wrap-imgWrap">
                            {
                                Array.from({ length: 5 }, (_, columnIndex) => {
                                    let count = 0;
                                    return (<MarqueeTeam
                                        key={columnIndex}
                                        className={isTablet ? "animate-marquee-left" : "animate-marquee-up"}
                                        direction={isTablet ? "left" : "up"}
                                        fade={false}
                                        reverse={columnIndex % 2 === 0}
                                    >
                                        {team.filter((value, index) => {
                                            if (index === (columnIndex + count * 5)) {
                                                count++;
                                                return true
                                            }
                                            return false
                                        })
                                            .map((item, index, array) => (
                                                <img
                                                    className="image"
                                                    src={`/uploads/${item.mainImg?.filename}`}
                                                    alt={''}
                                                />

                                            ))
                                        }
                                    </MarqueeTeam>)
                                })
                            }
                        </div>

                    </div>
                </section>
            )}

                {vacancies && (
                    <section id="agency" className="agency-vacancy">
                        <div className="agency-vacancy__wrap">
                            <div className="agency-vacancy__info sticky-h2">
                                <h2 className="heading-secondary">Мы находимся<br/> в постоянном поиске<br/> лучших
                                    специалистов.</h2>
                                <span>
                                <p className="m-text">Не нашли подходящую вакансию?</p>
                                <p className="m-text">Пришлите нам на почту</p>
                            </span>
                                <p className="m-text"><Link className="hoverMail"
                                                        to="mailto:job@de-us.ru">job@de-us.ru</Link></p>
                        </div>
                        <div className="agency-vacancy__wrapper">
                            {vacancies.map((item) => {
                                return (
                                    <Link target="_blank" to={item.link} className="agency-vacancy__wrapper-item">
                                       <span className="place">
                                           <Icon icon="vacancies" viewBox="0 0 16 16"/>
                                           <p className="where s-text">{item.place}</p>
                                       </span>
                                        <h3 className="l-textReg">{item.name}</h3>
                                        <p className="s-text type">{item.type}</p>
                                        <div className="arrow">
                                            <Icon  icon="arrowVac" viewBox="0 0 24 24"/>
                                        </div>

                                    </Link>
                                )
                            })}
                            <Link className="agency-vacancy__wrapper-item" target="_blank"
                                  to={"https://hh.ru/employer/2174085"}>
                                <span className="hh">
                                 <Icon icon="hh" viewBox="0 0 48 49"/>
                                <p className=" m-text">Больше вакансий на hh.ru</p>
                                </span>
                                <div className="arrow">
                                    <Icon icon="arrowVac" viewBox="0 0 24 24"/>
                                </div>
                            </Link>
                        </div>

                        </div>
                    </section>
                )}
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
            team: state.app.team,
        }
    )
)(Agency)
