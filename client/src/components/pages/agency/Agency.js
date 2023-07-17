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

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';

const Agency = () => {

    const [awards, setAwards] = useState([]);
    const [diplomas, setDiplomas] = useState([]);
    const [raitings, setRaitings] = useState([]);
    const [clients, setClients] = useState([]);
    const [team, setTeam] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [showreels, setShowreels] = useState([]);
    const [success, setSuccess] = useState(false);

    const [current, setCurrent] = useState(4);
    const [total, setTotal] = useState(0);
    const [endSlider, setEndSlider] = useState(false);
    const [headerData, setHeaderData] = useState([]);



    useEffect(() => {
        axios.get(`${apiUrl}/api/headerData/`)
            .then((response) => {
                setHeaderData(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


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
        axios.get(`${apiUrl}/api/diplomas/`)
            .then((response) => {
                setDiplomas(response.data);
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
                console.log(response.data);
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
                console.log(response.data);
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

    const foundShowreel = showreels.find(showreel => showreel.mainShowreel === true);

    const sendEmail = async (values) => {
        try {
            const response = await axios.post(`${apiUrl}/api/mail`, values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="agency">

            <section className="agency-start">
                <div className="container">
                    <h1 className="heading-primary">Оказываем услуги, которые помогают нашим клиентам расти, открывать новые предприятия и масштабировать свой бизнес в цифровом пространстве.</h1>
                </div>
                {
                    foundShowreel ? <Showreel data={foundShowreel} key={foundShowreel.id} isMain={true} /> : null
                }
            </section>

            <section className="agency-about">
                <div className="container">
                    <h2 className="heading-secondary">Об агентстве</h2>
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
                        {/* <Link className="btn --circle --orange">Презентация агентства</Link> */}
                        {
                            headerData && headerData.presentation ? 
                            <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`} target='_blank' rel="noopener noreferrer"  className="btn --circle --orange">Презентация агентства</a> :
                            <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' rel="noopener noreferrer"  className="btn --circle --orange">Презентация агентства</a>
                        }
                    </div>
                    <div className="agency-about__showreels hidden-desktop hidden-mobile">
                        {
                            showreels ? showreels.map(showreel => {
                                return(
                                    showreel.mainShowreel === false || showreel.mainShowreel === "false" ? 
                                     <Showreel data={showreel} key={showreel.id} isMain={false}/> : null
                                )
                            }) : null
                        }
                    </div>
                </div>
            </section>
            {
                diplomas && (diplomas[0] ? diplomas[0].controlVisibility : null) ? <section className="agency-benefits" id="diplomas">
                    <div className="container">
                        <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                            <TabList className="agency-benefits__info">
                                <h2 className="heading-secondary">Дипломы и бейжи</h2>
                                <div className="agency-benefits__info-wrap">
                                    {
                                        diplomas.map(diploma => {
                                            return (
                                                <Tab className="agency-benefits__info-btn" key={diploma.id}>
                                                    <img src={diploma.image ? `${apiUrl}/uploads/${diploma.image.filename}` : null} alt={diploma.name} />
                                                    {diploma.name} <sup>{diploma.diplomaProject.length}</sup>
                                                </Tab>
                                            )
                                        })
                                    }
                                </div>
                            </TabList>
                            <div className="agency-benefits__tabs">
                                {
                                    diplomas.map(diploma => {
                                        return (
                                            <TabPanel className="agency-benefits__content" key={diploma.id}>
                                                <div className="agency-benefits__content-wrap">
                                                    {
                                                        diploma.diplomaProject.map((project, i) => {
                                                            return (
                                                                <div className="agency-benefits__item" key={i}>
                                                                    <div className="agency-benefits__name">{project.diplomaName}</div>
                                                                    <div className="agency-benefits__descr">{project.diplomaPlace}</div>
                                                                    <div className="agency-benefits__year">{project.diplomaYear}</div>
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
                    : null
            }
            {
                awards && (awards[0] ? awards[0].controlVisibility : null) ? <section className="agency-benefits" id="awards">
                    <div className="container">
                        <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                            <TabList className="agency-benefits__info">
                                <h2 className="heading-secondary">Награды</h2>
                                <div className="agency-benefits__info-wrap">
                                    {
                                        awards.map(award => {
                                            const awardProjectCount = award.awardProject.reduce((count, element) => {
                                                if (element.awardControlVisibility === 'true') {
                                                    return count + 1;
                                                }
                                                return count;
                                            }, 0);
                                        
                                            return (
                                                <Tab className="agency-benefits__info-btn" key={award.id}>
                                                    <img src={award.image ? `${apiUrl}/uploads/${award.image.filename}` : null} alt={award.name} />
                                                    {award.name} <sup>{awardProjectCount}</sup>
                                                </Tab>
                                            );
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
                                                                project.awardControlVisibility === 'true' ?
                                                                <div className="agency-benefits__item" key={i}>
                                                                    <div className="agency-benefits__name">{project.awardName}</div>
                                                                    <div className="agency-benefits__descr">{project.awardPlace}</div>
                                                                    <div className="agency-benefits__year">{project.awardYear}</div>
                                                                </div> : null
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
                    : null
            }


            {
                raitings && (raitings[0] ? raitings[0].controlVisibility : null) ? <section className="agency-benefits">
                    <div className="container">
                        <Tabs className="agency-benefits__wrap" selectedTabClassName="active">
                            <TabList className="agency-benefits__info">
                                <h2 className="heading-secondary">Рейтинги</h2>
                                <div className="agency-benefits__info-wrap">
                                    {
                                        raitings.map(raiting => {
                                            const raitingProjectCount = raiting.raitingProject.reduce((count, element) => {
                                                if (element.raitingControlVisibility === 'true') {
                                                    return count + 1;
                                                }
                                                return count;
                                            }, 0);
                                            return (
                                                <Tab className="agency-benefits__info-btn" key={raiting.id}>
                                                    <img src={raiting.image ? `${apiUrl}/uploads/${raiting.image.filename}` : null} alt={raiting.name} />
                                                    {raiting.name} <sup>{raitingProjectCount}</sup>
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
                                                                project.raitingControlVisibility === 'true' ?
                                                                <div className="agency-benefits__item" key={i}>
                                                                    <div className="agency-benefits__name">{project.raitingPlace}</div>
                                                                    <div className="agency-benefits__descr">{project.raitingName}</div>
                                                                    <div className="agency-benefits__year">{project.raitingYear}</div>
                                                                </div> : null
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
                                vacancies.length ?
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
                                            initialValues={{ name: '', link: '', phone: '', email: '', about: '', file: '', formName: 'Ищем таланты' }}
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
                                                    <div className="form__inner" style={{ display: success ? 'none' : 'block' }}>
                                                        <div className="form__title">Заполните форму</div>
                                                        <input type="hidden" name="formName" value="Ищем таланты" />
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
                                                    </div>
                                                    <div className="form__success" style={{ display: success ? 'block' : 'none' }}>
                                                        <div className="form__success-title">Заявка отправлена!</div>
                                                        <div className="form__success-descr">Ожидайте, скоро мы с вами свяжемся</div>
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

            <Cta formName={'tender'} />

            <SectionSocial />

        </main>
    )

}

export default Agency;