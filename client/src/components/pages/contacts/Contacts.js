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
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const { team } = props;

    return (
        <>
            {!isLoading &&
                <main className="contacts">
                    <section className="contacts-main">
                        <div className="container">
                            <div className="contacts-main__wrap">
                                <div><h1 className="heading-primary">Свяжитесь с нами</h1></div>
                                <div></div>
                                <div className="content">
                                    <h2 className="heading-tertiary content__address">г. Одинцово, ул.
                                        Молодежная, д.46, строение
                                        1 офис 24, 25</h2>
                                    <Link to="https://yandex.ru/maps/?rtext=~55.677636, 37.272125"
                                          className="btn --white" target="_blank">Как проехать</Link>
                                </div>
                                <span className="mail">
                                    <h2 className="heading-tertiary"><Link className="hoverMail" to="mailto:hello@de-us.ru">hello@de-us.ru</Link></h2>
                                    <p className="p-style-grey pb-32">Стать клиентом или партнером</p>
                                    <h2 className="heading-tertiary"><Link className="hoverMail" to="mailto:job@de-us.ru">job@de-us.ru</Link></h2>
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
                                    <div className="btn --white hidden-mobile">
                                        <Popup
                                            trigger={<p>Написать сообщение</p>}
                                        modal
                                        nested
                                    >
                                        {close => (
                                                <Formik
                                                    initialValues={{
                                                        name: '',
                                                        email: '',
                                                        about: '',
                                                        formName: 'Ищем таланты'
                                                    }}
                                                    validate={values => {
                                                        const errors = {};
                                                        if (!values.name || values.name.length < 1) {
                                                            errors.name = 'Обязательное поле';
                                                        }
                                                        if (!values.email || values.email.length < 1) {
                                                            errors.email = 'Обязательное поле';
                                                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                                                            errors.email = 'Некорректный email адрес';
                                                        }
                                                        if (!values.about || values.about.length < 1) {
                                                            errors.about = 'Обязательное поле';
                                                        }
                                                        return errors;
                                                    }}
                                                    onSubmit={(values, {setSubmitting, resetForm}) => {
                                                        setTimeout(() => {
                                                            sendEmail(values);
                                                            setSuccess(true);
                                                            const formData = new FormData();
                                                            for (const [key, value] of Object.entries(values)) {
                                                                formData.append(key, value);
                                                            }

                                                            axios.post(`${apiUrl}/api/form/`, formData)
                                                                .then((response) => {
                                                                    console.log(response.data);
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });
                                                            setSubmitting(false);
                                                            resetForm();
                                                        }, 400);
                                                        setTimeout(() => {
                                                            setSuccess(false);
                                                            close()
                                                        }, 4554);
                                                    }}
                                                >
                                                    {({
                                                          values,
                                                          errors,
                                                          touched,
                                                          handleChange,
                                                          handleBlur,
                                                          handleSubmit,
                                                          isSubmitting,
                                                          setFieldValue,
                                                      }) => (

                                                        <form className="form" onSubmit={handleSubmit}>
                                                            <div className="form__inner"
                                                                 style={{display: success ? 'none' : 'block'}}>
                                                                <div className="form__title">Заполните форму</div>
                                                                <input type="hidden" name="formName" value="Ищем таланты"/>
                                                                <div className="form__wrap">
                                                                    <div className="form__group">
                                                                        <div className={`form__group ${errors.name && touched.name ? 'error' : ''}`}>
                                                                            {values.name && <label htmlFor="name" className="form__label">Ваше имя</label>}
                                                                        <input type="text" name="name" className="form__input"
                                                                               onChange={handleChange} value={values.name}
                                                                               placeholder="Ваше имя"/>
                                                                        <div
                                                                            className="form__error">{errors.name && touched.name && errors.name}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form__group">
                                                                        <div className={`form__group ${errors.email && touched.email ? 'error' : ''}`}>
                                                                            {values.email && <label htmlFor="email" className="form__label">E-mail</label>}
                                                                            <input type="text" name="email" className="form__input"
                                                                                   onChange={handleChange} value={values.email}
                                                                                   placeholder="E-mail"/>
                                                                            <div
                                                                                className="form__error">{errors.email && touched.email && errors.email}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form__wrap">
                                                                    <div className="form__group">
                                                                        <div className={`form__group ${errors.about && touched.about ? 'error' : ''}`}>
                                                                            {values.about && <label htmlFor="about" className="form__label">О себе</label>}
                                                                          <textarea type="text" name="about"
                                                                          className="form__textarea"
                                                                          onChange={handleChange} value={values.about}
                                                                          placeholder="Расскажите кратко о себе"/>
                                                                        <div
                                                                            className="form__error">{errors.about && touched.about && errors.about}</div>
                                                                        </div>
                                                                        </div>
                                                                </div>
                                                                <button type="submit"
                                                                        className='btn --dark --circle'>
                                                                    Отправить
                                                                </button>

                                                            </div>
                                                            <div className="form__success"
                                                                 style={{display: success ? 'block' : 'none'}}>
                                                                <div className="form__success-title">Заявка отправлена!</div>
                                                                <div className="form__success-descr">Ожидайте, скоро мы с вами
                                                                    свяжемся
                                                                </div>
                                                            </div>
                                                        </form>

                                                    )}
                                                </Formik>
                                        )}
                                    </Popup>

                                    </div>
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