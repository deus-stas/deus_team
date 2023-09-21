import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Grid, Autoplay } from "swiper";

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';

import "swiper/css";
import "swiper/css/grid";
import './mainPage.scss';



import mainBannerLine from '../../../img/main-banner-line.svg';
import mainBannerLineMob from '../../../img/main-banner-line-mob.svg';


SwiperCore.use([Autoplay]);

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;


const colourStyles = {
    control: (styles) => ({}),
    valueContainer: (styles) => ({}),
    placeholder: (styles) => ({}),
    indicatorSeparator: (styles) => ({ display: 'none' }),
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

const onAcc = (e) => {
    let accItem = e.target.closest('.tab-parent');
    if (accItem.classList.contains('active')) {
        accItem.classList.remove('active');
    } else {
        accItem.classList.add('active');
    }
}

const MainPage = () => {

    const [news, setNews] = useState([]);
    const [allTags, setAllTags] = useState(new Set());

    const [working, setWorking] = useState([]);
    const [showreels, setShowreels] = useState([]);

    const [projects, setProjects] = useState([]);
    const [mainProjects, setMainProjects] = useState([]);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [services, setServices] = useState([]);
    const [current, setCurrent] = useState(4);
    const [endSlider, setEndSlider] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
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
        axios.get(`${apiUrl}/api/services/`)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.position - b.position);
                setServices(sortedData);
                console.log(sortedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                let mainProject = [];
                setProjects(response.data);
                response.data.forEach(project => {
                    if (project.main) mainProject[0] = project;
                });
                setMainProjects(mainProject);
                console.log(response.data);
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
                    const { id, name } = item;
                    projectOptionsTheme[i] = { value: id, label: name }
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
                    const { id, name } = item;
                    projectOptionsType[i] = { value: id, label: name }
                })
                setOptionsType(projectOptionsType)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const slideChange = (slider) => {
        if (slider.touches.diff > 0) {
            if (endSlider) {
                setCurrent(current - 1);
                setEndSlider(false);
            } else {
                setCurrent(current - 2);
            }
        } else {
            if (current + 1 === 2) {
                setCurrent(2);
                setEndSlider(true);
            } else {
                setCurrent(current + 2);
            }
        }
    }

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = projects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    }).slice(0, 3);

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

    return (
        <main className="main">
            {mainProjects ? mainProjects.map(project => {
                return (
                    project.visibility ? 
                    (
                        <section className="main-banner" key={project.id} style={{ background: project.color }}>
                            <div className="container">
                                <div className="main-banner__wrap">
                                    <div className="main-banner__content">
                                        <h1 className="heading-primary">{project.bannerText}</h1>
                                        {/* <h1 className="heading-primary">Создавайте вместе с&nbsp;нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей</h1> */}
                                        <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' className="btn --circle --orange">Презентация агентства</a>
                                    </div>
                                    <div className="main-banner__project hidden-mobile">
                                        {/* <div className="main-banner__project-name">{project.name}</div> */}
                                        {
                                            project.mainVideoFile ? (
                                                <video width={800} className="main-banner__project-img" autoPlay muted loop>
                                                    <source src={project.mainVideoFile ? `${apiUrl}/uploads/${project.mainVideoFile.filename}` : null} />
                                                </video>
                                            ) : (
                                                <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-banner__project-img" />
                                            )
                                        }
                                        <Link to={`/projects/${project.nameInEng}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                    </div>
                                </div>
                            </div>
                            <img src={mainBannerLine} alt="Touch Money" className="main-banner__line hidden-mobile" />
                            <img src={mainBannerLineMob} alt="Touch Money" className="main-banner__line hidden-desktop" />
                        </section>
                    ) : null
                )
            }) : null}

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

            <section className="main-projects">
                <div className="container">
                    <div className="main-projects__head">
                        <h2 className="heading-secondary">Проекты</h2>
                        <div className="main-projects__filters hidden-mobile">
                            <Select classNames={classes} options={optionsType} styles={colourStyles} onChange={handleTypeChange} placeholder="Тип проекта" />
                            <Select classNames={classes} options={optionsTheme} styles={colourStyles} onChange={handleThemeChange} placeholder="Тематика проекта" />
                        </div>
                        <Link to="/projects" className="btn --orange hidden-mobile">Все проекты</Link>
                    </div>
                    <div className="main-projects__wrap">
                        {filteredProjects ? filteredProjects.map((project,index) => {
                            return (
                                project.controlURL ?
                                <a href={`${project.projectURL}`} className="main-projects__item" key={project.id}>
                                    <div className="main-projects__img-wrap">
                                        {
                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null' 
                                                ?
                                            <video ref={(ref) => addVideoRef(ref)} autoPlay muted playsInline>
                                                <source src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                            </video> : 
                                            project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                ?
                                                <div ref={(ref) => addVideoRef(ref)} dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                :
                                                <img ref={(ref) => addVideoRef(ref)} src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-projects__img" />
                                        }
                                    </div>
                                    <div className="main-projects__name">{project.name}</div>
                                </a> :
                                <Link to={`/projects/${project.nameInEng}`} className="main-projects__item" key={project.id}>
                                    <div className="main-projects__img-wrap">
                                            {
                                                project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null' 
                                                    ?
                                                <video ref={(ref) => addVideoRef(ref)} autoPlay muted playsInline>
                                                    <source src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                                </video> : 
                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                    ?
                                                    <div ref={(ref) => addVideoRef(ref)} dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                    :
                                                    <img ref={(ref) => addVideoRef(ref)} src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-projects__img" />
                                            }
                                    </div>
                                    <div className="main-projects__name">{project.name}</div>
                                </Link> 
                            )
                        })
                            : null}
                    </div>
                </div>
            </section>

            {working ?
                <section style={{display: 'none'}} className="main-working">
                    <div className="container">
                        <h3 className="heading-tertiary">Работаем сейчас над</h3>
                        <div className="main-working__wrap">
                            {
                                working.map(item => {
                                    return (
                                        <div className="main-working__item" key={item.id}>
                                            <div className="main-working__img-wrap">
                                                <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null} alt={item.name} className="main-working__img" />
                                            </div>
                                            <div className="main-working__name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                : null}

            <section className="main-services">
                <div className="container">
                    <div className="main-services__wrap">
                        <div className="main-services__info">
                            <h2 className="heading-secondary">Услуги</h2>
                            {
                                foundShowreel ? <Showreel data={foundShowreel} key={foundShowreel.id} /> : null
                            }

                        </div>
                        <div className="main-services__content">
                            {services ? services.map((service, index) => {
                                return (
                                    service.isInvisible ?
                                        <div className="main-services__item tab-parent" key={service.id}>
                                            <div className="main-services__head" onClick={onAcc}>
                                                {/* <div className="main-services__num">{index < 9 ? 0 : ''}{index + 1}</div> */}
                                                <div className="main-services__name">{service.name}</div>
                                                <div className="main-services__btn">
                                                    <Icon icon="arr-acc" />
                                                </div>
                                            </div>
                                            <div className="main-services__acc">
                                                <div className="main-services__descr">{service.descr}</div>
                                                <div className="main-services__bot">
                                                    {/* <div className="main-services__gallery">
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                </div> */}
                                                    <Link to={`/services/${service.path}`} className="btn --b-orange">Подробнее</Link>
                                                </div>
                                            </div>
                                        </div> : null
                                )
                            }) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="main-news">
                <div className="container">
                    <div className="main-news__wrap">
                        <div className="main-news__info">
                            <h2 className="heading-secondary">Журнал</h2>
                            <div className="main-news__info-wrap">
                                {[...allTags].map((tag, i) => (
                                    <Link to={`/news?tag=${tag}`} className="main-news__info-item" key={i}>#{tag}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="main-news__content">
                            {news.map((item) => {
                                return (
                                    <Link to={`/news/${item.id}`} className="news__item" key={item.id}>
                                        <div className="news__img-wrap">
                                            <img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн" className="news__img" />
                                        </div>
                                        <div className="news__text">
                                            <div className="news__tag">{item.tags}</div>
                                            <div className="news__name">{item.name}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section> */}

            <SectionSocial />

            <SectionProducts />

        </main>
    )

}

export default MainPage;