import React, {useEffect, useState} from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../../axios'
import {useParams} from "react-router-dom";

import './projectDetail.scss'
import HelmetComponent from "../../../helmetComponent";
import SiteAndServices from "./detailPropsRender/SiteAndServices";
import VideoProduction from "./detailPropsRender/VideoProduction";
import TechSupport from "./detailPropsRender/TechSupport";
import SEO from "./detailPropsRender/SEO";
import { Icon } from "../../../icon/Icon";
import {debounce} from "@material-ui/core";
import ProjectNext from "../projectNext/ProjectNext";

const apiUrl = ''

const ProjectDetail = () => {

    const [detail, setDetail] = useState([]);
    const [types, setTypes] = useState([]);
    const [theme, setTheme] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();
    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/${id}`)
            .then((response) => {
                let dataDetail = {...response.data};
                let requests = [];

                if (response.data.taskPersons !== 'undefined' && response.data.taskPersons !== 'null') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.taskPersons}`)
                            .then((response) => {
                                dataDetail = {...dataDetail, taskPersons: response.data};
                            })
                    );
                }

                if (!!response.data.approachList) {
                    response.data.approachList.forEach((val, i) => {
                        if (!!val.approachPersons) {
                            requests.push(
                                axios.get(`${apiUrl}/api/persons/${val.approachPersons}`)
                                    .then((response) => {
                                        val.approachPersons = response.data
                                    })
                            );
                        }
                    })
                }

                if (!!response.data.approachListSecond) {
                    response.data.approachListSecond.forEach((val, i) => {
                        if (!!val.approachPersons) {
                            requests.push(
                                axios.get(`${apiUrl}/api/persons/${val.approachPersons}`)
                                    .then((response) => {
                                        val.approachPersons = response.data
                                    })
                            );
                        }
                    })
                }

                if (!!response.data.approachListThird) {
                    response.data.approachListThird.forEach((val, i) => {
                        if (!!val.approachPersons) {
                            requests.push(
                                axios.get(`${apiUrl}/api/persons/${val.approachPersons}`)
                                    .then((response) => {
                                        val.approachPersons = response.data
                                    })
                            );
                        }
                    })
                }

                if (response.data.approachPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.approachPersons}`)
                            .then((response) => {
                                dataDetail = {...dataDetail, approachPersons: response.data};
                            })
                    );
                }

                if (response.data.resultPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.resultPersons}`)
                            .then((response) => {
                                dataDetail = {...dataDetail, resultPersons: response.data};
                            })
                    );
                }

                Promise.all(requests)
                    .then(() => {
                        setDetail(dataDetail);

                    })
                    .then(()=>{
                        fetchThemeLabel(dataDetail).then((themeLabel) => setTheme(themeLabel));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(()=>{
        axios.get(`${apiUrl}/api/types/`)
            .then((res)=>{
                setTypes(res.data)
            })
    },[])

    const fetchThemeLabel = async (detail) => {
        try {
            const response = await axios.get(`${apiUrl}/api/themes/`);
            return response.data.find((theme) => theme.id === detail.projectTheme)?.name;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

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

    const typeRender = detail.projectType
    const findType = types.find((item)=> item._id === typeRender )
    const RenderFields = ({detail}) => {
        if(!!findType) {
            const fieldsMap = {
                'seo': (<SEO  detail={detail} />),
                'site-and-services': (<SiteAndServices  detail={detail} />),
                'tech-support': (<TechSupport  detail={detail} />),
                'video-production': (<VideoProduction  detail={detail}/>),
            };
            return fieldsMap[findType?.key] || <SiteAndServices  detail={detail} />;
        }

    };


    return (
        <>
            <HelmetComponent pageTitle={detail.seoTitle} pageKeywords={detail.seoKeywords}
                             pageDescription={detail.seoDescription}/>
            {!isLoading &&

                <main id="toUp" className="project">
                    {/*<Breadcrumbs/>*/}
                    <div className="container">
                        <section className="project-main">
                            <span className="project-maint__text">
                                <p className="breadcrumb m-text">{detail.date} • {detail.name}</p>
                                <h1 className="heading-primary"
                                    dangerouslySetInnerHTML={{__html: detail.descrProject}}></h1>
                            </span>

                            {detail.about !== 'undefined' ?
                                <div className="project-main__wrap borderBlock padding">
                                    <div className="project-main__subtitle heading-secondary">О клиенте</div>
                                    <div className="project-main__text">

                                        <div className="project-main__descr l-textReg" dangerouslySetInnerHTML={{__html: detail.about}}/>
                                        {/*{*/}
                                        {/*    detail.projectSite ? (*/}
                                        {/*        <div className="project-main__link">*/}
                                        {/*            <Link target="_blank"*/}
                                        {/*                  to={detail.projectURL}>{detail.projectSite}</Link>*/}
                                        {/*            <Icon icon="arr"/>*/}
                                        {/*        </div>*/}
                                        {/*    ) : null*/}
                                        {/*}*/}
                                        <div className="project-main__info">
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Клиент</p>
                                                <p className="m-text" dangerouslySetInnerHTML={{__html: detail.name}}/>
                                            </div>
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Отрасль</p>
                                                <p className="m-text">{theme}</p>
                                            </div>
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Продолжительность</p>
                                                <p className="m-text" dangerouslySetInnerHTML={{__html: detail.duration}}/>
                                            </div>
                                        </div>
                                    </div>

                                </div> : null}

                        </section>
                        {detail.bannerFirst ?
                            <section className="project-banner">
                                <BannerComponent banner={detail.bannerFirst} detail={detail}/>
                                </section>
                            : null
                        }

                        {/*{!!detail.taskDescr || !!detail.tasksList*/}
                        {/*    ?*/}
                        {/*    <div style={{background: detail.aimColor}}>*/}
                        {/*        <section style={{background: detail.aimColor}} className="project-goals">*/}
                        {/*            <div className="container">*/}
                        {/*                <div className="project-goals__wrap">*/}
                        {/*                    <h2 className="heading-secondary">Цели и задачи</h2>*/}
                        {/*                    <div className="project-goals__content">*/}
                        {/*                        <div className="project-goals__text">{detail.taskDescr}</div>*/}
                        {/*                        { !!detail.task &&*/}
                        {/*                            <div className="project-goals__person">*/}
                        {/*                                {detail.taskPersons && detail.taskPersons.name && detail.taskPersons.post ?*/}
                        {/*                                    <div className="project-goals__person-info">*/}
                        {/*                                    <div*/}
                        {/*                                        className="project-goals__person-name">{detail.taskPersons.name}{','}*/}
                        {/*                                    </div>*/}
                        {/*                                    <div*/}
                        {/*                                        className="project-goals__person-position">{detail.taskPersons.post} {'@ DEUS'}*/}
                        {/*                                    </div>*/}
                        {/*                                </div> : null}*/}
                        {/*                                <div className="project-goals__person-text">*/}
                        {/*                                    <div dangerouslySetInnerHTML={{__html: detail.task}}></div>*/}
                        {/*                                </div>*/}
                        {/*                                {detail.taskPersons.image ? <img*/}
                        {/*                                    src={`${apiUrl}/uploads/${detail.taskPersons.image.filename}`}*/}
                        {/*                                    alt={detail.taskPersons.name}*/}
                        {/*                                    className="project-goals__person-photo"/> : null}*/}
                        {/*                            </div>*/}
                        {/*                        }*/}

                        {/*                        {!!detail.tasksList && detail.tasksList !== 'undefined' && detail.tasksList !== null && detail.tasksList !== "null"?*/}
                        {/*                                <div>*/}
                        {/*                                    {*/}
                        {/*                                        detail.tasksList.map((item, index) => (*/}
                        {/*                                            <div>*/}
                        {/*                                                <div className="project-goals__tasks-item">*/}
                        {/*                                                    <div key={index}*/}
                        {/*                                                         style={{color: detail.aimColor === '#000000' ? '#ffffff' : '#000000'}}*/}
                        {/*                                                         dangerouslySetInnerHTML={{__html: item.tasksItem}}/>*/}
                        {/*                                                </div>*/}
                        {/*                                            </div>*/}
                        {/*                                        ))*/}
                        {/*                                    }*/}
                        {/*                                </div> : null*/}
                        {/*                        }*/}

                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </section>*/}
                        {/*    </div>*/}
                        {/*    : null*/}
                        {/*}*/}


                        {/*{*/}
                        {/*    detail.bannerSecondVideo && detail.bannerSecondVideo !== 'undefined' && detail.bannerSecondVideo !== 'null' ?*/}
                        {/*        <section className="project-banner">*/}
                        {/*            <div dangerouslySetInnerHTML={{__html: detail.bannerSecondVideo}}></div>*/}
                        {/*        </section>*/}
                        {/*        : detail.bannerSecond ?*/}
                        {/*            <BannerComponent banner={detail.bannerSecond} detail={detail}/>*/}
                        {/*            : null*/}
                        {/*}*/}

                        {/*{detail.bannerSeconds ?*/}
                        {/*    detail.bannerSeconds.filter(val => !!val).map((banner, index) =>*/}
                        {/*        <BannerComponent banner={banner} detail={detail}/>*/}
                        {/*    )*/}
                        {/*    : null*/}
                        {/*}*/}

                        {/*{!!detail.approachList && detail.approachList.filter(val => !!val.approachPersons && val.text !== '').map((val, index) =>*/}
                        {/*    <>*/}
                        {/*        <section style={{background: val.resultsColor}} className="project-results wow fadeIn"*/}
                        {/*                 data-wow-duration="0.5s"*/}
                        {/*                 data-wow-delay="0.1s"*/}
                        {/*                 data-wow-offset="100">*/}
                        {/*            <div className="container">*/}
                        {/*                <div className="project-results__wrap">*/}
                        {/*                    <h2 className="heading-secondary "*/}
                        {/*                        style={{color: val.resultsColor === '#000000' ? '#ffffff' : '#000000'}}>{val.title}</h2>*/}
                        {/*                    <div className="quote">*/}
                        {/*                        <div className="quote__box"*/}
                        {/*                             style={{background: val.resultsColor === '#000000' ? '#ffffff' : '#F3F4F4'}}>*/}
                        {/*                            <div className="quote__person">*/}
                        {/*                                {val.approachPersons.image ?*/}
                        {/*                                    <img*/}
                        {/*                                        src={`${apiUrl}/uploads/${val.approachPersons.image.filename}`}*/}
                        {/*                                        alt={val.approachPersons.name}*/}
                        {/*                                        className="quote__img"/> : null}*/}

                        {/*                                <div className="quote__person-text">*/}
                        {/*                                    {val.approachPersons.name}, <span>{val.approachPersons.post} @ DEUS</span>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                            <div className="quote__q" style={{color: val.resultTextColor}}*/}
                        {/*                                 dangerouslySetInnerHTML={{__html: val.text}}></div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </section>*/}
                        {/*        {!!val.imageI && !!detail.approachListFiles && !!detail.approachListFiles.find(file => file.originalname === val.imageI.title) &&*/}
                        {/*            <BannerComponent*/}
                        {/*                banner={detail.approachListFiles.find(file => file.originalname === val.imageI.title)}*/}
                        {/*                detail={detail}/>*/}
                        {/*        }*/}
                        {/*    </>*/}
                        {/*)*/}
                        {/*}*/}
                        {/*{detail.approach !== 'undefined' && detail.approachPersons && detail.approach !== '' ?*/}
                        {/*    <section className="project-results wow fadeIn"*/}
                        {/*             data-wow-duration="0.5s"*/}
                        {/*             data-wow-delay="0.1s"*/}
                        {/*             data-wow-offset="100">*/}
                        {/*        <div className="container">*/}
                        {/*            <div className="project-results__wrap">*/}
                        {/*                <h2 className="heading-secondary text-black">Подход</h2>*/}
                        {/*                <div className="quote">*/}
                        {/*                    <div className="quote__box">*/}
                        {/*                        <div className="quote__person">*/}
                        {/*                            {detail.approachPersons.image ? <img*/}
                        {/*                                src={`${apiUrl}/uploads/${detail.approachPersons.image.filename}`}*/}
                        {/*                                alt={detail.approachPersons.name} className="quote__img"/> : null}*/}

                        {/*                            <div className="quote__person-text">*/}
                        {/*                                {detail.approachPersons.name}, <span>{detail.approachPersons.post} @ DEUS</span>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="quote__q"*/}
                        {/*                             dangerouslySetInnerHTML={{__html: detail.approach}}></div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*    : null*/}
                        {/*}*/}

                        {/*{*/}
                        {/*    detail.bannerThirdVideo && detail.bannerThirdVideo !== 'undefined' && detail.bannerThirdVideo !== 'null' ?*/}
                        {/*        <section className="project-banner wow fadeIn"*/}
                        {/*                 data-wow-duration="0.5s"*/}
                        {/*                 data-wow-delay="0.1s"*/}
                        {/*                 data-wow-offset="100">*/}
                        {/*            <div dangerouslySetInnerHTML={{__html: detail.bannerThirdVideo}}></div>*/}
                        {/*        </section>*/}
                        {/*        : detail.bannerThird ?*/}
                        {/*            <BannerComponent banner={detail.bannerThird} detail={detail}/>*/}
                        {/*            : null*/}
                        {/*}*/}

                        {/*{detail.bannerThirds ?*/}
                        {/*    detail.bannerThirds.filter(val => !!val).map((banner, index) =>*/}
                        {/*        <BannerComponent banner={banner} detail={detail}/>*/}
                        {/*    )*/}
                        {/*    : null*/}
                        {/*}*/}

                        {/*{!!detail.approachListThird && detail.approachListThird.filter(val => !!val.approachPersons && val.text !== '')*/}
                        {/*    .map((val, index) =>*/}
                        {/*        <>*/}
                        {/*            <section className="project-results wow fadeIn"*/}
                        {/*                     data-wow-duration="0.5s"*/}
                        {/*                     data-wow-delay="0.1s"*/}
                        {/*                     data-wow-offset="100"*/}
                        {/*                     style={{background: val.resultsColor}}>*/}
                        {/*                <div className="container">*/}
                        {/*                    <div className="project-results__wrap">*/}
                        {/*                        <h2 className="heading-secondary"*/}
                        {/*                            style={{color: val.resultsColor === '#000000' ? '#ffffff' : '#000000'}}>{val.title}</h2>*/}
                        {/*                        <div className="quote">*/}
                        {/*                            <div className="quote__box"*/}
                        {/*                                 style={{background: val.resultsColor === '#000000' ? '#ffffff' : '#F3F4F4'}}>*/}
                        {/*                                <div className="quote__person">*/}
                        {/*                                    {val.approachPersons.image ?*/}
                        {/*                                        <img*/}
                        {/*                                            src={`${apiUrl}/uploads/${val.approachPersons.image.filename}`}*/}
                        {/*                                            alt={val.approachPersons.name}*/}
                        {/*                                            className="quote__img"/> : null}*/}

                        {/*                                    <div className="quote__person-text">*/}
                        {/*                                        {val.approachPersons.name}, <span>{val.approachPersons.post} @ DEUS</span>*/}
                        {/*                                    </div>*/}
                        {/*                                </div>*/}
                        {/*                                <div className="quote__q" style={{color: val.resultTextColor}}*/}
                        {/*                                     dangerouslySetInnerHTML={{__html: val.text}}></div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </section>*/}
                        {/*            {!!val.imageI && !!detail.approachListThirdFiles && !!detail.approachListThirdFiles.find(file => file.originalname === val.imageI.title) &&*/}
                        {/*                <BannerComponent*/}
                        {/*                    banner={detail.approachListThirdFiles.find(file => file.originalname === val.imageI.title)}*/}
                        {/*                    detail={detail}/>*/}
                        {/*            }*/}
                        {/*        </>*/}
                        {/*    )*/}
                        {/*}*/}


                        {/*{detail.body ?*/}
                        {/*    <section className="project-results wow fadeIn"*/}
                        {/*             data-wow-duration="0.5s"*/}
                        {/*             data-wow-delay="0.1s"*/}
                        {/*             data-wow-offset="100">*/}
                        {/*        <div className="container">*/}
                        {/*            <div className="project-results__wrap">*/}
                        {/*                <div className="project-results__text"*/}
                        {/*                     dangerouslySetInnerHTML={{__html: detail.body}}></div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*    : null}*/}

                        {/*{*/}
                        {/*    detail.workSteps && detail.workSteps !== 'undefined' && detail.workSteps !== null && detail.workSteps !== "null" && detail.workSteps.length ?*/}
                        {/*        <section style={{background: detail.workStepsColor}} className="project-steps wow fadeIn"*/}
                        {/*                 data-wow-duration="0.5s"*/}
                        {/*                 data-wow-delay="0.1s"*/}
                        {/*                 data-wow-offset="100">*/}
                        {/*            <div className="container">*/}
                        {/*                <h2 className="heading-secondary">{detail.workStepsHeader}</h2>*/}
                        {/*                {detail.workSteps.map((item, index) => (*/}
                        {/*                    <>*/}
                        {/*                        <div className="project-steps__text">{item.workStepsIntroText}</div>*/}
                        {/*                        <div key={index} className="project-steps__s">*/}
                        {/*                            <div className="project-steps__subtitle">{item.workStepsTitle}</div>*/}
                        {/*                            <div className="project-steps__content">*/}
                        {/*                                <>*/}
                        {/*                                    {!!item.workStepsItemTaskList && item.workStepsItemTaskList.map(val =>*/}
                        {/*                                        <div className="project-steps__adv">*/}
                        {/*                                            <div className="project-results__text"*/}
                        {/*                                                 dangerouslySetInnerHTML={{__html: val.workStepsItemTask}}></div>*/}
                        {/*                                        </div>*/}
                        {/*                                    )}*/}
                        {/*                                </>*/}
                        {/*                                <div className="project-steps__adv">*/}
                        {/*                                    <div className="project-results__text"*/}
                        {/*                                         dangerouslySetInnerHTML={{__html: item.workStepsItem}}></div>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </>*/}
                        {/*                ))*/}
                        {/*                }*/}
                        {/*            </div>*/}
                        {/*        </section> : null*/}
                        {/*}*/}

                        {/*{*/}
                        {/*    detail.bannerFourthVideo && detail.bannerFourthVideo !== 'undefined' && detail.bannerFourthVideo !== 'null' ?*/}
                        {/*        <section className="project-bannerwow fadeIn"*/}
                        {/*                 data-wow-duration="0.5s"*/}
                        {/*                 data-wow-delay="0.1s"*/}
                        {/*                 data-wow-offset="100">*/}
                        {/*            <div dangerouslySetInnerHTML={{__html: detail.bannerFourthVideo}}></div>*/}
                        {/*        </section>*/}
                        {/*        : detail.bannerFourth ?*/}
                        {/*            <BannerComponent banner={detail.bannerFourth} detail={detail}/>*/}
                        {/*            : null*/}
                        {/*}*/}

                        {/*{detail.bannerFourths ? (*/}
                        {/*    <>*/}
                        {/*        {detail.bannerFourths.filter(val => !!val).map((banner, index) => (*/}
                        {/*            <BannerComponent key={index} banner={banner} detail={detail}/>*/}
                        {/*        ))}*/}
                        {/*    </>*/}
                        {/*) : null}*/}

                        {/*{!!detail.approachListSecond && detail.approachListSecond.filter(val => !!val.approachPersons && val.text !== '')*/}
                        {/*    .map((val, index) =>*/}
                        {/*        <>*/}
                        {/*            <section className="project-results wow fadeIn"*/}
                        {/*                     data-wow-duration="0.5s"*/}
                        {/*                     data-wow-delay="0.1s"*/}
                        {/*                     data-wow-offset="100"*/}
                        {/*                     style={{background: val.resultsColor}}>*/}
                        {/*                <div className="container">*/}
                        {/*                    <div className="project-results__wrap">*/}
                        {/*                        <h2 className="heading-secondary"*/}
                        {/*                            style={{color: detail.resultsColor === '#000000' ? '#ffffff' : '#000000'}}>{val.title}</h2>*/}
                        {/*                        <div className="quote">*/}
                        {/*                            <div className="quote__box"*/}
                        {/*                                 style={{background: val.resultsColor === '#000000' ? '#ffffff' : '#F3F4F4'}}>*/}
                        {/*                                <div className="quote__person">*/}
                        {/*                                    {val.approachPersons.image ?*/}
                        {/*                                        <img*/}
                        {/*                                            src={`${apiUrl}/uploads/${val.approachPersons.image.filename}`}*/}
                        {/*                                            alt={val.approachPersons.name}*/}
                        {/*                                            className="quote__img"/> : null}*/}

                        {/*                                    <div className="quote__person-text">*/}
                        {/*                                        {val.approachPersons.name}, <span>{val.approachPersons.post} @ DEUS</span>*/}
                        {/*                                    </div>*/}
                        {/*                                </div>*/}
                        {/*                                <div className="quote__q" style={{color: val.resultTextColor}}*/}
                        {/*                                     dangerouslySetInnerHTML={{__html: val.text}}></div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </section>*/}
                        {/*            {!!val.imageI && !!detail.approachListSecondFiles && !!detail.approachListSecondFiles.find(file => file.originalname === val.imageI.title) &&*/}
                        {/*                <BannerComponent*/}
                        {/*                    banner={detail.approachListSecondFiles.find(file => file.originalname === val.imageI.title)}*/}
                        {/*                    detail={detail}/>*/}
                        {/*            }*/}
                        {/*        </>*/}
                        {/*    )*/}
                        {/*}*/}

                        {/*{detail.result || detail.resultPersonsText ?*/}

                        {/*    <section style={{background: detail.resultsColor}}*/}
                        {/*             className="project-results results_bg wow fadeIn"*/}
                        {/*             data-wow-duration="0.5s"*/}
                        {/*             data-wow-delay="0.1s"*/}
                        {/*             data-wow-offset="100">*/}
                        {/*        <div className="container">*/}
                        {/*            <div className="project-results__wrap">*/}
                        {/*                <h2 style={{color: detail.resultsColor === '#000000' ? '#ffffff' : '#000000'}}*/}
                        {/*                    className="heading-secondary">Результаты</h2>*/}
                        {/*                <div className="project-results__content">*/}
                        {/*                    <div*/}
                        {/*                        className={` ${detail.resultTextColor === '#ffffff' ? 'whiteText' : 'blackText'} project-results__text`}*/}
                        {/*                        style={{color: detail.resultTextColor}}*/}
                        {/*                        dangerouslySetInnerHTML={{__html: detail.result}}>*/}

                        {/*                    </div>*/}
                        {/*                    {detail.resultPersons && detail.resultPersons.name && detail.resultPersons.post || detail.resultPersonsText ?*/}
                        {/*                        <div className="project-results__person">*/}
                        {/*                            <div className="project-results__person-info">*/}
                        {/*                                <div*/}
                        {/*                                    className="project-results__person-name">{detail.resultPersons.name}{','}*/}
                        {/*                                </div>*/}
                        {/*                                <div*/}
                        {/*                                    className="project-results__person-position">{detail.resultPersons.post} {'@ DEUS'}*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}

                        {/*                            {detail.resultPersonsText &&*/}
                        {/*                                <div className="project-results__person-text">*/}
                        {/*                                    <div*/}
                        {/*                                        dangerouslySetInnerHTML={{__html: detail.resultPersonsText}}></div>*/}
                        {/*                                </div>*/}
                        {/*                            }*/}
                        {/*                            /!* <img src="/img/maks.png" alt="person" className="project-results__person-photo"/> *!/*/}
                        {/*                            {detail?.resultPersons?.image ?*/}
                        {/*                                <img*/}
                        {/*                                    src={`${apiUrl}/uploads/${detail.resultPersons.image.filename}`}*/}
                        {/*                                    alt={detail.resultPersons.name}*/}
                        {/*                                    className="project-results__person-photo"/> : null}*/}
                        {/*                        </div>*/}
                        {/*                        : null}*/}

                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section> : null}*/}
                        {/*{console.log('taskDescr:', detail.taskDescr, detail.task)}*/}
                        {/*{console.log('task:', detail.taskDescr, detail.task)}*/}


                        {/*{detail.technologies && detail.technologies !== 'undefined' && detail.technologies !== '' ?*/}

                        {/*    <section className="project-results wow fadeIn"*/}
                        {/*             data-wow-duration="0.5s"*/}
                        {/*             data-wow-delay="0.1s"*/}
                        {/*             data-wow-offset="100">*/}
                        {/*        <div className="container">*/}
                        {/*            <div className="project-results__wrap">*/}
                        {/*                <h2 style={{color: '#000000'}} className="heading-secondary">Технологии</h2>*/}
                        {/*                <div className="project-results__content">*/}
                        {/*                    /!* <div className="project-results__person">*/}
                        {/*                    <div className="project-results__person-info">*/}
                        {/*                        <div className="project-results__person-name">{detail.resultPersons.name},</div>*/}
                        {/*                        <div className="project-results__person-position">{detail.resultPersons.post} @ DEUS</div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="project-results__person-text"><div dangerouslySetInnerHTML={{ __html: detail.resultPersonsText }}></div></div>*/}
                        {/*                    <img src="/img/maks.png" alt="person" className="project-results__person-photo"/>*/}
                        {/*                    {detail.resultPersons.image ? <img src={`${apiUrl}/uploads/${detail.resultPersons.image.filename}`} alt={detail.resultPersons.name} className="project-results__person-photo" /> : null}*/}
                        {/*                </div> *!/*/}
                        {/*                    <div className='blackText'*/}
                        {/*                         dangerouslySetInnerHTML={{__html: detail.technologies}}></div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section> : null}*/}

                        {/*{*/}
                        {/*    detail.bannerFifthVideo && detail.bannerFifthVideo !== 'undefined' && detail.bannerFifthVideo !== 'null' ?*/}
                        {/*        <section className="project-banner wow fadeIn"*/}
                        {/*                 data-wow-duration="0.5s"*/}
                        {/*                 data-wow-delay="0.1s"*/}
                        {/*                 data-wow-offset="100">*/}
                        {/*            <div dangerouslySetInnerHTML={{__html: detail.bannerFifthVideo}}></div>*/}
                        {/*        </section>*/}
                        {/*        : detail.bannerFifth ?*/}
                        {/*            <BannerComponent banner={detail.bannerFifth} detail={detail}/>*/}
                        {/*            : null*/}
                        {/*}*/}

                        {/*{detail.bannerFifths ?*/}
                        {/*    detail.bannerFifths.filter(val => !!val).map((banner, index) =>*/}
                        {/*        <BannerComponent banner={banner} detail={detail}/>*/}
                        {/*    )*/}
                        {/*    : null*/}
                        {/*}*/}

                        {/*{detail.imagesExtra ?*/}
                        {/*    detail.imagesExtra.map((image, index) => {*/}
                        {/*        return (*/}
                        {/*            <section className="project-banner --extrawow fadeIn"*/}
                        {/*                     data-wow-duration="0.5s"*/}
                        {/*                     data-wow-delay="0.1s"*/}
                        {/*                     data-wow-offset="100"*/}
                        {/*                     key={index}>*/}
                        {/*                <img src={`${apiUrl}/uploads/${image.filename}`} alt={image.fieldname}/>*/}
                        {/*            </section>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*    : null}*/}

                        {/*{detail.visibilityImg1 && detail.visibilityTitle1 && detail.visibilityImg1 !== 'undefined' && detail.visibilityTitle1 !== 'undefined' ?*/}
                        {/*    <section className="project-analytics wow fadeIn"*/}
                        {/*             data-wow-duration="0.5s"*/}
                        {/*             data-wow-delay="0.1s"*/}
                        {/*             data-wow-offset="100">*/}
                        {/*        <div className="container">*/}
                        {/*            <div className="project-analytics__wrap">*/}
                        {/*                <div className="project-analytics__item">*/}
                        {/*                    <h2 className="heading-secondary">{detail.visibilityTitle1}</h2>*/}
                        {/*                    <div className="project-analytics__picture">*/}
                        {/*                        /!* <img src="/img/yan.png" alt="Видимость в Яндекс" className="project-analytics__img" /> *!/*/}
                        {/*                        {detail.visibilityImg1 ?*/}
                        {/*                            <img src={`${apiUrl}/uploads/${detail.visibilityImg1.filename}`}*/}
                        {/*                                 alt={detail.visibilityImg1.name}*/}
                        {/*                                 className="project-analytics__img"/> : null}*/}

                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*                <div className="project-analytics__item">*/}
                        {/*                    <h2 className="heading-secondary">{detail.visibilityTitle2}</h2>*/}
                        {/*                    <div className="project-analytics__picture">*/}
                        {/*                        /!* <img src="/img/google.png" alt="Видимость в Google" className="project-analytics__img" /> *!/*/}
                        {/*                        {detail.visibilityImg2 ?*/}
                        {/*                            <img src={`${apiUrl}/uploads/${detail.visibilityImg2.filename}`}*/}
                        {/*                                 alt={detail.visibilityImg2.name}*/}
                        {/*                                 className="project-analytics__img"/> : null}*/}

                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </section> : null*/}
                        {/*}*/}
                        {/*<div className="wow fadeIn"*/}
                        {/*     data-wow-duration="0.5s"*/}
                        {/*     data-wow-delay="0.1s"*/}
                        {/*     data-wow-offset="100">*/}

                        {/*</div>*/}
                        {/*<div className="wow fadeIn"*/}
                        {/*     data-wow-duration="0.5s"*/}
                        {/*     data-wow-delay="0.1s"*/}
                        {/*     data-wow-offset="100">*/}
                        {/*    <Cta formName={'projects'}/>*/}
                        {/*</div>*/}
                        <RenderFields detail={detail}/>
                         <ProjectNext detail={detail}/>
                    </div>
                </main>
            }
        </>
    )


}

