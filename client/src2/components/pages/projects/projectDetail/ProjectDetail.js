import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import Cta from '../../../cta/Cta';
import Breadcrumbs from '../../../breadcrubms/Breadcrumbs';
import ProjectNext from '../projectNext/ProjectNext';

import './projectDetail.scss'

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';

const ProjectDetail = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/${id}`)
            .then((response) => {
                let dataDetail = { ...response.data };
                let requests = [];

                if (response.data.taskPersons !== 'undefined' && response.data.taskPersons !== 'null') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.taskPersons}`)
                            .then((response) => {
                                dataDetail = { ...dataDetail, taskPersons: response.data };
                            })
                    );
                }

                if (response.data.approachPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.approachPersons}`)
                            .then((response) => {
                                dataDetail = { ...dataDetail, approachPersons: response.data };
                            })
                    );
                }

                if (response.data.resultPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.resultPersons}`)
                            .then((response) => {
                                dataDetail = { ...dataDetail, resultPersons: response.data };
                            })
                    );
                }

                Promise.all(requests)
                    .then(() => {
                        setDetail(dataDetail);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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

            {
                detail.mainVideoFile && detail.mainVideoFile !== 'undefined' && detail.mainVideoFile !== 'null' 
                ?
                <section className="project-banner">
                    <video autoPlay loop muted playsInline controls>
                        <source src={`${apiUrl}/uploads/${detail.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                    </video>
                </section>
                 : 
                detail.bannerFirstVideo && detail.bannerFirstVideo !== 'undefined' && detail.bannerFirstVideo !== 'null' ?
                    <section className="project-banner">
                        <div dangerouslySetInnerHTML={{ __html: detail.bannerFirstVideo }}></div>
                    </section>
                    : detail.bannerFirst ?
                        <section className="project-banner">
                            {detail.bannerFirst.mimetype !== 'video/mp4'
                                ?
                                <img src={`${apiUrl}/uploads/${detail.bannerFirst.filename}`} alt={detail.name} />
                                :
                                <video autoPlay loop muted playsInline>
                                    <source src={`${apiUrl}/uploads/${detail.bannerFirst.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                            }
                        </section>
                        : null
            }
            {/* {detail.task !== 'undefined' && detail.taskPersons ?
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
                : null
            } */}

            {
                detail.bannerSecondVideo && detail.bannerSecondVideo !== 'undefined' && detail.bannerSecondVideo !== 'null' ?
                    <section className="project-banner">
                        <div dangerouslySetInnerHTML={{ __html: detail.bannerSecondVideo }}></div>
                    </section>
                    : detail.bannerSecond ?
                        <section className="project-banner">
                            {detail.bannerSecond.mimetype !== 'video/mp4'
                                ?
                                <img src={`${apiUrl}/uploads/${detail.bannerSecond.filename}`} alt={detail.name} />
                                :
                                <video autoPlay loop muted playsInline>
                                    <source src={`${apiUrl}/uploads/${detail.bannerSecond.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                            }
                        </section>
                        : null
            }


            {/* <div style={{ background: detail.aimColor }}>
                {detail.taskDescr !== 'undefined' && detail.taskDescr ?
                    <section className="project-results">
                        <div className="container">
                            <div className="project-results__wrap">
                                <h2 className="heading-secondary">Цели и задачи</h2>
                                <div className="quote">
                                    <div>
                                        { detail.taskDescr }
                                    </div>
                                    <div className="quote__box">
                                        <div className="quote__person">
                                            {detail.taskPersons.image ? <img src={`${apiUrl}/uploads/${detail.taskPersons.image.filename}`} alt={detail.taskPersons.name} className="quote__img" /> : null}

                                            <div className="quote__person-text">
                                                {detail.taskPersons.name}, <span>{detail.taskPersons.post} @ DEUS</span>
                                            </div>
                                        </div>
                                        
                                        <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.task }}></div>
                                    </div>
                                    { 
                                        detail.tasksList !== 'undefined' && detail.tasksList ?
                                        <div>
                                            {
                                                detail.tasksList.map((item, index) => (
                                                    <div key={index}>{item.tasksItem}</div>
                                                ))
                                            }
                                        </div> : null  
                                    }
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </section>
                    : null
                }
            </div> */}
            


            {/* <div style={{ background: detail.aimColor }}>
                {
                    detail.taskDescr && detail.taskDescr !== 'undefined' ? 
                    <div>{
                        detail.taskDescr
                    }</div> : null
                }
                { 
                    detail.tasksList !== 'undefined' && detail.tasksList ?
                    <div>
                        {
                            detail.tasksList.map((item, index) => (
                                <div key={index}>{item.tasksItem}</div>
                            ))
                        }
                    </div> : null  
                }
            </div> */}



            
            {/* {
                detail.workSteps && detail.workSteps !== 'undefined' && detail.workSteps !== null && detail.workSteps !== "null" ? 
                <div>{
                    detail.taskDescr
                }</div> : null
            } */}
            {/* {
                detail.workSteps && detail.workSteps !== 'undefined' && detail.workSteps !== null && detail.workSteps !== "null" && detail.workSteps.length ? 
                    <div style={{ background: detail.workStepsColor }}>
                        {                
                            <section className="project-results">
                                <div className="container">
                                    <div className="project-results__wrap">
                                        <h2 className="heading-secondary">Этапы работ</h2>
                                    </div>
                                        
                                    {
                                        detail.workSteps.map((item, index) => (
                                            <div  key={index} style={{borderBottom:'1px solid #000'}} className="container">
                                                <div className="project-results__wrap">
                                                    <h2 className="heading-secondary">{item.workStepsTitle}</h2>
                                                    <div>
                                                        <div className='project-results__text'>{item.workStepsIntroText}</div>
                                                        <div className="project-results__text" dangerouslySetInnerHTML={{ __html: item.workStepsItem }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>             
                            </section>
                            
                        }
                    </div> : null
            } */}
            {/* { 
                detail.workSteps && detail.workSteps !== 'undefined' && detail.workSteps !== null && detail.workSteps !== "null" ? 
                <div >
                    {
                        detail.workSteps.map((item, index) => (
                            <div key={index} style={{display:'flex', borderBottom:'1px solid #000'}}>
                                <div>{item.workStepsTitle}</div>
                                <div className="project-results__text" dangerouslySetInnerHTML={{ __html: item.workStepsItem }}></div>
                            </div>
                            
                        ))
                    }
                </div> : null  
            }
             */}
            


            {detail.approach !== 'undefined' && detail.approachPersons ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <h2 className="heading-secondary">Подход</h2>
                            <div className="quote">
                                <div className="quote__box">
                                    {console.log(detail.approachPersons)}
                                    <div className="quote__person">
                                        {detail.approachPersons.image ? <img src={`${apiUrl}/uploads/${detail.approachPersons.image.filename}`} alt={detail.approachPersons.name} className="quote__img" /> : null}

                                        <div className="quote__person-text">
                                            {detail.approachPersons.name}, <span>{detail.approachPersons.post} @ DEUS</span>
                                        </div>
                                    </div>
                                    <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.approach }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}

            {
                detail.bannerThirdVideo && detail.bannerThirdVideo !== 'undefined' && detail.bannerThirdVideo !== 'null' ?
                    <section className="project-banner">
                        <div dangerouslySetInnerHTML={{ __html: detail.bannerThirdVideo }}></div>
                    </section>
                    : detail.bannerThird ?
                        <section className="project-banner">
                            {detail.bannerThird.mimetype !== 'video/mp4'
                                ?
                                <img src={`${apiUrl}/uploads/${detail.bannerThird.filename}`} alt={detail.name} />
                                :
                                <video autoPlay loop muted playsInline>
                                    <source src={`${apiUrl}/uploads/${detail.bannerThird.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                            }
                        </section>
                        : null
            }

            {detail.body ?
                <section className="project-results">
                    <div className="container">
                        <div className="project-results__wrap">
                            <div className="project-results__text" dangerouslySetInnerHTML={{ __html: detail.body }}></div>
                        </div>
                    </div>
                </section>
                : null}

            {
                detail.bannerFourthVideo && detail.bannerFourthVideo !== 'undefined' && detail.bannerFourthVideo !== 'null' ?
                    <section className="project-banner">
                        <div dangerouslySetInnerHTML={{ __html: detail.bannerFourthVideo }}></div>
                    </section>
                    : detail.bannerFourth ?
                        <section className="project-banner">
                            {detail.bannerFourth.mimetype !== 'video/mp4'
                                ?
                                <img src={`${apiUrl}/uploads/${detail.bannerFourth.filename}`} alt={detail.name} />
                                :
                                <video autoPlay loop muted playsInline>
                                    <source src={`${apiUrl}/uploads/${detail.bannerFourth.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                            }
                        </section>
                        : null
            }

            {/* {detail.result !== 'undefined' && detail.resultPersons ?
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
                                    <div className="quote__q" dangerouslySetInnerHTML={{ __html: detail.result }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null} */}

            {
                detail.bannerFifthVideo && detail.bannerFifthVideo !== 'undefined' && detail.bannerFifthVideo !== 'null' ?
                    <section className="project-banner">
                        <div dangerouslySetInnerHTML={{ __html: detail.bannerFifthVideo }}></div>
                    </section>
                    : detail.bannerFifth ?
                        <section className="project-banner">
                            {detail.bannerFifth.mimetype !== 'video/mp4'
                                ?
                                <img src={`${apiUrl}/uploads/${detail.bannerFifth.filename}`} alt={detail.name} />
                                :
                                <video autoPlay loop muted playsInline>
                                    <source src={`${apiUrl}/uploads/${detail.bannerFifth.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                            }
                        </section>
                        : null
            }

            {detail.imagesExtra ?
                detail.imagesExtra.map((image, index) => {
                    return (
                        <section className="project-banner --extra" key={index}>
                            <img src={`${apiUrl}/uploads/${image.filename}`} alt={image.fieldname} />
                        </section>
                    )
                })
                : null}



        <div style={{ background: detail.aimColor }}>
            {
                detail.taskDescr !== 'undefined' && detail.taskDescr ?
                <section className="project-goals">
                    <div className="container">
                        <div className="project-goals__wrap">
                            <h2 className="heading-secondary">Цели и задачи</h2>
                            <div className="project-goals__content">
                                <div className="project-goals__text">{detail.taskDescr}</div>
                                <div className="project-goals__person">
                                    <div className="project-goals__person-info">
                                        <div className="project-goals__person-name">{detail.taskPersons.name},</div>
                                        <div className="project-goals__person-position">{detail.taskPersons.post} @ DEUS</div>
                                    </div>
                                    <div className="project-goals__person-text">
                                        <div dangerouslySetInnerHTML={{ __html: detail.task }}></div>
                                    </div>
                                    {detail.taskPersons.image ? <img src={`${apiUrl}/uploads/${detail.taskPersons.image.filename}`} alt={detail.taskPersons.name} className="project-goals__person-photo" /> : null}
                                </div>
                                { 
                                        detail.tasksList !== 'undefined' && detail.tasksList ?
                                        <div>
                                            {
                                                detail.tasksList.map((item, index) => (
                                                    // <div key={index}>{item.tasksItem}</div>
                                                    <div>
                                                        <div className="project-goals__tasks-item">
                                                            {/* <Icon icon="task" /> */}
                                                                 <div key={index}>{item.tasksItem}</div>
                                                            </div>
                                                        </div>
                                                ))
                                            }
                                        </div> : null  
                                    }
                                {/* <div className="project-goals__tasks-item"> */}
                                    {/* <Icon icon="task" /> */}
                                    {/* Проанализировали поисковую выдачу ТОП-10 и сайты прямых конкурентов. */}
                                {/* </div> */}
                                {/* <div className="project-goals__tasks-item"> */}
                                    {/* <Icon icon="task" /> */}
                                    {/* Выстроили структуру блога и подготовили шаблон публикаций. */}
                                {/* </div> */}
                                {/* <div className="project-goals__tasks-item"> */}
                                    {/* <Icon icon="task" /> */}
                                    {/* Собрали всевозможные запросы по теме информационной безопасности. */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </section> : null
            }
        </div>

        {
            detail.workSteps && detail.workSteps !== 'undefined' && detail.workSteps !== null && detail.workSteps !== "null" && detail.workSteps.length ? 
            <section className="project-steps">
                <div className="container">
                    <h2 className="heading-secondary">Этапы работ</h2>
                    {
                        detail.workSteps.map((item, index) => (
                            <div key={index} className="project-steps__s">
                                <div className="project-steps__subtitle">{item.workStepsTitle}</div>
                                <div className="project-steps__content">
                                    <div className="project-steps__text">{item.workStepsIntroText}</div>
                                    <div className="project-steps__adv">
                                        <div className="project-results__text" dangerouslySetInnerHTML={{ __html: item.workStepsItem }}></div>

                                        {/* <div className="project-steps__adv-item">
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
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section> : null
        }

    {detail.result !== 'undefined' && detail.resultPersons ?
            <section className="project-results">
                <div className="container">
                    <div className="project-results__wrap">
                        <h2 className="heading-secondary">Результаты</h2>
                        <div className="project-results__content">
                            <div className="project-results__person">
                                <div className="project-results__person-info">
                                    <div className="project-results__person-name">{detail.resultPersons.name},</div>
                                    <div className="project-results__person-position">{detail.resultPersons.post} @ DEUS</div>
                                </div>
                                <div className="project-results__person-text"><div dangerouslySetInnerHTML={{ __html: detail.result }}></div></div>
                                {/* <img src="/img/maks.png" alt="person" className="project-results__person-photo"/> */}
                                {detail.resultPersons.image ? <img src={`${apiUrl}/uploads/${detail.resultPersons.image.filename}`} alt={detail.resultPersons.name} className="project-results__person-photo" /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section> : null }

            <section className="project-analytics">
                <div className="container">
                    <div className="project-analytics__wrap">
                        <div className="project-analytics__item">
                            <h2 className="heading-secondary">Видимость в Яндекс</h2>
                            <div className="project-analytics__picture">
                                <img src="/img/yan.png" alt="Видимость в Яндекс" className="project-analytics__img" />
                            </div>
                        </div>
                        <div className="project-analytics__item">
                            <h2 className="heading-secondary">Видимость в Google</h2>
                            <div className="project-analytics__picture">
                                <img src="/img/google.png" alt="Видимость в Google" className="project-analytics__img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNext />

            <Cta formName={'project'} />

        </main>
    )

}

export default ProjectDetail;