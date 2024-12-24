import NewsDetail from "../../../pages/news/newsDetail/NewsDetail";
import { headers as getHeaders } from "next/headers";

export const revalidate = 0; // Отключает кэширование

function defaultMetadata() {
  return {
    title: "Новости",
    description: "Новости",
    keywords: "Новости",
  };
}

async function fetchSeoData(baseUrl, path) {
  try {
    const res = await fetch(`${baseUrl}/api/url/${path}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    // console.error(`Ошибка при запросе данных SEO: ${error.message}`);
    return null;
  }
}

export async function generateMetadata() {
  const headers = await getHeaders();
  const referer = headers.get("referer");

  console.log('referer', referer);
  if (referer && referer.includes("/news")) {
    const [baseUrl, path] = referer.split("/news");
    console.log('baseUrl', baseUrl);
    console.log('path', path);
    const seoData = await fetchSeoData(baseUrl, path);
    console.log('seoData', seoData);
    return {
      title: seoData?.seoTitle || "Новости",
      description: seoData?.seoDescription || "Новости",
      keywords: seoData?.seoKeywords || "Новости",
    };
  } else {
    return defaultMetadata();
  }
}

export default function Home() {
    return (
        <>
          <NewsDetail/>
        </>
    );
  }