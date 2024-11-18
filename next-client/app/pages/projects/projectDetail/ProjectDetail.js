'use client'; // Если используете Next.js в папке app

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import HelmetComponent from "../../../components/helmetComponent";
import SiteAndServices from "./detailPropsRender/SiteAndServices";
import VideoProduction from "./detailPropsRender/VideoProduction";
import TechSupport from "./detailPropsRender/TechSupport";
import SEO from "./detailPropsRender/SEO";
import { Icon } from "../../../components/icon/Icon";
import { debounce } from "@material-ui/core";
import ProjectNext from "../projectNext/ProjectNext";
import CorporateIdentity from "./detailPropsRender/CorporateIdentity";
import { Cursor } from "../../../components/cursor/cursor";

const apiUrl = '';

const ProjectDetail = ({ initialData, typesData }) => {
    const [detail, setDetail] = useState(initialData || {});
    const [types, setTypes] = useState(typesData || []);
    const [theme, setTheme] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useRouter().query;

    useEffect(() => {
        // Check for platform type
        if (typeof window !== "undefined" && navigator.platform.indexOf("Win") > -1) {
            console.log("Running on Windows");
        }

        setTimeout(() => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 1000);
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/api/projects/${id}`).then((response) => {
                let dataDetail = { ...response.data };
                let requests = [];

                if (response.data.taskPersons !== 'undefined' && response.data.taskPersons !== 'null') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.taskPersons}`).then((response) => {
                            dataDetail = { ...dataDetail, taskPersons: response.data };
                        })
                    );
                }

                // Fetch associated persons for approach lists
                const approachLists = [
                    'approachList', 'approachListSecond', 'approachListThird'
                ];
                approachLists.forEach(list => {
                    if (response.data[list]) {
                        response.data[list].forEach(val => {
                            if (val.approachPersons) {
                                requests.push(
                                    axios.get(`${apiUrl}/api/persons/${val.approachPersons}`).then((response) => {
                                        val.approachPersons = response.data;
                                    })
                                );
                            }
                        });
                    }
                });

                if (response.data.approachPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.approachPersons}`).then((response) => {
                            dataDetail = { ...dataDetail, approachPersons: response.data };
                        })
                    );
                }

                if (response.data.resultPersons !== 'undefined') {
                    requests.push(
                        axios.get(`${apiUrl}/api/persons/${response.data.resultPersons}`).then((response) => {
                            dataDetail = { ...dataDetail, resultPersons: response.data };
                        })
                    );
                }

                Promise.all(requests).then(() => {
                    setDetail(dataDetail);
                }).then(() => {
                    fetchThemeLabel(dataDetail).then((themeLabel) => setTheme(themeLabel));
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/types/`).then((res) => {
            setTypes(res.data);
        });
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

    const RenderFields = ({ detail }) => {
        const findType = types.find((item) => item._id === detail.projectType);
        if (findType) {
            const fieldsMap = {
                'seo': (<SEO detail={detail} />),
                'site-and-services': (<SiteAndServices detail={detail} />),
                'tech-support': (<TechSupport detail={detail} />),
                'video-production': (<VideoProduction detail={detail} />),
                'corporate-identity': (<CorporateIdentity detail={detail} />),
            };
            return fieldsMap[findType?.key] || <SiteAndServices detail={detail} />;
        }
    };

    return (
        <>
            <Cursor />
            <HelmetComponent pageTitle={detail.seoTitle} pageKeywords={detail.seoKeywords} pageDescription={detail.seoDescription} />
            {!isLoading &&
                <main id="toUp" className="project">
                    <div className="container">
                        <section className="project-main">
                            <span className="project-maint__text">
                                <p className="breadcrumb m-text">{detail.date} • {detail.name}</p>
                                <h1 className="heading-primary" dangerouslySetInnerHTML={{ __html: detail.descrProject }}></h1>
                            </span>
                            {detail.about !== 'undefined' &&
                                <div className="project-main__wrap borderBlock padding">
                                    <div className="project-main__subtitle heading-secondary">О клиенте</div>
                                    <div className="project-main__text">
                                        <div className="project-main__descr l-textReg" dangerouslySetInnerHTML={{ __html: detail.about }} />
                                        <div className="project-main__info">
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Клиент</p>
                                                <p className="m-text" dangerouslySetInnerHTML={{ __html: detail.projectSite }} />
                                            </div>
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Отрасль</p>
                                                <p className="m-text">{theme}</p>
                                            </div>
                                            <div className="project-main__info-wrap">
                                                <p className="s-text">Продолжительность</p>
                                                <p className="m-text" dangerouslySetInnerHTML={{ __html: detail.duration }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </section>
                        {detail.bannerThirds &&
                            <div className="banner-list">
                                {detail.bannerThirds.filter(val => !!val).map((banner, index) =>
                                    <div className="project-banner borderBlock" key={index}>
                                        <BannerComponent banner={banner} detail={detail} />
                                    </div>
                                )}
                            </div>
                        }

                        <RenderFields detail={detail} />
                        <ProjectNext detail={detail} />
                    </div>
                </main>
            }
        </>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    try {
        const projectRes = await axios.get(`${apiUrl}/api/projects/${id}`);
        const typesRes = await axios.get(`${apiUrl}/api/types/`);

        return {
            props: {
                initialData: projectRes.data,
                typesData: typesRes.data,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                initialData: {},
                typesData: [],
            },
        };
    }
}

export default ProjectDetail;
