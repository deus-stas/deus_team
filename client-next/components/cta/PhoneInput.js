import React, { useState, useEffect, useRef } from 'react';

const PhoneInput = ({ setFieldValue, value }) => {
  const [phone, setPhone] = useState('+7 (___) ___-__-__');
  const inputRef = useRef(null);

  const handleInput = (e) => {
    const input = e.target;
    // console.log('123213', e.target.value);
    let cursorPosition = input.selectionStart;
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
    
    console.log('value', value);
    let formattedValue = ''
    if(value !== 'undefined') {
      formattedValue = formatPhone(value);
    } else {
      formattedValue = formatPhone(e.target.value);
    }
    // const formattedValue = formatPhone(value);
    console.log('formattedValue', formattedValue);
    setPhone(formattedValue);

    // Передаем значение в Formik
    setFieldValue('phone', formattedValue);

    // Корректируем позицию курсора
    cursorPosition = getCursorPosition(formattedValue, cursorPosition);
    window.requestAnimationFrame(() => {
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
    });
  };

  const formatPhone = (value) => {
    console.log('value', value);
    let template = '+7 (___) ___-__-__';
    let index = 0;

    // Подставляем цифры вместо `_`
    const formatted = template.replace(/_/g, () => (index < value.length ? value[index++] : '_'));
    return formatted;
  };

  const getCursorPosition = (formattedValue, cursorPosition) => {
    let count = 0;
    for (let i = 0; i < formattedValue.length; i++) {
      if (formattedValue[i] === '_') {
        count++;
      }
      if (count === cursorPosition) {
        return i;
      }
    }
    return formattedValue.length;
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

  const handleFocus = () => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(5, 5); // Устанавливаем курсор после `+7 `
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(5, 5); // Устанавливаем курсор после `+7 ` при монтировании компонента
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      placeholder="Ваш номер"
      className="form__input m-text"
      style={{ caretColor: 'auto' }} // Скрываем курсор
    />
  );
};

export default PhoneInput;
