import React from "react";
import {useEffect, useState, useRef} from "react";
import axios, {setIsLoadingMainPageEvent} from "./../../../axios";
import {Link} from "react-router-dom";
import Select from "react-select";
import SwiperCore, {Grid, Autoplay} from "swiper";
import Marquee from "react-fast-marquee";
import {Icon} from "../../icon/Icon";
import SectionProducts from "../../sectionProducts/SectionProducts";
import SectionSocial from "../../sectionSocial/SectionSocial";
import Showreel from "../../showreel/Showreel";

import "swiper/css";
import "swiper/css/grid";
import "./mainPage.scss";

import arrorLink from "../../../img/icon/arrow-link.svg";
import deus from "../../../img/deus-circle.png";
import arrorGo from "../../../img/icon/arrow-go.svg";
import arrorGo2 from "../../../img/icon/arrow-go2.svg";
import mainBannerLine from "../../../img/main-banner-line.svg";
import mainBannerLineMob from "../../../img/main-banner-line-mob.svg";
import TypeWriterText from "../../typeWriterText";
import {connect} from "react-redux";
import {useInView} from "react-intersection-observer";
import RoundButton from "../../animation/roundButton";
import ScrollUp from "../../animation/scrollUp";
import {isVisible} from "@testing-library/user-event/dist/utils";
import RetryImage from "../../../helpers/RetryImage";
import manager from "../../../img/manager.png";
import * as ReactDom from "react-dom/server";
import {goProjects, gotoAnchor} from "../../anchors";
import DelayedLink from "../../appHeader/DelayedLink";
import FadeInOnScroll from "../../animation/fadeInOnScroll";
import {Box, useMediaQuery} from "@material-ui/core";
import {maxLength} from "react-admin";
import {useMobile} from "../projects/projectDetail/ProjectDetail";

SwiperCore.use([Autoplay]);

const apiUrl = "";

const colourStyles = {
    control: (styles) => ({}),
    valueContainer: (styles) => ({}),
    placeholder: (styles) => ({}),
    indicatorSeparator: (styles) => ({display: "none"}),
    indicatorsContainer: (styles) => ({}),
    menu: (styles) => ({}),
    menuList: (styles) => ({}),
    option: (styles, state) => ({
        color: state.isSelected ? "#FF4D01" : "inherit",
    }),
};

