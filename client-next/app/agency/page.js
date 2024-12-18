import Agency from "../../pages/agency/Agency";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = getHeaders();
  const host = headers.get("host"); // Достаем host
  const currentUrl = `http://${host}`;
   
  const res = await fetch(`${currentUrl}/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();

  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === "Агентство");

  return {
    title: data.seoTitle || "Агентство", // Заголовок
    description: data.seoDescription || "Агентство", // Мета-описание
    keywords: data.seoKeywords || "Агентство", // Ключевые слова
  };
}


export default function Home() {
    return (
        <>
          <Agency/>
        </>
    );
  }