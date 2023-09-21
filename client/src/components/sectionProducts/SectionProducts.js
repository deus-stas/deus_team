import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

import productVideo from '../../img/webhands.mp4';

import './sectionProducts.scss'

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const SectionProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/products/`)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return products ? (
        <section className="section-products">
            <div className="container">
                <div className="section-products__wrap">
                    <h2 className="heading-secondary">Продукты студии</h2>
                    <div className="section-products__content">
                        {
                            products.map(product => {
                                return (
                                    <Link to={product.link} className="section-products__item" key={product.id} target="_blank">
                                        {
                                            (product.video && product.video !== 'undefined' && product.video !== 'null') ? (
                                                <video className="section-products__video" autoPlay loop muted playsInline>
                                                    <source src={product.video ? `${apiUrl}/uploads/${product.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                                </video>
                                            ) : (
                                                (product.videoUrl && product.videoUrl !== 'undefined' && product.videoUrl !== 'null') ? (
                                                    <div className="section-products__frame" dangerouslySetInnerHTML={{ __html: product.videoUrl }}></div>
                                                ) : (
                                                    <img src={product.img ? `${apiUrl}/uploads/${product.img.filename}` : null} alt="" />
                                                )
                                            )
                                            
                                        }
                                        <div className="section-products__text">
                                            <div className="section-products__name">{product.name}</div>
                                            <div className="section-products__descr">{product.descr}</div>
                                        </div>
                                        <div className="section-products__btn"></div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    ) : null;

}

export default SectionProducts;