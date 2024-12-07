'use client'; // Указывает, что этот компонент должен рендериться на клиенте

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Используем Link из Next.js для навигации
// import Image from 'next/image'; // Для оптимизации изображений
// import { useRouter } from 'next/navigation'; // Аналог useNavigate из React Router
import { useSelector } from 'react-redux'; // Подключение к Redux-хранилищу
import RetryImage from '../../helpers/RetryImage';
import { Icon } from '../icon/Icon';
import { gotoAnchor } from '../anchors';
import useMobile from '../useMobile';
// import { selectHeaderDataAndServices } from '../../components/selector';
import {setIsLoadingMainPageEvent} from "../../axios";

import './appHeader.scss';

const apiUrl = ''; // Укажите URL вашего API

const AppHeader = () => {
  // Состояния для управления поведением компонента
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  const { isTablet, isDesktop, isMobile, isLaptop } = useMobile(); // Кастомный хук для определения устройства
  const { headerData, services } = useSelector((state) => ({
    headerData: state.app.headerData,
    services: state.app.services,
  }));

const handleHeaderColor = (header, headerMob, menu) => {
  [header, headerMob, menu].filter(Boolean).forEach((el) => {
      el.style.pointerEvents = "none";
      // const isWhite = document.elementFromPoint(40, el.offsetTop + el.offsetHeight / 2).closest(".whiteHeader");
      // isWhite ? el.classList.add("white") : el.classList.remove("white");
      el.style.pointerEvents = "";
  });
};

useEffect(() => {
  let id;
  const handleScroll = () => {
      clearTimeout(id);
      id = setTimeout(() => {
          let header = document.querySelector(".header");
          let headerMob = document.querySelector(".headerMob");
          let menu = document.querySelector(".activeMenu");
          handleHeaderColor(header, headerMob, menu);
      }, 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
      window.removeEventListener("scroll", handleScroll);
  };
}, [menu]);

useEffect(() => {
  const styles = {
      wide: { width: '100%' },
      // narrowly: { width: `${window.innerWidth * 0.85 / 10}rem` },
      narrowly: { 
          width:
              window.innerWidth > 1120
              ? '1120px'
              : `${(window.innerWidth * 0.85) / 10}rem`,
      },

      up: { transform: 'translateY(-30rem)' },
      down: { transform: 'translateY(0)' },
      padding: { padding: '2rem 3rem' },
      noPadding: { padding: '0' },
      bgColor: {
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), linear-gradient(0deg, rgba(5, 5, 5, 0.1), rgba(5, 5, 5, 0.1)), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))'                
      },
      transparentBg: { background: '' },
      transparentBgWithOpacity: { background: '#FFFFFFE5' }
  };

  const header = document.querySelector('.header');
  const headerWrap = document.querySelector('.header__wrap');

  if (menu) {
      headerWrap.style.width = styles.wide.width;
      headerWrap.style.padding = styles.noPadding.padding;
      header.style.transform = styles.down.transform;
      headerWrap.style.background = styles.transparentBg.background;

      const burgerBtn = document.querySelector('.header__burger'); 
      burgerBtn.addEventListener('click', () => {
          if (window.scrollY > 0) {
              headerWrap.style.width = styles.narrowly.width;
              headerWrap.style.padding = styles.padding.padding;
              headerWrap.style.background = styles.bgColor.background;
          }
      })
      
  }

  const handleScroll = () => {
      const scrolled = window.scrollY;
      const header = document.querySelector('.header');
      const headerWrap = document.querySelector('.header__wrap');

      if (!!header || !!headerWrap) {
          if (!!menu) { // если меню открыто
              headerWrap.style.width = styles.wide.width;
              headerWrap.style.padding = styles.noPadding.padding;
              header.style.transform = styles.down.transform;
          } else { // если меню закрыто
              if (scrolled === 0) {
                  headerWrap.style.width = styles.wide.width;
                  headerWrap.style.padding = styles.noPadding.padding;
                  header.style.transform = styles.down.transform;
                  headerWrap.style.background = styles.transparentBg.background;
              } else if (scrolled < prevScroll) {
                  header.style.transform = styles.down.transform;
              } else if (scrolled > 500) {
                  header.style.transform = styles.up.transform;
              } else if (scrolled > 0 && scrolled < 500) {
                  headerWrap.style.width = styles.narrowly.width;
                  headerWrap.style.padding = styles.padding.padding;
                  headerWrap.style.background = styles.bgColor.background;
              }
          }

          setPrevScroll(scrolled);
      }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
      window.removeEventListener('scroll', handleScroll);
  };
}, [menu, prevScroll]);


useEffect(() => {
  setIsLoadingMainPageEvent(true)
  const handleLoad = (e) => {
      if (e.detail.isLoading !== isLoading) {
          setIsLoading(e.detail.isLoading);
      }
  };

  window.addEventListener('isLoadingMainPage', handleLoad);
  return () => {
      window.removeEventListener('isLoadingMainPage', handleLoad);
  };
}, []);

useEffect(() => {
  if (menu) {
      document.body.style.overflow = 'hidden';
  } else {
      document.body.style.overflow = '';
  }

  return () => {
      document.body.style.overflow = '';
  };
}, [menu]);



