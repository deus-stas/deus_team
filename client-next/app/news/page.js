import News from "../../pages/news/News";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = await getHeaders();
  const url = headers.get("referer"); 
  const currentUrl = new URL(url).origin;
  
  const res = await fetch(`${currentUrl}/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();


  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === "Главная");

  return {
    title: data.seoTitle || "Главная", // Заголовок
    description: data.seoDescription || "Главная", // Мета-описание
    keywords: data.seoKeywords || "Главная", // Ключевые слова
  };
}

export default function Home() {
    return (
        <>
          <News/>
        </>
    );
  }