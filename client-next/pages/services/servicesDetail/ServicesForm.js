'use client'

import React, { useState } from 'react';
import axios from 'axios';
import './serviceDetail.scss';

const ServicesForm = () => {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

  const sendEmail = (values) => {
    console.log('Sending email with values:', values);
  };

  const sendLogsToServer = (log) => {
    console.log('Sending logs:', log);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);

    const values = {
      service: formData.get('service'),
      name: formData.get('name'),
      phone: formData.get('phone'),
    };

    axios.post(`${apiUrl}/api/form/`, formData)
      .then((response) => {
        sendLogsToServer('Письмо отправлено');
        setSuccess(true);
        sendEmail(values);
      })
      .catch((error) => {
        sendLogsToServer(error);
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
        form.reset();
      });

    setTimeout(() => {
      setSuccess(false);
    }, 4554);
  };

  const handleInput = (e) => {
    let input = e.target.value;

    // Удаляем все нецифровые символы, кроме '+'
    let numericInput = input.replace(/[^\d+]/g, '');

    // Применяем маску
    if (numericInput.length > 0) {
      if (!numericInput.startsWith('+7')) {
        numericInput = '+7' + numericInput.replace(/^7/, '');
      }

      // Форматируем номер телефона
      let formattedNumber = '+7';
      if (numericInput.length > 2) {
        formattedNumber += ' ' + numericInput.substring(2, 5);
      }
      if (numericInput.length > 5) {
        formattedNumber += ' ' + numericInput.substring(5, 8);
      }
      if (numericInput.length > 8) {
        formattedNumber += ' ' + numericInput.substring(8, 10);
      }
      if (numericInput.length > 10) {
        formattedNumber += ' ' + numericInput.substring(10, 12);
      }

      setPhoneNumber(formattedNumber);
    } else {
      setPhoneNumber('');
    }
  };
  return (
    <section className="services-form borderBlock padding whiteHeader">
      <h2 className="heading-secondary">Вам интересно, но нужно больше конкретики?</h2>
      <form className="services-form__form" onSubmit={handleSubmit}>
        <div className="services-form__title">Выберите услугу</div>
        <div className="services-form__radios">
            <div className='services-form__btns'>
                <div className='services-form__btn-wrap'>
                    <input  type="radio" id='services-form__btn-1' name="service" value="Дизайн" required />
                    <label className="services-form__btn" htmlFor='services-form__btn-1'>
                        Дизайн
                    </label>
                </div>
                <div className='services-form__btn-wrap'>
                    <input  id="services-form__btn-2" type="radio" name="service" value="Сайты и сервисы" />
                    <label htmlFor="services-form__btn-2" className="services-form__btn">
                        Сайты и сервисы
                    </label>
                </div>
                <div className='services-form__btn-wrap'>
                    <input  id="services-form__btn-3" type="radio" name="service" value="SEO" />
                    <label htmlFor="services-form__btn-3" className="services-form__btn">
                        SEO
                    </label>
                </div>
                <div className='services-form__btn-wrap'>
                    <input  id="services-form__btn-4" type="radio" name="service" value="Видеопродакшн" />
                    <label htmlFor="services-form__btn-4" className="services-form__btn">
                        Видеопродакшн
                    </label>
                </div>
                <div className='services-form__btn-wrap'>
                    <input  id="services-form__btn-5" type="radio" name="service" value="Контент-маркетинг" />
                    <label htmlFor="services-form__btn-5" className="services-form__btn">
                        Контент-маркетинг
                    </label>
                </div>
                <div className='services-form__btn-wrap'>
                    <input  id="services-form__btn-6" type="radio" name="service" value="Техническая поддержка" />
                    <label htmlFor="services-form__btn-6" className="services-form__btn">
                        Техническая поддержка
                    </label>
                </div>
            </div>
        </div>
        <input type="text" name="name" placeholder="Ваше имя"  />
        {/* <input type="tel" name="phone" placeholder="Номер телефона" pattern="[\d\+\-\(\) ]+" /> */}
            <input
            type="tel"
            name="phone"
            value={phoneNumber}
            onChange={handleInput}
            placeholder="Ваш  номер"
            />
        <button className="services-form__btn --accent" type="submit" disabled={submitting}>
          {submitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
        {success && <p>Форма успешно отправлена!</p>}
      </form>
    </section>
  );
};

export default ServicesForm;
