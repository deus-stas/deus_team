'use client';

import React from "react";
import {useEffect, useState, useRef} from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios, {setIsLoadingMainPageEvent} from "./../../axios";
import Link from 'next/link';
// import Select from "react-select";
// import SwiperCore from "swiper";
import {Icon} from "../../components/icon/Icon";
// import SectionProducts from "../../sectionProducts/SectionProducts";
// import SectionSocial from "../../sectionSocial/SectionSocial";
import Showreel from "../../components/showreel/Showreel";
import WorkingSlider from "./WorkingSlider";

import "swiper/css";
import "swiper/css/grid";
import "./mainPage.scss";
import Image from 'next/image';
import CursorCircle from './CursorCircle.js';


// import deus from "../../../img/deus-circle.png";
// import {connect} from "react-redux";
import RetryImage from "../../helpers/RetryImage";
// import manager from "../../../img/manager.png";
// import * as ReactDom from "react-dom/server";
import {goProjects, gotoAnchor} from "../../components/anchors";
// import DelayedLink from "../../appHeader/DelayedLink";
// import FadeInOnScroll from "../../animation/fadeInOnScroll";
// import {Box, useMediaQuery} from "@material-ui/core";
// import {maxLength} from "react-admin";
import useMobile from "../../components/useMobile";
// import {Marquee} from "@devnomic/marquee";
// import {Cursor} from "../../components/cursor/cursor";
// import {useDispatch, useSelector } from 'react-redux';
// import {fetchData } from "../../actions/appActions";


// const Marquee = dynamic(() =>
//     import("@devnomic/marquee").then((mod) => mod.Marquee) // Убедитесь, что `Marquee` — экспортируемый компонент
// );
const apiUrl = "";

