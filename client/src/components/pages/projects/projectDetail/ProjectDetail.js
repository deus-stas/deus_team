import { Icon } from '../../../icon/Icon';

import Cta from '../../../cta/Cta';
import Breadcrumbs from '../../../breadcrubms/Breadcrumbs';
import ProjectNext from '../projectNext/ProjectNext';

import './projectDetail.scss'

import person from '../../../../img/discuss-btn.png';
import projectAnalytic from '../../../../img/project-analytic.png';

const ProjectDetail = () => {
    return (
        <main className="project">

            <Breadcrumbs />

            <section className="project-main">
                <div className="container">
                    <div className="project-main__wrap">
                        <h1 className="heading-primary">Разработали стратегию продвижения для крупной телеком-компании и за 6 месяцев с 0 вывели 70% блога в ТОП-10.</h1>
                        <div className="project-main__text">
                            <div className="project-main__subtitle">О клиенте</div>
                            <div className="project-main__descr">Крупный Российский разработчик решений в области кибербезопасности и защиты информации. В кейсе мы делимся стратегией и результатами продвижения продуктов компании.</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-goals">
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
            </section>

            <section className="project-steps">
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

            <section className="project-results">
                <div className="container">
                    <div className="project-results__wrap">
                        <h2 className="heading-secondary">Результаты</h2>
                        <div className="quote">
                            <div className="quote__box">
                                <div className="quote__person">
                                    <img src={person} alt="Максим Салимов" className="quote__img" />
                                    <div className="quote__person-text">
                                        Максим Салимов, <span>SEO специалист @ DEUS</span>
                                    </div>
                                </div>
                                <div className="quote__q">В результате проделанной работы более 70% всех поисковых запросов попали в ТОП-10. При этом мы не вмешивались ни в пользовательский интерфейс, ни в структуру сайта (тогда бы результаты были еще лучше). В данный момент клиент самостоятельно готовит темы и контент для будущих статей, придерживаясь при этом нашей первоначальной стратегии и получая места в выдаче ТОП-10.</div>
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
            </section>

            <ProjectNext />

            <Cta />

        </main>
    )

}

export default ProjectDetail;