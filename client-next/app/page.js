import Link from "next/link";
import MainPage from "../pages/mainPage/MainPage";
import { headers } from "next/headers";

export async function generateMetadata() {
  
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");

  if (!host) {
    console.error("Host header is missing");
    return {
      title: "Error",
      description: "Invalid host configuration",
    };
  }

  // const baseUrl = `${protocol}://${host}`;
  const baseUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`; // Укажите URL вашего API

  try {
    const response = await fetch(`${baseUrl}/api/seo`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch SEO data: ${response.status} ${response.statusText}`);
      return {
        title: "Error",
        description: "Failed to fetch SEO data",
      };
    }

    const seoData = await response.json();
    const data = seoData.find((el) => el.name === "Главная");

    return {
      title: data?.seoTitle || "Главная",
      description: data?.seoDescription || "Главная",
      keywords: data?.seoKeywords || "Главная",
        openGraph: {
            title: data?.seoTitle || "Главная",
            description: data?.seoDescription || "Главная",
            type: 'website',
            images:[baseUrl+'/img/agency/deus.svg']
        },
        twitter: {},
        alternates: {
            canonical: baseUrl+"/",
        },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching SEO data",
    };
  }
}
const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

export async function getClients() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/clients/`);
  return res.json();
}

export async function fetchMainPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/mainPage/`);
  return res.json();
}

