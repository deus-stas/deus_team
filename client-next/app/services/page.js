import Link from "next/link";
import Services from "../../pages/services/Services";
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
    const data = seoData.find((el) => el.name === "Услуги");
    

    return {
      title: data?.seoTitle || "Услуги",
      description: data?.seoDescription || "Описание страницы услуг",
      keywords: data?.seoKeywords || "услуги, сервисы",
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

async function getServices() {
  const response = await fetch(`${apiUrl}/api/services/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getTeam() {
  const response = await fetch(`${apiUrl}/api/team/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default async function Home() {
    const sizeLarge = 'Объединяем аналитику, маркетинг, дизайн, разработку<br/> и интеграции в единую систему для получения<br/> максимальной эффективности для вашего бизнеса'
    const [services, team ] = await Promise.all([
      getServices(),
      getTeam()
    ]);
    

    return (
        <>
          <main className="services destroy" style={{display: 'none'}}>
              <div className="container">
                  <section className="services-s">
                    <span className="services-s__text">
                          <p className="breadcrumb">Услуги</p>
                          <h1 className="heading-primary">Отвечаем за качество <br/> своих услуг</h1>
                    </span>
                  </section>
                  <section className="services-about borderBlock padding">
                      <div className="services-about__wrap">
                          <span className="info">
                              <h2 className="heading-secondary">Почему стоит заказать<br/> разработку сайта в DEUS?</h2>
                          <div className="descr s-text" dangerouslySetInnerHTML={{__html: sizeLarge}}/>
                          </span>
                          <div className="services-about__adv">
                              <div className="services-about__adv-item">
                                  <p className="m-text">Работаем<br/> с 2016 года</p>
                              </div>
                              <div className="services-about__adv-item">
                                  <p className="m-text"> Входим в ТОП-40<br/> креативности студий</p>
                              </div>
                              <div className="services-about__adv-item">
                                  <p className="m-text">Комплексные решения<br/> для различных индустрий</p>
                              </div>
                          </div>

                      </div>

                  </section>

                  <section className="services-list">
                      <div className="services-list__wrapp borderBlock padding">
                          {
                              !!services && services.filter((service) => service.isInvisible).map((service, index) => {
                                  return (
                                      <div className="services-list__wrapp-item" key={`$services-list-${index}`}>
                                          <div className="describe">
                                              <h2 href={`/services/${service.path}`}
                                                    className="heading-secondary"
                                                    key={service.id}>
                                                        {service.path !== 'null' ? 
                                                            <Link href={`/projects/type/${service.path.toLowerCase()}`}
                                                                        disabled={!service.path || service.path === 0 }
                                                                        datahash="projectNav"
                                                                       >
                                                                <div className="services-s__name">{service.name}</div>
                                                            </Link>
                                                        :
                                                            <div
                                                                datahash="projectNav"
                                                                >
                                                                <div className="services-s__name">{service.name}</div>
                                                            </div>
                                                        }   
                                              </h2>
                                              <div className="describe__wrapp ">
                                                  <p className="s-text">
                                                      {service.descr}
                                                  </p>
                                              </div>
                                          </div>
                                          <div className="describe__wrapp-benefits">
                                              {!!service.tariffs && service.tariffs.map((tariffs, index) => {
                                                  const num = (index + 1).toString().padStart(2, '0');
                                                  return (
                                                      <div className="describe__wrapp-benefits__item"  key={`$describe__wrapp-benefits-key-${index}`}>
                                                          <p className="num m-text">{num}</p>
                                                          <div className="tariffs">
                                                              <span className="tariffs__span">

                                                                  <p className="m-text">{tariffs.tariffsCategory}</p>
                                                              </span>
                                                              <p className="price s-text">
                                                                  {tariffs.tariffPrice} &nbsp;/&nbsp; {tariffs.tariffDeadline}
                                                              </p>
                                                          </div>
                                                      </div>

                                                  )
                                              })}
                                          </div>
                                      </div>
                                  )
                              })}
                      </div>
                  </section>

                  <section className="services-principle borderBlock padding whiteHeader">
                      <h2 className="heading-secondary">Принципы управления<br/> проектами</h2>
                      <div className="services-principle__wrap">
                          <div className="services-principle__wrap-item">
                              <img src="/img/pentagon.png" alt=""/>
                              <div>
                                  <p className="l-textMed">Прозрачность</p>
                                  <p className="s-text">
                                      Подробно и понятно рассказываем, что клиент получает по итогам каждого этапа
                                      — держим фокус и не отклоняемся от стратегической цели проекта

                                  </p>
                              </div>
                          </div>
                          <div className="services-principle__wrap-item">
                              <img src="/img/octagon.png" alt=""/>
                              <div>
                                  <p className="l-textMed">Индивидуальность</p>
                                  <p className="s-text">
                                      Всесторонне изучаем рынок и бизнес клиента, предлагаем уникальные решения, шиюко подбираем команду, условия работы и оплаты на основе интересов клиента
                                      </p>
                                  </div>
                              </div>
                              <div className="services-principle__wrap-item">
                                  <img src='/img/elipse.png' alt=""/>
                                  <div>
                                      <p className="l-textMed">Персональный подход</p>
                                      <p className="s-text">
                                          Проактивность — ключ к достойному результату. В ходе проекта мы постоянно предлагаем улучшения и идеи, опираясь на глубокую экспертизу и многолетний опыт</p>
                                  </div>
                              </div>
                          </div>

                  </section>

                  <section className="services-team borderBlock padding">
                          <div className="services-team__wrap">
                              <div className="info">
                                  <h2 className="heading-secondary">
                                      Как мы работаем?
                                  </h2>
                                  <p className="intro s-text">Предлагаем форматы работы с учётом особенностей проекта.
                                      Если разработка требует большей гибкости, миксуем подходы.

                                  </p>
                              </div>
                              <div>
                                  <h2 className="heading-secondary">Команда</h2>
                                  <div className="services-team__wrapper">
                                      {team.filter(team => team.serviceControl).map((team, index) => {
                                          return (
                                              <div className="worker" key={`worker-key-${index}`}>
                                                  <img className="worker-img"
                                                        src={team.image ? `${apiUrl}/uploads/${team.image?.filename}` : null}
                                                        alt=""/>
                                                  <span>
                                                      <p className="m-text">{team.name}</p>
                                                      <p className="s-text">{team.post}</p>
                                                  </span>
                                              </div>
                                          )
                                      })}
                                  </div>
                                  <div className="services-team__table">
                                      <div className="item">
                                          <p className="m-text">Менеджмент</p>
                                          <p className="s-text">4 человека</p>
                                      </div>
                                      <div className="item">
                                          <p className="m-text">Дизайн</p>
                                          <p className="s-text">6 человека</p>
                                      </div>
                                      <div className="item">
                                          <p className="m-text">Верстка и разработка</p>
                                          <p className="s-text">8 человека</p>
                                      </div>
                                      <div className="item">
                                          <p className="m-text">SEO</p>
                                          <p className="s-text">2 человека</p>
                                      </div>
                                      <div className="item">
                                          <p className="m-text">Редакция</p>
                                          <p className="s-text">4 человека</p>
                                      </div>

                                  </div>

                              </div>
                          </div>

                  </section>
              </div>
          </main>
          <Services/>
        </>
    );
  }