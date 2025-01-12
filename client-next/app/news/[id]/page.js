import NewsDetail from "../../../pages/news/newsDetail/NewsDetail";
import { headers } from "next/headers";

// import { headers as getHeaders } from "next/headers";

// export const revalidate = 0; // Отключает кэширование

// function defaultMetadata() {
//   return {
//     title: "Новости",
//     description: "Новости",
//     keywords: "Новости",
//   };
// }

// async function fetchSeoData(baseUrl, path) {
//   try {
//     const res = await fetch(`${baseUrl}/api/url/${path}`, { cache: 'no-store' });

//     if (!res.ok) {
//       throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
//     }

//     return await res.json();
//   } catch (error) {
//     // console.error(`Ошибка при запросе данных SEO: ${error.message}`);
//     return null;
//   }
// }

// export async function generateMetadata() {
//   const headers = await getHeaders();
//   const referer = headers.get("referer");

//   console.log('referer', referer);
//   if (referer && referer.includes("/news")) {
//     const [baseUrl, path] = referer.split("/news");
//     console.log('baseUrl', baseUrl);
//     console.log('path', path);
//     const seoData = await fetchSeoData(baseUrl, path);
//     console.log('seoData', seoData);
//     return {
//       title: seoData?.seoTitle || "Новости",
//       description: seoData?.seoDescription || "Новости",
//       keywords: seoData?.seoKeywords || "Новости",
//     };
//   } else {
//     return defaultMetadata();
//   }
// }

// Функция для настройки метаданных страницы
export async function generateMetadata({ params }) {
  const { id } = params;

  // Получаем текущий базовый URL из заголовков
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const baseUrl = `${protocol}://${host}`;
  
  // Пример запроса на сервер для получения данных о проекте
  const response = await fetch(`${baseUrl}/api/url/${id}`, {
    cache: "no-store", // Можно использовать "force-cache" для кэширования
  });

  const seoData = await response.json();

  return {
      title: seoData?.seoTitle || "Проект", // Заголовок
      description: seoData?.seoDescription || "Проект", // Мета-описание
      keywords: seoData?.seoKeywords || "Проект", // Ключевые слова
  };
}


export default function Home({ params }) {
    return (
        <>
          <NewsDetail/>
        </>
    );
  }