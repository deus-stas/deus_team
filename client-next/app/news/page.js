import Link from "next/link";
import News from "../../pages/news/News";
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
  
  const baseUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`; // Укажите URL вашего API
  // const baseUrl = `${protocol}://${host}`;

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
      title: data?.seoTitle || "Новости",
      description: data?.seoDescription || "Новости",
      keywords: data?.seoKeywords || "Новости",
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

async function getNewsTags() {
  const response = await fetch(`${apiUrl}/api/newsTags`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getNews() {
  const response = await fetch(`${apiUrl}/api/news`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default async function Home() {
    const [news, newsTags] = await Promise.all([
      getNews(),
      getNewsTags(),
    ]);
    const allNewsCount = news.length
    const filteredNews = news;
    const formatNumber = (num) => {
      return num.toString().padStart(2, '0');
    };
    return (
        <>
          <main className="news" style={{display: 'none'}}>
              <div className="container">
                  <section className="news-start">
                    <span className="news-start__text">
                      <p className="breadcrumb">Блог</p>
                      <h1 className="heading-primary">Делимся полезной<br/> информацией</h1>
                    </span>

                  </section>
                  <section className="news-main">
                      <div className="news-main__wrap">
                          {filteredNews.map((item, index) => {
                              return (
                                  <div className="flex-wrap" key={`key-index-${index}`}>
                                      <Link href={`/news/${item.urlName}`}  className={`news-main__item news-main__${index + 1}`}
                                          key={`key-link-${item.id}`}>
                                      </Link>
                                      <span>
                                          <p className="news-main__text s-text">{item.newsTags}</p>
                                          <p className="news-main__descr m-text">{item.name}</p>
                                      </span>

                                  </div>

                              )
                          })}
                          <div className="flex-wrap filter">
                              <div className="news-main__filters borderBlock padding">
                                  <div
                                      className={`news-main__filters-btn m-text`}
                                  >
                                      <span className="news-main__filters-btn__flexWrap">
                                          <p className="name">Все</p>
                                          <p className="num xs-text">{formatNumber(allNewsCount)}</p>
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </section>
              </div>
          </main>
          <News/>
        </>
    );
  }