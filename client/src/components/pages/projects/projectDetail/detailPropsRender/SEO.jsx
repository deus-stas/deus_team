import React from 'react';
import {BannerComponent, ProjectResults, useMobile} from "../ProjectDetail";

const Seo = ({detail}) => {
    const isMobile = useMobile();
    const apiUrl = ''

    return (
        <>
            {detail.tasksItem && detail.tasksItem !== 'undefined' && detail.tasksItem !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary">Цели и задачи</h2>
                        <div>
                            {detail.taskDescr &&
                                <div className="project-target__content l-textReg">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                                </div>
                            }
                            <div className="project-target__item m-text">
                                <div dangerouslySetInnerHTML={{__html: detail.tasksItem}}/>
                            </div>
                        </div>

                    </div>
                </section> : null}

            {detail.heading && detail.heading !== 'undefined' && detail.heading !== '' ?

                <section style={{backgroundColor: "white"}} className="project-steps padding borderBlock">
                    <div className="project-steps__wrap">
                        <span>
                          <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                        <div className="project-steps__intro l-textReg" dangerouslySetInnerHTML={{__html: detail.workIntroText}}></div>
                        </span>
                        <span>
                        {detail.workSteps.length > 0 && detail.workSteps.map((item, index) => (

                            <div key={index} className="project-steps__s">
                                <div className="project-steps__subtitle l-textReg">{item.workStepsTitle}</div>
                                <div className="project-steps__content">
                                    <div className="project-steps__adv">
                                        <div
                                            className="project-steps__text m-text"
                                            dangerouslySetInnerHTML={{__html: item.workStepsItem}}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        </span>
                    </div>
                </section> : null}

            {detail.metrics.length > 0 && !!detail.metrics ?
                <section className="project-metric padding borderBlock">
                    <h2 className="heading-secondary">Видимость</h2>
                    <div className="project-metric__wrap">
                        {detail.metrics.map((metric, index) => (
                            <div className="project-metric__wrap-item" key={index}>
                                <p className="l-textReg">{metric.metric}</p>
                                <img className="project-banner borderBlock" src={`${apiUrl}/uploads/${metric.imageI.title}`} alt={''}/>
                            </div>
                        ))}
                    </div>
                </section>
                :null}

            {!!detail.result &&
                <ProjectResults
                    result={detail.result}
                    awardsURL={detail.awardsURL}
                    isMobile={isMobile}
                />
            }

        </>
    );
};

export default Seo;