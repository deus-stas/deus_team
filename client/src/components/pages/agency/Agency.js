import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Marquee from "react-fast-marquee";
import { Formik } from 'formik';
import InputMask from "react-input-mask";

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';
import Cta from '../../cta/Cta';

import './agency.scss';

import productVideo from '../../../img/webhands.mp4';
import logoChoice from '../../../img/logo-choice.svg';
import teamImg from '../../../img/team-img.png';

const Agency = () => {

    return (
        <main className="agency">

            <section className="agency-start">
                <div className="container">
                    <h1 className="heading-primary">Оказываем услуги, которые помогают нашим клиентам расти, открывать новые предприятия и масштабировать свой бизнес в цифровом пространстве.</h1>
                </div>
                <Link to="#" className="agency-start__video js-cursor-play">
                    <video autoPlay loop muted playsInline>
                        <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                    </video>
                </Link>
            </section>

            <section className="agency-about">
                <div className="container">
                    <h2 className="heading-secondary">Об агенстве</h2>
                    <div className="agency-about__wrap">
                        <div className="agency-about__descr">Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в единую систему для получения максимальной эффективности для вашего бизнеса</div>
                        <div className="agency-about__adv">
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Работаем с 2016 года
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Входим в ТОП-40 креативности студий
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Комплексные решения для различных индустрий
                            </div>
                        </div>
                        <Link className="btn --circle --orange">Презентация агентства</Link>
                    </div>
                    <div className="agency-about__showreels">
                        <Showreel />
                        <Showreel />
                    </div>
                </div>
            </section>

            <section className="agency-benefits" id="awards">
                <div className="container">
                    <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                        <TabList className="agency-benefits__info">
                            <h2 className="heading-secondary">Награды</h2>
                            <Tab className="agency-benefits__info-btn">
                                <Icon icon="w" />
                                awwwards <sup>2</sup>
                            </Tab>
                            <Tab className="agency-benefits__info-btn">
                                <Icon icon="cssda" />
                                css design awards <sup>5</sup>
                            </Tab>
                        </TabList>
                        <div className="agency-benefits__tabs">
                            <TabPanel className="agency-benefits__content">
                                <div className="agency-benefits__content-wrap">
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Valvoline Russia</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Choice Construction</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Lucky</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Dentline</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Digital Finance</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="agency-benefits-content">
                                <div className="agency-benefits__content-wrap">
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Valvoline Russia</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Digital Finance</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Choice Construction</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Lucky</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">Dentline</div>
                                        <div className="agency-benefits__descr">3 место — Special Kudos</div>
                                        <div className="agency-benefits__year">2020</div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </section>

            <section className="agency-benefits">
                <div className="container">
                    <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                        <TabList className="agency-benefits__info">
                            <h2 className="heading-secondary">Награды</h2>
                            <Tab className="agency-benefits__info-btn">
                                <Icon icon="rating" />
                                ratingruneta<sup>6</sup>
                            </Tab>
                        </TabList>
                        <div className="agency-benefits__tabs">
                            <TabPanel className="agency-benefits__content">
                                <div className="agency-benefits__content-wrap">
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                    <div className="agency-benefits__item">
                                        <div className="agency-benefits__name">14 место</div>
                                        <div className="agency-benefits__descr">Россия: рейтинг креативности веб-студий</div>
                                        <div className="agency-benefits__year">2022</div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </section>

            <section className="agency-clients" id="clients">
                <div className="container">
                    <h2 className="heading-secondary">Наши клиенты</h2>
                </div>
                <Marquee speed="50">
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                </Marquee>
                <Marquee direction='right' speed="50">
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                </Marquee>
                <Marquee speed="20">
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                    <img className='agency-clients__img' src={logoChoice} alt="Choice Estate" />
                </Marquee>
            </section>

            <section className="agency-team" id="team">
                <div className="container">
                    <div className="agency-team__wrap">
                        <div className="agency-team__t">
                            <h2 className="heading-secondary">Команда мечты</h2>
                            <div className="agency-team__t-content">
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                                <div className="agency-team__t-item">
                                    <div className="agency-team__t-name">Сергей Разинкин</div>
                                    <img src={teamImg} alt="Сергей Разинкин" className="agency-team__t-img" />
                                    <div className="agency-team__t-post">Frontend разработчик</div>
                                </div>
                            </div>
                        </div>
                        <div className="agency-team__content">
                            <h2 className="heading-secondary">Ищем таланты</h2>
                            <div className="agency-team__talent">
                                <div className="agency-team__talent-wrap">
                                    <Link to="#" className="agency-team__talent-item">
                                        <div className="agency-team__talent-name">Бизнес-аналитик</div>
                                        <div className="agency-team__talent-descr">Middle/Middle+. Фултайм. Офис или удаленно</div>
                                        <div className="agency-team__talent-icon">
                                            <Icon icon="corner-arr" />
                                        </div>
                                    </Link>
                                    <Link to="#" className="agency-team__talent-item">
                                        <div className="agency-team__talent-name">Ведущий дизайнер</div>
                                        <div className="agency-team__talent-descr">Фултайм. Офис или удаленно</div>
                                        <div className="agency-team__talent-icon">
                                            <Icon icon="corner-arr" />
                                        </div>
                                    </Link>
                                    <Link to="#" className="agency-team__talent-item">
                                        <div className="agency-team__talent-name">3D-дизайнер</div>
                                        <div className="agency-team__talent-descr">Middle/Middle+. Фултайм. Офис или удаленно</div>
                                        <div className="agency-team__talent-icon">
                                            <Icon icon="corner-arr" />
                                        </div>
                                    </Link>
                                    <Link to="#" className="agency-team__talent-item">
                                        <div className="agency-team__talent-name">Продюсер проектов</div>
                                        <div className="agency-team__talent-descr">Фултайм. Офис или удаленно</div>
                                        <div className="agency-team__talent-icon">
                                            <Icon icon="corner-arr" />
                                        </div>
                                    </Link>
                                </div>
                                <Link to="#" className="btn --orange --circle">
                                    Отправить резюме
                                </Link>
                            </div>
                            <div className="agency-team__feedback">
                                <Formik
                                    initialValues={{ name: '', link: '', phone: '', email: '', about: '', file: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.name || values.name.length < 2) {
                                            errors.name = 'Обязательное поле';
                                        }
                                        if (!values.link || values.link.length < 2) {
                                            errors.link = 'Обязательное поле';
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
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        setTimeout(() => {
                                            console.log(values);
                                            alert(JSON.stringify(values, null, 2));
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
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        setFieldValue,
                                    }) => (

                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="form__title">Заполните форму</div>
                                            <div className="form__wrap">
                                                <div className="form__group">
                                                    <input type="text" name="name" className="form__input" onChange={handleChange} value={values.name} placeholder="Ваше имя" />
                                                    <div className="form__error">{errors.name && touched.name && errors.name}</div>
                                                </div>
                                                <div className="form__group">
                                                    <input type="text" name="link" className="form__input" onChange={handleChange} value={values.link} placeholder="Ссылка на портфолио" />
                                                    <div className="form__error">{errors.link && touched.link && errors.link}</div>
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
                                                <input id="file" name="file" type="file" onChange={(event) => {
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                }} />
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
                </div>
            </section>

            <SectionProducts />

            <Cta />

            <SectionSocial />

        </main>
    )

}

export default Agency;