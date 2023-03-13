import { Link } from 'react-router-dom';

import './projectNext.scss'

import projectImg from '../../../../img/project-img.png';

const ProjectNext = () => {
    return (
        <section className="project-next">
            <div className="container">
                <div className="project-next__item" style={{ background: 'linear-gradient(252.85deg, #5740F3 0%, #5A42F5 100%)' }}>
                    <div className="project-next__text">
                        <div className="project-next__subtitle">Следующий проект</div>
                        <div className="project-next__name">Isource Academy профессионального образовательного ресурса</div>
                        <Link to="/projects/detail" className="btn --white">Перейти к проект</Link>
                    </div>
                    <img src={projectImg} alt="Academy профессионального образовательного ресурса" className="project-next__img" />
                </div>
            </div>
        </section>
    )
}

export default ProjectNext;