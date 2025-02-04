'use client'; // Если вы используете Next.js с папкой `app`

import React from 'react'
import {useEffect, useRef, useState, Suspense } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../axios'
import Link from 'next/link'; // Используем Link из Next.js для навигации
// import { useSearchParams } from 'next/navigation';
import './projects.scss'
import './../mainPage/mainPage.scss'
import './../agency/agency.scss'
import {Icon} from '../../components/icon/Icon'
import {gotoAnchor} from "../../components/anchors";
import {Cursor} from "../../components/cursor/cursor";

import { usePathname } from 'next/navigation';


const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`

const Projects = () => {
    const MOBILE_SIZE = 768
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
    const pathname = usePathname();
    

    // const searchParams = useSearchParams(); // для работы с URL-параметрами
    const getSearchParams = () => {
        if (typeof window !== 'undefined') {
          return new URLSearchParams(window.location.search);
        }
        return null;
      };

    // const [isMob, setIsMob] = useState(window.innerWidth < 700);
    const [isMob, setIsMob] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 700 : false
    );
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowWidth, setWindowWidth] = useState(0); // Начальное значение для SSR
    const [isMobile, setIsMobile] = useState(windowWidth <= MOBILE_SIZE)

    // const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== "undefined") {




            const onResizeEvent = () => {
                setWindowWidth(window.innerWidth);
            };
            setWindowWidth(window.innerWidth);
            window.addEventListener("resize", onResizeEvent);
    
            return () => {
                window.removeEventListener("resize", onResizeEvent);
            };
        }
    }, []);
    
    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE)
    }, [windowWidth])


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
                    const {id, name, href} = item;
                    projectOptionsTheme[i] = {value: id, label: name, href:href}
                })
                console.log(projectOptionsTheme);
                updateOptionsTheme(projectOptionsTheme)
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setChecked(selectedTheme);
    }, [selectedTheme]);

    useEffect(() => {
        setCheckedType(selectedType);
    }, [selectedType]);

    const updateOptionsType = (projectOptionsType) => {
        const searchParams = getSearchParams();
        const typeKey = searchParams?.get(TYPE_KEY);
        if (typeKey) {
            setMenuType(true);
            setMenuTheme(false);

            const type = projectOptionsType.find(({ href }) => href === typeKey);
            if (type) {
                setSelectedType(type);
            }
        }
    };

    const updateOptionsTheme = (projectOptionsTheme) => {
        setOptionsTheme(projectOptionsTheme);
        const searchParams = getSearchParams();
        const themeKey = searchParams?.get(THEME_KEY);
        console.log('themeKey', themeKey);
        console.log('projectOptionsTheme', projectOptionsTheme);
        if (themeKey) {
            // const theme = projectOptionsTheme.find(({ value }) => value === themeKey);
            const theme = projectOptionsTheme.find(({ href }) => href === themeKey);
            if (theme) {
                setSelectedTheme(theme);
            }
        }
    };

    useEffect(() => {
        updateOptionsTheme(optionsTheme);
    }, [optionsTheme])

    useEffect(() => {
        updateOptionsType(optionsType)
    }, [optionsType])

    const loadTypes = (cb) => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const {id, name, key} = item;
                    projectOptionsType[i] = {value: id, label: name, href:key}
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
        if (typeof window !== 'undefined') {
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
        }
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
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMob(window.innerWidth < 700);
            };
    
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [windowWidth]);

    const sizeLarge = 'Мы гордимся каждым<br/> выполненным проектом';
    const size1024 = 'Мы гордимся каждым<br/> выполненным проектом';
    const size768 = 'Мы гордимся каждым<br/> выполненным<br/> проектом';
    const size360 = 'Мы гордимся каждым выполненным проектом';


    const projectSizeLabel = '(min-width:1025px)' ? "s-text" : '(min-width:940px)' ? "m-text" : "m-text"

    let text = sizeLarge;

    const handleLinkClick = (e) => {

        gotoAnchor(e, 'start', false);
        setChecked(value);
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

                                        <Link 
                                            onClick={(e) => handleLinkClick(e, project.value)}
                                            href={`/projects?theme=${project.href}`}
                                            key={`index-${index}`}
                                            >
                                            <div className="main-projects__item-flex__inner" >
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
                                    console.log(project)
                                    return (
                                        <Link 
                                            // onClick={(e) => gotoAnchor(e, 'start', false)} 
                                            onClick={(e) => handleLinkClick(e, project.value)} 
                                            href={`/projects?type=${project.href}`} 
                                            key={`key-vlue-${index}`}
                                            >
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
                console.log();
                const numProject = index < 9 ? "0" + (index + 1) : (index + 1);
                const isLastItem = index + 1 === array.length;
                const imgSize = isMob ? `${apiUrl}/uploads/${project.imageMob?.filename}` : `${apiUrl}/uploads/${project.image.filename}`;
                const isVideo = project.imageMob && project.imageMob?.filename.endsWith('.mp4') || project.image && project.image.filename.endsWith('.mp4');

                return (
                    <div key={project.id} style={{ display: "flex", flexDirection: "column", gap: '2rem' }}>
                        <Link
                            href={`/projects/${project.nameInEng}`}
                            className={`projects__item projects__item__${index + 1}`}
                            key={project.id}
                        >
                            <div className="projects__item-img-wrap">
                                {isVideo ?
                                    <VideoComponent ref={(ref) => addVideoRef(ref)} project={project} isMob={isMob} videoSize={imgSize} apiUrl={apiUrl} /> :
                                    <img  src={imgSize} alt={project.name} className="main-projects__img" />
                                }
                            </div>
                        </Link>
                        <span className="projects-decription m-text">
                        <p style={{ color: "rgba(117, 118, 119, 1)" }}>{project.date} • {project.name}</p>
                    <Link
                        href={`/projects/${project.nameInEng}`}
                        className="heading-secondary"
                    >
                        {project.descrProject}
                    </Link>
                </span>
                    </div>

            )
        })
        : null}</>

    const odd = renderProject(true)
    const even = renderProject(false)

    return (
        <>  
            <Suspense fallback={<div>Loading...</div>}>
                <Cursor/>
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
                                    <span className={"projects__wrap-span"}>
                                    <div className="projects__wrap-column">{odd}</div>
                                    </span>
                                    <span className="translateY">
                                        {!isMobile && <>{category}</>}
                                        <div className="projects__wrap-column">{even}</div>
                                    </span>

                                </div>
                                <div className="flex-sb margin-for-button">
                                    {!allProjectsLoaded && (
                                        <div onClick={loadNewProject} className="m-text loadMore">Показать еще</div>
                                    )}
                                </div>
                            </div>

                        </section>

                    </main>
                }
            </Suspense>
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
                    if (videoRef?.current?.currentTime > 0 && !videoRef?.current?.paused && !videoRef?.current?.ended && videoRef?.current?.readyState > 2) {
                        videoRef?.current?.pause();
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
