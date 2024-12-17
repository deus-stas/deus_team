import Agency from "../../pages/agency/Agency";

export async function generateMetadata() {
  const res = await fetch(`http://localhost:3000/api/seo`, { cache: 'no-store' });
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