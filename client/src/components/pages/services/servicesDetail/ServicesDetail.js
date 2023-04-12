import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Breadcrumbs from '../../../breadcrubms/Breadcrumbs'
import Cta from '../../../cta/Cta';
import { Icon } from '../../../icon/Icon'
import { Link } from 'react-router-dom';

import './serviceDetail.scss'

import frontend from '../../../../img/frontend.png';
import serviceSite from '../../../../img/service-1.svg';
import serviceLanding from '../../../../img/service-2.svg';
import serviceNocode from '../../../../img/service-3.svg';
import projectImg from '../../../../img/project-img.png';
import choiceReview from '../../../../img/choice-review.png';

const onAcc = (e) => {
    let accItem = e.target.closest('.tab-parent');
    if (accItem.classList.contains('active')) {
        accItem.classList.remove('active');
    } else {
        accItem.classList.add('active');
    }
}

const ServicesDetail = () => {
    return (
        <main className="service">

            <Breadcrumbs />

            <section className="service-main">
                <div className="container">
                    <div className="service-main__wrap">
                        <h1 className="heading-primary">Разработка сайтов</h1>
                        <div className="service-main__descr">Разработка интернет-проектов на платформе 1С-Битрикс. Поможем на всех этапах проекта, от совместного формулирования техзадания, до старта проекта. Имеем большой опыт и не боимся сложных интеграций с различными сервисами и системами.</div>
                    </div>
                </div>
            </section>

            <section className="service-adv">
                <div className="container">
                    <div className="service-adv__wrap">
                        <h2 className="heading-secondary">Почему стоит заказать разработку сайта в DEUS?</h2>
                        <div className="service-adv__content">
                            <div className="service-adv__item tab-parent">
                                <div className="service-adv__head" onClick={onAcc}>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__num">01</div>
                                        <div className="service-adv__name">Используем продуктовый подход</div>
                                    </div>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__person">
                                            <img src={frontend} alt="Сергей Разинкин" className="service-adv__person-img" />
                                            <div className="service-adv__person-name">Сергей Разинкин, <br />Front End разработчик</div>
                                        </div>
                                        <div className="service-adv__icon">
                                            <Icon icon="arr-acc" />
                                        </div>
                                    </div>
                                </div>
                                <div className="service-adv__tab">Комплексно подходим к созданию продукта для вашего бренда, анализируем рынок и аудиторию</div>
                            </div>
                            <div className="service-adv__item tab-parent">
                                <div className="service-adv__head" onClick={onAcc}>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__num">02</div>
                                        <div className="service-adv__name">Работаем с задачами разной сложности</div>
                                    </div>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__person">
                                            <img src={frontend} alt="Сергей Разинкин" className="service-adv__person-img" />
                                            <div className="service-adv__person-name">Сергей Разинкин, <br />Front End разработчик</div>
                                        </div>
                                        <div className="service-adv__icon"><Icon icon="arr-acc" /></div>
                                    </div>
                                </div>
                                <div className="service-adv__tab">Комплексно подходим к созданию продукта для вашего бренда, анализируем рынок и аудиторию</div>
                            </div>
                            <div className="service-adv__item tab-parent">
                                <div className="service-adv__head" onClick={onAcc}>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__num">03</div>
                                        <div className="service-adv__name">Выделенная команда</div>
                                    </div>
                                    <div className="service-adv__head-elem">
                                        <div className="service-adv__person">
                                            <img src={frontend} alt="Сергей Разинкин" className="service-adv__person-img" />
                                            <div className="service-adv__person-name">Сергей Разинкин, <br />Front End разработчик</div>
                                        </div>
                                        <div className="service-adv__icon"><Icon icon="arr-acc" /></div>
                                    </div>
                                </div>
                                <div className="service-adv__tab">Комплексно подходим к созданию продукта для вашего бренда, анализируем рынок и аудиторию</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-s">
                <div className="container">
                    <div className="service-s__wrap">
                        <h2 className="heading-secondary">Услуги</h2>
                        <div className="service-s__content">
                            <div className="service-s__item">
                                <img src={serviceSite} alt="Сайты" className="service-s__img" />
                                <div className="service-s__name">Сайты</div>
                                <div className="service-s__descr">Промо и корпоративные сайты, сайт для продукта или интернет-магазин</div>
                            </div>
                            <div className="service-s__item">
                                <img src={serviceLanding} alt="Лендинги" className="service-s__img" />
                                <div className="service-s__name">Лендинги</div>
                                <div className="service-s__descr">Делаем лендинги, которые продают</div>
                            </div>
                            <div className="service-s__item">
                                <img src={serviceNocode} alt="Nocode" className="service-s__img" />
                                <div className="service-s__name">Nocode</div>
                                <div className="service-s__descr">Делаем сайта на Tilda с уникальным дизайном</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-work">
                <div className="container">
                    <div className="service-work__wrap">
                        <h2 className="heading-secondary">Как проходит работа</h2>
                        <div className="service-work__content">
                            <div className="service-work__item">
                                <div className="service-work__num">1</div>
                                <div className="service-work__text">
                                    <div className="service-work__name">Аналитика</div>
                                    <div className="service-work__descr">Анализируем и собираем информацию, полученную от вас, составляем подробный бриф, собираем мудборд, опираясь на задачи и ваши решения</div>
                                </div>
                            </div>
                            <div className="service-work__item">
                                <div className="service-work__num">2</div>
                                <div className="service-work__text">
                                    <div className="service-work__name">Проектирование и дизайн</div>
                                    <div className="service-work__descr">Анализируем и собираем информацию, полученную от вас, составляем подробный бриф, собираем мудборд, опираясь на задачи и ваши решения</div>
                                </div>
                            </div>
                            <div className="service-work__item">
                                <div className="service-work__num">3</div>
                                <div className="service-work__text">
                                    <div className="service-work__name">Верстка</div>
                                    <div className="service-work__descr">Анализируем и собираем информацию, полученную от вас, составляем подробный бриф, собираем мудборд, опираясь на задачи и ваши решения</div>
                                </div>
                            </div>
                            <div className="service-work__item">
                                <div className="service-work__num">4</div>
                                <div className="service-work__text">
                                    <div className="service-work__name">Сборка</div>
                                    <div className="service-work__descr">Анализируем и собираем информацию, полученную от вас, составляем подробный бриф, собираем мудборд, опираясь на задачи и ваши решения</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-portfolio">
                <div className="container">
                    <h2 className="heading-secondary">Портфолио</h2>
                    <div className="projects__wrap">
                        <Link to="/projects/detail" className="projects__item" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item">
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item">
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item">
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item">
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                        <Link to="/projects/detail" className="projects__item">
                            <div className="projects__item-img-wrap">
                                <img src={projectImg} alt="Биотехнологический комплекс по глубокой переработке древесины" className="projects__item-img" />
                            </div>
                            <div className="projects__item-name">Биотехнологический комплекс по глубокой переработке древесины</div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="service-price">
                <div className="container">
                    <Tabs className="service-price__wrap" selectedTabClassName="active">
                        <TabList className="service-price__info">
                            <h2 className="heading-secondary">Услуги</h2>
                            <div className="service-price__info-wrap">
                                <Tab className="service-price__info-btn">Сайты</Tab>
                                <Tab className="service-price__info-btn">Nocode</Tab>
                                <Tab className="service-price__info-btn">Лендинг</Tab>
                            </div>
                        </TabList>
                        <div className="service-price__tariffs">
                            <TabPanel className="service-price__tab">
                                <div className="service-price__content">
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">Без CMS</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="cross" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">2 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">75 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">С CMS 1C-Битрикс</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">3 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">120 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">Сложный лендинг</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">4 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">165 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">CMS + каталог</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">4 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">200 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="service-price__tab">
                                <div className="service-price__content">
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">С CMS 1C-Битрикс</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">3 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">120 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">Сложный лендинг</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">4 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">165 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">CMS + каталог</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">4 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">200 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="service-price__tab">
                                <div className="service-price__content">
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">Без CMS</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="cross" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">2 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">75 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">С CMS 1C-Битрикс</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">3 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">120 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-price__item">
                                        <h2 className="heading-secondary">Сложный лендинг</h2>
                                        <div className="service-price__subtitle">Что входит в тариф:</div>
                                        <div className="service-price__elem">
                                            <div className="service-price__type">
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Аналитика
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Дизайн
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Верстка
                                                </div>
                                                <div className="service-price__type-item">
                                                    <Icon icon="task" />
                                                    Разработка
                                                </div>
                                            </div>
                                            <div className="service-price__p">
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Срок работы</div>
                                                    <div className="service-price__p-descr">4 недели</div>
                                                </div>
                                                <div className="service-price__p-item">
                                                    <div className="service-price__p-title">Стоимость</div>
                                                    <div className="service-price__p-descr">165 000 ₽</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </section>

            <section className="service-review">
                <div className="container">
                    <h2 className="heading-secondary">Отзывы</h2>
                    <div className="service-review__wrap">
                        <div className="service-review__item" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                            <div className="service-review__content">
                                <div className="service-review__person">
                                    <img src={choiceReview} alt="Игорь Кулик" className="service-review__person-img" />
                                    <div className="service-review__person-p">
                                        Игорь Кулик, <span>Генеральный директор Choice Estate</span>
                                    </div>
                                </div>
                                <div className="service-review__descr">Агентство элитной недвижимости Choice Estate оказывает услуги по подбору, оценке и продаже домов с 2017 года. Специалисты компании помогают продать не только... </div>
                                <Link className="btn --white">Смотреть проект</Link>
                            </div>
                            <img src={projectImg} alt="Touch Money" className="service-review__bg" />
                        </div>
                        <div className="service-review__item" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                            <div className="service-review__content">
                                <div className="service-review__person">
                                    <img src={choiceReview} alt="Игорь Кулик" className="service-review__person-img" />
                                    <div className="service-review__person-p">
                                        Игорь Кулик, <span>Генеральный директор Choice Estate</span>
                                    </div>
                                </div>
                                <div className="service-review__descr">Агентство элитной недвижимости Choice Estate оказывает услуги по подбору, оценке и продаже домов с 2017 года. Специалисты компании помогают продать не только... </div>
                                <Link className="btn --white">Смотреть проект</Link>
                            </div>
                            <img src={projectImg} alt="Touch Money" className="service-review__bg" />
                        </div>
                    </div>
                </div>
            </section>

            <Cta />

        </main>
    )
}

export default ServicesDetail;