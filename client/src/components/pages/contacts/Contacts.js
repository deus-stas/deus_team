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
                                       <h2 className="m-text"><Link to="mailto:hello@de-us.ru">hello@de-us.ru</Link></h2>
                                        <p className="s-text pb-32">Стать клиентом или партнером</p>
                                    </span>
                                    <span>
                                        <h2 className="m-text"><Link to="mailto:job@de-us.ru">job@de-us.ru</Link></h2>
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
                                    <div onClick={() => window.open('https://t.me/deusagency', )} className="btnTg hidden-mob">
                                        <p>Написать сообщение</p>
                                        {/*<Popup*/}
                                        {/*    trigger={<p>Написать сообщение</p>}*/}
                                        {/*    modal*/}
                                        {/*    nested*/}
                                        {/*>*/}
                                        {/*    {close => (*/}
                                        {/*        <Formik*/}
                                        {/*            initialValues={{*/}
                                        {/*                name: '',*/}
                                        {/*                email: '',*/}
                                        {/*                about: '',*/}
                                        {/*                formName: 'Ищем таланты'*/}
                                        {/*            }}*/}
                                        {/*            validate={values => {*/}
                                        {/*                const errors = {};*/}
                                        {/*                if (!values.name || values.name.length < 1) {*/}
                                        {/*                    errors.name = 'Обязательное поле';*/}
                                        {/*                }*/}
                                        {/*                if (!values.email || values.email.length < 1) {*/}
                                        {/*                    errors.email = 'Обязательное поле';*/}
                                        {/*                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {*/}
                                        {/*                    errors.email = 'Некорректный email адрес';*/}
                                        {/*                }*/}
                                        {/*                if (!values.about || values.about.length < 1) {*/}
                                        {/*                    errors.about = 'Обязательное поле';*/}
                                        {/*                }*/}
                                        {/*                return errors;*/}
                                        {/*            }}*/}
                                        {/*            onSubmit={(values, {setSubmitting, resetForm}) => {*/}
                                        {/*                setTimeout(() => {*/}
                                        {/*                    sendEmail(values);*/}
                                        {/*                    setSuccess(true);*/}
                                        {/*                    const formData = new FormData();*/}
                                        {/*                    for (const [key, value] of Object.entries(values)) {*/}
                                        {/*                        formData.append(key, value);*/}
                                        {/*                    }*/}

                                        {/*                    axios.post(`${apiUrl}/api/form/`, formData)*/}
                                        {/*                        .then((response) => {*/}
                                        {/*                        })*/}
                                        {/*                        .catch((error) => {*/}
                                        {/*                            console.log(error);*/}
                                        {/*                        });*/}
                                        {/*                    setSubmitting(false);*/}
                                        {/*                    resetForm();*/}
                                        {/*                }, 400);*/}
                                        {/*                setTimeout(() => {*/}
                                        {/*                    setSuccess(false);*/}
                                        {/*                    close()*/}
                                        {/*                }, 4554);*/}
                                        {/*            }}*/}
                                        {/*        >*/}
                                        {/*            {({*/}
                                        {/*                  values,*/}
                                        {/*                  errors,*/}
                                        {/*                  touched,*/}
                                        {/*                  handleChange,*/}
                                        {/*                  handleBlur,*/}
                                        {/*                  handleSubmit,*/}
                                        {/*                  isSubmitting,*/}
                                        {/*                  setFieldValue,*/}
                                        {/*              }) => (*/}

                                        {/*                <form className="form" onSubmit={handleSubmit}>*/}
                                        {/*                    <div className="form__inner"*/}
                                        {/*                         style={{display: success ? 'none' : 'block'}}>*/}
                                        {/*                        <div className="form__title">Заполните форму</div>*/}
                                        {/*                        <input type="hidden" name="formName"*/}
                                        {/*                               value="Ищем таланты"/>*/}
                                        {/*                        <div className="form__wrap">*/}
                                        {/*                            <div className="form__group">*/}
                                        {/*                                <div*/}
                                        {/*                                    className={`form__group ${errors.name && touched.name ? 'error' : ''}`}>*/}
                                        {/*                                    {values.name && <label htmlFor="name"*/}
                                        {/*                                                           className="form__label">Ваше*/}
                                        {/*                                        имя</label>}*/}
                                        {/*                                    <input type="text" name="name"*/}
                                        {/*                                           className="form__input"*/}
                                        {/*                                           onChange={handleChange}*/}
                                        {/*                                           value={values.name}*/}
                                        {/*                                           placeholder="Ваше имя"/>*/}
                                        {/*                                    <div*/}
                                        {/*                                        className="form__error">{errors.name && touched.name && errors.name}</div>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                            <div className="form__group">*/}
                                        {/*                                <div*/}
                                        {/*                                    className={`form__group ${errors.email && touched.email ? 'error' : ''}`}>*/}
                                        {/*                                    {values.email && <label htmlFor="email"*/}
                                        {/*                                                            className="form__label">E-mail</label>}*/}
                                        {/*                                    <input type="text" name="email"*/}
                                        {/*                                           className="form__input"*/}
                                        {/*                                           onChange={handleChange}*/}
                                        {/*                                           value={values.email}*/}
                                        {/*                                           placeholder="E-mail"/>*/}
                                        {/*                                    <div*/}
                                        {/*                                        className="form__error">{errors.email && touched.email && errors.email}</div>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                        </div>*/}
                                        {/*                        <div className="form__wrap">*/}
                                        {/*                            <div className="form__group">*/}
                                        {/*                                <div*/}
                                        {/*                                    className={`form__group ${errors.about && touched.about ? 'error' : ''}`}>*/}
                                        {/*                                    {values.about && <label htmlFor="about"*/}
                                        {/*                                                            className="form__label">О*/}
                                        {/*                                        себе</label>}*/}
                                        {/*                                    <textarea type="text" name="about"*/}
                                        {/*                                              className="form__textarea"*/}
                                        {/*                                              onChange={handleChange}*/}
                                        {/*                                              value={values.about}*/}
                                        {/*                                              placeholder="Расскажите кратко о себе"/>*/}
                                        {/*                                    <div*/}
                                        {/*                                        className="form__error">{errors.about && touched.about && errors.about}</div>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                        </div>*/}
                                        {/*                        <button type="submit"*/}
                                        {/*                                className='btn --dark --circle'>*/}
                                        {/*                            Отправить*/}
                                        {/*                        </button>*/}

                                        {/*                    </div>*/}
                                        {/*                    <div className="form__success"*/}
                                        {/*                         style={{display: success ? 'block' : 'none'}}>*/}
                                        {/*                        <div className="form__success-title">Заявка*/}
                                        {/*                            отправлена!*/}
                                        {/*                        </div>*/}
                                        {/*                        <div className="form__success-descr">Ожидайте, скоро мы*/}
                                        {/*                            с вами*/}
                                        {/*                            свяжемся*/}
                                        {/*                        </div>*/}
                                        {/*                    </div>*/}
                                        {/*                </form>*/}

                                        {/*            )}*/}
                                        {/*        </Formik>*/}
                                        {/*    )}*/}
                                        {/*</Popup>*/}

                                    </div>
                                </div>
                                <div className="info">
                                    <p className="l-textReg" dangerouslySetInnerHTML={{__html: descr}}>
                                    </p>
                                    {team.filter(team => team.name == "Вячеслав Брижань").map((team, index) => {
                                        return (
                                            <div className="worker">
                                                <img className="worker-img"
                                                     src={team.mainImg ? `${apiUrl}/uploads/${team.mainImg.filename}` : null}
                                                     alt=""/>
                                                <span>
                                                      <p className="m-text">{team.name}</p>
                                                    <p className="post s-text">{team.post}</p>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <div onClick={() => window.open('https://t.me/deusagency', '_blank')} className="btnTg hidden-desk"><p>Написать сообщение</p></div>
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