import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../axios'

import './sectionSocial.scss'
import TrailOn from "../animation/trailOn";
import ScrollUp from "../animation/scrollUp";

const apiUrl = ''

const SectionSocial = () => {

    const [social, setSocial] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    // useEffect(() => {
    //         const wow = new WOW.WOW();
    //         wow.init();
    //         wow.sync();
    // });

    useEffect(() => {
        axios.get(`${apiUrl}/api/social/`)
            .then((response) => {
                setSocial(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        window.addEventListener('isLoadingMainPage', handleLoad);

        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    });

    return social ? (
        <>
            {!isLoading &&
                <section className="section-social">
                    <div className="container">
                        <div className="section-social__wrap">
                            <h2 className="heading-secondary wow fadeIn"
                                data-wow-duration="1s"
                                data-wow-delay="0.2s"
                                data-wow-offset="100">
                                Узнать нас ближе
                            </h2>
                            <ScrollUp fromY={50} delay={100} >
                            <div className="section-social__content">
                                {
                                    social.map((item, index) => {
                                        const fromY =50 + index * 2
                                        const delay = 1000 + index *0.5
                                        return (
                                                    <Link to={item.link} className="section-social__item wow slideInRight"

                                                          target="_blank" key={item.id}
                                                          style={{background: item.color}}>
                                                        <ScrollUp fromY={fromY} delay={delay} >
                                                            <div className="hidden">
                                                                <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null}
                                                                     alt={item.name}/>
                                                                <div className="section-social__descr">{item.descr}</div>
                                                            </div>
                                                        </ScrollUp>

                                                        <div className="section-social__btn">
                                                            <div className="arrow" style={{'--custom-color': item.color}}></div>
                                                        </div>
                                                    </Link>
                                        )
                                    })
                                }
                            </div>
                            </ScrollUp>
                        </div>
                    </div>
                </section>
            }
        </>
    ) : null

}

export default SectionSocial;