import { useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

import './appFooter.scss';
import {Icon} from '../icon/Icon';
import {connect, useSelector} from "react-redux";

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const AppFooter = (props) => {

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const handleLoad = (e) => {
            setIsLoading(e.detail.isLoading);
        };

        window.addEventListener('isLoadingMainPage', handleLoad);

        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
            setIsLoading(true)
        };
    }, []);

    const gotoAnchor = (e) => {
        setTimeout(() => {
            let element = document.getElementById(e.target.getAttribute('datahash'));
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }, 750)
    }
    const {headerData, services } = props;

    return (
        <>
            <footer className={"footer " + (isLoading ? "fade-in" : "wow backInUp")}
                    data-wow-offset="2"
                    data-wow-duration="3s"
                    data-wow-delay="1s">
                <div className="container">
                    {headerData &&
                    <div className="footer__wrap">
                        <div className="footer__contacts">
                            <a href={`tel:${headerData.phone}`} className="footer__contacts-item">{headerData.phone}</a>
                            <a href={`mailto:${headerData.email}`}
                               className="footer__contacts-item">{headerData.email}</a>
                            {/* <a href="tel:+74951034351" className="footer__contacts-item">+7 (495) 103—4351</a>
                        <a href="mailto:hello@de-us.ru" className="footer__contacts-item">hello@de-us.ru</a> */}
                            {
                                headerData && headerData.vk && headerData.telegram && headerData.behance ?
                                    <div className="footer__social">
                                        <Link className="footer__social-item" to={`${headerData.vk}`}><Icon icon="vk"/></Link>
                                        <Link className="footer__social-item" to={`${headerData.telegram}`}><Icon
                                            icon="tg"/></Link>
                                        <Link className="footer__social-item" to={`${headerData.behance}`}><Icon
                                            icon="be"/></Link>
                                    </div> :
                                    <div className="footer__social">
                                        <Link className="footer__social-item" to="/"><Icon icon="vk"/></Link>
                                        <Link className="footer__social-item" to="/"><Icon icon="tg"/></Link>
                                        <Link className="footer__social-item" to="/"><Icon icon="be"/></Link>
                                    </div>
                            }

                        </div>
                        <div className="footer__item hidden-mobile">
                            <div className="footer__subtitle">Офис</div>
                            <div className="footer__list-item">г. Одинцово, ул. Молодежная, д.46, <br/> строение 1 офис
                                24, 25
                            </div>
                            {/* <a className='btn' href={`${apiUrl}/uploads/DEUS.pdf`}>Скачать презентацию</a> */}
                            {
                                headerData && headerData.presentation ?
                                    <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`} target='_blank'
                                       rel="noopener noreferrer" className="btn">Скачать презентацию</a> :
                                    <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' rel="noopener noreferrer"
                                       className="btn">Скачать презентацию</a>
                            }
                        </div>
                        <div className="footer__item --about">
                            <div className="footer__subtitle">О компании</div>
                            <nav className="footer__nav">
                                <ul className='footer__list'>
                                    <li className="footer__list-item"><Link to="/agency" datahash="agency"
                                                                            onClick={(e) => gotoAnchor(e)}>О
                                        компании</Link></li>
                                    <li className="footer__list-item"><Link to="/agency" datahash="clients"
                                                                            onClick={(e) => gotoAnchor(e)}>Клиенты</Link>
                                    </li>
                                    <li className="footer__list-item"><Link to="/agency" datahash="team"
                                                                            onClick={(e) => gotoAnchor(e)}>Команда</Link>
                                    </li>
                                    <li className="footer__list-item"><Link to="/agency" datahash="awards"
                                                                            onClick={(e) => gotoAnchor(e)}>Награды</Link>
                                    </li>
                                    <li className="footer__list-item"><Link to="/agency" datahash="vacancies"
                                                                            onClick={(e) => gotoAnchor(e)}>Вакансии</Link>
                                    </li>
                                    <li className="footer__list-item"><Link to="/contacts">Контакты </Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="footer__item">
                            <div className="footer__subtitle">Услуги</div>
                            <nav className="footer__nav">
                                <ul className='footer__list'>
                                    {services ? services.filter(service => service.isInvisible)
                                        .map(service => {
                                            return (<li className="footer__list-item" key={service.id}><Link
                                                    to={`/services/${service.path}`}>{service.name}</Link></li>

                                            )
                                        }) : null}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    }
                    <div className="footer__copyright">© 2016–2023 DEUS agency</div>
                </div>
            </footer>
        </>
    )

}

export default connect(
    (state) => ({
        headerData: state.app.headerData,
        services: state.app.services
    })
)(AppFooter)