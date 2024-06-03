import React from "react";
import { useEffect, useState, useRef } from "react";
import axios, { setIsLoadingMainPageEvent } from "./../../../axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import SwiperCore, { Grid, Autoplay } from "swiper";

import { Icon } from "../../icon/Icon";
import SectionProducts from "../../sectionProducts/SectionProducts";
import SectionSocial from "../../sectionSocial/SectionSocial";
import Showreel from "../../showreel/Showreel";

import "swiper/css";
import "swiper/css/grid";
import "./mainPage.scss";

import arrorLink from "../../../img/icon/arrow-link.svg";
import arrorGo from "../../../img/icon/arrow-go.svg";
import arrorGo2 from "../../../img/icon/arrow-go2.svg";
import mainBannerLine from "../../../img/main-banner-line.svg";
import mainBannerLineMob from "../../../img/main-banner-line-mob.svg";
import TypeWriterText from "../../typeWriterText";
import { connect } from "react-redux";
import { useInView } from "react-intersection-observer";
import RoundButton from "../../animation/roundButton";
import ScrollUp from "../../animation/scrollUp";
import { isVisible } from "@testing-library/user-event/dist/utils";
import RetryImage from "../../../helpers/RetryImage";
import manager from "../../../img/manager.png";
import * as ReactDom from "react-dom/server";
import { goProjects, gotoAnchor } from "../../anchors";
import DelayedLink from "../../appHeader/DelayedLink";
import FadeInOnScroll from "../../animation/fadeInOnScroll";
import { Box } from "@material-ui/core";

SwiperCore.use([Autoplay]);

const apiUrl = "";

const colourStyles = {
  control: (styles) => ({}),
  valueContainer: (styles) => ({}),
  placeholder: (styles) => ({}),
  indicatorSeparator: (styles) => ({ display: "none" }),
  indicatorsContainer: (styles) => ({}),
  menu: (styles) => ({}),
  menuList: (styles) => ({}),
  option: (styles, state) => ({
    color: state.isSelected ? "#FF4D01" : "inherit",
  }),
};

const classes = {
  control: (state) => (state.menuIsOpen ? "select active" : "select"),
  valueContainer: () => "select__value",
  indicatorsContainer: () => "select__icon",
  menu: () => "select__dropdown",
  option: () => "select__item",
  input: () => "select__search",
};

