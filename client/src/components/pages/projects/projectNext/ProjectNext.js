import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";

import './projectNext.scss'

const ProjectNext = () => {

    const { id } = useParams();
    
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/`)
            .then((response) => {
                const pr = id !== response.data[0].id ? response.data[0] : response.data[1]
                setProject(pr);
                console.log(pr);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);


    return project ? (
        <section className="project-next">
            <div className="container">
                <div className="project-next__item" style={{ background: project.color }}>
                    <div className="project-next__text">
                        <div className="project-next__subtitle">Следующий проект</div>
                        <div className="project-next__name" dangerouslySetInnerHTML={{ __html: project.name }}></div>
                        <Link to={`/projects/${project.id}`} className="btn --white">Перейти к проекту</Link>
                    </div>
                    <img src={project.image ? `http://localhost:5000/uploads/${project.image.filename}` : null} alt="Academy профессионального образовательного ресурса" className="project-next__img" />
                </div>
            </div>
        </section>
    ) : null;
}

export default ProjectNext;