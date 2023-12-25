import {Link, useLocation, useSearchParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
import Select from 'react-select';

import Cta from '../../cta/Cta';

import './projects.scss'
import TypeWriterText from "../../typeWriterText";
import {connect} from "react-redux";
import projectBanner from "../../../img/project-main.mp4";
import {Icon} from "../../icon/Icon";

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

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const Projects = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [menuTheme,setMenuTheme] = useState(true);
    const [menuType, setMenuType] = useState(false);
    const [select, setSelect] = useState(false);
    const location = useLocation();
    const THEME_KEY='theme'
    const TYPE_KEY ='type'
    const loadProject = (cb) => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setProjects(response.data);
                console.log(response.data);
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
                console.log(response.data);
                let projectOptionsTheme = [];
                response.data.forEach((item, i) => {
                    const { id, name } = item;
                    projectOptionsTheme[i] = { value: id, label: name }
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
    const updateOptionsTheme=(projectOptionsTheme)=>{
        setOptionsTheme(projectOptionsTheme)
        console.log("lolo:", searchParams)
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

    const updateOptionsType=(projectOptionsType)=>{
        setOptionsType(projectOptionsType)
        if (searchParams.has(TYPE_KEY)) {
            const optionId = searchParams.get(TYPE_KEY)
            const type = projectOptionsType.find(({value}) => value === optionId)
            console.log("lo:",type,projectOptionsType,searchParams.has(TYPE_KEY))
            if (type) {
                setSelectedType(type);
                // searchParams.delete(TYPE_KEY)
                setSearchParams(searchParams)
            }
        }
    }
    const loadTypes = (cb) => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                console.log(response.data);
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

    useEffect(()=>{
        updateOptionsTheme(optionsTheme);
    },[searchParams])
    useEffect(()=>{
        updateOptionsType(optionsType)
    },[searchParams])


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

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = projects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    });

    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
        console.log("hovered", index)
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        video.pause();
        // video.currentTime = 0; // Rewind the video to the beginning
    };

    const double =  <Icon icon="arrowGo" viewBox="0 0 30 31"/>

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };

    return (
        <>
            {!isLoading &&
                <main className="projects" style={{padding:"inherit"}}>
                    <section className="projects-start whiteHeader">
                            <div className="projects-start-video">
                                <video autoPlay playsInline muted loop>
                                    <source src={projectBanner} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                </video>
                            </div>
                        <div className="container grid-main">
                            <h1 className="heading-primary">Мы гордимся каждым<br/> выполненным<br/>  проектом</h1>
                            <div className="projects-start__filters">
                                <div className="item" onClick={()=>{
                                    setMenuTheme(!menuTheme)
                                    setMenuType(false)}}>
                                    <p className={menuTheme? 'change' : ''}>По отраслям</p>
                                    <div className={menuTheme ? 'active' : 'inActive'}>
                                        <Icon icon="line"/>
                                        <Icon icon="line"/>
                                    </div>

                                </div>
                                <div className="item" onClick={()=>{
                                    setMenuType(!menuType)
                                    setMenuTheme(false)
                                }}>
                                    <p className={menuType ? 'change' : ''}>По услугам</p>
                                    <div className={menuType ? 'active' : 'inActive'}>
                                        <Icon icon="line"/>
                                        <Icon icon="line"/>
                                    </div>
                                </div>
                                {/*<div className="item">*/}
                                {/*    <p className="p-style-white">Очистить все</p>*/}
                                {/*</div>*/}

                                {/*<Select classNames={classes} options={optionsType} styles={colourStyles}*/}
                                {/*        onChange={handleTypeChange}  placeholder="Тип проекта">*/}
                                {/*<p>-</p>*/}
                                {/*</Select>*/}
                                {/*<Select classNames={classes} options={optionsTheme} styles={colourStyles}*/}
                                {/*        onChange={handleThemeChange} value={selectedTheme} placeholder="Тематика проекта"/>*/}
                            </div>
                            {optionsTheme && optionsType ?
                                null
                                :
                                null
                            }
                        </div>
                    </section>
                    <section className="projects-content">
                        <div className="container">
                            <div className={`projects-menu ${menuType || menuTheme ? 'open' : ''}`}>
                                <div className="main-projects__item-flex">
                                    {menuTheme ? (
                                        <>
                                            {optionsTheme ? optionsTheme.map((project, index) => {
                                                const filterProjects = projects.filter(item => item.projectTheme === project.value && item.visibility);
                                                const totalSum = filterProjects.length;
                                                return (
                                                    <Link  to={`/projects?theme=${project.value}`} >
                                                        <div className="main-projects__item-flex__inner">
                                                            <div className="heading-secondary">
                                                                <p className='hover'>{project.label}</p>
                                                            </div>
                                                            <div className="main-projects__num"><span>{totalSum}</span>
                                                            </div>
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
                                                return (
                                                    <Link  to={`/projects?type=${project.value}`}>
                                                        <div className="main-projects__item-flex__inner">
                                                            <div className="heading-secondary">
                                                                <p className='hover'>{project.label}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            }) : null}
                                        </>
                                    )
                                    }
                                </div>
                            </div>

                            <div className="projects__wrap">
                                {filteredProjects ? filteredProjects.map((project, index) => {
                                        {console.log('project-data:',project)}
                                        return (
                                            project.controlURL ?
                                                <a href={`${project.projectURL}`}
                                                   className="projects__item"
                                                   key={project.id} style={{background: project.color}}>
                                                    <div className="projects__item-img-wrap">
                                                        {
                                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                                ?
                                                                <video autoPlay loop muted playsInline controls>
                                                                    <source
                                                                        src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}
                                                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                                </video> :
                                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                                    ?
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>
                                                                    :
                                                                    <img
                                                                        src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                                        alt={project.name} className="main-projects__img"/>
                                                        }

                                                    </div>
                                                    <div className="projects__item-name">{project.name}</div>
                                                    <div className="projects__item-descr">{project.descrProject}</div>
                                                    <div className="num">{project.customId}</div>

                                                </a> :
                                                <Link to={`/projects/${project.nameInEng}`}
                                                      className="projects__item"
                                                      key={project.id} style={{background: project.color}}>
                                                    <div className="projects__item-img-wrap">
                                                        {
                                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                                ?
                                                                <video autoPlay ref={(ref) => addVideoRef(ref)}
                                                                       onMouseEnter={() => handleMouseEnter(index)}
                                                                       onMouseLeave={() => handleMouseLeave(index)} muted
                                                                       playsInline>
                                                                    <source
                                                                        src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}
                                                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                                </video> :
                                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                                    ?
                                                                    <div ref={(ref) => addVideoRef(ref)}
                                                                         dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>
                                                                    :
                                                                    <img ref={(ref) => addVideoRef(ref)}
                                                                         src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                                         alt={project.name} className="main-projects__img"/>
                                                        }

                                                    </div>
                                                    <span className="projects__item-header">
                                                        <div className="num">{index+1}</div>
                                                        <div className="name">{project.name}</div>

                                                    </span>
                                                    <span className="projects__item-descr">
                                                        <div className="descr">{project.descrProject}</div>
                                                        <div className="projects__item-arrow">
                                                            <div className="hover-flip-circle">
                                                             <span>
                                                                 <Icon icon="arrowGo" viewBox="0 0 30 31"/>
                                                                    <div className="hover-circle__news">
                                                                       {double}
                                                                    </div>
                                                             </span>
                                                         </div>
                                                        </div>

                                                    </span>

                                                </Link>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                    </section>
                        {/*<Cta formName={'projects'}/>*/}
                </main>
            }
        </>
    )

}

export default Projects;