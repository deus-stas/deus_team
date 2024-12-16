import Projects from "../../pages/projects/Projects";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = getHeaders();
  const host = headers.get("host"); // Достаем host
  const currentUrl = `http://${host}`;
 
  const res = await fetch(`${currentUrl}/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();

  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === "Проекты");

  return {
    title: data.seoTitle || "Проекты", // Заголовок
    description: data.seoDescription || "Проекты", // Мета-описание
    keywords: data.seoKeywords || "Проекты", // Ключевые слова
  };
}

export default function Home() {
    return (
      <main>
        <Projects/>
      </main>
    );
  }