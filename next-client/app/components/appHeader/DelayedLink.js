/**
 Компонент DelayedLink является пользовательским компонентом ссылки, который задерживает навигацию на определенное время.
 Ссылка будет отображать состояние загрузки перед переходом по указанному URL.
 @param {string} href - URL для навигации
 @param {string} children - содержимое ссылки
 @param {function} onClick - необязательная функция для выполнения при клике
 @param {number} timeout - количество времени для задержки навигации в миллисекундах (по умолчанию 1000 мс)
 @param {boolean} isNav - логическое значение, определяющее, является ли ссылка активной (NavLink)
 @returns {JSX.Element} - компонент задержанной ссылки
 */

 import React from 'react';
 import Link from 'next/link';
 import { useRouter } from 'next/router';
 
 const DelayedLink = React.forwardRef((props, ref) => {
     const { href, children, onClick, timeout = 1000, isNav, disabled, className, activeClassName } = props;
 
     const router = useRouter();
 
     /**
      Обрабатывает щелчок по задержанной ссылке, устанавливает состояние загрузки и переходит после указанной задержки
      @param {event} e - событие щелчка
      */
     const handleLinkClick = (e) => {
         e.preventDefault();
         if (disabled) return;
 
         // Вы можете заменить это на состояние загрузки в вашем проекте
         console.log('Loading...');
         
         setTimeout(() => {
             router.push(href);
             if (!!onClick) {
                 onClick(e);
             }
         }, timeout);
     };
 
     const isActive = isNav && router.pathname === href;
 
     return (
         <>
             {disabled ? (
                 <div ref={ref} className={className} onClick={() => {}}>
                     {children}
                 </div>
             ) : (
                 <a
                     ref={ref}
                     href={href}
                     className={`${className || ''} ${isActive ? activeClassName : ''}`}
                     onClick={handleLinkClick}
                 >
                     {children}
                 </a>
             )}
         </>
     );
 });
 
 DelayedLink.displayName = 'DelayedLink';
 
 export default DelayedLink;
 
 /**
  Компонент DelayedNavLink является пользовательским компонентом NavLink, который использует компонент DelayedLink для задержки навигации на определенное время.
  NavLink будет отображать состояние загрузки перед переходом по указанному URL.
  @param {string} href - URL для навигации
  @param {string} children - содержимое NavLink
  @returns {JSX.Element} - компонент задержанной NavLink
  */
 const DelayedNavLink = (props) => {
     const { children } = props;
 
     return <DelayedLink {...props} isNav>{children}</DelayedLink>; // передача свойства isNav, чтобы указать, что это NavLink
 };
 
 export { DelayedNavLink }; // экспорт компонента DelayedNavLink для внешнего использования
 