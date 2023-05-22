import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';

import './mainPage.scss';

import serviceImg from '../../../img/service-img.svg';
import mainBannerLine from '../../../img/main-banner-line.svg';
import mainBannerLineMob from '../../../img/main-banner-line-mob.svg';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';


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

    const [projects, setProjects] = useState([]);
    const [mainProjects, setMainProjects] = useState([]);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);

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

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = projects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true);
    });

    return (
        <main className="main">

            {mainProjects ? mainProjects.map(project => {
                return (
                    <section className="main-banner" key={project.id} style={{ background: project.color }}>
                        <div className="container">
                            <div className="main-banner__wrap">
                                <div className="main-banner__content">
                                    <h1 className="heading-primary">Создавайте вместе с&nbsp;нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей</h1>
                                    <Link to="#" className="btn --circle --orange">Презентация агентства</Link>
                                </div>
                                <div className="main-banner__project hidden-mobile">
                                    <div className="main-banner__project-name">{project.name}</div>
                                    <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-banner__project-img" />
                                    <Link to={`/projects/${project.id}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                </div>
                            </div>
                        </div>
                        <img src={mainBannerLine} alt="Touch Money" className="main-banner__line hidden-mobile" />
                        <img src={mainBannerLineMob} alt="Touch Money" className="main-banner__line hidden-desktop" />
                    </section>
                )
            }) : null}

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
                        {filteredProjects ? filteredProjects.map(project => {
                            return (
                                <Link to={`/projects/${project.id}`} className="main-projects__item" key={project.id}>
                                    <div className="main-projects__img-wrap">
                                        {
                                            project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                ?
                                                <div dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                :
                                                <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-projects__img" />
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
                <section className="main-working">
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
                            <Showreel />
                        </div>
                        <div className="main-services__content">
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">01</div>
                                    <div className="main-services__name">Фирменный стиль</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                            <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                            <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">02</div>
                                    <div className="main-services__name">Сайты и сервисы</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="Сайты и сервисы" className="main-services__img" />
                                            <img src={serviceImg} alt="Сайты и сервисы" className="main-services__img" />
                                            <img src={serviceImg} alt="Сайты и сервисы" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">03</div>
                                    <div className="main-services__name">Контент-маркетинг</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="Контент-маркетинг" className="main-services__img" />
                                            <img src={serviceImg} alt="Контент-маркетинг" className="main-services__img" />
                                            <img src={serviceImg} alt="Контент-маркетинг" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">04</div>
                                    <div className="main-services__name">SEO-продвижение</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="SEO-продвижение" className="main-services__img" />
                                            <img src={serviceImg} alt="SEO-продвижение" className="main-services__img" />
                                            <img src={serviceImg} alt="SEO-продвижение" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">05</div>
                                    <div className="main-services__name">Лидогенерация</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="Лидогенерация" className="main-services__img" />
                                            <img src={serviceImg} alt="Лидогенерация" className="main-services__img" />
                                            <img src={serviceImg} alt="Лидогенерация" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="main-services__item tab-parent">
                                <div className="main-services__head" onClick={onAcc}>
                                    <div className="main-services__num">06</div>
                                    <div className="main-services__name">Поддержка и развитие</div>
                                    <div className="main-services__btn">
                                        <Icon icon="arr-acc" />
                                    </div>
                                </div>
                                <div className="main-services__acc">
                                    <div className="main-services__descr">Наши специалисты предоставят помощь на всех этапах проекта, от совместного формулирования техзадания, до старта проекта.</div>
                                    <div className="main-services__bot">
                                        <div className="main-services__gallery">
                                            <img src={serviceImg} alt="Поддержка и развитие" className="main-services__img" />
                                            <img src={serviceImg} alt="Поддержка и развитие" className="main-services__img" />
                                            <img src={serviceImg} alt="Поддержка и развитие" className="main-services__img" />
                                        </div>
                                        <Link to="/services/detail" className="btn --b-orange">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="main-news">
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
            </section>

            <SectionSocial />

            <SectionProducts />

        </main>
    )

}

export default MainPage;