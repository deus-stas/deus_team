import React, { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper";
import { Icon } from '../../icon/Icon';
import agencyBanner from "../../../img/agency-main.mp4"
import 'reactjs-popup/dist/index.css';
import "swiper/css";
import "swiper/css/grid";
import './agency.scss';
import {connect} from "react-redux";
import TruncatedSentence from "./TruncatedSentence";



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

    const amountSlides = Math.round(clients.length / 3);

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
    return (
        <>
            {!isLoading &&
        <main className="agency" style={{padding:"inherit"}}>

            <section className="agency-start whiteHeader">
                <div className="agency-start__video">
                    <video autoPlay playsInline muted loop>
                        <source src={agencyBanner} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                    </video>
                </div>
                <div className="container">
                    <h1 className="heading-primary">Помогаем выделиться вашему бренду в цифровом пространстве</h1>
                </div>

                {/*{*/}
                {/*    foundShowreel ? <Showreel data={foundShowreel} key={foundShowreel.id} isMain={true} /> : null*/}
                {/*}*/}
            </section>

            <section id='agency' className="agency-about">
                <div className="container">
                    <h2 className="heading-secondary">О компании</h2>
                    <div className="agency-about__wrap">
                        <div className="agency-about__descr">Объединяем аналитику, маркетинг, дизайн, разработку и
                            интеграции в единую
                            систему для получения максимальной эффективности для вашего бизнеса
                        </div>
                        <div className="agency-about__adv hidden-mobile">
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Работаем<br/> с 2016 года
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Входим в ТОП-40<br/> креативности студий
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Комплексные решения<br/> для различных индустрий
                            </div>
                        </div>

                        <div className="agency-about__adv hidden-desktop">
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Работаем с 2016 года
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Входим в ТОП-40<br/> креативности студий
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Комплексные решения для<br/> различных индустрий
                            </div>
                        </div>
                        {/* <Link className="btn --circle --orange">Презентация агентства</Link> */}

                        {  headerData && headerData.presentation &&
                            <div className="presentation hidden-mobile">
                                <Link to={`/uploads/${headerData.presentation.filename}`}
                                      target='_blank'
                                      className="agency-about__pdf"
                                      rel="noopener noreferrer">
                                    <Icon icon="pdf" viewBox="0 0 24 24"/>

                                </Link>
                                <p>Скачать презентацию</p>
                            </div>

                        }


                        {/*{*/}
                        {/*    headerData && headerData.presentation ?*/}
                        {/*        <div className="hidden-mobile" style={{*/}
                        {/*            width: "20rem",*/}
                        {/*            height: "20rem", marginTop: "auto",*/}
                        {/*            marginLeft: "auto"*/}
                        {/*        }}>*/}

                        {/*            <a href={`/uploads/${headerData.presentation.filename}`}*/}
                        {/*               target='_blank'*/}
                        {/*               rel="noopener noreferrer"*/}
                        {/*               className="btn --circle --dark hidden-mobile"*/}
                        {/*            ><Icon icon="pdf" viewBox="0 0 24 24"/>Скачать презентацию</a>*/}

                        {/*        </div>*/}
                        {/*        :*/}


                        {/*        <a href={`/uploads/DEUS.pdf`} target='_blank' rel="noopener noreferrer"*/}
                        {/*           className=" hidden-mobile"*/}
                        {/*        > <Icon icon="pdf" viewBox="0 0 24 24"/> Скачать презентацию</a>*/}


                        {/*}*/}

                    </div>

                    {
                        awards && (awards[0] ? awards[0].controlVisibility : null) ?
                            <div className="agency-about__wrapp">
                                <div></div>
                                <div className="agency-about__wrapp-item">
                                    {
                                        awards.map(award => {
                                            return (
                                                <div className="agency-about__wrapp-btn" key={award.id}>
                                                    <img src={award.image ? `/uploads/${award.image.filename}` : null}
                                                         alt={award.name}/>
                                                    <p>{award.name}</p>
                                                            <div className="hover-flip-arrow">
                                                                <span>
                                                                    <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                                    <div className="hover-double">
                                                                       {double}
                                                                     </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                            {
                                                raitings.map(raiting => (
                                                        <div className="agency-about__wrapp-btn" key={raiting.id}>
                                                            <img
                                                                src={raiting.image ? `/uploads/${raiting.image.filename}` : null}
                                                                alt={raiting.name}/>
                                                            {raiting.name}
                                                            <div className="hover-flip-arrow">
                                                                <span>
                                                                    <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                                    <div className="hover-double">
                                                                       {double}
                                                                     </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>

                                    </div>
                            : null
                    }
                    {/*<div className="agency-about__showreels hidden-desktop hidden-mobile">*/}
                    {/*    {*/}
                    {/*        showreels ? showreels.map(showreel => {*/}
                    {/*            return(*/}
                    {/*                showreel.mainShowreel === false || showreel.mainShowreel === "false" ? */}
                    {/*                 <Showreel data={showreel} key={showreel.id} isMain={false}/> : null*/}
                    {/*            )*/}
                    {/*        }) : null*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
            </section>
            <section id='agency' className="agency-workers whiteHeader">
                {/*<img src={chiefTeam} alt="" className="chief-team hidden-mobile"/>*/}
                {/*<img src={chiefMob} alt="" className="chief-team hidden-desktop"/>*/}
                <div className="agency-workers__main gradient">


                <div className="agency-workers__wrap container">
                    {agencyControlTeam.map((item, index) => (
                        <img
                            className={`bgPerson ${index === currentPerson ? 'visible' : 'hidden'}`}
                            alt="person"
                            src={`/uploads/${item.image.filename}`}
                        />
                    ))}
                        <span className="agency-workers__wrap-item">
                           <h2 className="heading-secondary">Объединяем аналитику, маркетинг,<br/> дизайн, разработку и интеграции в<br/> единую
                            систему для получения<br/> максимальной эффективности для<br/> вашего бизнеса
                           </h2>
                            {agencyControlTeam.filter((item, index) => index === currentPerson)
                                .map((item, index) => (
                                    <span className={index === currentPerson ? 'activeInfo visible' : ''}>
                                <p className="p-style-white" >{item.name}</p>
                                <p className="descr-name">{item.post}</p>
                                <p className="descr-name">{item.sign}</p>
                            </span>
                                ))}
                        </span>
                    <div className="agency-workers__wrap-person">
                        {agencyControlTeam.map((item, index) => (
                            <>
                                <img
                                    src={`/uploads/${item.mainImg.filename}`}
                                    alt=""
                                    className={`person-img ${index === currentPerson ? 'active' : ''}`}
                                    onClick={() => {
                                        changePerson(index)
                                    }}
                                />
                            </>

                        ))}
                    </div>
                </div>
                </div>

            </section>
            <section id='principle' className="agency-principle">
                <div className="container">
                    <div className="agency-principle__wrap">
                        <h2 className="heading-secondary">
                           <p className="sticky-h2">
                               Принципы нашей работы
                           </p>
                        </h2>
                        <div>
                            <div className="agency-principle__wrap-item" >
                                <span className="flex-wrap" >
                                    <p className="num">01</p>
                                    <p>Держим слово</p>
                                </span>
                                <p>Выполняем свои обязательства и обещания вне зависимости от формы договоренности</p>
                            </div>
                            <div className="agency-principle__wrap-item">
                                <span className="flex-wrap">
                                    <p  className="num">02</p>
                                    <p>Фокусируемся на взаимном доверии</p>
                                </span>
                                <p>Несем ответственность за результат на всех этапах работы</p>
                            </div>
                            <div className="agency-principle__wrap-item">
                                <span className="flex-wrap">
                                    <p  className="num">03</p>
                                    <p>Соблюдаем этичный подход</p>
                                </span>
                                <p>Дорожим репутацией и достигаем успешного результата, используя только прозрачные и добросовестные методы работы</p>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            {/*{*/}
            {/*    diplomas && (diplomas[0] ? diplomas[0].controlVisibility : null) ? <section className="agency-benefits" id="diplomas">*/}
            {/*        <div className="container">*/}
            {/*            <Tabs className="agency-benefits__wrap" selectedTabClassName="active">*/}
            {/*                <TabList className="agency-benefits__info">*/}
            {/*                    <h2 className="heading-secondary">Дипломы и бейжи</h2>*/}
            {/*                    <div className="agency-benefits__info-wrap">*/}
            {/*                        {*/}
            {/*                            diplomas.map(diploma => {*/}
            {/*                                return (*/}
            {/*                                    <Tab className="agency-benefits__info-btn" key={diploma.id}>*/}
            {/*                                        <img src={diploma.image ? `${apiUrl}/uploads/${diploma.image.filename}` : null} alt={diploma.name} />*/}
            {/*                                        {diploma.name} <sup>{diploma.diplomaProject.length}</sup>*/}
            {/*                                    </Tab>*/}
            {/*                                )*/}
            {/*                            })*/}
            {/*                        }*/}
            {/*                    </div>*/}
            {/*                </TabList>*/}
            {/*                <div className="agency-benefits__tabs">*/}
            {/*                    {*/}
            {/*                        diplomas.map(diploma => {*/}
            {/*                            return (*/}
            {/*                                <TabPanel className="agency-benefits__content" key={diploma.id}>*/}
            {/*                                    <div className="agency-benefits__content-wrap">*/}
            {/*                                        {*/}
            {/*                                            diploma.diplomaProject.map((project, i) => {*/}
            {/*                                                return (*/}
            {/*                                                    <div className="agency-benefits__item" key={i}>*/}
            {/*                                                        <div className="agency-benefits__name">{project.diplomaName}</div>*/}
            {/*                                                        <div className="agency-benefits__descr">{project.diplomaPlace}</div>*/}
            {/*                                                        <div className="agency-benefits__year">{project.diplomaYear}</div>*/}
            {/*                                                    </div>*/}
            {/*                                                )*/}
            {/*                                            })*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                </TabPanel>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*            </Tabs>*/}
            {/*        </div>*/}
            {/*    </section>*/}
            {/*        : null*/}
            {/*}*/}

            {
                clients ? <section className="agency-clients whiteHeader"
                                   id="clients">
                    <div className="container">
                        <div className="agency-clients__head">
                            <h2 className="heading-secondary">Наши клиенты</h2>
                            <div className="agency-clients__pag hidden-desktop">
                                {/*<div className="agency-clients__pag-current">{current}</div>*/}
                                {/*<div className="agency-clients__pag-sep">/</div>*/}
                                {/*<div className="agency-clients__pag-total">{total}</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="agency-clients__marquee hidden-mobile">

                        <Marquee speed="40">
                            {
                                clients.map((client, i) => {
                                    if (i < amountSlides) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                        <Marquee direction='right' speed="40">
                            {
                                clients.map((client, i) => {
                                    if (i > amountSlides - 1 && i < amountSlides * 2) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                        <Marquee speed="20">
                            {
                                clients.map((client, i) => {
                                    if (i > amountSlides * 2 - 1) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                    </div>
                    <Swiper
                        slidesPerView={2}
                        grid={{
                            rows: 7,
                        }}
                        spaceBetween={10}
                        modules={[Grid]}
                        onSlideChange={(e) => slideChange(e)}
                        className="agency-clients__slider">
                        {
                            clients.map(client => {
                                return (
                                    <SwiperSlide className="agency-clients__item" key={client.id}><img className='agency-clients__img' src={client.image ? `/uploads/${client.image.filename}` : null} alt={client.name} /></SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </section> : null
            }

            {reviews && (
            <section id='agency' className="agency-reviews">
                <div className="container">
                    <h2 className="heading-secondary">Клиенты о нас</h2>
                    <div className="agency-reviews__wrap">
                        {reviews.map((item)=>{
                            return(
                                <div className="agency-reviews__wrap-item">
                                    <img alt="" src={`/uploads/${item.reviewBg.filename}`}/>
                                    <p className="p-style-black"><TruncatedSentence sentence={item.review}/></p>
                                    <div className="mr-t">
                                        <p>{item.reviewName}</p>
                                        <p>{item.reviewPost}</p>

                                    </div>
                                    {item.reviewFile.filename && (<Link className="agency-reviews__wrap-arrow"
                                            to={`/uploads/${item.reviewFile.filename}#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0`}
                                            target="_blank">
                                           <Icon icon="pdf" viewBox="0 0 24 24"/>
                                    </Link>
                                    )}
                                </div>
                            )
                        })}



                    </div>
                </div>

            </section>
            )}

            {vacancies && (
            <section id="agency" className="agency-vacancy">
                <div className="container">
                    <div className="agency-vacancy__wrap">
                        <h2 className="heading-secondary">Вакансии</h2>
                        <span>
                            <h2 className="heading-tertiary">Мы находимся в постоянном поиске<br/> лучших специалистов.</h2>
                            <Link  target="_blank" to={"https://hh.ru/employer/2174085"}><p className="p-style-grey pt-15">Больше вакансий на hh.ru</p></Link>
                        </span>
                    </div>
                    <div className="agency-vacancy__table">
                        {vacancies.map((item)=> {
                            return (
                            <Link target="_blank" to={item.link} className="agency-vacancy__table-item">
                                <h3 className="heading-tertiary">
                                   {item.name}
                                </h3>
                                <div className="flex-sb">
                                    <p className="p-style-black" style={{fontWeight: "400"}}>{item.place}</p>
                                    <div className="hover-flip-arrow">
                                   <span>
                                       <Icon icon="arrowGo" viewBox="0 0 30 30"/>
                                       <div className="hover-double">
                                           {double}
                                       </div>
                                   </span>
                                    </div>
                                </div>
                            </Link>
                            )
                        })}


                    </div>
                    <div className="agency-vacancy__wrap">
                        <div></div>
                        <span>
                            <h2 className="heading-tertiary">Не нашли подходящую вакансию?</h2>
                            <p className="p-style-grey pb-30">Пришлите нам резюме</p>
                            <h2 className="heading-secondary job"><Link className="hoverMail" to="mailto:job@de-us.ru">job@de-us.ru</Link></h2>
                            <p className="p-style-grey">Присоединиться к команде</p>
                        </span>
                    </div>

                </div>
            </section>
            )}

            {/*<section className="agency-team" id="team">*/}
            {/*    <div className="container">*/}
            {/*        <div className="agency-team__wrap">*/}
                        {/*<div className="agency-team__t  wow fadeInDown"*/}
                        {/*     data-wow-offset="100"*/}
                        {/*     data-wow-duration="0.5s"*/}
                        {/*     data-wow-delay="0.1s">*/}
                        {/*    <h2 className="heading-secondary">Команда мечты</h2>*/}
                        {/*    <div className="agency-team__t-content">*/}
                        {/*        {*/}
                        {/*            team ? team.sort((a, b) => a.priority - b.priority).map((item,index) => {*/}
                        {/*                const teamDelay = index< 1 ? 0.1 : (index+1)* 0.1*/}
                        {/*                return (*/}
                        {/*                    <div className="agency-team__t-item wow fadeInDown"*/}
                        {/*                         data-wow-offset="100"*/}
                        {/*                         data-wow-duration="0.3s"*/}
                        {/*                         data-wow-delay={`${teamDelay}s`}*/}
                        {/*                         key={item.id}>*/}
                        {/*                        <div className="agency-team__t-name">{item.name}</div>*/}
                        {/*                        <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null} alt={item.name} className="agency-team__t-img wow  fadeInDown"*/}
                        {/*                             data-wow-offset="50"*/}
                        {/*                             data-wow-duration="0.8s"*/}
                        {/*                             data-wow-delay={`${teamDelay}s`} />*/}
                        {/*                        <div className="agency-team__t-post">{item.post}</div>*/}
                        {/*                    </div>*/}
                        {/*                )*/}
                        {/*            }) : null*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="agency-team__content wow fadeIn"*/}
                        {/*     data-wow-offset="100"*/}
                        {/*     data-wow-duration="0.5s"*/}
                        {/*     data-wow-delay="0.1s"*/}
                        {/*     id='vacancies'>*/}

                            {/*{*/}
                            {/*    vacancies.length ?*/}
                            {/*        <div className="agency-team__talent">*/}
                            {/*            <h2 className="heading-secondary">Ищем таланты</h2>*/}
                            {/*            <div className="agency-team__talent-wrap">*/}
                            {/*                {vacancies.map(item => {*/}
                            {/*                    return (*/}
                            {/*                        <Link to={item.link} className="agency-team__talent-item" key={item.id}>*/}
                            {/*                            <div className="agency-team__talent-name">{item.name}</div>*/}
                            {/*                            <div className="agency-team__talent-descr">{item.lvl}. {item.place}. {item.time}</div>*/}
                            {/*                            <div className="agency-team__talent-icon">*/}
                            {/*                                <Icon icon="corner-arr" />*/}
                            {/*                            </div>*/}
                            {/*                        </Link>*/}
                            {/*                    )*/}
                            {/*                })}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        :*/}
                            {/*    <div className="agency-team__feedback sticky-person">*/}
                            {/*    <h2 className="heading-secondary">Ищем таланты</h2>*/}
                            {/*<Formik*/}
                            {/*    initialValues={{ name: '', link: '', phone: '', email: '', about: '', file: '', formName: 'Ищем таланты' }}*/}
                            {/*    validate={values => {*/}
                            {/*        const errors = {};*/}
                            {/*        if (!values.name || values.name.length < 2) {*/}
                            {/*            errors.name = 'Обязательное поле';*/}
                            {/*        }*/}
                            {/*        if (!values.link || values.link.length < 2) {*/}
                            {/*            errors.link = 'Обязательное поле';*/}
                            {/*        }*/}
                            {/*        if (!values.phone || values.phone.indexOf("_") !== -1) {*/}
                            {/*            errors.phone = 'Обязательное поле';*/}
                            {/*        }*/}
                            {/*        if (!values.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {*/}
                            {/*            errors.email = 'Обязательное поле';*/}
                            {/*        }*/}
                            {/*        if (!values.about || values.about.length < 2) {*/}
                            {/*            errors.about = 'Обязательное поле';*/}
                            {/*        }*/}
                            {/*        return errors;*/}
                            {/*    }}*/}
                            {/*    onSubmit={(values, { setSubmitting, resetForm }) => {*/}
                            {/*        setTimeout(() => {*/}
                            {/*            console.log(values);*/}
                            {/*            sendEmail(values);*/}
                            {/*            setSuccess(true);*/}
                            {/*            const formData = new FormData();*/}
                            {/*            for (const [key, value] of Object.entries(values)) {*/}
                            {/*                formData.append(key, value);*/}
                            {/*            }*/}

                            {/*            axios.post(`${apiUrl}/api/form/`, formData)*/}
                            {/*                .then((response) => {*/}
                            {/*                    console.log(response.data);*/}
                            {/*                })*/}
                            {/*                .catch((error) => {*/}
                            {/*                    console.log(error);*/}
                            {/*                });*/}
                            {/*            setSubmitting(false);*/}
                            {/*            resetForm();*/}
                            {/*        }, 400);*/}
                            {/*        setTimeout(() => {*/}
                            {/*            setSuccess(false);*/}
                            {/*        }, 4554);*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {({*/}
                            {/*        values,*/}
                            {/*        errors,*/}
                            {/*        touched,*/}
                            {/*        handleChange,*/}
                            {/*        handleBlur,*/}
                            {/*        handleSubmit,*/}
                            {/*        isSubmitting,*/}
                            {/*        setFieldValue,*/}
                            {/*    }) => (*/}

                            {/*        <form className="form" onSubmit={handleSubmit}>*/}
                            {/*            <div className="form__inner" style={{ display: success ? 'none' : 'block' }}>*/}
                            {/*                <div className="form__title">Заполните форму</div>*/}
                            {/*                <input type="hidden" name="formName" value="Ищем таланты" />*/}
                            {/*                <div className="form__wrap">*/}
                            {/*                    <div className="form__group">*/}
                            {/*                        <input type="text" name="name" className="form__input" onChange={handleChange} value={values.name} placeholder="Ваше имя" />*/}
                            {/*                        <div className="form__error">{errors.name && touched.name && errors.name}</div>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="form__group">*/}
                            {/*                        <input type="text" name="link" className="form__input" onChange={handleChange} value={values.link} placeholder="Ссылка на портфолио" />*/}
                            {/*                        <div className="form__error">{errors.link && touched.link && errors.link}</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="form__wrap">*/}
                            {/*                    <div className="form__group">*/}
                            {/*                        <InputMask type="text" name="phone" className="form__input" onChange={handleChange} value={values.phone} placeholder="Номер телефона" mask="+7 (999) 999-99-99" />*/}
                            {/*                        <div className="form__error">{errors.phone && touched.phone && errors.phone}</div>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="form__group">*/}
                            {/*                        <input type="text" name="email" className="form__input" onChange={handleChange} value={values.email} placeholder="E-mail" />*/}
                            {/*                        <div className="form__error">{errors.email && touched.email && errors.email}</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="form__wrap">*/}
                            {/*                    <div className="form__group">*/}
                            {/*                        <textarea type="text" name="about" className="form__textarea" onChange={handleChange} value={values.about} placeholder="Расскажите кратко о себе" />*/}
                            {/*                        <div className="form__error">{errors.about && touched.about && errors.about}</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div className="form__file">*/}
                            {/*                    <input id="file" name="file" type="file" onChange={(event) => {*/}
                            {/*                        setFieldValue("file", event.currentTarget.files[0]);*/}
                            {/*                    }} />*/}
                            {/*                </div>*/}
                            {/*                <RoundButton fromX={200} rotateZ={-360} delay={500} >*/}
                            {/*                <button type="submit"*/}
                            {/*                        className='btn --dark --circle'>*/}
                            {/*                    Отправить*/}
                            {/*                </button>*/}
                            {/*                </RoundButton>*/}
                            {/*                <div className="form__check">*/}
                            {/*                    Нажимая кнопку, вы соглашаетесь с нашей политикой в отношении обработки <span className='span'>*/}
                            {/*                        <Popup*/}
                            {/*                            trigger={<span> персональных данных </span>}*/}
                            {/*                            modal*/}
                            {/*                            nested*/}
                            {/*                        >*/}
                            {/*                            {close => (*/}
                            {/*                                <div className="modalAgree">*/}
                            {/*                                    <button className="modalClose" onClick={close}>*/}
                            {/*                                    &times;*/}
                            {/*                                    </button>*/}
                            {/*                                    <div className="modalHeader"> Политика в отношении обработки персональных данных </div>*/}
                            {/*                                    <div className='modalContent'>*/}
                            {/*                                        <br/><p className='toCenter'>1. Общие положения</p><br/>*/}
                            {/*                                        Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО "ДЕУС" (далее — Оператор).<br/>*/}
                            {/*                                        1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.<br/>*/}
                            {/*                                        1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://deus.team.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>2. Основные понятия, используемые в Политике</p><br/>*/}
                            {/*                                        2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.<br/>*/}
                            {/*                                        2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).<br/>*/}
                            {/*                                        2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://deus.team.<br/>*/}
                            {/*                                        2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.<br/>*/}
                            {/*                                        2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.<br/>*/}
                            {/*                                        2.6. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.<br/>*/}
                            {/*                                        2.7. Оператор — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и/или осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.<br/>*/}
                            {/*                                        2.8. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://deus.team.<br/>*/}
                            {/*                                        2.9. Персональные данные, разрешенные субъектом персональных данных для распространения, — персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее — персональные данные, разрешенные для распространения).<br/>*/}
                            {/*                                        2.10. Пользователь — любой посетитель веб-сайта https://deus.team.<br/>*/}
                            {/*                                        2.11. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.<br/>*/}
                            {/*                                        2.12. Распространение персональных данных — любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.<br/>*/}
                            {/*                                        2.13. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.<br/>*/}
                            {/*                                        2.14. Уничтожение персональных данных — любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и/или уничтожаются материальные носители персональных данных.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>3. Основные права и обязанности Оператора</p><br/>*/}
                            {/*                                        3.1. Оператор имеет право:<br/>*/}
                            {/*                                        — получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;<br/>*/}
                            {/*                                        — в случае отзыва субъектом персональных данных согласия на обработку персональных данных, а также, направления обращения с требованием о прекращении обработки персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;<br/>*/}
                            {/*                                        — самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.<br/>*/}
                            {/*                                        3.2. Оператор обязан:<br/>*/}
                            {/*                                        — предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;<br/>*/}
                            {/*                                        — организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;<br/>*/}
                            {/*                                        — отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;<br/>*/}
                            {/*                                        — сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней с даты получения такого запроса;<br/>*/}
                            {/*                                        — публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;<br/>*/}
                            {/*                                        — принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;<br/>*/}
                            {/*                                        — прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;<br/>*/}
                            {/*                                        — исполнять иные обязанности, предусмотренные Законом о персональных данных.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>4. Основные права и обязанности субъектов персональных данных</p><br/>*/}
                            {/*                                        4.1. Субъекты персональных данных имеют право:<br/>*/}
                            {/*                                        — получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных;<br/>*/}
                            {/*                                        — требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;<br/>*/}
                            {/*                                        — выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;<br/>*/}
                            {/*                                        — на отзыв согласия на обработку персональных данных, а также, на направление требования о прекращении обработки персональных данных;<br/>*/}
                            {/*                                        — обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;<br/>*/}
                            {/*                                        — на осуществление иных прав, предусмотренных законодательством РФ.<br/>*/}
                            {/*                                        4.2. Субъекты персональных данных обязаны:<br/>*/}
                            {/*                                        — предоставлять Оператору достоверные данные о себе;<br/>*/}
                            {/*                                        — сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.<br/>*/}
                            {/*                                        4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>5. Принципы обработки персональных данных</p><br/>*/}
                            {/*                                        5.1. Обработка персональных данных осуществляется на законной и справедливой основе.<br/>*/}
                            {/*                                        5.2. Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.<br/>*/}
                            {/*                                        5.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.<br/>*/}
                            {/*                                        5.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.<br/>*/}
                            {/*                                        5.5. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.<br/>*/}
                            {/*                                        5.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.<br/>*/}
                            {/*                                        5.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.*/}
                            {/*                                        <br/><p className='toCenter'>6. Цели обработки персональных данных</p><br/>*/}
                            {/*                                        <table>*/}
                            {/*                                            <tr>*/}
                            {/*                                                <td>Цель обработки</td>*/}
                            {/*                                                <td>Информирование Пользователя посредством отправки электронных писем</td>*/}
                            {/*                                            </tr>*/}
                            {/*                                            <tr>*/}
                            {/*                                                <td>Персональные данные</td>*/}
                            {/*                                                <td>фамилия, имя, отчество электронный адрес номера телефонов</td>*/}
                            {/*                                            </tr>*/}
                            {/*                                            <tr>*/}
                            {/*                                                <td>Правовые основания</td>*/}
                            {/*                                                <td>уставные (учредительные) документы Оператора договоры, заключаемые между оператором и субъектом персональных данных</td>*/}
                            {/*                                            </tr>*/}
                            {/*                                            <tr>*/}
                            {/*                                                <td>Виды обработки персональных данных</td>*/}
                            {/*                                                <td>Сбор, запись, систематизация, накопление, хранение, уничтожение и обезличивание персональных данных</td>*/}
                            {/*                                            </tr>*/}
                            {/*                                            <tr>*/}
                            {/*                                                <td></td>*/}
                            {/*                                                <td>Отправка информационных писем на адрес электронной почты</td>*/}
                            {/*                                            </tr>*/}
                            {/*                                        </table>*/}
                            {/*                                        <br/><p className='toCenter'>7. Условия обработки персональных данных</p><br/>*/}
                            {/*                                        7.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.<br/>*/}
                            {/*                                        7.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.<br/>*/}
                            {/*                                        7.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.<br/>*/}
                            {/*                                        7.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.<br/>*/}
                            {/*                                        7.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.<br/>*/}
                            {/*                                        7.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее — общедоступные персональные данные).<br/>*/}
                            {/*                                        7.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</p><br/>*/}
                            {/*                                        Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.<br/>*/}
                            {/*                                        8.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.<br/>*/}
                            {/*                                        8.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.<br/>*/}
                            {/*                                        8.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора hello@de-us.ru с пометкой «Актуализация персональных данных».<br/>*/}
                            {/*                                        8.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством.<br/>*/}
                            {/*                                        Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора hello@de-us.ru с пометкой «Отзыв согласия на обработку персональных данных». <br/>*/}
                            {/*                                        8.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Субъект персональных данных и/или с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг. <br/>*/}
                            {/*                                        8.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ. <br/>*/}
                            {/*                                        8.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных. <br/>*/}
                            {/*                                        8.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. <br/>*/}
                            {/*                                        8.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>9. Перечень действий, производимых Оператором с полученными персональными данными</p><br/>*/}
                            {/*                                        9.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.<br/>*/}
                            {/*                                        9.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>10. Трансграничная передача персональных данных</p><br/>*/}
                            {/*                                        10.1. Оператор до начала осуществления деятельности по трансграничной передаче персональных данных обязан уведомить уполномоченный орган по защите прав субъектов персональных данных о своем намерении осуществлять трансграничную передачу персональных данных (такое уведомление направляется отдельно от уведомления о намерении осуществлять обработку персональных данных).<br/>*/}
                            {/*                                        10.2. Оператор до подачи вышеуказанного уведомления, обязан получить от органов власти иностранного государства, иностранных физических лиц, иностранных юридических лиц, которым планируется трансграничная передача персональных данных, соответствующие сведения.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>11. Конфиденциальность персональных данных</p><br/>*/}
                            {/*                                        Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.<br/>*/}
                            {/*                                        <br/><p className='toCenter'>12. Заключительные положения</p><br/>*/}
                            {/*                                        12.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты hello@de-us.ru.<br/>*/}
                            {/*                                        12.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.<br/>*/}
                            {/*                                    </div>*/}
                            {/*                                </div>*/}
                            {/*                            )}*/}
                            {/*                        </Popup>*/}


                            {/*                    </span>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div className="form__success" style={{ display: success ? 'block' : 'none' }}>*/}
                            {/*                <div className="form__success-title">Заявка отправлена!</div>*/}
                            {/*                <div className="form__success-descr">Ожидайте, скоро мы с вами свяжемся</div>*/}
                            {/*            </div>*/}
                            {/*        </form>*/}

                            {/*    )}*/}
                            {/*</Formik>*/}
                            {/*        </div>*/}
                            {/*}*/}

                        {/*</div>*/}
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
            team: state.app.team,
        }
    )
)(Agency)