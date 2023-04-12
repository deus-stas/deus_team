import { Link } from 'react-router-dom';

import './appFooter.scss';
import { Icon } from '../icon/Icon';

const AppFooter = () => {

    const gotoAnchor = (e) => {
        setTimeout(() => {
            let element = document.getElementById(e.target.getAttribute('datahash'));
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 750)
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrap">
                    <div className="footer__contacts">
                        <a href="tel:+74951034351" className="footer__contacts-item">+7 (495) 103—4351</a>
                        <a href="mailto:hello@de-us.ru" className="footer__contacts-item">hello@de-us.ru</a>
                        <div className="footer__social">
                            <Link className="footer__social-item" to="/"><Icon icon="vk" /></Link>
                            <Link className="footer__social-item" to="/"><Icon icon="tg" /></Link>
                            <Link className="footer__social-item" to="/"><Icon icon="be" /></Link>
                        </div>
                    </div>
                    <div className="footer__item hidden-mobile">
                        <div className="footer__subtitle">Офис</div>
                        <div className="footer__list-item">г. Одинцово, ул. Молодежная, д.46, <br /> строение 1 офис 24, 25</div>
                        <Link className='btn' to="/">Скачать презентацию</Link>
                    </div>
                    <div className="footer__item --about">
                        <div className="footer__subtitle">О компании</div>
                        <nav className="footer__nav">
                            <ul className='footer__list'>
                                <li className="footer__list-item"><Link to="/agency">О компании</Link></li>
                                <li className="footer__list-item"><Link to="/agency" datahash="clients" onClick={(e) => gotoAnchor(e)}>Клиенты</Link></li>
                                <li className="footer__list-item"><Link to="/agency" datahash="team" onClick={(e) => gotoAnchor(e)}>Команда</Link></li>
                                <li className="footer__list-item"><Link to="/agency" datahash="awards" onClick={(e) => gotoAnchor(e)}>Награды</Link></li>
                                <li className="footer__list-item"><Link to="/agency" datahash="team" onClick={(e) => gotoAnchor(e)}>Вакансии</Link></li>
                                <li className="footer__list-item"><Link to="/contacts">Контакты </Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="footer__item">
                        <div className="footer__subtitle">Услуги</div>
                        <nav className="footer__nav">
                            <ul className='footer__list'>
                                <li className="footer__list-item"><Link to="/">Фирменный стиль</Link></li>
                                <li className="footer__list-item"><Link to="/">Сайты и сервисы</Link></li>
                                <li className="footer__list-item"><Link to="/">Контент-маркетинг</Link></li>
                                <li className="footer__list-item"><Link to="/">SEO-продвижение</Link></li>
                                <li className="footer__list-item"><Link to="/">Лидогенерация</Link></li>
                                <li className="footer__list-item"><Link to="/">Поддержка и развитие</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="footer__copyright">© 2016–2023 DEUS agency</div>
            </div>
        </footer>
    )

}

export default AppFooter;