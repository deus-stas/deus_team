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
            {detail.tasksItem && detail.tasksItem !== 'undefined' && detail.tasksItem !== '' ?

                <section style={{backgroundColor:"white", color:'#050505'}} className="project-target padding borderBlock">
                        <div className="project-target__wrap">
                            <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                            <div>
                                {detail.taskDescr && (
                                    <div className="project-target__content l-textReg">
                                        <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                                    </div>
                                )}
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.tasksItem}}/>
                                </div>
                            </div>

                        </div>
                </section> : null}

            {detail.workIntroText && detail.workIntroText !== 'undefined' && detail.workIntroText !== '' ?

                <section style={{backgroundColor: "black"}} className="project-stack padding borderBlock">
                    <div className="project-stack__wrap">
                        <span>
                           <h2 className="heading-secondary">Стек технолгий</h2>
                           <p className="project-steps__intro m-text"
                              dangerouslySetInnerHTML={{__html: detail.workIntroText}}/>
                        </span>

                        <div className="project-stack__content">
                            {filteredStack.map((stack) => (
                                <div className="project-stack__content-item">
                                    <img src={`${apiUrl}/uploads/${stack.image.filename}`} alt={stack.name}/>
                                </div>

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