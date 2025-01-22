import React, { useState } from 'react';

const PhoneInput = ({ setFieldValue, value }) => {
  const [phone, setPhone] = useState('+7 (___) ___-__-__');

  const handleInput = (e) => {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    let value = phone.replace(/\D/g, ''); // Удаляем все символы, кроме цифр

    // Убираем первые две цифры (постоянная часть маски `+7`)
    value = value.slice(1);

    const newInput = e.target.value.replace(/\D/g, '').slice(1); // Новый ввод без +7
    if (newInput.length < value.length) {
      // Если удаление
      value = value.slice(0, -1);
    } else {
      // Если добавление
      value += newInput[newInput.length - 1];
    }

    if (value.length > 10) value = value.slice(0, 10); // Ограничение длины до 10 цифр

    // Форматируем значение
    const formattedValue = formatPhone(value);
    setPhone(formattedValue);

    // Передаем значение в Formik
    setFieldValue('phone', formattedValue);

    // Восстанавливаем позицию курсора
    window.requestAnimationFrame(() => {
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
    });
  };

  const formatPhone = (value) => {
    let template = '+7 (___) ___-__-__';
    let index = 0;

    // Подставляем цифры вместо `_`
    const formatted = template.replace(/_/g, () => (index < value.length ? value[index++] : '_'));
    return formatted;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Останавливаем стандартное удаление

      const value = phone.replace(/\D/g, '').slice(1); // Оставляем только редактируемые цифры
      const newValue = value.slice(0, -1); // Удаляем последнюю цифру
      const formattedValue = formatPhone(newValue);
      setPhone(formattedValue);
      setFieldValue('phone', formattedValue); // Обновляем значение в Formik
    }

    const allowedKeys = ['Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(e.key)) return;

    // Блокируем ввод нецифровых символов
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      placeholder="Ваш номер"
      className="form__input m-text"
    />
  );
};

export default PhoneInput;