import {Link} from 'react-router-dom';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Cta from '../../cta/Cta';
import SectionSocial from '../../sectionSocial/SectionSocial';

import './contacts.scss';
import {connect} from "react-redux";

const apiUrl = process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_LOCALHOST_URI;
const Contacts = (props) => {

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


    const { team } = props;

    return (
        <>
            {!isLoading &&
                <main className="contacts">
                    <section className="contacts-main">
                        <div className="container">
                            <h1 className="heading-primary">Свяжитесь с нами</h1>
                            <div className="contacts-main__wrap">
                                <div></div>
                                <div></div>
                                <div className="content">
                                    <h2 className="heading-secondary content__address">г. Одинцово, ул.
                                        Молодежная, д.46, строение
                                        1 офис 24, 25</h2>
                                    <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125"
                                          className="btn --white" target="_blank">Как проехать</Link>
                                </div>
                                <span className="mail">
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

                    <section className="contacts-general">
                        <div className="container">
                            <div className="contacts-general__wrap">
                                <div className="chat">
                                    <h2 className="heading-secondary">Напишите лично генеральному директору</h2>
                                    <div className="btn --white hidden-mobile"><p>Написать сообщение</p></div>
                                </div>
                                <div></div>
                                <div className="info">
                                    <h2 className="heading-secondary">Мы работаем с ведущими компаниями и брендами из различных отраслей. При создании
                                        могут решаться уникальные задачи, но это всегда проекты с характером
                                    </h2>
                                    {team.filter(team => team.name == "Вячеслав Брижань").map((team, index) => {
                                        console.log('team:', team.mainImg)
                                        return (
                                            <div className="worker">
                                                <img className="worker-img"
                                                     src={team.mainImg ? `${apiUrl}/uploads/${team.mainImg.filename}` : null}
                                                     alt=""/>
                                                <span>
                                                      <div className="worker-name heading-tertiary">{team.name}</div>
                                                    <p className="worker-descr">{team.post}</p>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <div className="btn --white hidden-desktop"><p>Написать сообщение</p></div>
                                </div>
                            </div>
                        </div>

                    </section>

                </main>
            }
        </>
    )

}
export default connect(
    (state) => (
        {
            team: state.app.team,
        }
    )
)(Contacts)