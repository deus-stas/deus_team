import Services from "../../pages/services/Services";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = getHeaders();
  const host = headers.get("host"); // Достаем host
  const currentUrl = `http://${host}`;
   
  const res = await fetch(`${currentUrl}/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();


  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === "Услуги");

  return {
    title: data.seoTitle || "Услуги", // Заголовок
    description: data.seoDescription || "Описание страницы услуг.", // Мета-описание
    keywords: data.seoKeywords || "услуги, сервисы", // Ключевые слова
  };
}

export default function Home() {
    return (
        <>
          <Services/>
        </>
    );
  }