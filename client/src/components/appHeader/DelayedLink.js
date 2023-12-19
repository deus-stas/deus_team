/**
 Компонент DelayedLink является пользовательским компонентом ссылки, который задерживает навигацию на определенное время.
 Ссылка будет отображать состояние загрузки перед переходом по указанному URL.
 @param {string} to - URL для навигации
 @param {string} children - содержимое ссылки
 @param {function} onClick - необязательная функция для выполнения при клике
 @param {number} timeout - количество времени для задержки навигации в миллисекундах (по умолчанию 1000 мс)
 @param {boolean} isNav - логическое значение, определяющее, является ли ссылка NavLink или обычной Link
 @returns {JSX.Element} - компонент задержанной ссылки
 */

/**
 Компонент DelayedNavLink является пользовательским компонентом NavLink, который задерживает навигацию на определенное время.
 NavLink будет отображать состояние загрузки перед переходом по указанному URL.
 @param {string} to - URL для навигации
 @param {string} children - содержимое NavLink
 @returns {JSX.Element} - компонент задержанной NavLink
 */

import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {setIsLoadingMainPageEvent} from "../../axios";

const DelayedLink = (props) => {
    const {to, children, onClick, timeout = 1000, isNav} = props

    const navigate = useNavigate()

    /**
     Обрабатывает щелчок по задержанной ссылке, устанавливает состояние загрузки и переходит после указанной задержки
     @param {event} e - событие щелчка
     */
    const handleLinkClick = (e) => {
        e.preventDefault();
        setIsLoadingMainPageEvent(true);
        setTimeout(() => {
            navigate(to)
            if (!!onClick) {
                onClick(e)
            }
        }, timeout);
    }

    return <>
        {isNav ?
            <NavLink {...props} onClick={handleLinkClick}>{children}</NavLink> :
            <Link {...props} onClick={handleLinkClick}>{children}</Link>
        }
    </>;
}

export default DelayedLink;

/**
 Компонент DelayedNavLink является пользовательским компонентом NavLink, который использует компонент DelayedLink для задержки навигации на определенное время.
 NavLink будет отображать состояние загрузки перед переходом по указанному URL.
 @param {string} to - URL для навигации
 @param {string} children - содержимое NavLink
 @returns {JSX.Element} - компонент задержанной NavLink
 */
const DelayedNavLink = (props) => {
    const {children} = props

    return <DelayedLink {...props} isNav>{children}</DelayedLink>; // передача свойства isNav, чтобы указать, что это NavLink
}

export {DelayedNavLink} // экспорт компонента DelayedNavLink для внешнего использования
