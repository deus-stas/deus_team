'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './projects.scss';
import './../mainPage/mainPage.scss';
import './../agency/agency.scss';
import { Icon } from '../../components/icon/Icon';
import { gotoAnchor } from "../../components/anchors";
import { Cursor } from "../../components/cursor/cursor";

const MOBILE_SIZE = 768;
const PAGE_SIZE = 10;

export default function ProjectsClient({ initialProjects, initialThemes, initialTypes, searchParams }) {
    const [projects] = useState(initialProjects);
    const [limitProjects, setLimitProjects] = useState([]);
    const [optionsTheme] = useState(initialThemes);
    const [optionsType] = useState(initialTypes);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [checked, setChecked] = useState(null);
    const [checkedType, setCheckedType] = useState(null);
    const [menuTheme, setMenuTheme] = useState(true);
    const [menuType, setMenuType] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isMob, setIsMob] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const onResizeEvent = () => {
                setWindowWidth(window.innerWidth);
                setIsMob(window.innerWidth < 700);
            };
            onResizeEvent();
            window.addEventListener("resize", onResizeEvent);
            return () => window.removeEventListener("resize", onResizeEvent);
        }
    }, []);

    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE);
    }, [windowWidth]);

    useEffect(() => {
        if (searchParams?.theme) {
            const theme = optionsTheme.find(({ href }) => href === searchParams.theme);
            if (theme) {
                setSelectedTheme(theme);
                setChecked(theme);
            }
        }
        if (searchParams?.type) {
            const type = optionsType.find(({ href }) => href === searchParams.type);
            if (type) {
                setSelectedType(type);
                setCheckedType(type);
                setMenuType(true);
                setMenuTheme(false);
            }
        }
    }, [searchParams, optionsTheme, optionsType]);

    const filteredProjects = () => {
        if (!Array.isArray(projects)) return [];
        
        return projects.filter(project => {
            if (!project) return false;
            return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
                (selectedType ? project.projectType === selectedType.value : true) && 
                project.visibility;
        });
    };

    useEffect(() => {
        const filteredProjectList = filteredProjects();
        const initialProjects = filteredProjectList.slice(0, PAGE_SIZE);
        setLimitProjects(initialProjects);
    }, [projects, selectedTheme, selectedType]);

    const loadNewProject = () => {
        const filteredProjectList = filteredProjects();
        const currentPage = limitProjects.length / PAGE_SIZE;
        const startIndex = currentPage * PAGE_SIZE;
        const newProjects = filteredProjectList.slice(startIndex, startIndex + PAGE_SIZE);
        setLimitProjects([...limitProjects, ...newProjects]);
    };

    const allProjectsLoaded = limitProjects.length >= filteredProjects().length;

    const handleLinkClick = (e, value) => {
        gotoAnchor(e, 'start', false);
        setChecked(value);
    };

    const renderProjects = (isEven) => (
        <>
            {limitProjects.filter((_, index) => isEven ? index % 2 === 0 : index % 2 !== 0)
                .map((project, index) => (
                    <div key={project.id} style={{ display: "flex", flexDirection: "column", gap: '2rem' }}>
                        <Link href={`/projects/${project.nameInEng}`} className={`projects__item projects__item__${index + 1}`}>
                            <div className="projects__item-img-wrap">
                                {project.imageMob?.filename?.endsWith('.mp4') || project.image?.filename?.endsWith('.mp4') ? (
                                    <VideoComponent
                                        project={project}
                                        isMob={isMob}
                                        videoSize={isMob ? 
                                            `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/uploads/${project.imageMob?.filename}` :
                                            `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/uploads/${project.image.filename}`
                                        }
                                    />
                                ) : (
                                    <img
                                        src={isMob ? 
                                            `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/uploads/${project.imageMob?.filename}` :
                                            `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/uploads/${project.image.filename}`
                                        }
                                        alt={project.name}
                                        className="main-projects__img"
                                    />
                                )}
                            </div>
                        </Link>
                        <span className="projects-decription m-text">
                            <p style={{ color: "rgba(117, 118, 119, 1)" }}>{project.date} • {project.name}</p>
                            <Link href={`/projects/${project.nameInEng}`} className="heading-secondary">
                                {project.descrProject}
                            </Link>
                        </span>
                    </div>
                ))}
        </>
    );

    const category = (
        <div className="projects-category">
            <div className="projects-start__filters m-text">
                <span style={{position:'relative'}} className="flex-sb">
                    <div className="switcher" style={{transform: menuTheme ? 'translateX(0%)' : 'translateX(100%)'}}/>
                    <div className="item" onClick={() => {
                        setMenuTheme(true);
                        setMenuType(false);
                    }}>
                        <p>По отраслям</p>
                    </div>
                    <div className="item" onClick={() => {
                        setMenuType(true);
                        setMenuTheme(false);
                    }}>
                        <p>По услугам</p>
                    </div>
                </span>
            </div>
            <div className="projects-menu tapped">
                <div className="main-projects__item-flex">
                    {menuTheme ? (
                        <>
                            {optionsTheme && optionsTheme.map((project, index) => {
                                const filterProjects = projects.filter(item => 
                                    item.projectTheme === project.value && item.visibility
                                );
                                const totalSum = filterProjects.length.toString().padStart(2, '0');
                                if (totalSum < 1) return null;
                                
                                return (
                                    <Link
                                        key={`theme-${index}`}
                                        onClick={(e) => handleLinkClick(e, project.value)}
                                        href={`/projects?theme=${project.href}`}
                                    >
                                        <div className="main-projects__item-flex__inner">
                                            <span className={`main-projects__item-btn ${checked === project.value ? 'activeItem' : ''}`}>
                                                <span className="m-text">
                                                    <p className="hover custom-cursor-link" datahash="projectNav">
                                                        {project.label}
                                                    </p>
                                                </span>
                                                <div className={`main-agency__item-header__num xs-text ${checked === project.value ? 'activeNum' : ''}`}>
                                                    {totalSum}
                                                </div>
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {optionsType && optionsType.map((project, index) => {
                                const filterProjects = projects.filter(item => 
                                    item.projectType === project.value && item.visibility
                                );
                                const totalSum = filterProjects.length.toString().padStart(2, '0');
                                if (totalSum < 1) return null;
                                
                                return (
                                    <Link
                                        key={`type-${index}`}
                                        onClick={(e) => handleLinkClick(e, project.value)}
                                        href={`/projects?type=${project.href}`}
                                    >
                                        <div className="main-projects__item-flex__inner">
                                            <span className={`main-projects__item-btn ${checkedType === project.value ? 'activeItem' : ''}`}>
                                                <span className="m-text">
                                                    <p className="hover custom-cursor-link" datahash="projectNav">
                                                        {project.label}
                                                    </p>
                                                </span>
                                                <div className={`main-agency__item-header__num xs-text ${checkedType === project.value ? 'activeNum' : ''}`}>
                                                    {totalSum}
                                                </div>
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <main className="projects">
            <Cursor />
            <section className="projects-start">
                <div className="container">
                    <span className="projects-start__text">
                        <p className="m-text">Проекты</p>
                        <h1 className="heading-primary">
                            Мы гордимся каждым<br/> выполненным проектом
                        </h1>
                    </span>
                </div>
            </section>
            
            <section id="projectNav" className="projects-content">
                <div className="container">
                    {isMobile && category}
                    <div className="projects__wrap">
                        <span className="projects__wrap-span">
                            <div className="projects__wrap-column">
                                {renderProjects(true)}
                            </div>
                        </span>
                        <span className="translateY">
                            {!isMobile && category}
                            <div className="projects__wrap-column">
                                {renderProjects(false)}
                            </div>
                        </span>
                    </div>
                    
                    <div className="flex-sb margin-for-button">
                        {!allProjectsLoaded && (
                            <div onClick={loadNewProject} className="m-text loadMore">
                                Показать еще
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export const VideoComponent = React.forwardRef(({ project, videoSize }, ref) => {
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
            <source src={videoSize} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
        </video>
    );
}); 