import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import InputMask from "react-input-mask";
import axios from 'axios'
import { useState } from 'react';

import './cta.scss'

import manager from '../../img/manager.png';
import tender from '../../img/tender.png';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';

function Checkbox(props) {
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label className="form__checks-label">
                    <input
                        {...field}
                        type="checkbox"
                        checked={field.value.includes(props.value)}
                        onChange={() => {
                            const set = new Set(field.value);
                            if (set.has(props.value)) {
                                set.delete(props.value);
                            } else {
                                set.add(props.value);
                            }
                            form.setFieldValue(field.name, (Array.from(set)));
                        }}
                    />
                    <div className="form__checks-c">
                        <div className="form__checks-text">
                            {props.text}
                        </div>
                    </div>
                </label>
            )}
        </Field>
    );
}

const Cta = (props) => {

    const { formName } = props;
    const [success, setSuccess] = useState(false);

    const sendEmail = async (values) => {
        try {
            const response = await axios.post(`${apiUrl}/api/mail`, values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="cta">
            <div className="container">
                <div className="cta__wrap">
                    <h2 className="heading-secondary">{formName === 'tender' ? 'Позвать в тендер' : 'Хотите обсудить проект?'}</h2>
                    <div className="cta__person">
                        <img src={formName === 'tender' ? tender : manager} alt={formName === 'tender' ? 'Позвать в тендер' : 'Хотите обсудить проект?'} className="cta__person-img" />
                        <div className="cta__person-descr">
                            {
                                formName === 'tender' ? 'Алена Фролова — тендерный специалист, ответит на ваши вопросы и организует встречу'
                                    : 'Павел Докторов — Менеджер проектов, ответит на ваши вопросы и организует встречу'
                            }
                        </div>
                    </div>
                    <div className="cta__f">
                        <Formik
                            initialValues={{ name: '', company: '', phone: '', email: '', about: '', file: '', ctaServices: [], budget: '', formName: formName === 'tender' ? 'Тендер' : 'Обсудить проект' }}
                            validate={values => {
                                const errors = {};
                                if (!values.name || values.name.length < 2) {
                                    errors.name = 'Обязательное поле';
                                }
                                if (!values.company || values.company.length < 2) {
                                    errors.company = 'Обязательное поле';
                                }
                                if (!values.phone || values.phone.indexOf("_") !== -1) {
                                    errors.phone = 'Обязательное поле';
                                }
                                if (!values.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
                                    errors.email = 'Обязательное поле';
                                }
                                if (!values.about || values.about.length < 2) {
                                    errors.about = 'Обязательное поле';
                                }
                                if (values.ctaServices.length === 0) {
                                    errors.ctaServices = 'Обязательное поле';
                                }
                                if (!values.budget.length) {
                                    errors.budget = 'Обязательное поле';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    console.log(values);
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
                                }, 5000);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                            }) => (

                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form__inner" style={{ display: success ? 'none' : 'block' }}>
                                        <input type="hidden" name="formName" value={formName === 'tender' ? 'Тендер' : 'Обсудить проект'} />
                                        <div className="form__title">Заполните форму</div>
                                        <div className="form__checks">
                                            <div className="form__checks-title">Услуги</div>
                                            <div className="form__checks-wrap">
                                                <Checkbox name="ctaServices" value="Фирменный стиль" text="Фирменный стиль" />
                                                <Checkbox name="ctaServices" value="Сайты и сервисы" text="Сайты и сервисы" />
                                                <Checkbox name="ctaServices" value="Контент - маркетинг" text="Контент - маркетинг" />
                                                <Checkbox name="ctaServices" value="SEO - продвижение" text="SEO - продвижение" />
                                                <Checkbox name="ctaServices" value="Лидогенерация" text="Лидогенерация" />
                                                <Checkbox name="ctaServices" value="Поддержка и развитие" text="Поддержка и развитие" />
                                            </div>
                                            <div className="form__error">{errors.ctaServices && touched.ctaServices && errors.ctaServices}</div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <input type="text" name="name" className="form__input" onChange={handleChange} value={values.name} placeholder="Ваше имя" />
                                                <div className="form__error">{errors.name && touched.name && errors.name}</div>
                                            </div>
                                            <div className="form__group">
                                                <input type="text" name="company" className="form__input" onChange={handleChange} value={values.company} placeholder="Компания" />
                                                <div className="form__error">{errors.company && touched.company && errors.company}</div>
                                            </div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <InputMask type="text" name="phone" className="form__input" onChange={handleChange} value={values.phone} placeholder="Номер телефона" mask="+7 (999) 999-99-99" />
                                                <div className="form__error">{errors.phone && touched.phone && errors.phone}</div>
                                            </div>
                                            <div className="form__group">
                                                <input type="text" name="email" className="form__input" onChange={handleChange} value={values.email} placeholder="E-mail" />
                                                <div className="form__error">{errors.email && touched.email && errors.email}</div>
                                            </div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <textarea type="text" name="about" className="form__textarea" onChange={handleChange} value={values.about} placeholder="Расскажите кратко о себе" />
                                                <div className="form__error">{errors.about && touched.about && errors.about}</div>
                                            </div>
                                        </div>

                                        <div className="form__file">
                                            <label className="form__file-label">
                                                <div className="form__file-btn">Прикрепить файл</div>
                                                <input id="file" name="file" type="file" onChange={(event) => {
                                                    console.log(event.currentTarget.files[0]);
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                }} />
                                            </label>
                                            {
                                                values.file ?
                                                    <div className="form__file-f">
                                                        {values.file.name}
                                                        <div className="form__file-delete" onClick={(event) => {
                                                            setFieldValue("file", null);
                                                        }}>&times;</div>
                                                    </div>
                                                    : null
                                            }
                                        </div>

                                        <div className="form__checks">
                                            <div className="form__checks-title">Бюджет</div>
                                            <div className="form__checks-wrap">
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "менее 200к ₽"}
                                                        onChange={() => setFieldValue("budget", "менее 200к ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            менее 200к ₽
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "200к—500к ₽"}
                                                        onChange={() => setFieldValue("budget", "200к—500к ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            200к—500к ₽
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "от 1 млн ₽"}
                                                        onChange={() => setFieldValue("budget", "от 1 млн ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            от 1 млн ₽
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="form__error">{errors.budget && touched.budget && errors.budget}</div>
                                        </div>

                                        <button type="submit" className='btn --orange --circle'>
                                            Отправить
                                        </button>
                                        <div className="form__check">
                                            Нажимая кнопку, вы соглашаетесь с нашей политикой в отношении обработки <Link to="#">персональных данных</Link>
                                        </div>
                                    </div>
                                    <div className="form__success" style={{ display: success ? 'block' : 'none' }}>
                                        <div className="form__success-title">Заявка отправлена!</div>
                                        <div className="form__success-descr">Ожидайте, скоро мы с вами свяжемся</div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Cta;