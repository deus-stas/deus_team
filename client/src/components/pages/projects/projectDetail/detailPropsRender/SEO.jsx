import React from 'react';
import {ProjectResults, useMobile} from "../ProjectDetail";

const Seo = ({detail}) => {
    const isMobile = useMobile();

    return (
        <>
            {detail.taskDo && detail.taskDo !== 'undefined' && detail.taskDo !== '' ?

                <section style={{backgroundColor: "white"}} className="project-results padding borderBlock">
                    <div className="project-results__wrap">
                        <h2 className="heading-secondary">Цели и задачи</h2>
                        {detail.taskDescr &&
                            <div className="project-results__content">
                                <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                            </div>
                        }
                        <div className="project-results__content">
                            <div dangerouslySetInnerHTML={{__html: detail.taskDo}}/>
                        </div>
                    </div>
                </section> : null}

            {detail.heading && detail.heading !== 'undefined' && detail.heading !== '' ?

                <section style={{backgroundColor: "white"}} className="project-results padding borderBlock">
                    <div className="project-results__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>

                        <div className="project-steps__text">{detail.workIntroText}</div>

                        {detail.workSteps.length > 0 && detail.workSteps.map((item, index) => (

                            <div key={index} className="project-steps__s">
                                <div className="project-steps__subtitle">{item.workStepsTitle}</div>
                                <div className="project-steps__content">
                                    <div className="project-steps__adv">
                                        <div
                                            className="project-results__text"
                                            dangerouslySetInnerHTML={{__html: item.workStepsItem}}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section> : null}

            {detail.metrics.length > 0 && !!detail.metrics ?
                <section className="project-metric padding borderBlock">
                    <h2 className="heading-secondary">Видимость</h2>
                    <div className="project-metric__wrap">
                        {detail.metrics.map((metric, index) => (
                            <div className="project-metric__wrap-item" key={index}>
                                <p className="m-text">{metric.metric}</p>
                                <img src={metric.imageI.src} alt={''}/>
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