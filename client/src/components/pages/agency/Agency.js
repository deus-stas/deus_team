import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Marquee from "react-fast-marquee";
import { Formik } from 'formik';
import InputMask from "react-input-mask";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper";

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';
import Cta from '../../cta/Cta';

import "swiper/css";
import "swiper/css/grid";
import './agency.scss';

import productVideo from '../../../img/webhands.mp4';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';

const Agency = () => {

    const [awards, setAwards] = useState([]);
    const [raitings, setRaitings] = useState([]);
    const [clients, setClients] = useState([]);
    const [team, setTeam] = useState([]);
    const [vacancies, setVacancies] = useState([]);

    const [current, setCurrent] = useState(4);
    const [total, setTotal] = useState(0);
    const [endSlider, setEndSlider] = useState(false);


    useEffect(() => {
        axios.get(`${apiUrl}/api/awards/`)
            .then((response) => {
                setAwards(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/raitings/`)
            .then((response) => {
                setRaitings(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/clients/`)
            .then((response) => {
                setClients(response.data);
                setTotal(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/team/`)
            .then((response) => {
                setTeam(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/vacancies/`)
            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const slideChange = (slider) => {
        if (slider.touches.diff > 0) {
            if (endSlider) {
                setCurrent(current - 1);
                setEndSlider(false);
            } else {
                setCurrent(current - 2);
            }
        } else {
            if (current + 1 === total) {
                setCurrent(total);
                setEndSlider(true);
            } else {
                setCurrent(current + 2);
            }
        }
    }

    const amountSlides = Math.round(clients.length / 3);

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
                                Работаем<br /> с 2016 года
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Входим в ТОП-40<br /> креативности студий
                            </div>
                            <div className="agency-about__adv-item">
                                <Icon icon="star"></Icon>
                                Комплексные решения<br /> для различных индустрий
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

            {
                awards ? <section className="agency-benefits" id="awards">
                    <div className="container">
                        <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                            <TabList className="agency-benefits__info">
                                <h2 className="heading-secondary">Награды</h2>
                                <div className="agency-benefits__info-wrap">
                                    {
                                        awards.map(award => {
                                            return (
                                                <Tab className="agency-benefits__info-btn" key={award.id}>
                                                    <img src={award.image ? `${apiUrl}/uploads/${award.image.filename}` : null} alt={award.name} />
                                                    {award.name} <sup>{award.awardProject.length}</sup>
                                                </Tab>
                                            )
                                        })
                                    }
                                </div>
                            </TabList>
                            <div className="agency-benefits__tabs">
                                {
                                    awards.map(award => {
                                        return (
                                            <TabPanel className="agency-benefits__content" key={award.id}>
                                                <div className="agency-benefits__content-wrap">
                                                    {
                                                        award.awardProject.map((project, i) => {
                                                            return (
                                                                <div className="agency-benefits__item" key={i}>
                                                                    <div className="agency-benefits__name">{project.awardName}</div>
                                                                    <div className="agency-benefits__descr">{project.awardPlace}</div>
                                                                    <div className="agency-benefits__year">{project.awardYear}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabPanel>
                                        )
                                    })
                                }
                            </div>
                        </Tabs>
                    </div>
                </section>
                    : null}


            {
                raitings ? <section className="agency-benefits">
                    <div className="container">
                        <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                            <TabList className="agency-benefits__info">
                                <h2 className="heading-secondary">Награды</h2>
                                <div className="agency-benefits__info-wrap">
                                    {
                                        raitings.map(raiting => {
                                            return (
                                                <Tab className="agency-benefits__info-btn" key={raiting.id}>
                                                    <img src={raiting.image ? `${apiUrl}/uploads/${raiting.image.filename}` : null} alt={raiting.name} />
                                                    {raiting.name} <sup>{raiting.raitingProject.length}</sup>
                                                </Tab>
                                            )
                                        })
                                    }
                                </div>
                            </TabList>
                            <div className="agency-benefits__tabs">
                                {
                                    raitings.map(raiting => {
                                        return (
                                            <TabPanel className="agency-benefits__content" key={raiting.id}>
                                                <div className="agency-benefits__content-wrap">
                                                    {
                                                        raiting.raitingProject.map((project, i) => {
                                                            return (
                                                                <div className="agency-benefits__item" key={i}>
                                                                    <div className="agency-benefits__name">{project.raitingName}</div>
                                                                    <div className="agency-benefits__descr">{project.raitingPlace}</div>
                                                                    <div className="agency-benefits__year">{project.raitingYear}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabPanel>
                                        )
                                    })
                                }
                            </div>
                        </Tabs>
                    </div>
                </section> : null
            }


            {
                clients ? <section className="agency-clients" id="clients">
                    <div className="container">
                        <div className="agency-clients__head">
                            <h2 className="heading-secondary">Наши клиенты</h2>
                            <div className="agency-clients__pag hidden-desktop">
                                <div className="agency-clients__pag-current">{current}</div>
                                <div className="agency-clients__pag-sep">/</div>
                                <div className="agency-clients__pag-total">{total}</div>
                            </div>
                        </div>
                    </div>
                    <div className="agency-clients__marquee hidden-mobile">

                        <Marquee speed="40">
                            {
                                clients.map((client, i) => {
                                    if (i < amountSlides) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `${apiUrl}/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                        <Marquee direction='right' speed="40">
                            {
                                clients.map((client, i) => {
                                    if (i > amountSlides - 1 && i < amountSlides * 2) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `${apiUrl}/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                        <Marquee speed="20">
                            {
                                clients.map((client, i) => {
                                    if (i > amountSlides * 2 - 1) {
                                        return (
                                            <img className='agency-clients__img' src={client.image ? `${apiUrl}/uploads/${client.image.filename}` : null} alt={client.name} key={client.id} />
                                        )
                                    } else return null
                                })
                            }
                        </Marquee>
                    </div>
                    <Swiper
                        slidesPerView={2}
                        grid={{
                            rows: 2,
                        }}
                        spaceBetween={10}
                        modules={[Grid]}
                        onSlideChange={(e) => slideChange(e)}
                        className="agency-clients__slider hidden-desktop">
                        {
                            clients.map(client => {
                                return (
                                    <SwiperSlide className="agency-clients__item" key={client.id}><img className='agency-clients__img' src={client.image ? `${apiUrl}/uploads/${client.image.filename}` : null} alt={client.name} /></SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </section> : null
            }

            <section className="agency-team" id="team">
                <div className="container">
                    <div className="agency-team__wrap">
                        <div className="agency-team__t">
                            <h2 className="heading-secondary">Команда мечты</h2>
                            <div className="agency-team__t-content">
                                {
                                    team ? team.map(item => {
                                        return (
                                            <div className="agency-team__t-item" key={item.id}>
                                                <div className="agency-team__t-name">{item.name}</div>
                                                <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null} alt={item.name} className="agency-team__t-img" />
                                                <div className="agency-team__t-post">{item.post}</div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                        <div className="agency-team__content">
                            <h2 className="heading-secondary">Ищем таланты</h2>
                            {
                                vacancies ?
                                    <div className="agency-team__talent">
                                        <div className="agency-team__talent-wrap">

                                            {vacancies.map(item => {
                                                return (
                                                    <Link to={item.link} className="agency-team__talent-item" key={item.id}>
                                                        <div className="agency-team__talent-name">{item.name}</div>
                                                        <div className="agency-team__talent-descr">{item.lvl}. {item.place}. {item.time}</div>
                                                        <div className="agency-team__talent-icon">
                                                            <Icon icon="corner-arr" />
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    : <div className="agency-team__feedback">
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
                            }


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