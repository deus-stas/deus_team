'use client'; // Если вы используете Next.js с папкой `app`

import React, { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
import Link from 'next/link'; // Используем Link из Next.js для навигации
// import Marquee from "react-fast-marquee";
import { Icon } from '../../components/icon/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'reactjs-popup/dist/index.css';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
// import hh from "../../../img/hh_icon.png"
import './agency.scss';
// import TruncatedSentence from "./TruncatedSentence";
// import {useMediaQuery} from "@material-ui/core";
import Marquee from 'react-fast-marquee';
import "./marquee.scss";
import useMobile from "../../components/useMobile";
import {Cursor} from "../../components/cursor/cursor";
import Image from 'next/image';
// import { Marquee as MarqueeTeam} from "@devnomic/marquee";

// import dynamic from 'next/dynamic';
// const Popup = dynamic(() => import('reactjs-popup'), { ssr: false });
// import {useDispatch, useSelector } from 'react-redux';
// import {fetchData } from "../../actions/appActions";


// import InfinitePhotoScroll from './InfinitePhotoScroll';
// import RetryImage from '../../helpers/RetryImage';

const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`; // Укажите URL вашего API


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
    const [team, setTeam] = useState([]);


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

    useEffect(() => {
        axios.get(`${apiUrl}/api/awards/`)
            .then((response) => {
                setAwards(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/diplomas/`)
            .then((response) => {
                setDiplomas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/raitings/`)
            .then((response) => {
                setRaitings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/clients/`)
            .then((response) => {
                setClients(response.data);
                setTotal(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/vacancies/`)
            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
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

    function splitArrayIntoChunks(array, numChunks) {
        const chunkSize = Math.floor(array.length / numChunks); // Определяем размер каждой части
        const totalItems = chunkSize * numChunks; // Определяем общее количество элементов, которое нужно использовать
        const trimmedArray = array.slice(0, totalItems); // Обрезаем массив до нужного размера

        const chunks = Array.from({ length: numChunks }, (_, i) =>
          trimmedArray.slice(i * chunkSize, (i + 1) * chunkSize)
        );
        console.log(chunks);
        return chunks;
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
    const agencyControlTeam = team.filter((item) => !!item.agencyControl)

    const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн,<br/> разработку и интеграции в единую<br/> систему для получения максимальной,<br/> эффективности для вашего бизнеса';
    const size768 = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения<br/> максимальной, эффективности для вашего бизнеса';
    const size360 = 'Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения максимальной, эффективности для вашего бизнеса';

    // const matches1440 = useMediaQuery('(min-width:1025px)');
    // const matches1024 = useMediaQuery('(min-width:940px)');
    // const matches768 = useMediaQuery('(min-width:420px)');
    // const matches360 = useMediaQuery('(min-width:0px)');
    const principleText = '(min-width:1025px)' ? "s-text" : '(min-width:940px)' ? "m-text" : "m-text"

    let text = sizeLarge;
    // if (matches1440 || matches1024) {
    //     text = sizeLarge;
    // } else if (matches768) {
    //     text = size768;
    // } else if (matches360) {
    //     text = size360;
    // }

    const [isMobileNew, setIsMobile] = useState(false);

    useEffect(() => {
        // Определяем размер окна только на клиенте
        const checkIfMobile = () => {
          setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile(); // При монтировании компонента проверим размер экрана
        window.addEventListener('resize', checkIfMobile);  // Добавляем слушатель события resize

        return () => {
          window.removeEventListener('resize', checkIfMobile); // Очищаем слушатель при размонтировании
        };
      }, []); // Этот useEffect будет вызван только один раз после первого рендера на клиенте


    return (
        <>
            {!isLoading &&
            <main className="agency">
                <Cursor/>
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
                            <p className="m-text">50% клиентов приходят<br/> к нам по рекомендации</p>
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
                                    <Link href={`/blog/${award.blogUrl.toLowerCase()}`} className="agency-about__wrapp-btn"
                                                    key={award.id}>
                                        <img src={award.image ? `/uploads/${award.image.filename}` : null}
                                                alt={award.name}/>
                                        <span className="content">
                                            {getAwardIcon(award.name)}
                                                <p className="name m-text">{award.name}</p>
                                        </span>

                                    </Link>
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
                    clients ? <section className="agency-clients" id="clients">
                            <div className="agency-clients__head">
                                <h2 className="heading-secondary">Работаем с разными<br/> клиентами по всему миру</h2>
                                <div className="agency-clients__pag hidden-desktop">
                                </div>
                            </div>

                        {!isMobileNew?

                        <section className="main-clients">

                            {clients && splitArrayIntoChunks(clients,  3).map((row, count) => {
                                return (
                                    <div className={`main-clients__marquee-agency`} key={`row-${count}`}>
                                        <div className="marquee-container-agency">
                                            <Marquee speed={40} loop={0} style={{overflow: 'hidden'}}  gradient={false} direction={count % 2 === 0 ? "right" : 'left'}>
                                                {row.map((client, i) => (
                                                    <div className='agency-clients__img marquee-item' key={client.id || i}>
                                                        <div className='container-img'>
                                                            <img
                                                                src={client.image ? `/uploads/${client.image.filename}` : null}
                                                                alt={client.name} key={client.id}/>
                                                        </div>

                                                    </div>
                                                ))}
                                                {row.map((client, i) => (
                                                    <div className='agency-clients__img marquee-item' key={client.id || i}>
                                                        <div className='container-img'>
                                                            <img
                                                                src={client.image ? `/uploads/${client.image.filename}` : null}
                                                                alt={client.name} key={client.id}/>
                                                        </div>

                                                    </div>
                                                ))}
                                            </Marquee>
                                        </div>


                                    </div>
                                )
                            })}

                        </section>

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
                            {/* <InfinitePhotoScroll photos={team} /> */}

                            <div className="main-clients__marquee">
                                {team && splitArrayIntoChunks(team,  5).map((row, count) => {
                                    console.log(team);
                                    return(
                                        <div className={count % 2 === 0 ? "marquee-container" : 'marquee-container-reverse'}  key={`key-${count}`}>
                                            {row.map((client, i) => (
                                                <div className="main-clients__container" key={client.id || i}>
                                                    <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg?.filename}`: null} alt={client.name} />
                                                </div>
                                            ))}
                                            {row.map((client, i) => (
                                                <div className="main-clients__container" key={client.id || i}>
                                                    <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg.filename}` : null} alt={client.name} />
                                                </div>
                                            ))}
                                            {row.map((client, i) => (
                                                <div className="main-clients__container" key={client.id || i}>
                                                    <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg.filename}` : null} alt={client.name} />
                                                </div>
                                            ))}
                                            {row.map((client, i) => (
                                                <div className="main-clients__container" key={client.id || i}>
                                                    <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg.filename}` : null} alt={client.name} />
                                                </div>
                                            ))}
                                            {row.map((client, i) => (
                                                <div className="main-clients__container" key={client.id || i}>
                                                    <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg.filename}` : null} alt={client.name} />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })}

                            </div>

                            {/* <div
                                className="agency-team__wrap-imgWrap"
                                style={{ maxWidth: '860px', width: '100%', height: "539px"}}>
                                {team && splitArrayIntoChunks(team,  5).map((row, count) => {
                                    return (
                                        <Marquee
                                            key={`row-pepol-${count}`}
                                            speed={40}
                                            loop={0}
                                            gradient={false}
                                            // direction={count % 2 === 0 ? "right" : 'left'}
                                            direction={count % 2 === 0 ? "up" : 'down'}
                                            style={{margin: '0 25px'}}

                                            >
                                            {team.map((item, i) => (
                                                <img
                                                    key={`img-${i}-${count}`}
                                                    className="image"
                                                    style={{margin: '0 25px'}}
                                                    src={`/uploads/${item.mainImg?.filename}`}
                                                    alt={''}
                                                    />
                                            ))}
                                        </Marquee>


                                        // <div
                                        //     className={`main-clients__marquee-agency`}
                                        //     key={`row-pepol-${count}`}
                                        //     style={{ width: '124px' }}
                                        // >
                                        //     <div className="marquee-container-agency">

                                        //     </div>
                                        // </div>
                                    )
                                })}


                            </div> */}

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
                                                        href="mailto:job@de-us.ru">job@de-us.ru</Link></p>
                        </div>
                        <div className="agency-vacancy__wrapper">
                            {vacancies.map((item, i) => {
                                return (
                                    <Link target="_blank" href={item.link} className="agency-vacancy__wrapper-item" key={i}>
                                        <span className="place">
                                            <Icon icon="vacancies" viewBox="0 0 16 16"/>
                                            <p className =
                                                    {
                                                item.place.length > 4
                                                    ? "where s-text big-txt"
                                                    : "where s-text small-txt"
                                            }
                                            >
                                                {item.place}
                                            </p>
                                        </span>
                                        <h3 className="l-textReg">{item.name}</h3>
                                        <p className="s-text type">{item.type}</p>
                                        <div className="arrow">
                                            <Icon icon="arrowVac" viewBox="0 0 24 24"/>
                                        </div>

                                    </Link>
                                )
                            })}
                            <Link className="agency-vacancy__wrapper-item" target="_blank"
                                    href={"https://hh.ru/employer/2174085"}>
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


export default Agency;

