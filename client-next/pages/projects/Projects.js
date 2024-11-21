"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "../../axios"; // ваш axios-инстанс

import "./projects.scss";
import { Icon } from "../../components/icon/Icon";
import { gotoAnchor } from "../../components/anchors";
import { Cursor } from "../../components/cursor/cursor";

const apiUrl = ""; // Укажите ваш API URL

const Projects = () => {
    const MOBILE_SIZE = 768;

    // Состояния
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [limitProjects, setLimitProjects] = useState([]);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [menuTheme, setMenuTheme] = useState(true);
    const [menuType, setMenuType] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(windowWidth <= MOBILE_SIZE);

    // Навигационные хуки
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Constants
    const THEME_KEY = "theme";
    const TYPE_KEY = "type";
    const PAGE_SIZE = 10;

    // Обновление ширины экрана
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobile(windowWidth <= MOBILE_SIZE);
    }, [windowWidth]);

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [themesResponse, typesResponse, projectsResponse] = await Promise.all([
                    axios.get(`${apiUrl}/api/themes/`),
                    axios.get(`${apiUrl}/api/types/`),
                    axios.get(`${apiUrl}/api/projects/`),
                ]);

                const themes = themesResponse.data.map(({ id, name }) => ({ value: id, label: name }));
                const types = typesResponse.data.map(({ id, name }) => ({ value: id, label: name }));

                setOptionsTheme(themes);
                setOptionsType(types);
                setProjects(projectsResponse.data);
                setLimitProjects(projectsResponse.data.slice(0, PAGE_SIZE));

                // Обновить параметры темы и типа
                updateOptions(THEME_KEY, themes, setSelectedTheme);
                updateOptions(TYPE_KEY, types, setSelectedType);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Обновление выбранной темы или типа
    const updateOptions = (key, options, setSelected) => {
        const optionId = searchParams.get(key);
        if (optionId) {
            const selectedOption = options.find(({ value }) => value === optionId);
            if (selectedOption) {
                setSelected(selectedOption);
            }
        }
    };

    // Фильтрация проектов
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const themeMatch = selectedTheme ? project.projectTheme === selectedTheme.value : true;
            const typeMatch = selectedType ? project.projectType === selectedType.value : true;
            return themeMatch && typeMatch && project.visibility;
        });
    }, [projects, selectedTheme, selectedType]);

    // Загрузка новых проектов (при прокрутке или клике "Показать еще")
    const loadMoreProjects = () => {
        const currentPage = limitProjects.length / PAGE_SIZE;
        const startIndex = currentPage * PAGE_SIZE;
        const newProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);
        setLimitProjects([...limitProjects, ...newProjects]);
    };

    const allProjectsLoaded = limitProjects.length >= filteredProjects.length;

    // Рендер проекта
    const renderProject = (projectsToRender) =>
        projectsToRender.map((project) => {
            const isVideo = project.imageMob?.filename?.endsWith(".mp4") || project.image?.filename?.endsWith(".mp4");
            const imgSrc = isMobile
                ? `${apiUrl}/uploads/${project.imageMob?.filename}`
                : `${apiUrl}/uploads/${project.image?.filename}`;

            return (
                <div key={project.id} className="projects__item">
                    <Link href={`/projects/${project.nameInEng}`}>
                        <div className="projects__item-img-wrap">
                            {isVideo ? (
                                <video src={imgSrc} muted loop playsInline className="main-projects__img" />
                            ) : (
                                <img src={imgSrc} alt={project.name} className="main-projects__img" />
                            )}
                        </div>
                    </Link>
                    <p className="projects-decription">
                        {project.date} • {project.name}
                    </p>
                </div>
            );
        });

    return (
        <main className="projects">
            {!isLoading ? (
                <>
                    <Cursor />
                    <section className="projects-start">
                        <div className="container">
                            <h1 className="heading-primary">Проекты</h1>
                        </div>
                    </section>

                    <section className="projects-content">
                        <div className="container">
                            <div className="projects__wrap">
                                {renderProject(limitProjects)}
                            </div>
                            {!allProjectsLoaded && (
                                <button onClick={loadMoreProjects} className="loadMore">
                                    Показать еще
                                </button>
                            )}
                        </div>
                    </section>
                </>
            ) : (
                <p>Загрузка...</p>
            )}
        </main>
    );
};

export default Projects;
