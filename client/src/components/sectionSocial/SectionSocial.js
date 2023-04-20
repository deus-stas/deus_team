import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

import './sectionSocial.scss'

const SectionSocial = () => {

    const [social, setSocial] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/social/`)
            .then((response) => {
                setSocial(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return social ? (

        <section className="section-social">
            <div className="container">
                <div className="section-social__wrap">
                    <h2 className="heading-secondary">Узнать нас ближе</h2>
                    <div className="section-social__content">
                        {
                            social.map(item => {
                                return (
                                    <Link to={item.link} className="section-social__item" target="_blank" key={item.id} style={{ background: item.color }}>
                                        <img src={item.image ? `http://localhost:5000/uploads/${item.image.filename}` : null} alt={item.name} />
                                        <div className="section-social__descr">{item.descr}</div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section >

    ) : null

}

export default SectionSocial;