const MainPage = (props) => {
  const [isActive, setIsActive] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [allNewsTags, setAllNewsTags] = useState(new Set());
  const [working, setWorking] = useState([]);
  const [showreels, setShowreels] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [mainPage, setMainPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionsTheme, setOptionsTheme] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const onAcc = ({ e, index }) => {
    let accItem = e.target.closest(".tab-parent");
    setIsActive((prevState) => {
      const newActiveState = [...prevState];
      newActiveState[index] = !newActiveState[index];
      return newActiveState;
    });
    if (accItem.classList.contains("active")) {
      accItem.classList.remove("active");
      accItem.classList.remove("wow");
    } else {
      accItem.classList.add("active");
      accItem.classList.add("wow");
      accItem.classList.add("fadeInDown");
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/newsTags`)
      .then((tagResponse) => {
        const tags = tagResponse.data.reduce((obj, tag) => {
          obj[tag._id] = tag.name; // Предполагая, что _id - это идентификатор тега
          return obj;
        }, {});

        axios
          .get(`${apiUrl}/api/news`)
          .then((response) => {
            const news = response.data.map((newsItem) => {
              newsItem.newsTags = tags[newsItem.newsTags];
              return newsItem;
            });
            setNews(news);
            setAllNewsTags(new Set(news.flatMap((news) => news.newsTags)));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/working/`)
      .then((response) => {
        setWorking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/showreels/`)
      .then((response) => {
        setShowreels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/mainPage/`)
      .then((response) => {
        setMainPage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/projects/`)
      .then((response) => {
        setAllProjects(response.data);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/themes/`)
      .then((response) => {
        let projectOptionsTheme = [];
        response.data.forEach((item, i) => {
          const { id, name } = item;
          projectOptionsTheme[i] = { value: id, label: name };
        });
        setOptionsTheme(projectOptionsTheme);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/types/`)
      .then((response) => {
        let projectOptionsType = [];
        response.data.forEach((item, i) => {
          const { id, name } = item;
          projectOptionsType[i] = { value: id, label: name };
        });
        setOptionsType(projectOptionsType);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsLoadingMainPageEvent(true);

    const handleLoad = (e) => {
      if (e.detail.isLoading !== isLoading) {
        setIsLoading(e.detail.isLoading);
      }
    };

    window.addEventListener("isLoadingMainPage", handleLoad);
    return () => {
      window.removeEventListener("isLoadingMainPage", handleLoad);
    };
  }, []);

  const handleThemeChange = (selectedOption) => {
    setSelectedTheme(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const filteredProjects = allProjects
    .filter((project) => {
      return (
        (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
        (selectedType ? project.projectType === selectedType.value : true) &&
        project.visibility
      );
    })
    .slice(0, 3);

  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    videoRefs.current[index].play();
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    video.pause();
    video.currentTime = 0; // Rewind the video to the beginning
  };

  const addVideoRef = (ref) => {
    videoRefs.current.push(ref);
  };

  const sortColumns = (...elements) => {
    const columns = elements.reduce(
      (acc, element, index) => {
        const columnIndex = index % 3;
        acc[columnIndex].push(element);
        return acc;
      },
      [[], [], []]
    );

    return columns;
  };

  const double = <Icon icon="arrowGo" viewBox="0 0 30 31" />;

  const mainShowreel = showreels.find((showreel) => showreel.mainShowreel === true);

  const { services, headerData, team } = props;
  services.sort((a, b) => a.position - b.position);

  const mainBannerRef = useRef(null);

  useEffect(() => {
    function handler() {
      if (mainBannerRef.current) mainBannerRef.current.style.top = -window.scrollY / 2 + "px";
    }
    document.addEventListener("scroll", handler);

    return () => document.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {!isLoading && (
        <main className="main">
          <FadeInOnScroll>
            <section className="main-banner" ref={mainBannerRef}>
              <div className="container">
                <div className="main-banner__wrap">
                  <div className="main-banner__content">
                    <h4 className="heading-fourth">Digital агенство</h4>
                    <h1 className="heading-primary">

                      <span>Помогаем выделиться</span>
                      <span> вашему бренду в </span>
                      <span className="last-grid">
                        цифровом пространстве
                        <DelayedLink
                          to={`/contacts`}
                          style={{ marginTop: "2rem" }}
                          className="btn --black hidden-mobile"
                          datahash="contactUs"
                          onClick={(e) => gotoAnchor(e)}
                        >
                          Стать клиентом
                        </DelayedLink>
                        <p className="p-style wh-30">
                          быть <span className="p-style-black">заметнее</span> в цифровом пространстве
                        </p>
                      </span>
                    </h1>
                    <DelayedLink
                      to={`/contacts`}
                      className="btn --black hidden-desktop"
                      datahash="contactUs"
                      onClick={(e) => gotoAnchor(e)}
                    >
                      Стать клиентом
                    </DelayedLink>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          <div style={{ background: "white", position: "relative", zIndex: 1 }}>
            <FadeInOnScroll>
              <section className="main-showreel whiteHeader">
                {mainShowreel && <Showreel data={mainShowreel} isMain={true} />}
              </section>
            </FadeInOnScroll>

            <section className="main-agency">
              <div className="container">
                {/*<div className="main-agency__wrap">*/}
                {/*    {filteredProjects.map((item, index) => {*/}
                {/*        const arrow = index !== 1;*/}
                {/*        const allServices = index == 1 && services.map(item => <div className="item-service p-style">{item.name}<img src={arrorGo} alt={'go'}/></div>);*/}
                {/*        const num = index < 9 ? '0' + (index + 1) : index + 1;*/}
                {/*        const name = (item.name).slice(0, 10);*/}
                {/*        const descr = index == 1? <div className="item__service">{allServices}</div> : <div className="item__descr">50+{item.descrProject} </div>*/}
                {/*        return (*/}
                {/*            <div className="main-agency__item" key={item.id}>*/}
                {/*                <img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн"*/}
                {/*                     className="main-agency__item-img"/>*/}
                {/*                <div className="main-agency__item-header">*/}
                {/*                    <div className="main-agency__item-header__num">{num}</div>*/}
                {/*                    <div className="item__text heading-secondary">{name}</div>*/}
                {/*                </div>*/}
                {/*                {descr}*/}
                {/*                {!!arrow &&*/}
                {/*                    <img className="main-agency__item-arrow" src={arrorLink} alt={'go'}/>}*/}
                {/*            </div>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</div>*/}
                <FadeInOnScroll>
                  <div className="main-agency__wrap whiteHeader">
                    {mainPage
                      ? mainPage.map((item, index) => {
                          const arrow = index !== 1;
                          const workers = index == 0 && (
                            <>
                              {team
                                .filter((item) => item.mainControl)
                                .map((item) => {
                                  return (
                                    <img
                                      src={`${apiUrl}/uploads/${item.mainImg.filename}`}
                                      alt=""
                                      className="person-img"
                                    />
                                  );
                                })
                                .slice(0, 3)}
                            </>
                          );

                          const allServices =
                            index == 1 &&
                            props.services
                              .filter((service, index) => service.isInvisible)
                              .map((service, index) => (
                                <DelayedLink to={`/services/${service.path}`}>
                                  <div className="main-agency__item-link p-style">
                                    <p>{service.name}</p>
                                    <div className="hover-flip-arrow">
                                      <span>
                                        {" "}
                                        <Icon icon="arrowGo" viewBox="0 0 30 31" />
                                        <div className="hover-double">{double}</div>
                                      </span>
                                    </div>
                                  </div>
                                </DelayedLink>
                              ));
                          const num = index < 9 ? "0" + (index + 1) : index + 1;
                          const name = item.name;
                          const descr =
                            index == 1 ? (
                              <div className="main-agency__item-service">{allServices}</div>
                            ) : (
                              <div className={`main-agency__item__descr${index == 0 ? "1" : ""}`}>
                                {workers}
                                {item.textList !== "undefined" && item.textList && (
                                  <div className="main-agency__item__descr-flex">
                                    {item.textList.map((item, ind) => (
                                      <div className={index == 2 ? "main-agency__item__descr-flex__item" : ""}>
                                        {item.textItem}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          return (
                            <div className="main-agency__item">
                              <a href={`${item.pageURL}`} target="_blank" rel="noreferrer">
                                {/*<img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн"*/}
                                {/*     className="main-agency__item-img"/>*/}
                                {item.mainVideoFile &&
                                  item.mainVideoFile !== "undefined" &&
                                  item.mainVideoFile !== "null" && (
                                    <video className="main-agency__item-img" autoPlay loop muted playsInline>
                                      <source
                                        src={`${apiUrl}/uploads/${item.mainVideoFile.filename}`}
                                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                                      />
                                    </video>
                                  )}

                                <div className="main-agency__item-header">
                                  <span className="main-agency__item-header__num">
                                    <div className="num_flex">{num}</div>
                                  </span>
                                  <div className="main-agency__item-header__text heading-secondary">{name}</div>
                                </div>
                                {descr}
                                {!!arrow && (
                                  <span className="main-agency__item-arrow">
                                    <div className="hover-flip-circle">
                                      <span>
                                        <Icon icon="arrowGo" viewBox="0 0 30 31" />
                                        <div className="hover-circle">{double}</div>
                                      </span>
                                    </div>
                                  </span>
                                )}
                              </a>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </FadeInOnScroll>
                <FadeInOnScroll>
                  <div className="main-projects__wrap">
                    <span className="main-projects__item">
                      <h2 className="heading-secondary sticky-h2">Проекты по индустриям</h2>
                    </span>
                    <div className="main-projects__item">
                      <p className="p-style">
                        Мы работаем с ведущими компаниями и брендами из различных отраслей.
                        <br /> При создании могут решаться уникальные задачи, но это всегда проекты с характером
                      </p>
                      <div className="main-projects__item-flex">
                        {optionsTheme
                          ? optionsTheme.map((project, index) => {
                              const filterProjects = allProjects.filter(
                                (item) => item.projectTheme === project.value && item.visibility
                              );
                              const totalSum =
                                filterProjects.length < 10 ? "0" + filterProjects.length : filterProjects.length;
                              return (
                                <DelayedLink to={`/projects?theme=${project.value}`} onClick={(e) => gotoAnchor(e)}>
                                  <div className="main-projects__item-flex__inner">
                                    <div className="type-name">
                                      <p className="hover custom-cursor-link" datahash="projectNav">
                                        {project.label}
                                      </p>
                                    </div>
                                    <div className="main-agency__item-header__num">
                                      <span className="num_flex">{totalSum}</span>
                                    </div>
                                  </div>
                                </DelayedLink>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>
            </section>

            {working ? (
              <FadeInOnScroll>
                <section className="main-working whiteHeader">
                  <div className="container">
                    <h3 className="heading-secondary">Работаем сейчас над</h3>
                    <div className="main-working__wrap">
                      {working.map((item) => {
                        const fileUrl = item.file ? `${apiUrl}/uploads/${item.file.filename}` : null;
                        const isVideo = item.file ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.file.filename) : false;
                        const isImage = item.file ? /\.(jpeg|jpg|gif|png)$/i.test(item.file.filename) : false;

                        return (
                          <div className="main-working__item" key={item.id}>
                            <div className="main-working__img-wrap">
                              {isVideo && (
                                <video
                                  autoPlay
                                  muted
                                  playsInline
                                  src={fileUrl}
                                  alt={item.name}
                                  className="main-working__img"
                                  loop
                                />
                              )}
                              {isImage && <img src={fileUrl} alt={item.name} className="main-working__img" />}
                            </div>
                            <p className="main-working__name">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </FadeInOnScroll>
            ) : null}

            <FadeInOnScroll>
              <section className="main-news">
                <div className="container">
                  <div className="main-news__wrap">
                    <div className="main-news__info">
                      <span>
                        <h2 className="heading-secondary sticky-h2 hover-flip">
                          <DelayedLink to={`/news`}>
                            <span data-hover="Журнал">Журнал</span>
                          </DelayedLink>
                        </h2>
                      </span>
                      <div className="main-news__info-wrap">
                        {[...allNewsTags].map((tag, i) => (
                          <DelayedLink to={`/news?newsTags=${tag}`} className="main-news__info-item " key={i}>
                            <p className="p-style-black">#{tag}</p>
                            <div className="hover-flip-arrow">
                              <span>
                                {" "}
                                <Icon icon="arrowGo" viewBox="0 0 30 31" />
                                <div className="hover-double">{double}</div>
                              </span>
                            </div>
                          </DelayedLink>
                        ))}
                      </div>
                    </div>
                    <div className="main-news__content">
                      {news
                        .map((item) => {
                          const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                          const isVideo = item.image
                            ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename)
                            : false;
                          const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;
                          const shouldAutoPlay = item.mainControl;

                          return (
                            <DelayedLink to={`/news/${item.urlName}`} className="main-news__item" key={item.id}>
                              <div className="main-news__img-wrap gradient">
                                {isVideo && (
                                  <video
                                    autoPlay={shouldAutoPlay}
                                    muted
                                    playsInline
                                    src={fileUrl}
                                    alt={item.name}
                                    className="main-news__img"
                                    loop
                                  />
                                )}
                                {isImage && <img src={fileUrl} alt={item.name} className="main-news__img" />}
                              </div>
                              <div className="main-news__text">
                                <div className="main-news__tag">#{item.newsTags}</div>
                              </div>
                              <div className="main-news__descr">
                                <div className="main-news__name">{item.name}</div>
                              </div>
                              <div className="main-agency__item-arrow">
                                <div className="hover-flip-circle">
                                  <span>
                                    <Icon icon="arrowGo" viewBox="0 0 30 31" />
                                    <div className="hover-circle">{double}</div>
                                  </span>
                                </div>
                              </div>
                            </DelayedLink>
                          );
                        })
                        .slice(0, 2)}
                    </div>
                  </div>
                </div>
              </section>
            </FadeInOnScroll>
          </div>
        </main>
      )}
    </>
  );
};

export default connect((state) => ({
  headerData: state.app.headerData,
  services: state.app.services,
  team: state.app.team,
}))(MainPage);
