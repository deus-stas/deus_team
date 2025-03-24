import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Link from 'next/link'; // Используем Link из Next.js для навигации

import './projectNext.scss';
// import RetryImage from "../../../helpers/RetryImage";
// import {gotoAnchor} from "../../../components/anchors";
// import DelayedLink from "../../../appHeader/DelayedLink";
import  useMobile from "../../../components/useMobile";

// import {Icon} from "../../../icon/Icon";
import {VideoComponent} from "../Projects.client";
// import {Cursor} from "../../../cursor/cursor";
import Image from 'next/image';

const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

const ProjectNext = ({ props, detail }) => {
    // const { id, category } = useParams();
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [id, setId] = useState(null);

    const isMobile = useMobile()

    const params = useParams();
    // Получение ID из параметров маршрута
    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, []);


    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                const projects = response.data.filter((project) => project.nameInEng !== id);

                projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllProjects(projects);

                const relatedProjectsByType = projects.filter((project) => project.projectType === detail?.projectType);
                if (relatedProjectsByType.length >= 2) {
                    setRelatedProjects(relatedProjectsByType.slice(0, 2));
                } else {
                    setRelatedProjects(projects.slice(0, 2));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, detail?.type]);

    const videoRefs = useRef([]);

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };

    const returnToTheTop = (e) => {
        const elements = document.querySelectorAll('.project-next__item');
        elements.forEach((element) => {
            window.scroll(0, 0)
        })
    }

    return (
        <>
        <section className="project-next">
            <h1 className="heading-primary">Ещё проекты</h1>
            <div className="project-next__wrap">
                {relatedProjects.map((project, index) => {
                    const imgSize = isMobile ? `${apiUrl}/uploads/${project.imageMob?.filename}` : `${apiUrl}/uploads/${project.image.filename}`;
                    const isVideo = project.imageMob && project.imageMob?.filename.endsWith('.mp4') || project.image && project.image.filename.endsWith('.mp4');
                    return (
                        <Link key={index} href={`/projects/${project.nameInEng}`} datahash="toUp"
                                     onClick={returnToTheTop}>
                            <div className="project-next__item">
                                {isVideo ?
                                    <span className="projects__item">
                                         <VideoComponent className="projects__item next__project_img" ref={(ref) => addVideoRef(ref)}  project={project} isMobile={isMobile} videoSize={imgSize}
                                                         apiUrl={apiUrl} />
                                    </span>
                                    :
                                    <img src={imgSize} alt={project.name}
                                         className="projects__item next__project_img"/>
                                }
                                <span className="projects-decription m-text">
                                      <p style={{color: "rgba(117, 118, 119, 1)"}}>{project.date} • {project.name}</p>
                                      <p className="heading-secondary">{project.descrProject}</p>
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    </>)
};

export default ProjectNext;
