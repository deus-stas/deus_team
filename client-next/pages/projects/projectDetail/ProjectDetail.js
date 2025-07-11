'use client'; // Если вы используете Next.js с папкой `app`

import React from 'react';
import { useEffect, useState } from 'react';
import axios, {setIsLoadingMainPageEvent} from '../../../axios'
// import {useParams} from "react-router-dom";

import './projectDetail.scss'
// import HelmetComponent from "../../../components/helmetComponent";
import SiteAndServices from "./detailPropsRender/SiteAndServices";
import VideoProduction from "./detailPropsRender/VideoProduction";
import TechSupport from "./detailPropsRender/TechSupport";
import SEO from "./detailPropsRender/SEO";
// import { Icon } from "../../../components/icon/Icon";
// import {debounce} from "@material-ui/core";
import ProjectNext from "../projectNext/ProjectNext";
import CorporateIdentity from "./detailPropsRender/CorporateIdentity";
import {Cursor} from "../../../components/cursor/cursor";
// import {fetchData } from "../../../actions/appActions";
// import {connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
// import Image from 'next/image';




const apiUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`

const ProjectDetail = () => {

    const [detail, setDetail] = useState([]);
    const [types, setTypes] = useState([]);
    const [theme, setTheme] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState(null);
    const params = useParams();
    // Получение ID из параметров маршрута
    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, []);


    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 1000);
    }, []);

    useEffect(() => {
        if (!id) return;
        
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

    const fetchThemeLabel = async (detail) => {
        try {
            const response = await axios.get(`${apiUrl}/api/themes/`);
            return response.data.find((theme) => theme.id === detail.projectTheme)?.name;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const typeRender = detail.projectType
    const findType = types.find((item)=> item._id === typeRender )

    const RenderFields = ({detail}) => {
        console.log(detail)
        
        if (!findType) {
            return <SiteAndServices detail={detail} />;
        }
        const fieldsMap = {
            'seo': <SEO detail={detail} />,
            'site-and-services': <SiteAndServices detail={detail} />,
            'tech-support': <TechSupport detail={detail} />,
            'video-production': <VideoProduction detail={detail} />,
            'corporate-identity': <CorporateIdentity detail={detail} />,
        };
        return fieldsMap[findType?.key] || <SiteAndServices detail={detail} />;

    };


    return (
        <>
            <Cursor/>
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
                            <div className="project-wrap_text_video_block">
                            {detail.about !== 'undefined' ?
                                <div className="project-main__wrap borderBlock padding">
                                    <div className="project-main__subtitle heading-secondary">О клиенте</div>
                                    <div className="project-main__text">

                                        <div className="project-main__descr l-textReg" dangerouslySetInnerHTML={{__html: detail.about}}/>
                        
                                        <div className="project-main__info">
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Клиент</p>
                                                <p className="m-text" dangerouslySetInnerHTML={{__html: detail.projectSite}}/>
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
                            {detail.bannerThirds ?
                                <div className="banner-list">
                                    {detail.bannerThirds.filter(val => !!val).map((banner, index) =>
                                        <div className="project-banner borderBlock" key={`project-banner-${index}`}>
                                            <BannerComponent banner={banner} detail={detail}/>
                                        </div>
                                    )}
                                </div>
                                : null
                            }
                            </div>
                        </section>


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
        <>
            {isVideo && (
                <video autoPlay loop muted playsInline src={fileUrl}/>
            )}
            {isImage && (
                <img src={fileUrl} alt={detail.name} />
            )}
        </>
    );
}

 export const ProjectResults = ({ result, awardsURL, awardsTitle, awardsImage, isMobile}) => {
    if (!result) return null;

    console.log('awardsImage',awardsImage)
    return (
        <section className="project-results padding borderBlock">
            <div className="project-results__wrap">
                <div className="project-results__wrapper">
                    <h2 className="heading-secondary">Результаты</h2>
                    {!isMobile && !!awardsURL && awardsImage && (
                        <a href={awardsURL} target="_blank" rel="noopener noreferrer">
                            <p className="project-results__wrapper-url l-textReg">
                            {awardsImage[0] && 
                                <img className='awards-image' src={`${apiUrl}/uploads/${awardsImage[0]?.filename}`} alt="awards"/>
                            }
                            {awardsTitle}
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

                {isMobile && !!awardsURL && awardsImage &&(
                    <a href={awardsURL} target="_blank" rel="noopener noreferrer">
                        <p className="project-results__wrapper-url s-text">
                        <img className='awards-image' src={`${apiUrl}/uploads/${awardsImage[0]?.filename}`} alt="awards"/>
                            {awardsTitle}
                        </p>
                    </a>
                )}
            </div>
        </section>
    );
};

