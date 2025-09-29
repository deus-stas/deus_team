import Link from "next/link";
import NewsDetail from "../../../pages/news/newsDetail/NewsDetail";
import { headers } from "next/headers";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

async function getNewsData(id) {
  try {
    // Получаем данные новости
    const response = await fetch(`${apiUrl}/api/url/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news data: ${response.status}`);
    }

    const dataDetail = await response.json();

    // Получаем тег новости
    if (dataDetail.newsTags) {
      const tagResponse = await fetch(`${apiUrl}/api/newsTags/${dataDetail.newsTags}`);
      const tagData = await tagResponse.json();
      dataDetail.newsTags = tagData.name;
    }

    // Получаем все новости и их теги
    const [tagsResponse, newsResponse] = await Promise.all([
      fetch(`${apiUrl}/api/newsTags`),
      fetch(`${apiUrl}/api/news`)
    ]);

    const tags = await tagsResponse.json();
    const news = await newsResponse.json();

    // Создаем маппинг тегов
    const tagsMap = tags.reduce((obj, tag) => {
      obj[tag._id] = tag.name;
      return obj;
    }, {});

    // Обогащаем новости тегами
    const enrichedNews = news.map(newsItem => ({
      ...newsItem,
      newsTags: tagsMap[newsItem.newsTags]
    }));

    return {
      detail: dataDetail,
      news: enrichedNews
    };
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const { detail } = await getNewsData(id);

  if (!id) {
    console.error("Missing ID parameter");
    return {
      title: "Error",
      description: "ID parameter is missing",
    };
  }

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
    console.log (detail);
  return {
    title: detail?.seoTitle || "Новости",
    description: detail?.seoDescription || "Новости",
    keywords: detail?.seoKeywords || "Новости",
      openGraph: {
          title: detail?.seoTitle || "Новости",
          description: detail?.seoDescription || "Новости",
          type: 'website',
          images:[baseUrl+'/'+detail.image.path]
      },
      twitter: {},
      alternates: {
          canonical: baseUrl+"/blog"+detail.urlName,
      },
  };
}

export default async function NewsPage({ params }) {
  const { id } = params;
  const { detail, news } = await getNewsData(id);

  return (
    <>
      <main className="news-detail destroy" style={{display: 'none'}}>
        <div className="container">
            <section className="news-detail__main">
                <div className="news-detail__main-content">
                    <div className="news-detail__main-tag m-text">
                        {`${detail.newsTags}`}
                    </div>
                    <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: detail.name}}></h1>
                    {detail.body && detail.body !== 'undefined' && detail.body !== 'null' &&
                        <p style={{color:"#757677"}} className="m-text" dangerouslySetInnerHTML={{__html: detail.description}}/>}
                    <a className="m-text telegram"
                        href="https://t.me/deusagency"
                        target="_blank"
                        rel="noopener noreferrer">
                        Читайте нас в Telegram 
                    </a>

                </div>
            </section>

            <section className="news-detail__article">

                {detail.body && detail.body !== 'undefined' && detail.body !== 'null' &&
                    <div className="news-detail__article-content">
                        <h2 style={{marginBottom:"2rem"}} className="heading-secondary"
                            dangerouslySetInnerHTML={{__html: detail.aboutClient}}/>
                        <h2 className="heading-secondary"
                            dangerouslySetInnerHTML={{__html: detail.underAboutClient}}/>
                        <div className="news-detail__article-about m-text"
                              dangerouslySetInnerHTML={{__html: detail.body}}/>
                        {detail.bannerSecond ? (
                            <>
                                <p style={{textAlign:'center', margin:'1rem 0', color:'rgba(117, 118, 119, 1)'}}>{detail.aboutImg}</p>
                            </>

                        ) : null}
                        <div className="news-detail__article-about  m-text"
                              dangerouslySetInnerHTML={{__html: detail.body2}}/>
                    </div>
                }

                {detail.body3 && detail.body3 !== 'undefined' && detail.body3 !== 'null' &&
                    <div className="news-detail__article-content">
                        <h2 className="heading-secondary"
                            dangerouslySetInnerHTML={{__html: detail.aboutClient2}}/>
                        <div className="news-detail__article-about m-text"
                              dangerouslySetInnerHTML={{__html: detail.body3}}/>
                    </div>
                }

                {!!detail.photoSlider && detail.photoSlider.length > 0 && (
                    <section
                        style={{ backgroundColor: "black" }}
                        className="news-detail__slider borderBlock"
                    >
             
                            {detail.photoSlider.filter(val => !!val).map((banner, index) => (
                                <div key={index}>
                                    <img
                                        className=""
                                        src={`${apiUrl}/uploads/${banner.filename}`}
                                        alt={banner.name}
                                    />
                                </div>
                            ))}
                    </section>
                )}

                {detail.body4 && detail.body4 !== 'undefined' && detail.body4 !== 'null' &&
                    <div className="news-detail__article-content">
                        <h2 className="heading-secondary"
                            dangerouslySetInnerHTML={{__html: detail.aboutClient3}}/>
                        <div className="news-detail__article-about m-text"
                              dangerouslySetInnerHTML={{__html: detail.body4}}/>
                    </div>
                }

                {detail.bannerThird ? (
                    <>
                        <p style={{textAlign:'center', margin:'1rem 0', color:'rgba(117, 118, 119, 1)'}}>{detail.aboutImg2}</p>
                    </>

                ) : null}

                {detail.body5 && detail.body5 !== 'undefined' && detail.body5 !== 'null' &&
                    <div className="news-detail__article-content">
                        <h2 className="heading-secondary"
                            dangerouslySetInnerHTML={{__html: detail.aboutClient4}}/>
                        <div className="news-detail__article-about m-text"
                              dangerouslySetInnerHTML={{__html: detail.body5}}/>
                    </div>
                }

            </section>

            <section className="news-detail__more">
                <div className="news-detail__more-content">
                    <div className="news-detail__more-content__info">
                        <h2 className="heading-secondary">Ещё статьи</h2>

                    </div>

                    <div className="news-detail__more-wrap">
                        {news
                            .filter((item) => item.id !== detail.id)
                            .slice(-5)
                            .map((item, index) => {
                                const fileUrl = item.image ? `${apiUrl}/uploads/${item.image.filename}` : null;
                                const isVideo = item.image ? /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(item.image.filename) : false;
                                const isImage = item.image ? /\.(jpeg|jpg|gif|png)$/i.test(item.image.filename) : false;

                                    return (
                                        <div className={`flex-wrap `}
                                            key={item.id}
                                               >
                                            <Link href={`/blog/${item.urlName}`}
                                                          className="news__item  slider">
                                                    {isVideo && (
                                                        <video
                                                            autoPlay={shouldAutoPlay}
                                                            muted
                                                            playsInline
                                                            src={fileUrl}
                                                            loop
                                                        />
                                                    )}
                                                    {isImage && (
                                                        <img
                                                            src={fileUrl}
                                                            alt={item.name}
                                                        />
                                                    )}
                                            </Link>
                                            <span>
                                              <p className="news-main__text s-text">{item.newsTags}</p>
                                              <p className="news-main__descr m-text">{item.name}</p>
                                            </span>
                                        </div>
                                    );
                                })}
                        <div
                            className="slider-touch-area"

                        />
                    </div>
                </div>
            </section>
        </div>
      </main>
      <NewsDetail initialData={{ detail, news }} />
    </>
  );
}