export default ProjectDetail;

 export const BannerComponent = ({banner, detail, stackItem}) => {
    const fileUrl = `${apiUrl}/uploads/${banner.filename}`;
    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(banner.filename);
    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(banner.filename);

    return (
        <section className="project-banner borderBlock">
            {isVideo && (
                <video autoPlay loop muted playsInline src={fileUrl}/>
            )}
            {isImage && (
                <img src={fileUrl} alt={detail.name} />
            )}
        </section>
    );
}

 export const ProjectResults = ({ result, awardsURL, isMobile}) => {
    if (!result) return null;


    return (
        <section className="project-results padding borderBlock">
            <div className="project-results__wrap">
                <div className="project-results__wrapper">
                    <h2 className="heading-secondary">Результаты</h2>
                    {!isMobile && (
                        <a href={awardsURL} target="_blank" rel="noopener noreferrer">
                            <p className="project-results__wrapper-url l-textReg">
                                <Icon icon="cssAwards" viewBox="0 0 40 40"/>
                                css design awards
                            </p>
                        </a>
                    )}
                </div>

                <div className="project-results__content">
                    <div
                        className='project-results__text m-text'
                        dangerouslySetInnerHTML={{ __html: result }}>
                    </div>
                </div>

                {isMobile && (
                    <a href={awardsURL} target="_blank" rel="noopener noreferrer">
                        <p className="project-results__wrapper-url s-text">
                            <Icon icon="cssAwards" viewBox="0 0 40 40"/>
                            css design awards
                        </p>
                    </a>
                )}
            </div>
        </section>
    );
};

 export const useMobile = () => {
     const MOBILE_SIZE = 575;
     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
     const [isMobile, setIsMobile] = useState(windowWidth <= MOBILE_SIZE);

     useEffect(() => {
         window.addEventListener("resize", onResizeEvent);
         return () => window.removeEventListener("resize", onResizeEvent);
     }, []);

     useEffect(() => {
         setIsMobile(windowWidth <= MOBILE_SIZE);
     }, [windowWidth]);

     const onResizeEvent = () => {
         debouncedResize();
     };

     const debouncedResize = debounce(() => setWindowWidth(window.innerWidth), 100);

     return isMobile;
 };