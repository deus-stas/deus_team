import {Link} from 'react-router-dom';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Cta from '../../cta/Cta';
import SectionSocial from '../../sectionSocial/SectionSocial';

import './contacts.scss';


const Contacts = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: isLoading}});
            window.dispatchEvent(event)
        }
    }, [isLoading])

    // useEffect(() => {
    //     const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
    //     window.dispatchEvent(event)
    //
    //     const handleLoad = (e) => {
    //         if (e.detail.isLoading !== isLoading) {
    //             setIsLoading(e.detail.isLoading);
    //         }
    //     };
    //
    //     window.addEventListener('isLoadingMainPage', handleLoad);
    //     return () => {
    //         window.removeEventListener('isLoadingMainPage', handleLoad);
    //     };
    // },[]);


    // useEffect(() => {
    //     const element = document.getElementById('contactUs');
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    //     }, []);

    return (
        <>
            {!isLoading &&
                <main className="contacts">
                    <section className="contacts-main">
                        <div className="container">
                            <h1 className="heading-primary">Свяжитесь<br/> с нами</h1>
                            <div className="contacts-main__wrap">
                                <div></div>
                                <div></div>
                                <div className="contacts-main__content">
                                    <h2 className="heading-secondary contacts-main__address">г. Одинцово, ул.
                                        Молодежная, д.46, строение
                                        1 офис 24, 25</h2>
                                    <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125"
                                          className="btn --white " target="_blank">Как проехать</Link>
                                </div>
                                <span>
                                    <h2 className="heading-secondary">hello@de-us.ru</h2>
                                    <p className="p-style-grey pb-32">Стать клиентом или партнером</p>
                                    <h2 className="heading-secondary">job@de-us.ru</h2>
                                    <p className="p-style-grey">Присоединиться к команде</p>
                                 </span>
                                {/*<div className="contacts-main__map wow fadeIn"*/}
                                {/*     data-wow-duration="0.5s"*/}
                                {/*     data-wow-delay="0.1s" id="contacts-map">*/}
                                {/*    <YMaps>*/}
                                {/*        <Map defaultState={{center: [55.677636, 37.272125], zoom: 9}} width="100%"*/}
                                {/*             height="100%">*/}
                                {/*            <Placemark*/}
                                {/*                defaultGeometry={[55.677636, 37.272125]}*/}
                                {/*                options={{*/}
                                {/*                    iconLayout: "default#image",*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*        </Map>*/}
                                {/*    </YMaps>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </section>
                    <section id="contactUs">
                        <Cta formName={'contacts'}/>
                    </section>

                </main>
            }
        </>
    )

}

export default Contacts;