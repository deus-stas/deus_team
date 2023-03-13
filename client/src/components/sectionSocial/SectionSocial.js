import { Link } from 'react-router-dom';

import vkLogo from '../../img/vk-logo.svg';
import tgLogo from '../../img/tg-logo.svg';
import beLogo from '../../img/be-logo.svg';

import './sectionSocial.scss'

const SectionSocial = () => {

    return (
        <section className="section-social">
            <div className="container">
                <div className="section-social__wrap">
                    <h2 className="heading-secondary">Узнать нас ближе</h2>
                    <div className="section-social__content">
                        <Link to="/" className="section-social__item">
                            <img src={vkLogo} alt="ВКОНТАКТЕ" />
                            <div className="section-social__descr">В разных соц сетях публикуем разное чтобы было интересно</div>
                        </Link>
                        <Link to="/" className="section-social__item">
                            <img src={tgLogo} alt="Telegram" />
                            <div className="section-social__descr">В телеге можно инсайды какие-то и полезности</div>
                        </Link>
                        <Link to="/" className="section-social__item">
                            <img src={beLogo} alt="Behance" />
                            <div className="section-social__descr">С этим пациентом всё понятно, только кейсы</div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SectionSocial;