const classes = {
    control: (state) => (state.menuIsOpen ? "select active" : "select"),
    valueContainer: () => "select__value",
    indicatorsContainer: () => "select__icon",
    menu: () => "select__dropdown",
    option: () => "select__item",
    input: () => "select__search",
};

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

    const isMobile = useMobile();

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

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = allProjects
        .filter((project) => {
            return ((selectedTheme ? project.projectTheme === selectedTheme.value : true) && (selectedType ? project.projectType === selectedType.value : true) && project.visibility);
        })
        .slice(0, 3);

    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        video.pause();
        video.currentTime = 0; // Rewind the video to the beginning
    };

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };


    const sizeLarge = 'Мы создаём продукты и услуги, которые<br/>  помогают нашим клиентам быть заметнее<br/> 🤩 в цифровом пространстве'
    const sizeSmall = 'Мы создаём продукты и услуги, которые помогают нашим клиентам быть заметнее 🤩 в цифровом пространстве'
    const sizeXSmall = 'Мы создаём продукты<br/>  и услуги, которые помогают нашим клиентам быть заметнее 🤩 в цифровом пространстве'

    const matches1440 = useMediaQuery('(min-width:1025px)');
    const matches1024 = useMediaQuery('(min-width:940px)');
    const matches768 = useMediaQuery('(min-width:420px)');
    const matches360 = useMediaQuery('(min-width:0px)');
    const projectSizeLabel = matches768 ? "m-text" : matches360 ? "s-text" : "m-text"
    const experts = matches1440? 'heading-thirty' : matches1024 ? 'heading-thirty' : matches768 ? 'l-textReg' : 'm-text'

    let text
    if (matches1440){
        text = sizeLarge
    } else if (matches768) {
        text = sizeSmall
    } else {
        text = sizeXSmall
    }

    const double = <Icon icon="arrowGo" viewBox="0 0 30 31"/>;

    const mainShowreel = showreels.find((showreel) => showreel.mainShowreel === true);

    const {services, headerData, team} = props;
    services.sort((a, b) => a.position - b.position);

    const mainBannerRef = useRef(null);
    const videoModal = useRef(null);

    return (<>
        {!isLoading && (<main className="main">

            <section className="main-banner" ref={mainBannerRef}>
                <div className="container">
                    <div className="main-banner__wrap">
                        <div className="main-banner__content">
                            <h4 className="heading-fourth">Привет — это DEUS 👋</h4>
                            <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: text}}/>
                            <DelayedLink
                                to={`/contacts`}
                                className="btn --black hidden-desktop"
                                datahash="contactUs"
                                onClick={(e) => gotoAnchor(e)}
                            >
                                Стать клиентом
                            </DelayedLink>
                        </div>
                    </div>
                </div>
            </section>

            {!!clients && <section className="main-clients">
                <div className="main-clients__marquee">
                    <Marquee speed="40">
                        {clients.map((client, i) => {
                            return (<RetryImage className='main-clients__img'
                                                src={client.image ? `/uploads/${client.image.filename}` : null}
                                                alt={client.name} key={client.id}/>)
                        })}
                    </Marquee>
                    <div className="main-clients__mutedL"/>
                    <div className="main-clients__mutedR"/>
                </div>
            </section>}

            <section className="main-agency">
                <div className="container">

                    <div className="main-agency__wrap whiteHeader">
                        {mainPage ? mainPage.map((item, index) => {
                            const arrow = index !== 1;
                            const workers = index == 0 && (<>
                                {team
                                    .filter((item) => item.mainControl)
                                    .map((item) => {
                                        return (<img
                                            src={`${apiUrl}/uploads/${item.mainImg.filename}`}
                                            alt=""
                                            className="person-img"
                                        />);
                                    })
                                    .slice(0, 3)}
                            </>);

                            const allServices = index == 1 && props.services
                                .filter((service, index) => service.isInvisible)
                                .map((service, index) => (
                                    <DelayedLink to={`/services/`}>
                                    <div className="main-agency__item-link p-style">
                                        <p>{service.name}</p>
                                        <div className="hover-flip-arrow">
                                      <span>
                                        {" "}
                                          <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                        <div className="hover-double">{double}</div>
                                      </span>
                                        </div>
                                    </div>
                                </DelayedLink>));
                            const num = index < 9 ? "0" + (index + 1) : index + 1;
                            const name = item.name;
                            const descr = index == 1 ? (
                                <div className="main-agency__item-service">{allServices}</div>) : (<div
                                className={`main-agency__item__descr${index == 0 ? "1" : ""}`}>
                                {workers}
                                {item.textList !== "undefined" && item.textList && (
                                    <div className="main-agency__item__descr-flex">
                                        {item.textList.map((item, ind) => (<div
                                            className={index == 2 ? "main-agency__item__descr-flex__item" : ""}>
                                            {item.textItem}
                                        </div>))}
                                    </div>)}
                            </div>);
                            return (<div className="main-agency__item">
                                <a href={`${item.pageURL}`} target="_blank" rel="noreferrer">
                                    {/*<img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн"*/}
                                    {/*     className="main-agency__item-img"/>*/}
                                    {item.mainVideoFile && item.mainVideoFile !== "undefined" && item.mainVideoFile !== "null" && (
                                        <video className="main-agency__item-img"
                                            //autoPlay
                                            //loop
                                               muted playsInline>
                                            <source
                                                src={`${apiUrl}/uploads/${item.mainVideoFile.filename}`}
                                                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                                            />
                                        </video>)}

                                    <div className="main-agency__item-header">
                                  <span className="main-agency__item-header__num">
                                    <div className="num_flex">{num}</div>
                                  </span>
                                        <div
                                            className="main-agency__item-header__text heading-secondary">{name}</div>
                                    </div>
                                    {descr}
                                    {!!arrow && (<span className="main-agency__item-arrow">
                                    <div className="hover-flip-circle">
                                      <span>
                                        <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                        <div className="hover-circle">{double}</div>
                                      </span>
                                    </div>
                                  </span>)}
                                </a>
                            </div>);
                        }) : null}
                    </div>


                    <div className="main-projects__wrap">
                    <span className="main-projects__item">
                      <h2 className="heading-secondary sticky-h2">Экспертиза</h2>
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
                                    return (<DelayedLink to={`/projects?theme=${project.value}`}
                                                         onClick={(e) => gotoAnchor(e)}>
                                        <div className="main-projects__item-flex__inner">
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
                                    </DelayedLink>);
                                }) : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className="main-showreel whiteHeader">
                <div className="container">
                    <div className="main-showreel__wrap">
                        {mainShowreel && <Showreel data={mainShowreel} isMain={true}/>}
                    </div>
                </div>

            </section>

            {!!working && working.length > 0 && (
            <section className="main-working whiteHeader">
                <div className="container">
                    <div className="main-working__wrap">
                        <div className="main-working__wrap-info">
                            <p className="heading-secondary">В работе {working.length} активных<br/> проектов</p>
                            {!isMobile && (
                                <div className="slide-arrow">
                                    <div className={`prev ${currentSlide === 0 ? 'disabled' : ''}`}
                                         onClick={currentSlide > 0 ? prevSlide : null}>
                                        <Icon icon="slider" viewBox="0 0 40 40"/>
                                    </div>
                                    <div
                                        className={`next ${currentSlide >= working.length - 1 ? 'disabled' : ''}`}
                                        onClick={currentSlide < working.length - 1 ? nextSlide : null}>
                                        <Icon icon="slider" viewBox="0 0 40 40"/>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="main-working__wrapperSlide">
                            {working.map((item, index) => (
                                <div className="padding-slider" style={{transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.3s ease-out'}}>
                                    <div
                                    className={`main-working__wrapperSlide-item ${swipped.includes(index) ? 'swipped' : ''}`}
                                    key={index}

                                >
                                    <div className="wrapp">
                                        <div className="greenBall">
                                            <Icon icon="greenBall" viewBox='0 0 16 16'/>
                                            <p>{item.name}</p>
                                        </div>
                                        <p className="m-text">{item.descr}</p>
                                    </div>
                                    <div className="wrapp-circle">
                                        <img
                                            src={deus}
                                            alt=""
                                            className="circle"/>
                                        <img
                                            src={`${apiUrl}/uploads/${item.file.filename}`}
                                            alt=""
                                            className="circle"/>
                                    </div>
                                </div>
                                </div>
                            ))}
                            <div
                                className="slider-touch-area"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            />
                        </div>
                        {isMobile && (
                            <div className="slide-arrow">
                                <div className={`prev ${currentSlide === 0 ? 'disabled' : ''}`}
                                     onClick={currentSlide > 0 ? prevSlide : null}>
                                    <Icon icon="slider" viewBox="0 0 40 40"/>
                                </div>
                                <div
                                    className={`next ${currentSlide >= working.length - 1 ? 'disabled' : ''}`}
                                    onClick={currentSlide < working.length - 1 ? nextSlide : null}>
                                    <Icon icon="slider" viewBox="0 0 40 40"/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>)
            }

        </main>)}
    </>);
};

export default connect((state) => ({
    headerData: state.app.headerData, services: state.app.services, team: state.app.team,
}))(MainPage);
