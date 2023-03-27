import React from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';
import NewsItem from '../../news/newsItem/NewsItem';

import './mainPage.scss';

import workingImg from '../../../img/working-img.png';
import serviceImg from '../../../img/service-img.svg';
import newsImg from '../../../img/news-img.png';
import productVideo from '../../../img/webhands.mp4';
import projectImg from '../../../img/project-img.png';
import mainBannerLine from '../../../img/main-banner-line.svg';

const projectOptionsType = [
    { value: 'sites-services', label: 'Сайты и сервисы' },
    { value: 'sites-services', label: 'Сайты и сервисы' },
    { value: 'sites-services', label: 'Сайты и сервисы' },
]

const projectOptionsTheme = [
    { value: 'estate', label: 'Недвижимость' },
    { value: 'finance', label: 'Финансы и банки' },
    { value: 'medicine', label: 'Медицина' },
]

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

    return (
        <main className="main">

            <section className="main-banner" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                <div className="container">
                    <div className="main-banner__wrap">
                        <div className="main-banner__content">
                            <h1 className="heading-primary">Создавайте вместе с нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей</h1>
                            <Link to="#" className="btn --circle --orange">Презентация агентства</Link>
                        </div>
                        <div className="main-banner__project">
                            <div className="main-banner__project-name">Touch Money</div>
                            <img src={projectImg} alt="Touch Money" className="main-banner__project-img" />
                            <Link to="/projects/detail" className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                        </div>
                    </div>
                </div>
                <img src={mainBannerLine} alt="Touch Money" className="main-banner__line" />
            </section>

            <section className="main-projects">
                <div className="container">
                    <div className="main-projects__head">
                        <h2 className="heading-secondary">Проекты</h2>
                        <div className="main-projects__filters hidden-mobile">
                            <Select classNames={classes} options={projectOptionsType} styles={colourStyles} placeholder="Тип проекта" />
                            <Select classNames={classes} options={projectOptionsTheme} styles={colourStyles} placeholder="Тематика проекта" />
                        </div>
                        <Link to="/projects" className="btn --orange hidden-mobile">Все проекты</Link>
                    </div>
                    <div className="main-projects__wrap">
                        <Link to="/" className="main-projects__item">
                            <video autoPlay loop muted playsInline className="main-projects__video">
                                <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video>
                            <div className="main-projects__name">Газораспределительной организации Чеченской Республики</div>
                        </Link>
                        <Link to="/" className="main-projects__item">
                            <div className="main-projects__img-wrap">
                                <img src={newsImg} alt="Дизайн и разработка сайта ассоциации детских стоматологов" className="main-projects__img" />
                            </div>
                            <div className="main-projects__name">Дизайн и разработка сайта ассоциации детских стоматологов</div>
                        </Link>
                        <Link to="/" className="main-projects__item">
                            <div className="main-projects__img-wrap">
                                <img src={newsImg} alt="Клиника репродукции ЭМБРИО" className="main-projects__img" />
                            </div>
                            <div className="main-projects__name">Клиника репродукции ЭМБРИО</div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="main-working">
                <div className="container">
                    <h3 className="heading-tertiary">Работаем сейчас над</h3>
                    <div className="main-working__wrap">
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Промо сайт для Nike" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Промо сайт для Nike</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="SEO продвижение трактора Беларус" className="main-working__img" />
                            </div>
                            <div className="main-working__name">SEO продвижение трактора Беларус</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="SMM продвижение магазины вкусных вин" className="main-working__img" />
                            </div>
                            <div className="main-working__name">SMM продвижение магазины вкусных вин</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Разработка фирменного стиля для 3В кинотетра" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Разработка фирменного стиля для 3В кинотетра</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Фотосессия для гастрономического ресторана" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Фотосессия для гастрономического ресторана</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Разработка сайта для студии интерьера" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Разработка сайта для студии интерьера</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Рисуем дизайн концепт для застройщика квартирного комплекса" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Рисуем дизайн концепт для застройщика квартирного комплекса</div>
                        </div>
                        <div className="main-working__item">
                            <div className="main-working__img-wrap">
                                <img src={workingImg} alt="Сайт для планеты земля" className="main-working__img" />
                            </div>
                            <div className="main-working__name">Сайт для планеты земля</div>
                        </div>
                    </div>
                </div>
            </section>

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
                                <Link to="/news" className="main-news__info-item">#Разработка</Link>
                                <Link to="/news" className="main-news__info-item">#Дизайн</Link>
                                <Link to="/news" className="main-news__info-item">#Реклама</Link>
                                <Link to="/news" className="main-news__info-item">#Аналитика</Link>
                            </div>
                        </div>
                        <div className="main-news__content">
                            <NewsItem />
                            <NewsItem />
                            <NewsItem />
                            <NewsItem />
                            <NewsItem />
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