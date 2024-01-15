import React from 'react'
import {useEffect, useState, useRef} from 'react';
import axios, {setIsLoadingMainPageEvent} from './../../../axios'
import {Link} from 'react-router-dom';
import Select from 'react-select';
import SwiperCore, {Grid, Autoplay} from "swiper";

import {Icon} from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';

import "swiper/css";
import "swiper/css/grid";
import './mainPage.scss';

import arrorLink from '../../../img/icon/arrow-link.svg'
import arrorGo from '../../../img/icon/arrow-go.svg'
import arrorGo2 from '../../../img/icon/arrow-go2.svg'
import mainBannerLine from '../../../img/main-banner-line.svg';
import mainBannerLineMob from '../../../img/main-banner-line-mob.svg';
import TypeWriterText from "../../typeWriterText";
import {connect} from "react-redux";
import {useInView} from 'react-intersection-observer';
import RoundButton from "../../animation/roundButton";
import ScrollUp from "../../animation/scrollUp";
import {isVisible} from "@testing-library/user-event/dist/utils";
import RetryImage from "../../../helpers/RetryImage";
import manager from "../../../img/manager.png";
import * as ReactDom from "react-dom/server";
import {goProjects, gotoAnchor} from "../../anchors";
import DelayedLink from "../../appHeader/DelayedLink";


SwiperCore.use([Autoplay]);

const apiUrl = ''


const colourStyles = {
    control: (styles) => ({}),
    valueContainer: (styles) => ({}),
    placeholder: (styles) => ({}),
    indicatorSeparator: (styles) => ({display: 'none'}),
    indicatorsContainer: (styles) => ({}),
    menu: (styles) => ({}),
    menuList: (styles) => ({}),
    option: (styles, state) => ({
        color: state.isSelected ? '#FF4D01' : 'inherit'
    }),
};

const classes = {
    control: (state) => state.menuIsOpen ? 'select active' : 'select',
    valueContainer: () => 'select__value',
    indicatorsContainer: () => 'select__icon',
    menu: () => 'select__dropdown',
    option: () => 'select__item',
    input: () => 'select__search'
}