async function getTeam() {
  const response = await fetch(`${apiUrl}/api/team/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getServices() {
  const response = await fetch(`${apiUrl}/api/services/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getThemes() {
  const response = await fetch(`${apiUrl}/api/themes/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.map((item, i) => ({
    value: item.id,
    label: item.name,
  }));
}

async function getProjects() {
  const response = await fetch(`${apiUrl}/api/projects/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getWorking() {
  const response = await fetch(`${apiUrl}/api/working/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default async function Home() {
    const sizeLarge = 'Мы создаём продукты и услуги, которые<br/>  помогают нашим клиентам быть заметнее<br/> 🤩 в цифровом пространстве'
    const [clients, mainPage, team, services, optionsTheme, allProjects,working ] = await Promise.all([
      getClients(),
      fetchMainPage(),
      getTeam(),
      getServices(),
      getThemes(),
      getProjects(),
      getWorking()
    ]);
    
    return (
      <>
        <div className="destroy" style={{display: 'none'}}>
          <section className="main-banner">
                <div className="container">
                    <div className="main-banner__wrap">
                        <div className="main-banner__content">
                            <p className="breadcrumb">Привет — это DEUS 👋</p>
                            <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: sizeLarge}}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="main-clients">
                <div className="main-clients__marquee">
                    <div className="marquee-container">
                        {clients.map((client, i) => (
                            <div className="main-clients__container" key={client.id || i}>
                                <Link
                                href={client.image ? `/uploads/${client.image.filename}` : null}
                                alt={client.name}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="marquee-container">
                        {clients.map((client, i) => (
                        <div className="main-clients__container" key={client.id || i}>
                            <Link
                            href={client.image ? `/uploads/${client.image.filename}` : null}
                            alt={client.name}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="main-agency">
                <div className="container">

                    <div className="main-agency__wrap whiteHeader">
                        {mainPage
                            ? mainPage.map((item, index) => {
                                const arrow = index !== 1;
                                const workers = index === 0 && (
                                    <div key={`workers-${index}`}>
                                        {team
                                            .filter((teamMember) => teamMember.mainControl)
                                            .slice(0, 3)
                                            .map((teamMember, i) => (
                                                <img
                                                    src={`${apiUrl}/uploads/${teamMember.image?.filename}`}
                                                    alt=""
                                                    className="person-img"
                                                    key={teamMember.id || i}
                                                />
                                            ))}
                                    </div>
                                );

                                const allServices = index === 1 &&
                                    services
                                        .filter((service) => service.isInvisible)
                                        .map((service, serviceIndex) => (
                                            <Link href={`/services/`} key={`service-${serviceIndex}`}>
                                                <div className="main-agency__item-link l-textReg">
                                                    <p>{service.name}</p>
                  
                                                </div>
                                            </Link>
                                        ));

                                const num = index < 9 ? "0" + (index + 1) : index + 1;
                                const name = item.name;
                                const descr =
                                    index === 1 ? (
                                        <div className="main-agency__item-service">{allServices}</div>
                                    ) : (
                                        <div className={`main-agency__item__descr${index === 0 ? "1" : ""}`}>
                                            {workers}
                                            {item.textList && (
                                                <div className="main-agency__item__descr-flex">
                                                    {item.textList.map((textItem, ind) => (
                                                        <div
                                                            key={`textItem-${ind}`}
                                                            className={
                                                                index === 2
                                                                    ? "main-agency__item__descr-flex__item"
                                                                    : index === 0
                                                                    ? "main-agency__item__descr-flex-ind1 m-text"
                                                                    : ""
                                                            }
                                                        >
                                                            {textItem.textItem}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );

                                return (
                                    <div
                                        className="main-agency__item"
                                        key={`mainItem-${index}`}
                                        >
                                            <div className="main-agency__item-header">
                                                <div className="main-agency__item-header__num s-text">
                                                    <div className="num_flex">{num}</div>
                                                </div>
                                                <div className="main-agency__item-header__text heading-secondary">{name}</div>
                                            </div>
                                            {descr}
                                            <Link href={`${item.pageURL}`} rel="noreferrer">
                                                <div className="main-agency__item-arrow">
                                                    <div className="hover-flip-circle">
                              
                                                    </div>
                                                </div>
                                            </Link>
                                    </div>
                                );
                            })
                            : null}
                    </div>


                    <div className="main-projects__wrap">
                        <span className="main-projects__item">
                        <h2 className="heading-secondary">Экспертиза</h2>
                        </span>
                        <div className="main-projects__item">
                            <p >
                                Мы работаем с ведущими компаниями и брендами из различных отраслей.
                                При создании могут решаться уникальные задачи,
                                но это всегда проекты с характером 👍
                            </p>
                            <div className="main-projects__item-flex">
                                {optionsTheme ? optionsTheme.map((project, index) => {
                                    const filterProjects = allProjects.filter((item) => item.projectTheme === project.value && item.visibility);
                                    const totalSum = filterProjects.length < 10 ? "0" + filterProjects.length : filterProjects.length;
                                    if (totalSum < 1) return null;
                                    return (<Link
                                                href={`/projects/theme/${project.value}`}
                                                key={`project-${project.value || index}`}>
                                        <div className="main-projects__item-flex__inner" >
                                            <span className="main-projects__item-btn">
                                              <div>
                                                <p className="hover custom-cursor-link"
                                                    datahash="projectNav">
                                                    {project.label}
                                                </p>
                                              </div>
                                              <div className="main-agency__item-header__num xs-text">
                                                {totalSum}
                                              </div>
                                            </span>
                                        </div>
                                    </Link>);
                                }) : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="main-showreel whiteHeader">
                <div className="container">
                    <div className={`main-showreel__wrap `}>
                        
                    </div>
                </div>
            </section>

            <section className="main-working">
                <div className="container">
                    <div className="main-working__wrap">
                        <div className="main-working__wrap-info">
                            <p className="heading-secondary">
                                В работе {working.length} активных<br /> проектов
                            </p>
                  
                        </div>
                        <p className="heading-secondary mobile">
                            В работе {working.length} активных проектов
                        </p>
                        {working.map((item, index) => (
                          <div
                              className="padding-slider"
                              key={item.id}

                          >
                              <div
                              key={index}
                              >
                              <div className="wrapp">
                                  <div className="greenBall">
                                  <div className="animateBall">
                                  </div>
                                  <p>{item.name}</p>
                                  </div>
                                  <p className="m-text">{item.descr}</p>
                              </div>
                              <div className="wrapp-circle">
                                  <img src={`/uploads/${item.file.filename}`} alt="" className="circle" />
                              </div>
                              </div>
                          </div>
                          ))}
                    </div>
        
                </div>
            </section>

        </div>
        <MainPage/>
      </>
    );
  }