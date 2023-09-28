import { Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {useEffect, useLayoutEffect, useState} from 'react';
import Cta from '../../cta/Cta';
import SectionSocial from '../../sectionSocial/SectionSocial';

import './contacts.scss';


const Contacts = () => {

    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);


    // useEffect(() => {
    //     const element = document.getElementById('contactUs');
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    //     }, []);

    return (
        <>
            {!!isLoading ? <div className='loading'/> :

        <main className="contacts">
            <section className="contacts-main">
                <div className="container">
                    <h1 className="heading-primary">Контакты</h1>
                    <div className="contacts-main__wrap">
                        <div className="contacts-main__content">
                            <h2 className="heading-secondary">Офис</h2>
                            <div className="contacts-main__address">г. Одинцово, ул. Молодежная, д.46, строение 1 офис 24, 25</div>
                            <Link to="tel:+74951034351" className="contacts-main__phone">+7 (495) 103—4351</Link>
                            <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125" className="btn --orange" target="_blank">Как проехать</Link>
                        </div>
                        <div className="contacts-main__map" id="contacts-map">
                            <YMaps>
                                <Map defaultState={{ center: [55.677636, 37.272125], zoom: 9 }} width="100%" height="100%" >
                                    <Placemark
                                        defaultGeometry={[55.677636, 37.272125]}
                                        options={{
                                            iconLayout: "default#image",
                                        }}
                                    />
                                </Map>
                            </YMaps>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contactUs">
                <Cta   formName={'contacts'} />
            </section>


            <SectionSocial />

        </main>
            }
        </>
    )

}

export default Contacts;