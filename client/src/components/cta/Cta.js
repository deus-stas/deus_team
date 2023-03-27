import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import InputMask from "react-input-mask";

import './cta.scss'

import manager from '../../img/manager.png';

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
                            form.setFieldTouched(field.name, true);
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

const Cta = () => {

    return (
        <section className="cta">
            <div className="container">
                <div className="cta__wrap">
                    <h2 className="heading-secondary">Хотите обсудить проект?</h2>
                    <div className="cta__person">
                        <img src={manager} alt="Алена Фролова" className="cta__person-img" />
                        <div className="cta__person-descr">Павел Докторов — Менеджер проектов, ответит на ваши вопросы и организует встречу</div>
                    </div>
                    <div className="cta__f">
                        <Formik
                            initialValues={{ name: '', company: '', phone: '', email: '', about: '', file: '', ctaServices: [], budget: '' }}
                            validate={values => {
                                const errors = {};
                                console.log(values);
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
                                    setSubmitting(false);
                                    resetForm();
                                }, 400);
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
                                    <div className="form__title">Заполните форму</div>
                                    <div className="form__checks">
                                        <div className="form__checks-title">Услуги</div>
                                        <div className="form__checks-wrap">
                                            <Checkbox name="ctaServices" value="form-style" text="Фирменный стиль" />
                                            <Checkbox name="ctaServices" value="sites-services" text="Сайты и сервисы" />
                                            <Checkbox name="ctaServices" value="content-marketing" text="Контент - маркетинг" />
                                            <Checkbox name="ctaServices" value="seo" text="SEO - продвижение" />
                                            <Checkbox name="ctaServices" value="leads" text="Лидогенерация" />
                                            <Checkbox name="ctaServices" value="support" text="Поддержка и развитие" />
                                        </div>
                                        <div className="form__error">{errors.ctaServices && touched.ctaServices && errors.ctaServices}</div>
                                    </div>
                                    <div className="form__wrap">
                                        <div className="form__group">
                                            <input type="text" name="name" className="form__input" onChange={handleChange} value={values.name} placeholder="Ваше имя" />
                                            <div className="form__error">{errors.name && touched.name && errors.name}</div>
                                        </div>
                                        <div className="form__group">
                                            <input type="text" name="company" className="form__input" onChange={handleChange} value={values.company} placeholder="Ссылка на портфолио" />
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
                                                    checked={values.budget === "less200k"}
                                                    onChange={() => setFieldValue("budget", "less200k")}
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
                                                    checked={values.budget === "200k500k"}
                                                    onChange={() => setFieldValue("budget", "200k500k")}
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
                                                    checked={values.budget === "more1kk"}
                                                    onChange={() => setFieldValue("budget", "more1kk")}
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