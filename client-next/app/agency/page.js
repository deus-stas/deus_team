import Link from "next/link";
import Agency from "../../pages/agency/Agency";
import { headers } from "next/headers";

export async function generateMetadata() {
  
  const headersList = headers();
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
    const data = seoData.find((el) => el.name === "Агентство");

    return {
      title: data?.seoTitle || "Агентство",
      description: data?.seoDescription || "Агентство",
      keywords: data?.seoKeywords || "Агентство",
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

async function getAwards() {
  const response = await fetch(`${apiUrl}/api/awards/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
async function getClients() {
  const response = await fetch(`${apiUrl}/api/clients/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
// export async function getClients() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/clients/`);
//   return res.json();
// }

async function getTeam() {
  const response = await fetch(`${apiUrl}/api/team/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
async function getVacancies() {
  const response = await fetch(`${apiUrl}/api/vacancies/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default async function Home() {
    const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн,<br/> разработку и интеграции в единую<br/> систему для получения максимальной,<br/> эффективности для вашего бизнеса';
    const [awards, clients, team, vacancies] = await Promise.all([
      getAwards(),
      getClients(),
      getTeam(),
      getVacancies()
    ]);

    return (
        <>
          <main style={{display: 'none'}} className="agency">
              <div className="container">
                <section className="agency-start">
                  <span className="agency-start__text">
                  <p className="breadcrumb">О компании</p>
                  <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: sizeLarge}}/>
                  </span>
                </section>

              <section id='agency' className="agency-about">
                  <div className="agency-about__wrap">
                      <div className="agency-about__adv-item m-text">
                          <p className="m-text">Работаем<br/> с 2016 года</p>
                      </div>
                      <div className="agency-about__adv-item  m-text">
                          <p className="m-text">Входим в ТОП-40<br/> креативности студий</p>
                      </div>
                      <div className="agency-about__adv-item  m-text">
                          <p className="m-text">Комплексные решения<br/> для различных индустрий</p>
                      </div>
                      <div className="agency-about__adv-item  m-text">
                          <p className="m-text">50% клиентов приходят<br/> к нам по рекомендации</p>
                      </div>
                  </div>
                  {awards &&
                      <div className="agency-about__wrapp whiteHeader">
                          {awards.map(award => {

                              return (
                                  <Link href={`/blog/${award.blogUrl}`} className="agency-about__wrapp-btn"
                                                  key={award.id}>
                                      <img src={award.image ? `/uploads/${award.image.filename}` : null}
                                              alt={award.name}/>
                                      <span className="content">
                                          <p className="name m-text">{award.name}</p>
                                      </span>
                                  </Link>
                              );
                          })}
                      </div>}
              </section>

              <section id='principle' className="agency-principle">
                      <div className="agency-principle__wrap">
                          <h2 className="heading-secondary">
                          <p className="">
                              Принципы, которых мы<br/> придерживаемся в работе
                          </p>
                          </h2>
                          <div className="agency-principle__wrapp">
                              <div className="agency-principle__wrap-item">
                                  <p className="num">01</p>
                                  <span className="flex-wrap">
                                      <p className="text l-textMed">Цена слова</p>
                                      <p>Верим в силу рукопожатия. Форма договоренности не имеет значения —
                                      мы выполняем свои обещания. Всегда.</p>
                                  </span>
                              </div>
                              <div className="agency-principle__wrap-item">
                                  <p className="num">02</p>
                                  <span className="flex-wrap">
                                  <p className="text l-textMed">Доверие и ответственность</p>
                                      <p>Основа наших отношений с клиентами — взаимное доверие. Мы всегда
                                      берем на себя ответственность за результат.</p>
                                  </span>

                              </div>
                              <div className="agency-principle__wrap-item">
                                  <p className="num">03</p>
                                  <span className="flex-wrap">
                                      <p className="text l-textMed">Процесс имеет значение</p>
                                      <p>Для нас результаты, достигнутые путем нарушения этических норм,
                                      недопустимы.</p>
                                  </span>
                              </div>

                          </div>
                      </div>

              </section>

              <section className="agency-clients" id="clients">
                <div className="agency-clients__head">
                    <h2 className="heading-secondary">Работаем с разными<br/> клиентами по всему миру</h2>
                    <div className="agency-clients__pag hidden-desktop">
                    </div>
                </div>

              </section>

              <section className="main-clients">

                  {clients.map((client, count) => {
                      return (
                          <div className={`main-clients__marquee-agency`} key={`row-${count}`}>
                              <div className="marquee-container-agency">
                                  <div className='agency-clients__img marquee-item' key={client.id || i}>
                                      <div className='container-img'>
                                          <img
                                              src={client.image ? `/uploads/${client.image.filename}` : null}
                                              alt={client.name} key={client.id}/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )
                  })}

              </section>

              {team && (
                  <section id="agency" className="agency-team borderBlock">
                      <div className="agency-team__wrap">
                          <div className="intro">
                              <p className="heading heading-secondary">Мы уверены, что проекты делают не компании, а люди.
                                  Поэтому особое внимание уделяем формированию команды.</p>
                              <p className="descr m-text">Объединяем аналитику, маркетинг, дизайн, разработку и интеграции в
                                  единую систему для получения максимальной эффективности для вашего бизнеса</p>
                          </div>

                          <div className="main-clients__marquee">
                              {team.map((client, count) => {
                                  return(
                                      <div className={count % 2 === 0 ? "marquee-container" : 'marquee-container-reverse'}  key={`key-${count}`}>
                                          <div className="main-clients__container" key={client.id || i}>
                                              <img className={`team-img`} src={client.mainImg ? `/uploads/${client.mainImg?.filename}`: null} alt={client.name} />
                                          </div>
                                      </div>
                                  )
                              })}

                          </div>
                      </div>
                  </section>
              )}

              {vacancies && (
                  <section id="agency" className="agency-vacancy">
                      <div className="agency-vacancy__wrap">
                        <div className="agency-vacancy__info sticky-h2">
                            <h2 className="heading-secondary">Мы находимся<br/> в постоянном поиске<br/> лучших
                                специалистов.</h2>
                            <span>
                            <p className="m-text">Не нашли подходящую вакансию?</p>
                            <p className="m-text">Пришлите нам на почту</p>
                        </span>
                            <p className="m-text"><Link className="hoverMail" href="mailto:job@de-us.ru">job@de-us.ru</Link></p>
                        </div>
                        <div className="agency-vacancy__wrapper">
                            {vacancies.map((item, i) => {
                                return (
                                    <Link target="_blank" href={item.link} className="agency-vacancy__wrapper-item" key={i}>
                                        <span className="place">
                                            <p className =
                                                    {
                                                item.place.length > 4
                                                    ? "where s-text big-txt"
                                                    : "where s-text small-txt"
                                            }
                                            >
                                                {item.place}
                                            </p>
                                        </span>
                                        <h3 className="l-textReg">{item.name}</h3>
                                        <p className="s-text type">{item.type}</p>
                                    </Link>
                                )
                            })}
                            <Link className="agency-vacancy__wrapper-item" target="_blank" href={"https://hh.ru/employer/2174085"}>
                                <span className="hh">
                                  <p className=" m-text">Больше вакансий на hh.ru</p>
                                </span>
                            </Link>
                        </div>
                      </div>
                  </section>
              )}
              </div>
          </main>
          <Agency/>
        </>
    );
  }