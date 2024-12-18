import ProjectDetail from "../../../pages/projects/projectDetail/ProjectDetail";
import { headers as getHeaders } from "next/headers";

export async function generateMetadata() {
  const headers = await getHeaders();
  const referer = headers.get("referer"); 
  if(referer) {

    const [baseUrl, path] = referer.split("/projects");
  
    const res = await fetch(`${baseUrl}/api/projects${path}`, { cache: 'no-store' });
    const seoData = await res.json();
    console.log(seoData);
    return {
      title: seoData?.seoTitle || "Проект", // Заголовок
      description: seoData?.seoDescription || "Проект", // Мета-описание
      keywords: seoData?.seoKeywords || "Проект", // Ключевые слова
    };
  } else {
    return {
      title: "Проект", // Заголовок
      description: "Проект", // Мета-описание
      keywords:  "Проект", // Ключевые слова
    };
  }
}

export default function Home() {
  
    return (
      <main>
        <ProjectDetail/>
      </main>
    );
  }