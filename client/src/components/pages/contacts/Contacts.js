import { Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {useEffect, useLayoutEffect, useState} from 'react';
import Cta from '../../cta/Cta';
import SectionSocial from '../../sectionSocial/SectionSocial';

import './contacts.scss';


const Contacts = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);
    useEffect(()=>{
        if(!isLoading){
            const timeout = setTimeout(() => {
                const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: isLoading}});
                window.dispatchEvent(event)
            }, 100);
            return () => clearTimeout(timeout);
        }
    },[isLoading])

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
                    <h1 className="heading-primary wow slideInLeft"
                        data-wow-duration="0.2s"
                        data-wow-delay="0.1s">Контакты</h1>
                    <div className="contacts-main__wrap">
                        <div className="contacts-main__content wow slideInLeft"
                             data-wow-duration="0.2s"
                             data-wow-delay="0.1s">
                            <h2 className="heading-secondary">Офис</h2>
                            <div className="contacts-main__address">г. Одинцово, ул. Молодежная, д.46, строение 1 офис 24, 25</div>
                            <Link to="tel:+74951034351" className="contacts-main__phone">+7 (495) 103—4351</Link>
                            <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125" className="btn --orange" target="_blank">Как проехать</Link>
                        </div>
                        <div className="contacts-main__map wow slideInRight"
                             data-wow-duration="0.5s"
                             data-wow-delay="0.1s" id="contacts-map">
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
                <div className="wow fadeIn"
                     data-wow-offset="500"
                     data-wow-duration="0.5s"
                     data-wow-delay="0.1s">
                <Cta   formName={'contacts'} />
                </div>
            </section>


            <SectionSocial />

        </main>
            }
        </>
    )

}

export default Contacts;