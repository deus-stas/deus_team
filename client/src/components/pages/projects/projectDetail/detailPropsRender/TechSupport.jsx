import React, {useEffect, useState} from 'react';
import "../projectDetail.scss"
import axios from "../../../../../axios";
import {BannerComponent, ProjectResults, useMobile} from "../ProjectDetail";

const TechSupport = ({detail}) => {
    const apiUrl = '';
    const [stack, setStack] = useState([])
    const isMobile = useMobile();

    useEffect(() => {
        axios.get(`${apiUrl}/api/stack/`)
            .then((response) => {
                setStack(response.data)

            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const filteredStack = stack.filter((stackItem) => detail.stack.includes(stackItem._id));

    return (
        <>
            {detail.taskDescr && detail.taskDescr !== 'undefined' && detail.taskDescr !== '' ?

                <section style={{backgroundColor:"white"}} className="project-results padding borderBlock">
                        <div className="project-results__wrap">
                            <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                            <div className="project-results__content">
                                <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                            </div>
                            <div className="project-results__content">
                                <div dangerouslySetInnerHTML={{__html: detail.tasksItem}}/>
                            </div>
                    </div>
                </section> : null}

            {detail.stack && detail.stack !== 'undefined' && detail.stack !== '' ?

                <section style={{backgroundColor:"black"}} className="project-stack padding borderBlock">
                    <div className="project-stack__wrap">
                        <span>
                           <h2 className="heading-secondary">Стек технолгий</h2>
                           <p className="project-steps__intro m-text"
                              dangerouslySetInnerHTML={{__html: detail.workIntroText}}/>
                        </span>

                        <div className="project-stack__content">
                            {filteredStack.map((stack) => (
                                <img src={`${apiUrl}/uploads/${stack.image.filename}`} alt={stack.name} />
                            ))}
                        </div>
                    </div>
                </section> : null}

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

export default TechSupport;