const closeMenu = (e) => {
  if (!isDesktop) {
      setMenu(!menu);
  }
};

  const navLink = (
    <nav className={`header__nav m-text ${visible ? '' : 'hidden'}`}>
        <ul className={`header__nav-list ${isDesktop ? 'm-text' : isTablet && 'heading-secondary'}`}>
            <li className={`header__nav-item hover-flip ${isDesktop ? 'hover-flip' : ''}`}>
                <Link onClick={closeMenu}  href="/agency">
                    <span data-hover="Агентство">Агентство</span>
                </Link>
            </li>
            <div style={{position: "relative"}}>
                <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                    <Link onClick={closeMenu} href="/services">
                        <span data-hover="Услуги">Услуги</span>
                    </Link>
                </li>
                <div className="xs-text services-count">{services.length}</div>
            </div>

            <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                <Link onClick={closeMenu} href="/projects">
                    <span data-hover="Проекты">Проекты</span>
                </Link>
            </li>
            <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                <Link onClick={closeMenu} href="/news">
                    <span data-hover="Блог">Блог</span>
                </Link>
            </li>
            <li className={`header__nav-item ${isDesktop ? 'hover-flip' : ''}`}>
                <Link onClick={closeMenu} href="/contacts">
                    <span data-hover="Контакты">Контакты</span>
                </Link>
            </li>
        </ul>
    </nav>
)
  

//   {console.log('Подставить даынные',!isLoading, headerData)}

  useEffect(() => {
    setIsLoadingMainPageEvent(true)
    const handleLoad = (e) => {
      if (e.detail.isLoading !== isLoading) {
        setIsLoading(e.detail.isLoading);
       
        }
    };

    window.addEventListener('isLoadingMainPage', handleLoad);
    return () => {
        window.removeEventListener('isLoadingMainPage', handleLoad);
    };
}, []);

  
  return (
    <>
      
      {/* {!isLoading && headerData && */}
      {true && true &&
            <>
                <header className={`header`}>
                    <div className="container">
                        <div className="header__wrap">
                            <Link href="/" className='header__logo'>
                                <Icon icon="logo" viewBox="0 0 67 30"/>
                            </Link>
                            {isDesktop && (<>{navLink}</>)}
                            <span className="header-nav"
                                  style={{
                                      display: "flex",
                                      gap: "10px",
                                      justifyContent: "flex-end",
                                      alignItems: 'center'
                                  }}>
                                {isMobile ? null : <>
                                {
                                    headerData && headerData.phone &&
                                    (
                                        <a className={`menu-contacts ${menu ? 'hidden' : ''}`} href={`tel:${headerData.phone}`}>
                                            <div >
                                                <Icon icon="telephone" viewBox="0 0 18 18"/>
                                            </div>
                                        </a>
                                    )
                                }

                                    <Link href="/contacts"
                                                  className={`header__discuss ${menu ? 'hidden' : ''}`}
                                                  datahash="contactUs"
                                                  onClick={(e) => gotoAnchor(e)}>
                                        <span className="header__discuss-flex">
                                          {!!headerData?.headerPhoto &&
                                              <RetryImage datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                          src={`${apiUrl}/uploads/${headerData.headerPhoto?.filename}`}
                                                          alt="Обсудить проект" className="img"/>
                                          }
                                            <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                  className="m-text text">Обсудить проект
                                            <Icon icon="arrowRight" viewBox="0 0 24 24"/>
                                        </div>
                                        </span>

                                    </Link>
                                </>}
                                <div className={`header__burger hidden-desktop  ${menu ? 'activeMenu' : ''}`}
                                      onClick={() => {
                                          setMenu(!menu)
                                      }}>
                                    {menu ?
                                        <Icon icon="close" viewBox="0 0 24 24"/>
                                        :
                                        <Icon icon="dots" viewBox="0 0 24 24"/>
                                    }
                                </div>
                            </span>

                        </div>
                    </div>
                </header>

                <div className={`header-conatiner hidden-desktop `}>
                    <header className={`headerMob ${menu ? 'headerMob-active' : ''}`}>
                        <div className="headerMob-top">
                            <div className={`menu ${menu ? 'activeMenu' : ''}`}>
                                <div className={`menu-wrap ${menu ? 'menu-wrap-active' : ''}`}>

                                    {(isLaptop || isTablet || isMobile) && (<>{navLink}</>)}

                                    <div className="flex-wrap">
                                        <Link href="/contacts" className="header__discuss" datahash="contactUs"
                                                      onClick={(e) => {
                                                          setMenu(false)
                                                          gotoAnchor(e)
                                                      }}>
                                            <span className="header__discuss-flex">
                                          {!!headerData?.headerPhoto &&
                                              <RetryImage datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                          src={`${apiUrl}/uploads/${headerData.headerPhoto?.filename}`}
                                                          alt="Обсудить проект" className="img"/>
                                          }
                                                <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                      className="m-text text">Обсудить проект
                                            <Icon icon="arrowRight" viewBox="0 0 24 24"/>
                                        </div>
                                        </span>
                                        </Link>

                                        {
                                            headerData && headerData.phone &&
                                            (
                                                <a className="menu-contacts menu-contacts__menuSize"
                                                    href={`tel:${headerData.phone}`}>
                                                    <div>
                                                        <Icon icon="telephone" viewBox="0 0 18 18"/>
                                                    </div>
                                                </a>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

            </>
        }
    </>
  );
};

  export default AppHeader;
  
  // export default connect((state) => ({
  //   headerData: state.app.headerData,
  //   services: state.app.services,
  // }))(AppHeader);