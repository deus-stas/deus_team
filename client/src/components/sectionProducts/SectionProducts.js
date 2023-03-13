import { Link } from 'react-router-dom';

import productVideo from '../../img/webhands.mp4';

import './sectionProducts.scss'

const SectionProducts = () => {

    return (
        <section className="section-products">
            <div className="container">
                <div className="section-products__wrap">
                    <h2 className="heading-secondary">Продукты студии</h2>
                    <div className="section-products__content">
                        <Link to="/" className="section-products__item">
                            <video className="section-products__video" autoPlay loop muted playsInline>
                                <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video>
                            <div className="section-products__text">
                                <div className="section-products__name">Web hands</div>
                                <div className="section-products__descr">Осуществляем техническую и дизайн поддержку сайтов любой сложности</div>
                            </div>
                            <div className="section-products__btn"></div>
                        </Link>
                        <Link to="/" className="section-products__item">
                            <video className="section-products__video" autoPlay loop muted playsInline>
                                <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video>
                            <div className="section-products__text">
                                <div className="section-products__name">Yarkie.Media</div>
                                <div className="section-products__descr">Мы создаём разный контент, который объединяет одно — его эффективность</div>
                            </div>
                            <div className="section-products__btn"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SectionProducts;