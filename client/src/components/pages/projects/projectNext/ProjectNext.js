import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import './projectNext.scss'
import RetryImage from "../../../../helpers/RetryImage";
import {gotoAnchor} from "../../../anchors";
import DelayedLink from "../../../appHeader/DelayedLink";

const apiUrl = ''

const ProjectNext = (props) => {
    const { id } = useParams();

    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
        .then((response) => {
            let pr = null;
        
            response.data.some((item, index) => {
                if (id === item.nameInEng) {
                    pr = response.data[index + 1];
                    return true; // Break the loop
                } else {
                    pr = response.data[index];
                }
                return false;
            });
            if (pr && pr !== undefined) {
                setProject(pr);
            } else {
                setProject(response.data[0]);
            }
           
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, [id]);


    return project ? (
        <section className="project-next">
            <div className="container">
                <div className="project-next__item" style={{ background: project.color && project.color !== undefined && project.color !== 'undefined' ? project.color : '#000'}}>
                    <div className="project-next__text">
                        <div className="project-next__subtitle">
                            {props.last ? 'Последний созданный проект' : 'Следующий проект'}
                        </div>
                        <div className="project-next__name" dangerouslySetInnerHTML={{ __html: project.name }}></div>
                        <DelayedLink to={`/projects/${project.nameInEng}`} datahash="toUp" onClick={(e) => gotoAnchor(e)} className="btn --white">Перейти к проекту</DelayedLink>
                    </div>
                    <RetryImage src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt="Academy профессионального образовательного ресурса" className="project-next__img" />

                </div>
            </div>
        </section>
    ) : null;
}

export default ProjectNext;