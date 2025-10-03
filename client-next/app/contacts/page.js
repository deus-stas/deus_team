import Link from "next/link";
import Contacts from "../../pages/contacts/Contacts";
import { headers } from "next/headers";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

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
    const data = seoData.find((el) => el.name === "Контакты");

    return {
      title: data?.seoTitle || "Контакты",
      description: data?.seoDescription || "Контакты",
      keywords: data?.seoKeywords || "Контакты",
      openGraph: {
        title: data?.seoTitle || "Контакты",
        description: data?.seoDescription || "Контакты",
        type: 'website',
        images:[baseUrl+'/deus.png'],
        url: baseUrl+"/contacts"
      },
      twitter: {},
      alternates: {
        canonical: baseUrl+"/contacts",
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


async function getTeam() {
  const response = await fetch(`${apiUrl}/api/team/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}


export default async function Home() {
  const sizeLarge = "Напишите лично<br/> генеральному<br/> директору";
  const descrXLarge =
  "Мы работаем с ведущими компаниями и брендами из различных<br/> отраслей. При создании могут решаться уникальные задачи,<br/> но это всегда проекты с характером";
  const [team ] = await Promise.all([
    getTeam(),

  ]);
    return (
      <>
        <main className="contacts destroy" style={{display: 'none'}}>
          <div className="container">
            <section className="contacts-main">
              <span className="agency-maint__text">
                <p className="breadcrumb">Контакты</p>
                <h1 className="heading-primary">Свяжитесь с нами</h1>
              </span>
            </section>
            <section className="contacts-info">
              <div className="contacts-info__wrap"  itemscope itemtype="http://schema.org/Organization">
                <div className="contacts-info__wrap-adress" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                  <div style={{display: 'none'}} itemprop="name" itemscope >Deus Team</div>
                  <Link
                    href="https://yandex.ru/maps/?rtext=~55.677636,37.272125"
                    target="_blank"
                  >
                    <h2 className="heading-secondary cursorTarget" itemprop="streetAddress">
                      г. Одинцово, ул. Молодежная, д.46,<br /> строение 1 офис 24, 25
                    </h2>
                  </Link>
                </div>
                <div className="contacts-info__wrap-invate">
                  <span>
                    <h2 className="m-text hover-flip">
                      <Link href="mailto:hello@de-us.ru">
                        <span data-hover="hello@de-us.ru">hello@de-us.ru</span>
                      </Link>
                    </h2>
                    <p className="s-text pb-32">Стать клиентом или партнером</p>
                  </span>
                  <span>
                    <h2 className="m-text hover-flip">
                      <Link href="mailto:job@de-us.ru">
                        <span data-hover="job@de-us.ru">job@de-us.ru</span>
                      </Link>
                    </h2>
                    <p className="s-text">Присоединиться к команде</p>
                  </span>
                </div>
              </div>
            </section>
            <section id="contactUs">
            </section>

            <section className="contacts-general">
              <div className="contacts-general__wrap borderBlock padding">
                <div className="chat">
                  <h2
                    className="heading-secondary"
                    dangerouslySetInnerHTML={{ __html: sizeLarge }}
                  />
                  <div
                    className="btnTg hidden-mob"
                  >
                    <p>Написать сообщение</p>
                  </div>
                </div>
                <div className="info">
                  <p
                    className="l-textReg"
                    dangerouslySetInnerHTML={{ __html: descrXLarge }}
                  ></p>
                  {Array.isArray(team) &&
                    team
                      .filter((team) => team.name === "Вячеслав Брижань")
                      .map((team, index) => (
                        <div className="worker" key={`worker-kk-${index}`}>
                          <img
                            className="worker-img"
                            src={
                              team.mainImg
                                ? `${apiUrl}/uploads/${team.image.filename}`
                                : null
                            }
                            alt=""
                          />
                          <span>
                            <p className="m-text">{team.name}</p>
                            <p className="post s-text">{team.post}</p>
                          </span>
                        </div>
                      ))}
                  <div
                    className="btnTg hidden-desk"
                  >
                    <p>
                      Написать сообщение
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Contacts/>
      </>
    );
  }