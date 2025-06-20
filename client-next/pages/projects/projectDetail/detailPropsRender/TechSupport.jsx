import React, {useEffect, useState} from 'react';
import "../projectDetail.scss"
import axios from "../../../../axios";
import {BannerComponent, ProjectResults} from "../ProjectDetail";
import Image from 'next/image';
import useMobile from "../../../../components/useMobile";

const TechSupport = ({detail}) => {
    const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;
    const [stack, setStack] = useState([])
    const { isMobile } = useMobile();

    useEffect(() => {
        axios.get(`${apiUrl}/api/stack/`)
            .then((response) => {
                setStack(response.data)

            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const filteredStack = stack.filter((stackItem) => detail?.stack.includes(stackItem._id));

    return (
        <>
            {detail?.tasksItem && detail?.tasksItem !== 'undefined' && detail?.tasksItem !== '' ?

                <section style={{backgroundColor:"white", color:'#050505'}} className="project-target padding borderBlock">
                        <div className="project-target__wrap">
                            <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail?.heading}}/>
                            <div>
                                {detail?.taskDescr && (
                                    <div className="project-target__content l-textReg">
                                        <div dangerouslySetInnerHTML={{__html: detail?.taskDescr}}/>
                                    </div>
                                )}
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail?.tasksItem}}/>
                                    <ul  className="project-target__item m-text">
                                        <li>
                                            Мощность системы рассчитана на работу по новым автомобилям, а также автомобилям с пробегом.
                                        </li>
                                        <li>
                                            В рамках технической поддержки обеспечивается стабильная работа функционала, стабильная доставка актуального стока на классифайды, что поддерживает всегда актуальные данные о наличии и стоимости автомобилей у партнеров.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                </section> : null}

            {detail?.workIntroText && detail?.workIntroText !== 'undefined' && detail?.workIntroText !== '' ?

                <section className="project-stack padding borderBlock">
                    <div className="project-stack__wrap">
                        <span>
                           <h2 className="heading-secondary">Стек технологий</h2>
                           <p className="project-steps__intro m-text"
                              dangerouslySetInnerHTML={{__html: detail?.workIntroText}}/>
                        </span>

                        <div className="project-stack__content">
                            {filteredStack.map((stack, count) => (
                                <div className="project-stack__content-item" key={`key-e-${count}`}>
                                    <img src={`${apiUrl}/uploads/${stack.image.filename}`} alt={stack.name}/>
                                </div>

                            ))}
                        </div>
                    </div>
                </section> : null}

            {!!detail?.result &&
                <ProjectResults
                    result={detail?.result}
                    awardsURL={detail?.awardsURL}
                    awardsTitle={detail?.awardsTitle}
                    awardsImage={detail?.awardsImage}
                    isMobile={isMobile}
                />
            }
        </>
    );
};

export default TechSupport;
