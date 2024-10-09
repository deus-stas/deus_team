import {Link, useLocation, useSearchParams} from 'react-router-dom';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'

import './projects.scss'
import {Icon} from "../../icon/Icon";
import {gotoAnchor} from "../../anchors";
import DelayedLink from "../../appHeader/DelayedLink";
import {debounce, useMediaQuery} from "@material-ui/core";
import {useMobile} from "./projectDetail/ProjectDetail";

const apiUrl = ''

const Projects = () => {
    const MOBILE_SIZE = 768
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [limitProjects, setLimitProjects] = useState(projects);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [checked, setChecked] = useState(selectedTheme);
    const [checkedType, setCheckedType] = useState(selectedType);
    const [menuTheme, setMenuTheme] = useState(true);
    const [menuType, setMenuType] = useState(false);
    const [select, setSelect] = useState(false);
    const location = useLocation();
    const [isMob, setIsMob] = useState(window.innerWidth < 700);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(windowWidth <= MOBILE_SIZE)


    useEffect(() => {
        window.addEventListener("resize", onResizeEvent);
        return () => window.removeEventListener("resize", onResizeEvent);
    }, [])

    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE)
    }, [windowWidth])
    const onResizeEvent = () => {
        debouncedResize();
    };


    const debouncedResize = debounce(() => setWindowWidth(window.innerWidth), 100);

    const THEME_KEY = 'theme'
    const TYPE_KEY = 'type'
    const loadProject = (cb) => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setProjects(response.data);
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    const loadThemes = (cb) => {
        axios.get(`${apiUrl}/api/themes/`)
            .then((response) => {
                let projectOptionsTheme = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsTheme[i] = {value: id, label: name}
                })
                updateOptionsTheme(projectOptionsTheme)
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const updateOptionsTheme = (projectOptionsTheme) => {
        setOptionsTheme(projectOptionsTheme)
        if (searchParams.has(THEME_KEY)) {

            const optionId = searchParams.get(THEME_KEY)
            const theme = projectOptionsTheme.find(({value}) => value === optionId)
            if (theme) {
                setSelectedTheme(theme);
                searchParams.delete(THEME_KEY)
                setSearchParams(searchParams)
            }
        }
    }
    useEffect(() => {
        setChecked(selectedTheme);
    }, [selectedTheme]);

    useEffect(() => {
        setCheckedType(selectedType);
    }, [selectedType]);

    const updateOptionsType = (projectOptionsType) => {
        if (searchParams.has(TYPE_KEY)) {
            setMenuType(true)
            setMenuTheme(false)
            const optionId = searchParams.get(TYPE_KEY)
            const type = projectOptionsType.find(({value}) => value === optionId)
            if (type) {
                setSelectedType(type);
                searchParams.delete(TYPE_KEY)
                setSearchParams(searchParams)
            }
        }
    }
    const loadTypes = (cb) => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsType[i] = {value: id, label: name}
                })
                setOptionsType(projectOptionsType)
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        loadTypes(() => loadThemes(() => loadProject()))
    }, []);

    useEffect(() => {
        updateOptionsTheme(optionsTheme);
    }, [searchParams])

    useEffect(() => {
        updateOptionsType(optionsType)
    }, [searchParams, optionsType])


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

    const filteredProjects = (iProjects = projects) => (iProjects || []).filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    })

    const PAGE_SIZE = 10

    useEffect(() => {
        const filteredProjectList = filteredProjects(projects || []);
        const initialProjects = filteredProjectList.slice(0, PAGE_SIZE);
        setLimitProjects(initialProjects);
    }, [projects, selectedTheme, selectedType]);

    //todo optimize
    // const memoFilteredProjects =  useMemo(() => {
    //     const filterProject = filteredProjects(projects || [])
    //     setLimitProjects(filterProject.slice(0, PAGE_SIZE))
    //     return filterProject;
    // }, [projects])

    // const actionInSight = (entries) => {
    //     const filteredProjectList = filteredProjects(projects || [])
    //     const totalPages = filteredProjectList.length/PAGE_SIZE + 1
    //     const currentPage = limitProjects.length / PAGE_SIZE
    //     if (entries[0].isIntersecting && currentPage <= totalPages) {
    //         loadNewProject();
    //     }
    // };

    const loadNewProject = () => {
        const filteredProjectList = filteredProjects(projects || []);
        const currentPage = limitProjects.length / PAGE_SIZE;
        const startIndex = currentPage * PAGE_SIZE;
        const newProjects = filteredProjectList.slice(startIndex, startIndex + PAGE_SIZE);
        setLimitProjects([...limitProjects, ...newProjects]);
    };

    const allProjectsLoaded = limitProjects.length >= filteredProjects(projects || []).length;

    const videoRefs = useRef([]);

    const double = <Icon icon="arrowGo" viewBox="0 0 30 31"/>

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMob(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    const sizeLarge = 'Мы гордимся каждым<br/> выполненным проектом';
    const size1024 = 'Мы гордимся каждым<br/> выполненным проектом';
    const size768 = 'Мы гордимся каждым<br/> выполненным<br/> проектом';
    const size360 = 'Мы гордимся каждым выполненным проектом';

    const matches1440 = useMediaQuery('(min-width:1025px)');
    const matches1024 = useMediaQuery('(min-width:940px)');
    const matches768 = useMediaQuery('(min-width:420px)');
    const matches360 = useMediaQuery('(min-width:0px)');
    const projectSizeLabel = matches768 ? "m-text" : matches360 ? "s-text" : "m-text"

    let text;
    if (matches1440) {
        text = sizeLarge;
    } else if (matches1024) {
        text = size1024;
    } else if (matches768) {
        text = size768;
    } else if (matches360) {
        text = size360;
    }

    const category = <>
        <div className="projects-category">
            <div className="projects-start__filters m-text">
                <span style={{position:'relative'}} className="flex-sb">
                    <div className="switcher" style={{transform: menuTheme ? 'translateX(0%)' : 'translateX(100%)'}}/>
                    <div className="item" onClick={() => {
                        setMenuTheme(true)
                        setMenuType(false)
                    }}>
                        <p>По отраслям</p>
                    </div>
                    <div className="item" onClick={() => {
                        setMenuType(true)
                        setMenuTheme(false)
                    }}>
                        <p>По услугам</p>
                    </div>
                </span>
            </div>
            <div className={`projects-menu tapped`}>
                <div className="main-projects__item-flex">
                    {menuTheme ? (
                            <>
                                {optionsTheme ? optionsTheme.map((project, index) => {
                                    const filterProjects = projects.filter(item => item.projectTheme === project.value && item.visibility);
                                    const totalSum = filterProjects.length.toString().padStart(2, '0');
                                    if (totalSum < 1) return null;
                                    return (

                                        <Link onClick={(e) => gotoAnchor(e, 'start', false)}
                                              to={`/projects?theme=${project.value}`}>
                                            <div className="main-projects__item-flex__inner" onClick={() => {
                                                setChecked(project.value)}}>
                                                <span className={`main-projects__item-btn ${checked && checked.value === project.value  &&  'activeItem'}`}>
                                                    <span className={`${projectSizeLabel}`}>
                                                        <p className="hover custom-cursor-link"
                                                           datahash="projectNav">
                                                            {project.label}
                                                        </p>
                                                    </span>
                                                    <div
                                                        className={`main-agency__item-header__num xs-text ${checked && checked.value === project.value  && 'activeNum'}`}>
                                                        {totalSum}
                                                    </div>
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                }) : null}
                            </>
                        )
                        :
                        menuType && (
                            <>
                                {optionsType ? optionsType.map((project, index) => {
                                    const filterProjects = projects.filter(item => item.projectType === project.value && item.visibility);
                                    const totalSum = filterProjects.length.toString().padStart(2, '0');
                                    if (totalSum < 1) return null;
                                    return (
                                        <Link onClick={(e) => gotoAnchor(e, 'start', false)} to={`/projects?type=${project.value}`}>
                                            <div className="main-projects__item-flex__inner">
                                                <span className={`main-projects__item-btn ${checkedType && checkedType.value === project.value && 'activeItem'}`}>
                                                    <span className={`${projectSizeLabel}`}>
                                                        <p className="hover custom-cursor-link" datahash="projectNav">
                                                            {project.label}
                                                        </p>
                                                    </span>
                                                    <div className={`main-agency__item-header__num xs-text ${checkedType && checkedType.value === project.value && 'activeNum'}`}>
                                                        {totalSum}
                                                    </div>
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                }) : null}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </>
    const renderProject = (b) => <>{limitProjects ? limitProjects
            .filter((project, index, array) => !!b ? index % 2 === 0 : index % 2 !== 0)
            .map((project, index, array) => {
                const numProject = index < 9 ? "0" + (index + 1) : (index + 1);
                const isLastItem = index + 1 === array.length;
                const imgSize = isMob ? `${apiUrl}/uploads/${project.imageMob?.filename}` : `${apiUrl}/uploads/${project.image.filename}`;
                const isVideo = project.imageMob && project.imageMob?.filename.endsWith('.mp4') || project.image && project.image.filename.endsWith('.mp4');

                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: '2rem' }}>
                        <DelayedLink 
                            to={`/projects/${project.nameInEng}`} 
                            className={`projects__item projects__item__${index + 1}`}
                            key={project.id}
                        >
                            <div className="projects__item-img-wrap">
                                {isVideo ?
                                    <VideoComponent ref={(ref) => addVideoRef(ref)} project={project} isMob={isMob} videoSize={imgSize} apiUrl={apiUrl} /> :
                                    <img  src={imgSize} alt={project.name} className="main-projects__img" />
                                }
                            </div>
                        </DelayedLink>
                        <span className="projects-decription m-text">
                  <p style={{ color: "rgba(117, 118, 119, 1)" }}>{project.date} • {project.name}</p>
                  <p className="heading-secondary">{project.descrProject}</p>
                </span>
                    </div>

            )
        })
        : null}</>

    const odd = renderProject(true)
    const even = renderProject(false)

    return (
        <>
            {!isLoading &&
                <main className="projects">
                    <section className="projects-start">
                        <div className="container">
                            <span className="projects-start__text">
                              <p className="m-text">Проекты</p>
                            <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: text}}/>
                            </span>

                        </div>
                    </section>
                    <section id="projectNav" className="projects-content">

                        <div className="container">
                            {!!isMobile && <>{category}</>}
                            <div className="projects__wrap">
                                <span>
                                   <div className="projects__wrap-column">{odd}</div>
                                </span>
                                <span className="translateY">
                                    {!isMobile && <>{category}</>}
                                    <div className="projects__wrap-column">{even}</div>
                                </span>

                            </div>
                            <div className="flex-sb">
                                {!allProjectsLoaded && (
                                    <div onClick={loadNewProject} className="m-text loadMore">Показать еще</div>
                                )}
                            </div>
                        </div>

                    </section>

                </main>
            }
        </>
    )

}

export const VideoComponent = ({project, apiUrl, videoSize}) => {
    const videoRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.play().catch(error => console.log(error));
                } else {
                    if (videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended && videoRef.current.readyState > 2) {
                        videoRef.current.pause();
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [videoSize]);

    return (
        <video key={'videoSize_' + videoSize} ref={videoRef} muted loop playsInline>
            <source
                src={videoSize}
                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"
            />
        </video>

    );
};

export default Projects;