const MainPage = (props) => {
    const [isActive, setIsActive] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [allTags, setAllTags] = useState(new Set());
    const [working, setWorking] = useState([]);
    const [showreels, setShowreels] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [mainPage, setMainPage] = useState([]);
    const [total, setTotal] = useState(0);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);


    const onAcc = ({e, index}) => {
        let accItem = e.target.closest('.tab-parent');
        setIsActive(prevState => {
            const newActiveState = [...prevState];
            newActiveState[index] = !newActiveState[index];
            return newActiveState;
        });
        if (accItem.classList.contains('active')) {
            accItem.classList.remove('active');
            accItem.classList.remove('wow');
        } else {
            accItem.classList.add('active');
            accItem.classList.add('wow');
            accItem.classList.add('fadeInDown');
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/news`)
            .then((response) => {
                const newsWithTags = response.data.map((news) => {
                    return axios.get(`${apiUrl}/api/tags/${news.tags}`)
                        .then((tagResponse) => {
                            news.tags = tagResponse.data.name;
                            return news;
                        })
                        .catch((error) => {
                            console.log(error);
                            return news;
                        });
                });

                Promise.all(newsWithTags)
                    .then((news) => {
                        setNews(news);
                        const tags = new Set(news.flatMap((news) => news.tags));
                        setAllTags(tags);
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
        axios.get(`${apiUrl}/api/working/`)
            .then((response) => {
                setWorking(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/mainPage/`)
            .then((response) => {
                setMainPage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setAllProjects(response.data);
                setTotal(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/themes/`)
            .then((response) => {
                console.log(response.data);
                let projectOptionsTheme = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsTheme[i] = {value: id, label: name}
                })
                setOptionsTheme(projectOptionsTheme)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                console.log(response.data);
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsType[i] = {value: id, label: name}
                })
                setOptionsType(projectOptionsType)
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
    }, []);

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = allProjects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    }).slice(0, 3);
    console.log("fol:", filteredProjects.length)

    const foundShowreel = showreels.find(showreel => showreel.mainShowreel === true);


    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
        console.log("hovered", index)
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        video.pause();
        video.currentTime = 0; // Rewind the video to the beginning
    };

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };

    const sortColumns = (...elements) => {
        const columns = elements.reduce((acc, element, index) => {
            const columnIndex = index % 3;
            acc[columnIndex].push(element);
            return acc;
        }, [[], [], []]);

        return columns;
    }

    const double =  <Icon icon="arrowGo" viewBox="0 0 30 31"/>


    const mainShowreel = showreels.find(showreel => showreel.mainShowreel === true);

    const { services, headerData, team } = props;
    services.sort((a, b) => a.position - b.position);

    return (
        <>
            {!isLoading &&
                <main className="main">
                    <ScrollUp fromY={0} delay={1000}>
                        <section className="main-banner">
                            <div className="container">
                                <div className="main-banner__wrap">
                                    <div className="main-banner__content">
                                        <h4 className="heading-fourth">Digital агенство</h4>
                                        <h1 className="heading-primary">
                                            <span>Создаем продукты и</span>
                                            <span> услуги, которые помогают </span>
                                            <span className="last-grid">нашим клиентам
                                                    <DelayedLink to={`/contacts`} className="btn --black hidden-mobile"  datahash="contactUs" onClick={(e) => gotoAnchor(e)}>
                                                     Стать клиентом
                                                    </DelayedLink>
                                                        <p className="p-style wh-30">
                                                            быть <span className="p-style-black">заметнее</span> в цифровом пространстве
                                                        </p>

                                            </span>
                                        </h1>
                                        <Link to={`/contacts`} className="btn --black hidden-desktop" datahash="contactUs" onClick={(e) => gotoAnchor(e)}>
                                            Стать клиентом
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ScrollUp>

                    <section className="main-showreel whiteHeader">
                        {mainShowreel &&
                            <Showreel data={mainShowreel}  isMain={true} key={mainShowreel.videoUrl}/>
                        }
                    </section>

                    <section className="main-agency">
                        <div className="container">
                            {/*<div className="main-agency__wrap">*/}
                            {/*    {filteredProjects.map((item, index) => {*/}
                            {/*        const arrow = index !== 1;*/}
                            {/*        const allServices = index == 1 && services.map(item => <div className="item-service p-style">{item.name}<img src={arrorGo} alt={'go'}/></div>);*/}
                            {/*        const num = index < 9 ? '0' + (index + 1) : index + 1;*/}
                            {/*        const name = (item.name).slice(0, 10);*/}
                            {/*        const descr = index == 1? <div className="item__service">{allServices}</div> : <div className="item__descr">50+{item.descrProject} </div>*/}
                            {/*        return (*/}
                            {/*            <div className="main-agency__item" key={item.id}>*/}
                            {/*                <img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн"*/}
                            {/*                     className="main-agency__item-img"/>*/}
                            {/*                <div className="main-agency__item-header">*/}
                            {/*                    <div className="main-agency__item-header__num">{num}</div>*/}
                            {/*                    <div className="item__text heading-secondary">{name}</div>*/}
                            {/*                </div>*/}
                            {/*                {descr}*/}
                            {/*                {!!arrow &&*/}
                            {/*                    <img className="main-agency__item-arrow" src={arrorLink} alt={'go'}/>}*/}
                            {/*            </div>*/}
                            {/*        );*/}
                            {/*    })}*/}
                            {/*</div>*/}
                            <ScrollUp fromY={0} delay={2000}>
                                <div className="main-agency__wrap whiteHeader">
                                    {mainPage ? mainPage.map((item, index) => {
                                        const arrow = index !== 1;
                                        const workers = index == 0 && <>
                                            {team.filter(item=> item.mainControl).map((item) => {
                                                return (
                                                    <img src={`${apiUrl}/uploads/${item.mainImg.filename}`}
                                                         alt=''
                                                         className="person-img"
                                                    />
                                                )
                                            }

                                            ).slice(0,3)}</>

                                        const allServices = index == 1 && props.services.filter((service, index) =>
                                            service.isInvisible).map((service, index) =>
                                            <DelayedLink
                                                to={`/services/${service.path}`}>
                                                <div className="main-agency__item-link p-style"><p>{service.name}</p>
                                                    <div className="hover-flip-arrow">
                                                      <span> <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                       <div className="hover-double">
                                                            {double}
                                                        </div>
                                                      </span>
                                                    </div>
                                                </div>
                                            </DelayedLink>);
                                        const num = index < 9 ? '0' + (index + 1) : index + 1;
                                        const name = item.name
                                        const descr = index == 1 ?
                                            <div className="main-agency__item-service">{allServices}</div> :
                                            <div className={`main-agency__item__descr${index == 0 ? '1' : ''}`}>
                                                {workers}
                                                {
                                                    item.textList !== 'undefined' && item.textList && (

                                                        <div className="main-agency__item__descr-flex">
                                                            {item.textList.map((item, ind) => (
                                                                <div
                                                                    className={index == 2 ? "main-agency__item__descr-flex__item" : ""}>
                                                                    {item.textItem}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        return (

                                            <div className="main-agency__item" >
                                                <a href={`${item.pageURL}`} target="_blank">
                                                    {/*<img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн"*/}
                                                    {/*     className="main-agency__item-img"/>*/}
                                                    {item.mainVideoFile && item.mainVideoFile !== 'undefined' && item.mainVideoFile !== 'null'
                                                        && (
                                                            <video className="main-agency__item-img" autoPlay loop muted playsInline>
                                                            <source
                                                                    src={`${apiUrl}/uploads/${item.mainVideoFile.filename}`}
                                                                    type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                            </video>
                                                        )}


                                                    <div className="main-agency__item-header">
                                                        <div className="main-agency__item-header__num">{num}</div>
                                                        <div
                                                            className="main-agency__item-header__text heading-secondary">{name}</div>
                                                    </div>
                                                    {descr}
                                                    {!!arrow &&
                                                        <span className="main-agency__item-arrow">
                                                               <div className="hover-flip-circle">
                                                                  <span>
                                                                    <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                                    <div className="hover-circle">
                                                                      {double}
                                                                     </div>
                                                                  </span>
                                                               </div>

                                                        </span>}
                                                </a>
                                            </div>

                                        );
                                    }) : null}
                                </div>
                            </ScrollUp>
                            <ScrollUp fromY={0} delay={2000}>
                                <div className="main-projects__wrap">
                                <span className="main-projects__item">
                                   <h2 className="heading-secondary sticky-h2">Проекты по индустриям</h2>
                                </span>
                                    <div className="main-projects__item">
                                        <p className="p-style">Мы работаем с ведущими компаниями и брендами из различных
                                            отраслей. При создании могут решаться уникальные задачи, но это всегда
                                            проекты с характером</p>
                                        <div className="main-projects__item-flex">
                                            {optionsTheme ? optionsTheme.map((project, index) => {
                                                const filterProjects = allProjects.filter(item => item.projectTheme === project.value && item.visibility);
                                                const totalSum = filterProjects.length < 10? "0" + filterProjects.length : filterProjects.length ;
                                                return (
                                                    <DelayedLink to={`/projects?theme=${project.value}`} onClick={(e) => gotoAnchor(e)}>
                                                        <div className="main-projects__item-flex__inner">
                                                            <div className="type-name">
                                                                <p className='hover' datahash="projectNav">{project.label}</p>
                                                            </div>
                                                            <div className="main-projects__num"><span>{totalSum}</span>
                                                            </div>
                                                        </div>
                                                    </DelayedLink>
                                                );
                                            }) : null}
                                        </div>
                                    </div>
                                </div>
                            </ScrollUp>
                        </div>


                    </section>
                    {/*<ScrollUp fromY={0} delay={1000}>*/}
                    {/*    <section className="main-banner"*/}
                    {/*             style={{background: "rgba(0,0,0,0.82)"}}>*/}
                    {/*        <div className="container">*/}
                    {/*            <div className="main-banner__wrap">*/}
                    {/*                <div className="main-banner__content">*/}
                    {/*                    <h1 className="heading-primary wow fadeIn"*/}
                    {/*                        data-wow-duration="0.5s"*/}
                    {/*                        data-wow-delay="0.3s">*/}
                    {/*                        <TypeWriterText*/}
                    {/*                            text={"Создавайте вместе с нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей"}*/}
                    {/*                        />*/}
                    {/*                    </h1>*/}
                    {/*                    <div className="rollCircleMain">*/}
                    {/*                        <RoundButton fromX={-200} rotateZ={360} delay={2500}>*/}
                    {/*                            <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank'*/}
                    {/*                               className="btn --circle --orange"*/}
                    {/*                            >Презентация агентства</a>*/}
                    {/*                        </RoundButton>*/}
                    {/*                    </div>*/}
                    {/*                    <RoundButton rotateZ={0} fromX={0} delay={4500}>*/}
                    {/*                        <img src={mainBannerLine} alt="Touch Money"*/}
                    {/*                             className="main-banner__line hidden-mobile wow fadeIn"*/}
                    {/*                             data-wow-duration="0.5s"*/}
                    {/*                             data-wow-delay="3.7s"/>*/}
                    {/*                    </RoundButton>*/}
                    {/*                    <RoundButton rotateZ={0} fromX={0} delay={4500}>*/}
                    {/*                        <img src={mainBannerLineMob} alt="Touch Money"*/}
                    {/*                             className="main-banner__line hidden-desktop"*/}
                    {/*                        />*/}
                    {/*                    </RoundButton>*/}

                    {/*                </div>*/}
                    {/*                <div className="main-banner__project hidden-mobile">*/}
                    {/*                    <div className="main-banner__project-marquee wow fadeIn"*/}
                    {/*                         data-wow-duration="0.5s"*/}
                    {/*                         data-wow-delay="0.3s">*/}
                    {/*                        {!!allProjects && sortColumns(...allProjects.map((val) => (*/}
                    {/*                            <Link to={`/projects/${val.id}`} target="_blank" key={val.id}>*/}
                    {/*                                <img className="main-banner__project-img" alt=''*/}
                    {/*                                     src={val.image ? `${apiUrl}/uploads/${val.image.filename}` : null}*/}
                    {/*                                />*/}
                    {/*                            </Link>*/}
                    {/*                        ))).map((column, index) => (*/}
                    {/*                            <div className="main-banner__project-marquee__column">*/}
                    {/*                                <div style={{*/}
                    {/*                                    gap: "0.5em",*/}
                    {/*                                    display: "flex",*/}
                    {/*                                    flexDirection: "column",*/}
                    {/*                                }}*/}
                    {/*                                     key={index}>*/}
                    {/*                                    {column}*/}
                    {/*                                </div>*/}
                    {/*                                <div style={{*/}
                    {/*                                    gap: "0.5em",*/}
                    {/*                                    display: "flex",*/}
                    {/*                                    flexDirection: "column",*/}
                    {/*                                }}*/}
                    {/*                                     key={index + "_2"}>*/}
                    {/*                                    {column}*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        ))}*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </section>*/}
                    {/*</ScrollUp>*/}

                    {/* {mainProjects ? mainProjects.map(project => { */}
                    {/* return ( */}
                    {/* <section className="main-banner" key={project.id} style={{ background: project.color }}> */}
                    {/* <div className="container"> */}
                    {/* <div className="main-banner__wrap"> */}
                    {/* <div className="main-banner__content"> */}
                    {/* <h1 className="heading-primary">{project.bannerText}</h1> */}
                    {/* <h1 className="heading-primary">Создавайте вместе с&nbsp;нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей</h1> */}
                    {/* <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' className="btn --circle --orange">Презентация агентства</a> */}
                    {/* </div> */}
                    {/* <div className="main-banner__project hidden-mobile"> */}
                    {/* <div className="main-banner__project-name">{project.name}</div> */}
                    {/* <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-banner__project-img" />
                                    <Link to={`/projects/${project.id}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                </div> */}
                    {/* <Swiper
                                    autoplay={{ delay: 3000 }}
                                    slidesPerView={1}
                                    grid={{
                                        rows: 1,
                                    }}
                                    spaceBetween={10}
                                    modules={[Grid]}
                                    onSlideChange={(e) => slideChange(e)}
                                    className="main-banner__project hidden-mobile"
                                    style={{width:'910px'}}
                                    loop={true}
                                    >
                                   {
                                        projects.map((project) => (
                                            <SwiperSlide key={project.id}>
                                                {project.mainVideoFile ? (
                                                    <video className="main-banner__project-img" muted controls>
                                                        <source src={project.mainVideoFile ? `${apiUrl}/uploads/${project.mainVideoFile.filename}` : null}/>
                                                    </video>
                                                ) : (
                                                    <img
                                                        className="main-banner__project-img"
                                                        src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                        alt={project.name}
                                                    />
                                                )}
                                                <Link to={`/projects/${project.id}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <img src={mainBannerLine} alt="Touch Money" className="main-banner__line hidden-mobile" />
                        <img src={mainBannerLineMob} alt="Touch Money" className="main-banner__line hidden-desktop" />
                    </section> */}
                    {/* )
            }) : null} */}

                    {/*<section className="main-projects wow fadeIn"*/}
                    {/*         data-wow-duration="0.1s"*/}
                    {/*         data-wow-delay="0.1s">*/}
                    {/*    <div className="container">*/}
                    {/*        <ScrollUp fromY={70} delay={500}>*/}
                    {/*        <div className="main-projects__head">*/}
                    {/*            <h2 className="heading-secondary">Проекты</h2>*/}
                    {/*            <div className="main-projects__filters hidden-mobile">*/}
                    {/*                <Select classNames={classes} options={optionsType} styles={colourStyles}*/}
                    {/*                        onChange={handleTypeChange} placeholder="Тип проекта"/>*/}
                    {/*                <Select classNames={classes} options={optionsTheme} styles={colourStyles}*/}
                    {/*                        onChange={handleThemeChange} placeholder="Тематика проекта"/>*/}
                    {/*            </div>*/}
                    {/*            <Link to="/projects" className="btn --orange hidden-mobile">Все проекты</Link>*/}
                    {/*        </div>*/}
                    {/*        </ScrollUp>*/}
                    {/*        <div className="main-projects__wrap">*/}
                    {/*            {filteredProjects ? filteredProjects.map((project, index) => {*/}
                    {/*                    const delay = 1000 + index * 200;*/}
                    {/*                    return (*/}
                    {/*                        project.controlURL ?*/}
                    {/*                            <ScrollUp fromY={50} delay={delay}>*/}
                    {/*                            <a href={`${project.projectURL}`} className="main-projects__item"*/}
                    {/*                               key={project.id}>*/}
                    {/*                                <div className="main-projects__img-wrap">*/}
                    {/*                                    {*/}
                    {/*                                        project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'*/}
                    {/*                                            ?*/}
                    {/*                                            <video className="wow slideInLeft"*/}
                    {/*                                                   data-wow-duration="0.5s"*/}
                    {/*                                                   data-wow-delay={`${index * 0.2}s`}*/}
                    {/*                                                   data-wow-offset="100"*/}
                    {/*                                                   ref={(ref) => addVideoRef(ref)} autoPlay muted*/}
                    {/*                                                   playsInline loop>*/}
                    {/*                                                <source*/}
                    {/*                                                    src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}*/}
                    {/*                                                    type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>*/}
                    {/*                                            </video> :*/}
                    {/*                                            project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'*/}
                    {/*                                                ?*/}
                    {/*                                                <div ref={(ref) => addVideoRef(ref)}*/}
                    {/*                                                     dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>*/}
                    {/*                                                :*/}
                    {/*                                                <img ref={(ref) => addVideoRef(ref)} src={project.image*/}
                    {/*                                                    ? `${apiUrl}/uploads/${project.image.filename}` : null}*/}
                    {/*                                                     alt={project.name}*/}
                    {/*                                                     className="main-projects__img wow fadeIn"*/}
                    {/*                                                     data-wow-duration="2s"*/}
                    {/*                                                     data-wow-delay={`${index * 0.350}s`}*/}
                    {/*                                                     data-wow-offset="100"/>*/}
                    {/*                                    }*/}
                    {/*                                </div>*/}
                    {/*                                <div className="main-projects__name wow fadeIn"*/}
                    {/*                                     data-wow-duration="2s"*/}
                    {/*                                     data-wow-delay={`${index * 0.300}s`}*/}
                    {/*                                     data-wow-offset="100">{project.name}</div>*/}
                    {/*                                <div className="main-projects__descr">{project.descrProject}</div>*/}

                    {/*                            </a></ScrollUp> :*/}
                    {/*                            <ScrollUp fromY={50} delay={delay}>*/}
                    {/*                            <Link to={`/projects/${project.nameInEng}`}*/}
                    {/*                                  className={`main-projects__item wow ${index < 1 ? 'fadeInLeft' : 'fadeIn'}`}*/}
                    {/*                                  data-wow-duration="0.5s"*/}
                    {/*                                  data-wow-delay={`${index === 0 ? `0.1` : (0.1 + index * 0.2)}s`}*/}
                    {/*                                  data-wow-offset="100"*/}
                    {/*                                  key={project.id}>*/}
                    {/*                                <div className="main-projects__img-wrap">*/}
                    {/*                                    {*/}
                    {/*                                        project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'*/}
                    {/*                                            ?*/}
                    {/*                                            <video*/}
                    {/*                                                ref={(ref) => addVideoRef(ref)} autoPlay muted*/}
                    {/*                                                playsInline loop>*/}
                    {/*                                                <source*/}
                    {/*                                                    src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}*/}
                    {/*                                                    type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>*/}
                    {/*                                            </video> :*/}
                    {/*                                            project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'*/}
                    {/*                                                ?*/}
                    {/*                                                <div ref={(ref) => addVideoRef(ref)}*/}
                    {/*                                                     dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>*/}
                    {/*                                                :*/}
                    {/*                                                <img className="main-projects__img"*/}
                    {/*                                                     ref={(ref) => addVideoRef(ref)}*/}
                    {/*                                                     src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}*/}
                    {/*                                                     alt={project.name}/>*/}
                    {/*                                    }*/}
                    {/*                                </div>*/}
                    {/*                                <div className="main-projects__name">{project.name}</div>*/}
                    {/*                                <div className="main-projects__descr">{project.descrProject}</div>*/}
                    {/*                            </Link>*/}
                    {/*                            </ScrollUp>*/}
                    {/*                    )*/}
                    {/*                })*/}
                    {/*                : null}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    {working ?
                        <ScrollUp fromY={0} delay={1000}>
                        <section className="main-working whiteHeader">
                            <div className="container">
                                <h3 className="heading-tertiary">Работаем сейчас над</h3>
                                <div className="main-working__wrap">
                                    {
                                        working.map(item => {
                                            return (
                                                <div className="main-working__item" key={item.id}>
                                                    <div className="main-working__img-wrap">
                                                        <img
                                                            src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null}
                                                            alt={item.name} className="main-working__img"/>
                                                    </div>
                                                    <div className="main-working__name">{item.name}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                        </ScrollUp>
                        : null}
                    {/*<ScrollUp fromY={0} delay={500}>*/}
                    {/*<section className="main-services">*/}
                    {/*    <div className="container">*/}
                    {/*        <div className="main-services__wrap">*/}
                    {/*            <div className="main-services__info">*/}
                    {/*                <h2 className="heading-secondary">Услуги</h2>*/}
                    {/*                {*/}
                    {/*                    foundShowreel ?*/}
                    {/*                        <ScrollUp fromY={10} delay={1000}>*/}
                    {/*                            <Showreel data={foundShowreel} key={foundShowreel.id}/>*/}
                    {/*                        </ScrollUp>*/}
                    {/*                        : null*/}
                    {/*                }*/}

                    {/*            </div>*/}
                    {/*            <div className="main-services__content">*/}
                    {/*                {props.services ? props.services.filter((service,index)=> service.isInvisible).map((service, index) => {*/}
                    {/*                    const delay = 1000 + index * 200;*/}
                    {/*                    const fromY = 20 + index * 20;*/}
                    {/*                    return (*/}
                    {/*                        <ScrollUp fromY={fromY} delay={delay}>*/}
                    {/*                            <div className="main-services__item tab-parent"*/}
                    {/*                                 key={service.id}>*/}
                    {/*                                <div className="main-services__head"*/}
                    {/*                                     onClick={(e) => onAcc({e, index})}>*/}
                    {/*                                    <div*/}
                    {/*                                        className="main-services__num">{index < 9 ? 0 : ''}{index + 1}</div>*/}
                    {/*                                    <div className="main-services__name">{service.name}</div>*/}
                    {/*                                    <div className="main-services__btn">*/}
                    {/*                                        <Icon icon="arr-acc"/>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                                <div className="main-services__acc">*/}
                    {/*                                    <div*/}
                    {/*                                        className="main-services__descr"*/}
                    {/*                                    >{service.descr}*/}
                    {/*                                    </div>*/}
                    {/*                                    <div className="main-services__bot"*/}
                    {/*                                    >*/}
                    {/*                                        /!* <div className="main-services__gallery">*/}
                    {/*                                <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />*/}
                    {/*                                <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />*/}
                    {/*                                <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />*/}
                    {/*                            </div> *!/*/}
                    {/*                                        <Link to={`/services/${service.path}`}*/}
                    {/*                                              className="btn --b-orange"*/}
                    {/*                                        >Подробнее</Link>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </ScrollUp>*/}
                    {/*                    )*/}
                    {/*                }) : null}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                    {/*</ScrollUp>*/}
                    <ScrollUp fromY={0} delay={1000}>
                        <section className="main-news">
                            <div className="container">
                                <div className="main-news__wrap">
                                    <div className="main-news__info">
                                        <span>
                                            <h2 className="heading-secondary sticky-h2">Журнал</h2>
                                        </span>
                                        <div className="main-news__info-wrap">
                                            {[...allTags].map((tag, i) => (
                                                <DelayedLink to={`/news?tag=${tag}`} className="main-news__info-item "
                                                      key={i}><p className="p-style-black">#{tag}</p>
                                                    <div className="hover-flip-arrow">
                                                      <span> <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                       <div className="hover-double">
                                                            {double}
                                                        </div>
                                                      </span>
                                                    </div>
                                                </DelayedLink>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="main-news__content">
                                        {news.map((item) => {
                                            return (
                                                <DelayedLink to={`/news/${item.id}`} className="main-news__item" key={item.id}>
                                                    <div className="main-news__img-wrap">
                                                        <img src={`${apiUrl}/uploads/${item.image.filename}`}
                                                             alt="Дизайн" className="main-news__img"/>
                                                    </div>
                                                    <div className="main-news__text">
                                                        <div className="main-news__tag">#{item.tags}</div>
                                                    </div>
                                                    <div className="main-news__descr">
                                                        <div className="main-news__name">{item.name}</div>
                                                    </div>
                                                    <div className="main-agency__item-arrow">
                                                        <div className="hover-flip-circle">
                                                                  <span>
                                                                    <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                                    <div className="hover-circle">
                                                                      {double}
                                                                     </div>
                                                                  </span>
                                                        </div>
                                                    </div>
                                                </DelayedLink>
                                            )
                                        }).slice(0, 2)}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ScrollUp>

                    {/*<SectionSocial/>*/}

                    {/*<SectionProducts />*/}
                </main>
            }
        </>
    )

}

export default connect(
    (state) => (
        {   headerData: state.app.headerData,
            services: state.app.services,
            team: state.app.team,
        }
    )
)(MainPage)
