import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import './projectNext.scss';
import RetryImage from "../../../../helpers/RetryImage";
import {gotoAnchor} from "../../../anchors";
import DelayedLink from "../../../appHeader/DelayedLink";

const apiUrl = '';

const ProjectNext = ({ props, detail }) => {
    const { id, category } = useParams();
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                const projects = response.data;
                projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllProjects(projects);

                const relatedProjectsByType = projects.filter((project) => project.projectType === detail.projectType);
                if (relatedProjectsByType.length >= 2) {
                    setRelatedProjects(relatedProjectsByType.slice(0, 2));
                } else {
                    setRelatedProjects(projects.slice(0, 2));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, detail.type]);

    return (
        <section className="project-next">
            <h1 className="heading-primary">Ещё проекты</h1>
            <div className="project-next__wrap">
                {relatedProjects.map((project, index) => (
                    <DelayedLink key={index} to={`/projects/${project.nameInEng}`} datahash="toUp"
                                 onClick={(e) => gotoAnchor(e)}>
                        <div className="project-next__item">
                            <RetryImage src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                        className="projects__item"/>
                            <span className="projects-decription m-text">
                                <p style={{color: "rgba(117, 118, 119, 1)"}}>{project.date} • {project.name}</p>
                                 <p className="heading-secondary">{project.descrProject}</p>
                            </span>
                        </div>
                    </DelayedLink>
                ))}
            </div>
        </section>
    )
};

export default ProjectNext;