const MainPage = (props) => {
    const [isActive, setIsActive] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [allNewsTags, setAllNewsTags] = useState(new Set());
    const [working, setWorking] = useState([]);
    const [showreels, setShowreels] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [mainPage, setMainPage] = useState([]);
    const [total, setTotal] = useState(0);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const [clients, setClients] = useState([]);
    const [swipped, setSwipped] = useState([-1]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPrevHovered, setIsPrevHovered] = useState(false);
    const [isVideoPaused, setIsVideoPaused] = useState(true);
    const [team, setTeam] = useState([]);
    const [services, setservices] = useState([]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        document.querySelector('.cursor-circle').classList.add('visible')
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
        document.querySelector('.cursor-circle').classList.remove('visible')

      };


    const router = useRouter();

    
    // const { services, team } = useSelector((state) => ({
    //     services: state.app.services,
    //     team: state.app.team,
    // }));
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
    
    const handleVideoClick = () => {
        if (isVideoPaused) {
            setIsFullScreen(!isFullScreen);
        } else {
            setIsFullScreen(false);
        }
    };

    const handleVideoStatusChange = (paused) => {
        setIsVideoPaused(paused);
    };

    const {isMobile, isDesktop} = useMobile();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);

    const prevSlide = () => setCurrentSlide((currentSlide - 1 + working.length) % working.length);

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % working.length);

    const handleTouchStart = (event) => setTouchStart(event.touches[0].clientX);

    const handleTouchEnd = (event) => {
        const touchEnd = event.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        if (diff > 500) {
            nextSlide();
        } else if (diff < -500) {
            prevSlide();
        }
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/newsTags`)
            .then((tagResponse) => {
                const tags = tagResponse.data.reduce((obj, tag) => {
                    obj[tag._id] = tag.name; // Предполагая, что _id - это идентификатор тега
                    return obj;
                }, {});

                axios
                    .get(`${apiUrl}/api/news`)
                    .then((response) => {
                        const news = response.data.map((newsItem) => {
                            newsItem.newsTags = tags[newsItem.newsTags];
                            return newsItem;
                        });
                        setNews(news);
                        setAllNewsTags(new Set(news.flatMap((news) => news.newsTags)));
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
        axios
            .get(`${apiUrl}/api/working/`)
            .then((response) => {
                setWorking(response.data);
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
        axios
            .get(`${apiUrl}/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/mainPage/`)
            .then((response) => {
                setMainPage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setAllProjects(response.data);
                setTotal(response.data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/themes/`)
            .then((response) => {
                let projectOptionsTheme = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsTheme[i] = {value: id, label: name};
                });
                setOptionsTheme(projectOptionsTheme);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/types/`)
            .then((response) => {
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsType[i] = {value: id, label: name};
                });
                setOptionsType(projectOptionsType);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setIsLoadingMainPageEvent(true);

        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener("isLoadingMainPage", handleLoad);
        return () => {
            window.removeEventListener("isLoadingMainPage", handleLoad);
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('.header, .footer');

        elements.forEach((el) => {
            el.style.opacity = isFullScreen ? '0' : '1';
        });
    }, [isFullScreen]);

    const sizeLarge = 'Мы создаём продукты и услуги, которые<br/>  помогают нашим клиентам быть заметнее<br/> 🤩 в цифровом пространстве'
    const sizeSmall = 'Мы создаём продукты и услуги, которые помогают нашим клиентам быть заметнее 🤩 в цифровом пространстве'
    const sizeXSmall = 'Мы создаём продукты<br/>  и услуги, которые помогают нашим клиентам быть заметнее 🤩 в цифровом пространстве'

    // const matches1440 = useMediaQuery('(min-width:1025px)');
    // const matches1024 = useMediaQuery('(min-width:940px)');
    // const matches768 = useMediaQuery('(min-width:420px)');
    // const matches360 = useMediaQuery('(min-width:0px)');
    const projectSizeLabel = '(min-width:420px)' ? "m-text" : '(min-width:0px)' ? "s-text" : "m-text"
    const experts = '(min-width:1025px)' ? 'heading-thirty' : '(min-width:1025px)' ? 'heading-thirty' : '(min-width:420px)' ? 'l-textReg' : 'm-text'

    let text = sizeLarge
    // if (matches1440){
    //     text = sizeLarge
    // } else if (matches768) {
    //     text = sizeSmall
    // } else {
    //     text = sizeXSmall
    // }

    const double = <Icon icon="arrowGo" viewBox="0 0 30 30"/>;

    const mainShowreel = showreels.find((showreel) => showreel.mainShowreel === true);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchData());
    //   }, [dispatch]);
    let sortedServices = [];

    useEffect(() => {
        if (services && Array.isArray(services)) {
            sortedServices = [...services].sort((a, b) => a.position - b.position);
        }
        console.log('services',services);
    }, [services]);


    const mainBannerRef = useRef(null);
    const videoModal = useRef(null);

    return (<>
        {!isLoading && (<div className="main">
            {/* <Cursor/> */}
            <CursorCircle/>
            <section className="main-banner" ref={mainBannerRef}>
                <div className="container">
                    <div className="main-banner__wrap">
                        <div className="main-banner__content">
                            <p className="breadcrumb">Привет — это DEUS 👋</p>
                            <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: text}}/>
                        </div>
                    </div>
                </div>
            </section>

            {!!clients && (
            <section className="main-clients">
                <div className="main-clients__marquee">
                    <div className="marquee-container">
                        {clients.map((client, i) => (
                            <div className="main-clients__container" key={client.id || i}>
                                <RetryImage
                                src={client.image ? `/uploads/${client.image.filename}` : null}
                                alt={client.name}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="marquee-container">
                        {clients.map((client, i) => (
                        <div className="main-clients__container" key={client.id || i}>
                            <RetryImage
                            src={client.image ? `/uploads/${client.image.filename}` : null}
                            alt={client.name}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            <section className="main-agency">
                <div className="container">

                        <div className="main-agency__wrap whiteHeader">
                            {mainPage
                                ? mainPage.map((item, index) => {
                                    const fileUrl = item.mainVideoFile ? `${apiUrl}/uploads/${item.mainVideoFile.filename}` : null;
                                    const isVideo = item.mainVideoFile ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.mainVideoFile.filename) : false;

                                    const arrow = index !== 1;

                                    const workers = index === 0 && (
                                        <div key={`workers-${index}`}>
                                            {team
                                                .filter((teamMember) => teamMember.mainControl)
                                                .slice(0, 3)
                                                .map((teamMember, i) => (
                                                    <img
                                                        src={`${apiUrl}/uploads/${teamMember.image?.filename}`}
                                                        alt=""
                                                        className="person-img"
                                                        key={teamMember.id || i}
                                                    />
                                                ))}
                                        </div>
                                    );

                                    const allServices = index === 1 &&
                                        services
                                            .filter((service) => service.isInvisible)   
                                            .map((service, serviceIndex) => (
                                                <Link href={`/services/`} key={`service-${serviceIndex}`}>
                                                    <div className="main-agency__item-link l-textReg">
                                                        <p>{service.name}</p>
                                                        <div className="hover-flip-arrow">
                                                            <span>
                                                                <Icon icon="arrowGo" viewBox="0 0 30 30" />
                                                                <div className="hover-double">{double}</div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ));

                                    const num = index < 9 ? "0" + (index + 1) : index + 1;
                                    const name = item.name;
                                    const descr =
                                        index === 1 ? (
                                            <div className="main-agency__item-service">{allServices}</div>
                                        ) : (
                                            <div className={`main-agency__item__descr${index === 0 ? "1" : ""}`}>
                                                {workers}
                                                {item.textList && (
                                                    <div className="main-agency__item__descr-flex">
                                                        {item.textList.map((textItem, ind) => (
                                                            <div
                                                                key={`textItem-${ind}`}
                                                                className={
                                                                    index === 2
                                                                        ? "main-agency__item__descr-flex__item"
                                                                        : index === 0
                                                                        ? "main-agency__item__descr-flex-ind1 m-text"
                                                                        : ""
                                                                }
                                                            >
                                                                {textItem.textItem}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );

                                    return (
                                        <div 
                                            className="main-agency__item" 
                                            key={`mainItem-${index}`} 
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                                {isVideo ? (
                                                    <video
                                                        className="main-agency__item-img"
                                                        muted
                                                        playsInline
                                                        autoPlay
                                                        loop
                                                        controls={false}
                                                        src={fileUrl}
                                                    />
                                                ) : (
                                                    <img src={fileUrl} alt={item.name} className="main-agency__item-img" />
                                                )}

                                                <div className="main-agency__item-header">
                                                    <div className="main-agency__item-header__num s-text">
                                                        <div className="num_flex">{num}</div>
                                                    </div>
                                                    <div className="main-agency__item-header__text heading-secondary">{name}</div>
                                                </div>
                                                {descr}
                                                {!!arrow && !isMobile && !!isDesktop && (
                                                    <div className="main-agency__item-arrow">
                                                        <div className="hover-flip-circle">
                                                            <span>
                                                                <Icon icon="arrowGo" viewBox="0 0 30 30" />
                                                                <div className="hover-circle">{double}</div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            {/* <Link href={`${item.pageURL}`} target="_blank" rel="noreferrer">
                                            </Link> */}
                                        </div>
                                    );
                                })
                                : null}
                        </div>


                    <div className="main-projects__wrap">
                        <span className="main-projects__item">
                        <h2 className="heading-secondary">Экспертиза</h2>
                        </span>
                        <div className="main-projects__item">
                            <p className={`${experts}`}>
                                Мы работаем с ведущими компаниями и брендами из различных отраслей.
                                При создании могут решаться уникальные задачи,
                                но это всегда проекты с характером 👍
                            </p>
                            <div className="main-projects__item-flex">
                                {optionsTheme ? optionsTheme.map((project, index) => {
                                    const filterProjects = allProjects.filter((item) => item.projectTheme === project.value && item.visibility);
                                    const totalSum = filterProjects.length < 10 ? "0" + filterProjects.length : filterProjects.length;
                                    if (totalSum < 1) return null;
                                    return (<Link 
                                                href={`/projects?theme=${project.value}`}
                                                key={`project-${project.value || index}`} // Уникальный ключ
                                                onClick={(e) => gotoAnchor(e)}>
                                        <div className="main-projects__item-flex__inner" >
                                            <span className="main-projects__item-btn">
                                              <div className={`${projectSizeLabel}`}>
                                                <p className="hover custom-cursor-link"
                                                   datahash="projectNav">
                                                    {project.label}
                                                </p>
                                              </div>
                                              <div className="main-agency__item-header__num xs-text">
                                                {totalSum}
                                              </div>
                                            </span>
                                        </div>
                                    </Link>);
                                }) : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="main-showreel whiteHeader">
                <div className="container">
                    <div  onClick={handleVideoClick} className={`main-showreel__wrap ${isFullScreen ? 'full-screen' : ''}`}>
                        {mainShowreel && <Showreel  data={mainShowreel} isMain={true} onVideoStatusChange={handleVideoStatusChange}/>}
                    </div>
                </div>

            </section>

            {!!working && working.length > 0 &&
             <WorkingSlider />
            }

        </div>)}
    </>);
};

export default MainPage;


