import Contacts from "../../pages/contacts/Contacts";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = getHeaders();
  const host = headers.get("host"); // Достаем host
  const currentUrl = `http://${host}`;
   
  const res = await fetch(`${currentUrl}/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();

  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === "Контакты");

  return {
    title: data.seoTitle || "Контакты", // Заголовок
    description: data.seoDescription || "Контакты", // Мета-описание
    keywords: data.seoKeywords || "Контакты", // Ключевые слова
  };
}

export default function Home() {
    return (
      <main>
        <Contacts/>
      </main>
    );
  }