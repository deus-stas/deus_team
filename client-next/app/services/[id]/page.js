import Link from "next/link";
import ServicesDetail from "../../../pages/services/servicesDetail/ServicesDetail";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

async function getServices(id) {
  
  const response = await fetch(`${apiUrl}/api/services/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getServiceData(id) {
  try {
    const response = await fetch(`${apiUrl}/api/services/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status}`);
    }
    const data = await response.json(); // { ... } вместо Response

    return data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
}

async function getClientData() {
  try {
    const response = await fetch(`${apiUrl}/api/clients`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status}`);
    }
    const data = await response.json(); // { ... } вместо Response

    return data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
}

async function getNewsData() {
  try {
    const response = await fetch(`${apiUrl}/api/news`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status}`);
    }
    const data = await response.json(); // { ... } вместо Response

    return data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
}


export async function generateMetadata({ params }) {
  const { id } = params;
  const serviceData = await getServices(id);

  return {
    title: serviceData?.seoTitle || "Cервис",
    description: serviceData?.seoDescription || "Cервис",
    keywords: serviceData?.seoKeywords || "Cервис",
  };
}

function checkPatch(key) {
  switch (key) {
    case 'tech-support':
      return '66d588115f6a722e1a741ac3';
    case 'site-and-services':
      return '66f52f3cbd62dc9e4f0f03fd';
    case 'corporate-identity':
      return '66f52fa4bd62dc9e4f0f0586';
    case 'seo':
      return '66f52fecbd62dc9e4f0f0672';
    case 'video-production':
      return '66f5303bbd62dc9e4f0f0786';
    case 'smm':
      return '66f5306dbd62dc9e4f0f0829';
  }
}

function splitArrayIntoChunks(array, numChunks) {
  const chunkSize = Math.floor(array.length / numChunks); // Определяем размер каждой части
  const totalItems = chunkSize * numChunks; // Определяем общее количество элементов, которое нужно использовать
  const trimmedArray = array.slice(0, totalItems); // Обрезаем массив до нужного размера

  const chunks = Array.from({ length: numChunks }, (_, i) =>
    trimmedArray.slice(i * chunkSize, (i + 1) * chunkSize)
  );
  return chunks;
}

export default async function Home({ params }) {
  const { id } = params;
  


  const [ services, clients, news ] = await Promise.all([
    getServiceData(id),
    getClientData(),
    getNewsData(),
  ]);

  const filteredNews = news;

  console.log(services);

  return (
    <> 
      <main className="service"  style={{display: 'none'}}>
              {services && 
                  <section className="services-detail-start">
                      <div className="services-about__wrap">
                          <h1 className="heading-primary">{services.name}</h1>
                          <div className="services-detail-start__content">
                              {/* <p  className="services-detail-start__text" >{services.description}</p> */}
                              <Link href={`/contacts`} className="services-detail-start__btn" >Расчитать стоимость</Link>
                          </div>
                      </div>
                  </section>
              }
              {services && services.serviceBanner &&        
                  <section className="services-detail-banner">
                      <img className="services-detail-banner__img" src={`${apiUrl}/${services.serviceBanner.path}`}/>
                  </section>
                  
              }

              {services &&             
                  <section className="services-detail-aspro">
                      <div className="services-detail-aspro__wrap">
                          <div className="services-detail-aspro__title">
                              <h2 className="heading-secondary" dangerouslySetInnerHTML={{ __html: services.asproTemplatesTitle }} />
                              <p className="services-detail-aspro__subtitle" dangerouslySetInnerHTML={{ __html: services.asproTemplatesDescription }} />
                          </div>
                          <div className="services-detail-aspro__wrapp">
                              {services.asproTemplatesOptions &&
                                  Array.isArray(services.asproTemplatesOptions) &&
                                  services.asproTemplatesOptions.map((item, index) => (
                                      <div className="services-detail-aspro__wrap-item" key={`services-detail-aspro__wrap-item-${index}`}>
                                          <p className="num">0{++index}</p>
                                          <span className="flex-wrap">
                                              <p className="text l-textMed" dangerouslySetInnerHTML={{ __html: item.title}} />
                                              <p dangerouslySetInnerHTML={{ __html: item.description}} />
                                          </span>
                                      </div>
              
                              ))}
                          </div>
                      </div>

                  </section>
              }
              
              {services &&                         
                  <section className="services-detail-type">
                      <div className="services-detail-type__wrap">
                          <div className="services-detail-type__title">
                              <h2 className="heading-secondary">
                                  {services.serviceIncludesTitle}
                              </h2>
                              <p className="services-detail-aspro__subtitle"  dangerouslySetInnerHTML={{ __html: services.serviceIncludesDescription }} /> 
                              <Link href={`/contacts`} className="services-form__btn --accent" >Расчитать стоимость</Link>
                          </div>
                          <div className="services-detail-type__info">
                                  {services.serviceIncludesOptions &&
                                      Array.isArray(services.serviceIncludesOptions) &&
                                      services.serviceIncludesOptions.map((item, index) => (
                                          <div className="services-detail-type__item type-item" key={`services-detail-type__item-${index}`}>
                                              <div className="type-item__title" dangerouslySetInnerHTML={{ __html: item.title}} />
                                              <div className="type-item__bottom">
                                                  <div className="type-item__subtitle" dangerouslySetInnerHTML={{ __html: item.description}} />
                                              </div>
                                          </div>
                                  ))}
                          </div>
                          <div className="services-detail-type__bg">
                              <img className="services-detail-type__img" src="img/services-detail/bg-1.svg"/>
                          </div>
                      </div>
                  </section>
              }

              {services && 
                  <section className="services-detail-price">
                      <div className="services-detail-price__wrapp borderBlock padding">
                          <div className="services-detail-price__wrapp-item">
                              <div className="describe">
                                  <div className="describe__top">
                                      <h2 className="heading-secondary">
                                          Примерная стоимость
                                      </h2>
                                      <div className="describe__wrapp ">
                                          <p className="s-text">
                                              Объединяем аналитику, маркетинг, дизайн, разработку<br/> и интеграции в единую систему для получения<br/> максимальной эффективности для вашего бизнеса
                                          </p>
                                      </div>
                                  </div>
                                  <Link href={`/contacts`} className="services-form__btn --accent" >Расчитать стоимость</Link>
                              </div>
                              <div className="describe__wrapp-benefits">
                                  {!!services.tariffs && services.tariffs.map((tariffs, index) => {
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
                      </div>
                  </section>
              }


              <section className="services-detail-cases">
                  <div className="services-detail-cases__wrap cases-wrap">
                      <div className="cases-wrap__header">
                          <Link href={`/projects`} className="article__link" >Все кейсы</Link>
                      </div>
                      <div className="cases-wrap__body">
          
                      </div>
                  </div>

              </section>

              {services && 
                  <section className="services-detail-faq">
                      <div className="services-detail-faq__wrap faq-wrap">
                          <div className="faq-wrap__info">
                              <h2 className="heading-secondary" dangerouslySetInnerHTML={{ __html: services.faqTitle}} />
                              <div className="faq-wrap__subtitle">Если вы не нашли ответ на ваш вопрос напишите нашему руководителю и он на них ответит</div>
                              <div className="faq-wrap__person">
                                  <img className="faq-wrap__person-img" src="img/faq/1.png"/>
                                  <div className="faq-wrap__person-info">
                                      <div className="faq-wrap__person-name">Брижань Вячеслав</div>
                                      <div className="faq-wrap__person-work">Генеральный директор</div>
                                  </div>
                              </div>
                              <div className="faq-wrap__btns">
                                  <a className="faq-wrap__btn -tg">
                                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M15.755 0.719483C15.5598 0.479724 15.2667 0.347656 14.9296 0.347656C14.7478 0.347656 14.5552 0.38572 14.3571 0.460754L0.81115 5.59313C0.0909044 5.86608 -0.00603664 6.27694 0.000276097 6.49754C0.00655758 6.71705 0.125656 7.11875 0.85062 7.35063L3.72338 8.40339L5.23741 11.8691C5.3896 12.3484 5.70761 12.6846 6.1135 12.7937C6.20707 12.8189 6.3026 12.8312 6.39883 12.8312C6.72846 12.8312 7.06598 12.6861 7.35745 12.4123L8.61181 11.2338L11.6724 13.3404C11.948 13.5441 12.2479 13.6517 12.5404 13.6516C13.134 13.6516 13.6074 13.2171 13.7465 12.5446L15.9619 1.82977C16.053 1.38941 15.9795 0.995118 15.755 0.719483ZM4.67545 8.24073L8.58469 6.14437L5.86021 8.64349C5.76321 8.73247 5.70918 8.85782 5.70902 8.98845C5.70883 8.99326 5.70824 8.99795 5.70821 9.00276L5.6988 10.5832L4.67545 8.24073ZM6.71556 11.729C6.68665 11.7561 6.65768 11.78 6.62905 11.8008L6.64052 9.87695L7.82153 10.6899L6.71556 11.729ZM15.0438 1.63992L12.8284 12.3548C12.8061 12.4628 12.7332 12.7141 12.5403 12.7141C12.4502 12.7141 12.3385 12.6677 12.2257 12.5835C12.2208 12.5799 12.2159 12.5764 12.2109 12.573L8.83679 10.2505C8.83632 10.2502 8.83585 10.2499 8.83542 10.2496L6.92772 8.93651L11.9671 4.31396C12.1413 4.15424 12.1693 3.88988 12.0325 3.69719C11.8957 3.50449 11.6369 3.44374 11.4287 3.5554L4.03643 7.51961L1.1636 6.46685C1.16151 6.46607 1.15941 6.46532 1.15729 6.46457L14.6893 1.33747C14.8034 1.29425 14.883 1.28519 14.9296 1.28519C14.9528 1.28519 15.0087 1.28775 15.0281 1.3115C15.0528 1.34191 15.084 1.44532 15.0438 1.63992Z" fill="white"/>
                                      </svg>
                                      <span>Telegram</span>
                                  </a>
                                  <a className="faq-wrap__btn -wa">
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_5119_21830)">
                                              <path d="M10.1395 12.5702C9.84455 12.5702 9.52789 12.5348 9.19293 12.4629C8.06708 12.2217 6.83808 11.5913 5.73212 10.6879C4.62628 9.7843 3.76447 8.70667 3.30573 7.65332C2.80243 6.49805 2.83295 5.48718 3.39142 4.80701C3.40766 4.78748 3.40766 4.78748 4.36237 3.81738L4.74408 3.42969L6.85199 6.22522L6.10785 7.13147C6.4704 7.63269 6.89887 8.16724 7.43939 8.60889C7.97992 9.05054 8.58991 9.36414 9.15399 9.62L9.90363 8.70715L13.0184 10.282L12.7205 10.7212C11.9897 11.7992 11.9897 11.7992 11.9732 11.8191C11.5666 12.3142 10.9317 12.5702 10.1395 12.5702ZM4.10529 5.41382C3.79718 5.80505 3.81854 6.48413 4.16547 7.28076C4.5661 8.20032 5.33344 9.15344 6.32624 9.96448C7.31903 10.7755 8.40705 11.3381 9.38983 11.5487C10.2407 11.7311 10.9121 11.6184 11.2368 11.24C11.2831 11.1718 11.4586 10.9132 11.6462 10.6366L10.1517 9.88086L9.42792 10.7621L9.1026 10.6205C8.39765 10.3135 7.5838 9.93542 6.8454 9.33228C6.107 8.729 5.57514 8.00757 5.13458 7.37878L4.93134 7.0885L5.66046 6.20056L4.64984 4.86023C4.39984 5.11426 4.16486 5.35303 4.10529 5.41382Z" fill="white"/>
                                              <path d="M0.0104981 16L1.49402 12.6229C0.515625 11.2638 0 9.66431 0 7.97925C0 5.8479 0.832153 3.84412 2.34314 2.33704C3.85413 0.829956 5.86316 0 8 0C10.1368 0 12.1459 0.829956 13.6569 2.33704C15.1678 3.84412 16 5.8479 16 7.97925C16 10.1106 15.1678 12.1144 13.6569 13.6215C12.1459 15.1285 10.1368 15.9585 8 15.9585C6.47449 15.9585 5 15.5317 3.72046 14.7219L0.0104981 16ZM3.85352 13.6869L4.04761 13.818C5.21631 14.6066 6.58301 15.0236 8 15.0236C9.88647 15.0236 11.66 14.2908 12.994 12.9603C14.3279 11.6298 15.0625 9.86084 15.0625 7.97925C15.0625 6.09778 14.3279 4.32874 12.9939 2.99829C11.66 1.66785 9.88647 0.935059 8 0.935059C6.11353 0.935059 4.33997 1.66785 3.0061 2.99829C1.67212 4.32874 0.9375 6.09766 0.9375 7.97925C0.9375 9.54944 1.44458 11.0354 2.40393 12.2762L2.57349 12.4956L1.72864 14.4188L3.85352 13.6869Z" fill="white"/>
                                          </g>
                                          <defs>
                                              <clipPath id="clip0_5119_21830">
                                                  <rect width="16" height="16" fill="white"/>
                                              </clipPath>
                                          </defs>
                                      </svg>
                                      <span>WhatsApp</span>
                                  </a>
                              </div>
                          </div>
                          <div className="faq-wrap__list">
                                {services.faqOptions &&
                                      Array.isArray(services.faqOptions) &&
                                      services.faqOptions.map((item, index) => (
                                          <div className="faq-wrap__item"  key={`faq-wrap__item-${index}`}>
                                              <div className="faq-wrap__top">
                                                  <div className="faq-wrap__title" dangerouslySetInnerHTML={{ __html: item.title}} />
                                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <circle cx="20" cy="20" r="20" fill="#EEEEEE"/>
                                                      <path d="M15 20.25H25" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                              </div>
                                              <div className="faq-wrap__content" dangerouslySetInnerHTML={{ __html: item.description}} />
                                          </div>
                                  ))}
                          </div>
                      </div>
                  </section>
              }
              {services && 

                  <section className="services-detail-why-us">
                      <div className="services-detail-why-us__wrap why-us padding borderBlock">
                          <h2 className="heading-secondary" dangerouslySetInnerHTML={{ __html: services.whyChooseUsTitle}} />
                          <div className="why-us__body">
                              {services.whyChooseUsOptions &&
                                  Array.isArray(services.whyChooseUsOptions) &&
                                  services.whyChooseUsOptions.map((item, index) => (
                                      <div className="why-us__item" key={`why-us__item-${index}`}>
                                          <div className="why-us__number">
                                              <div className="why-us__number-value">{item.number}</div>
                                              <img className="why-us__number-bg" src="img/why-us/1.svg"/>
                                          </div>
                                          <div className="why-us__info">
                                              <div className="why-us__title" dangerouslySetInnerHTML={{ __html: item.title}} />
                                              <div className="why-us__subtitle" dangerouslySetInnerHTML={{ __html: item.description}} />
                                          </div>
                                      </div>
                              ))}
                          </div>
                      </div>
                  </section>
              }

              {
                  clients ? <section className="agency-clients" id="clients">
                          <div className="agency-clients__head">
                              <h2 className="heading-secondary">Работаем с разными<br/> клиентами по всему миру</h2>
                              <div className="agency-clients__pag hidden-desktop">
                              </div>
                          </div>

                          <div className="main-clients">

                              {clients && splitArrayIntoChunks(clients,  3).map((row, count) => {
                                  return (
                                      <div className={`main-clients__marquee-agency`} key={`row-${count}`}>
                                          <div className="marquee-container-agency">
                                              {row.map((client, i) => (
                                                  <div className='agency-clients__img marquee-item' key={client.id || i}>
                                                      <div className='container-img'>
                                                          <img
                                                              src={client.image ? `/uploads/${client.image.filename}` : null}
                                                              alt={client.name} key={client.id}/>
                                                      </div>

                                                  </div>
                                              ))}
                                              {row.map((client, i) => (
                                                  <div className='agency-clients__img marquee-item' key={client.id || i}>
                                                      <div className='container-img'>
                                                          <img
                                                              src={client.image ? `/uploads/${client.image.filename}` : null}
                                                              alt={client.name} key={client.id}/>
                                                      </div>

                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  )
                              })}

                          </div>

                  </section> : null
              }

              <section className="services-article article">
                  <div className="article__header">
                      <h2 className="heading-secondary">Полезные статьи</h2>
                      <Link href={`/blog`} className="article__link" >Все статьи</Link>

                  </div>
                  <div className="article__body">
                      <div className="article__list">
                          {filteredNews.map((item, index) => {
                              if(index < 4) {
                                  const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                  const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                  const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;
                                  const shouldAutoPlay = item.mainControl;

                                  return (
                                      <div className="article__item" key={index}>
                                          <Link href={`/blog/${item.urlName}`}  className={`news-main__item news-main__${index + 1}`}
                                                          key={item.id}>
                                              {isVideo && <video autoPlay={shouldAutoPlay}
                                                                  muted
                                                                  playsInline
                                                                  src={fileUrl}
                                                                  loop/>}
                                              {isImage && <img  width="300" height='200' src={fileUrl} alt={item.name}/>}
                                          </Link>
                                          <span>
                                              <p className="article__subtitle s-text">{item.newsTags}</p>
                                              <p className="article__title m-text">{item.name}</p>
                                          </span>

                                      </div>

                                  )
                              }
                          })}
                      </div>
                  </div>
              </section>



              <section className="services-form borderBlock padding whiteHeader">
                  <h2 className="heading-secondary">Вам интересно, но нужно больше конкретики?</h2>
                  <form className="services-form__form">

                      <div className="services-form__title">Выберите услугу</div>

                      <div className="services-form__btns">
                          <button type="button" className="services-form__btn" data-service="Услуга 1">Дизайн
                          </button>
                          <button type="button" className="services-form__btn" data-service="Услуга 2">Сайты и сервисы
                          </button>
                          <button type="button" className="services-form__btn" data-service="Услуга 3">SEO
                          </button>
                          <button type="button" className="services-form__btn" data-service="Услуга 1">Видеопродакшн
                          </button>
                          <button type="button" className="services-form__btn" data-service="Услуга 2">Контент-маркетинг
                          </button>
                          <button type="button" className="services-form__btn" data-service="Услуга 3">Техническая поддержка
                          </button>
                      </div>

                      <input type="hidden" name="service" id="service-input" required/>

                      <input type="text" name="name" placeholder="Ваше имя" required/>
                      <input type="tel" name="phone" placeholder="Номер телефона" required pattern="[\d\+\-\(\) ]+"/>

                      <button className="services-form__btn --accent" type="submit">Отправить заявку</button>
                  </form>
              </section>

      </main>
      <ServicesDetail data={services} id={id}/>
    </>
  );
}

