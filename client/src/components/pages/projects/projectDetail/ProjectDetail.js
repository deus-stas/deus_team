import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import Cta from '../../../cta/Cta';
import Breadcrumbs from '../../../breadcrubms/Breadcrumbs';
import ProjectNext from '../projectNext/ProjectNext';

import './projectDetail.scss'

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';

const ProjectDetail = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/${id}`)
            .then((response) => {

                const dataDetail = response.data;
                setDetail(response.data);
                console.log(response.data);
                if (response.data.taskPersons !== 'undefined') {
                    axios.get(`${apiUrl}/api/persons/${response.data.taskPersons}`)
                        .then((response) => {
                            dataDetail.taskPersons = response.data;
                            setDetail(dataDetail);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (response.data.approachPersons !== 'undefined') {
                    axios.get(`${apiUrl}/api/persons/${response.data.approachPersons}`)
                        .then((response) => {
                            dataDetail.approachPersons = response.data;
                            setDetail(dataDetail);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (response.data.resultPersons !== 'undefined') {
                    axios.get(`${apiUrl}/api/persons/${response.data.resultPersons}`)
                        .then((response) => {
                            dataDetail.resultPersons = response.data;
                            setDetail(dataDetail);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <main className="project">
            {console.log(detail)}
            <Breadcrumbs />

            <section className="project-main">
                <div className="container">
                    <div className="project-main__wrap">
                        <h1 className="heading-primary" dangerouslySetInnerHTML={{ __html: detail.name }}></h1>
                        {detail.about !== 'undefined' ?
                            <div className="project-main__text">
                                <div className="project-main__subtitle">О клиенте</div>
                                <div className="project-main__descr" dangerouslySetInnerHTML={{ __html: detail.about }}></div>
                            </div>
                            : null}
                    </div>
                </div>
            </section>

            {detail.bannerFirst ?
                <section className="project-banner">
                    <img src={`${apiUrl}/uploads/${detail.bannerFirst.filename}`} alt={detail.name} />
                </section>
                : null}

            {detail.task !== 'undefined' && detail.taskPersons ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <h2 className="heading-secondary">Задача</h2>
                            <div className="quote">
                                <div className="quote__box">
                                    <div className="quote__person">
                                        {detail.taskPersons.image ? <img src={`${apiUrl}/uploads/${detail.taskPersons.image.filename}`} alt={detail.taskPersons.name} className="quote__img" /> : null}

                                        <div className="quote__person-text">
                                            {detail.taskPersons.name}, <span>{detail.taskPersons.post} @ DEUS</span>
                                        </div>
                                    </div>
                                    <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.task }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerSecond ?
                <section className="project-banner">
                    <img src={`${apiUrl}/uploads/${detail.bannerSecond.filename}`} alt={detail.name} />
                </section>
                : null}

            {detail.approach !== 'undefined' && detail.approachPersons ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <h2 className="heading-secondary">Подход</h2>
                            <div className="quote">
                                <div className="quote__box">
                                    <div className="quote__person">
                                        {detail.approachPersons.image ? <img src={`${apiUrl}/uploads/${detail.approachPersons.image.filename}`} alt={detail.approachPersons.name} className="quote__img" /> : null}

                                        <div className="quote__person-text">
                                            {detail.approachPersons.name}, <span>{detail.approachPersons.post} @ DEUS</span>
                                        </div>
                                    </div>
                                    <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.task }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerThird ?
                <section className="project-banner">
                    <img src={`${apiUrl}/uploads/${detail.bannerThird.filename}`} alt={detail.name} />
                </section>
                : null}

            {detail.body ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <div className="project-results__text" dangerouslySetInnerHTML={{ __html: detail.body }}></div>
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerFourth ?
                <section className="project-banner">
                    <img src={`${apiUrl}/uploads/${detail.bannerFourth.filename}`} alt={detail.name} />
                </section>
                : null}

            {detail.result !== 'undefined' && detail.resultPersons ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <h2 className="heading-secondary">Результаты</h2>
                            <div className="quote">
                                <div className="quote__box">
                                    <div className="quote__person">
                                        {detail.resultPersons.image ? <img src={`${apiUrl}/uploads/${detail.resultPersons.image.filename}`} alt={detail.resultPersons.name} className="quote__img" /> : null}

                                        <div className="quote__person-text">
                                            {detail.resultPersons.name}, <span>{detail.resultPersons.post} @ DEUS</span>
                                        </div>
                                    </div>
                                    <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.task }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerFifth ?
                <section className="project-banner">
                    <img src={`${apiUrl}/uploads/${detail.bannerFifth.filename}`} alt={detail.name} />
                </section>
                : null}

            {/* <section className="project-goals">
                <div className="container">
                    <div className="project-goals__wrap">
                        <h2 className="heading-secondary">Цели и задачи</h2>
                        <div className="project-goals__content">
                            <div className="project-goals__text">Клиент обратился к нам с задачей продвижения своих продуктов, расширения поисковой выдачи, увеличения охвата поисковых запросов. Сложность работы заключалась в том, что мы не имели доступа к технической части сайта и все работы осуществлялись силами клиента после предварительного согласования.</div>
                            <div className="quote">
                                <div className="quote__box">
                                    <div className="quote__person">
                                        <img src={person} alt="Брижань Вячеслав" className="quote__img" />
                                        <div className="quote__person-text">
                                            Брижань Вячеслав, <span>Директор по развитию @ DEUS</span>
                                        </div>
                                    </div>
                                    <div className="quote__q">Главная цель проекта — получить максимальный охват поисковых запросов, так или иначе связанных с информационной безопасностью.</div>
                                </div>
                            </div>
                            <div className="project-goals__tasks">
                                <div className="project-goals__tasks-item">
                                    <Icon icon="task" />
                                    Максимально охватить поисковую выдачу в области кибербезопасности.
                                </div>
                                <div className="project-goals__tasks-item">
                                    <Icon icon="task" />
                                    Увеличить узнаваемость продуктов и решений компании.
                                </div>
                                <div className="project-goals__tasks-item">
                                    <Icon icon="task" />
                                    Увеличить узнаваемость бренда на российском рынке.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="project-steps">
                <div className="container">
                    <h2 className="heading-secondary">Этапы работ</h2>
                    <div className="project-steps__s">
                        <div className="project-steps__subtitle">Этап 1. Подготовка семантического ядра</div>
                        <div className="project-steps__content">
                            <div className="project-steps__text">Одной из задач стал брендинг агентства. Мы разработали фирменный стиль и презентацию, что способствовало росту и развитию агентства.</div>
                            <div className="project-steps__adv">
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Проанализировали поисковую выдачу ТОП-10 и сайты прямых конкурентов.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Выстроили структуру блога и подготовили шаблон публикаций.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Собрали всевозможные запросы по теме информационной безопасности.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Кластеризировали полученные запросы.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Согласовали полученный список с клиентом.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="project-steps__s">
                        <div className="project-steps__subtitle">Этап 2. Разработка плана публикаций </div>
                        <div className="project-steps__content">
                            <div className="project-steps__text">На каждый полученный кластер мы подготовили отдельное ТЗ с учетом связанной семантики и написали профессиональных контент.</div>
                            <div className="project-steps__adv">
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Сбор связанной семантики для каждого кластера.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Создание подробного ТЗ для каждого кластера запросов
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Подготовка плана будущих публикаций.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Написание и публикация профессиональных статей на тему кибербезопасности и защиты информации.
                                </div>
                                <div className="project-steps__adv-item">
                                    <Icon icon="task" />
                                    Минимальное ссылочное продвижение на авторитетных ресурсах (для более быстрой индексации и вхождения статей в индекс).
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-analytics">
                <div className="container">
                    <div className="project-analytics__wrap">
                        <div className="project-analytics__item">
                            <h2 className="heading-secondary">Видимость в Яндекс</h2>
                            <img src={projectAnalytic} alt="Видимость в Яндекс" className="project-analytics__img" />
                        </div>
                        <div className="project-analytics__item">
                            <h2 className="heading-secondary">Видимость в Google</h2>
                            <img src={projectAnalytic} alt="Видимость в Google" className="project-analytics__img" />
                        </div>
                    </div>
                </div>
            </section>*/}

            <ProjectNext />

            <Cta />

        </main>
    )

}

export default ProjectDetail;