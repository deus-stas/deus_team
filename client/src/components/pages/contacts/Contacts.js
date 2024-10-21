import {Link} from 'react-router-dom';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Cta from '../../cta/Cta';
import SectionSocial from '../../sectionSocial/SectionSocial';

import './contacts.scss';
import {connect} from "react-redux";
import axios from "../../../axios";
import InputMask from "react-input-mask";
import RoundButton from "../../animation/roundButton";
import Popup from "reactjs-popup";
import {Formik} from "formik";
import {useMediaQuery} from "@material-ui/core";
import {Icon} from "../../icon/Icon";
import {Cursor} from "../../Cursor/Cursor";

const apiUrl = '';
const Contacts = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);

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

    const sendEmail = async (values) => {
        try {
            const response = await axios.post(`/api/mail`, values);
        } catch (error) {
            console.error(error);
        }
    };

    const sizeLarge = 'Напишите лично<br/> генеральному<br/>  директору'
    const sizeSmall = 'Напишите лично<br/> генеральному  директору'

    const descrXLarge = 'Мы работаем с ведущими компаниями и брендами из различных<br/> отраслей. При создании могут решаться уникальные задачи,<br/> но это всегда проекты с характером';
    const descrLarge = 'Мы работаем с ведущими компаниями и брендами<br/> из различных отраслей. При создании могут<br/> решаться уникальные задачи, но это всегда проекты<br/> с характером';
    const descrMedium = 'Мы работаем с ведущими компаниями<br/> и брендами из различных отраслей.<br/> При создании могут решаться уникальные<br/> задачи, но это всегда проекты с характером';
    const descrSmall = 'Мы работаем с ведущими<br/> компаниями и брендами<br/> из различных отраслей.<br/> При создании могут решаться<br/> уникальные задачи, но это всегда<br/> проекты с характером';

    const matches1440 = useMediaQuery('(min-width:1025px)');
    const matches1024 = useMediaQuery('(min-width:940px)');
    const matches768 = useMediaQuery('(min-width:420px)');
    const matches360 = useMediaQuery('(min-width:0px)');
    const principleText = matches1440 ? "s-text" : matches1024 ? "m-text" : "m-text"

    let text;
    let descr;
    if (matches1440) {
        text = sizeLarge;
        descr = descrXLarge
    } else if (matches1024) {
        text = sizeSmall;
        descr = descrLarge
    } else if (matches768) {
        text = sizeSmall;
        descr = descrMedium
    } else if (matches360) {
        text = sizeSmall;
        descr = descrSmall
    }

    const { team } = props;

    return (
        <>
            <Cursor/>
            {!isLoading &&
                <main className="contacts">
                    <div className="container">
                    <section className="contacts-main">
                            <span className="agency-maint__text">
                                <p className="breadcrumb">Контакты</p>
                                <h1 className="heading-primary">Свяжитесь с нами</h1>
                            </span>
                    </section>
                        <section className="contacts-info">
                            <div className="contacts-info__wrap">
                                <div className="contacts-info__wrap-adress">
                                    <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125"
                                          target="_blank">
                                        <h2 className="heading-secondary">г. Одинцово, ул. Молодежная,
                                            д.46,<br/> строение 1 офис 24, 25</h2>
                                    </Link>
                                </div>
                                <div className="contacts-info__wrap-invate">
                                    <span>
                                       <h2 className="m-text hover-flip"><Link className="" to="mailto:hello@de-us.ru"> <span data-hover="hello@de-us.ru">hello@de-us.ru</span></Link></h2>
                                        <p className="s-text pb-32">Стать клиентом или партнером</p>
                                    </span>
                                    <span>
                                        <h2 className="m-text hover-flip"><Link className="" to="mailto:job@de-us.ru"><span data-hover="job@de-us.ru">job@de-us.ru</span></Link></h2>
                                         <p className="s-text">Присоединиться к команде</p>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section id="contactUs">
                            <Cta formName={'contacts'}/>
                        </section>

                        <section className="contacts-general">
                            <div className="contacts-general__wrap borderBlock padding">
                                <div className="chat">
                                    <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: text}}/>
                                    <div onClick={() => window.open('https://t.me/agencydeus', )} className="btnTg hidden-mob">
                                        <p >Написать сообщение</p>
                                        <Icon icon="arrowRight" viewBox="0 0 24 24"/>
                                    </div>
                                </div>
                                <div className="info">
                                    <p className="l-textReg" dangerouslySetInnerHTML={{__html: descr}}>
                                    </p>
                                    {team.filter(team => team.name == "Вячеслав Брижань").map((team, index) => {
                                        return (
                                            <div className="worker">
                                                <img className="worker-img"
                                                     src={team.mainImg ? `${apiUrl}/uploads/${team.image.filename}` : null}
                                                     alt=""/>
                                                <span>
                                                      <p className="m-text">{team.name}</p>
                                                    <p className="post s-text">{team.post}</p>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <div onClick={() => window.open('https://t.me/agencydeus', '_blank')} className="btnTg hidden-desk"><p>Написать сообщение<Icon icon="arrowRight" viewBox="0 0 24 24"/></p></div>
                                </div>
                            </div>
                    </section>
                    </div>
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
