import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { setIsLoadingMainPageEvent } from "../../axios";

const DelayedLink = React.forwardRef((props, ref) => {
    const { to, children, onClick, timeout = 1000, isNav, disabled } = props;

    const navigate = useNavigate();

    /**
     Обрабатывает щелчок по задержанной ссылке, устанавливает состояние загрузки и переходит после указанной задержки
     @param {event} e - событие щелчка
     */
    const handleLinkClick = (e) => {
        e.preventDefault();
        setIsLoadingMainPageEvent(true);
        setTimeout(() => {
            navigate(to);
            if (onClick) {
                onClick(e);
            }
        }, timeout);
    };

    return (
        <>
            {disabled ? (
                <div {...props} onClick={() => {}}>{children}</div>
            ) : (
                <>
                    {isNav ? (
                        <NavLink {...props} ref={ref} onClick={handleLinkClick}>
                            {children}
                        </NavLink>
                    ) : (
                        <Link {...props} ref={ref} onClick={handleLinkClick}>
                            {children}
                        </Link>
                    )}
                </>
            )}
        </>
    );
});

// Установка displayName для DelayedLink
DelayedLink.displayName = "DelayedLink";

export default DelayedLink;

/**
 Компонент DelayedNavLink является пользовательским компонентом NavLink, который использует компонент DelayedLink для задержки навигации на определенное время.
 NavLink будет отображать состояние загрузки перед переходом по указанному URL.
 @param {string} to - URL для навигации
 @param {string} children - содержимое NavLink
 @returns {JSX.Element} - компонент задержанной NavLink
 */
const DelayedNavLink = (props) => {
    const { children } = props;

    return <DelayedLink {...props} isNav>{children}</DelayedLink>; // передача свойства isNav, чтобы указать, что это NavLink
};

// Установка displayName для DelayedNavLink
DelayedNavLink.displayName = "DelayedNavLink";

export { DelayedNavLink }; // экспорт компонента DelayedNavLink для внешнего использования
