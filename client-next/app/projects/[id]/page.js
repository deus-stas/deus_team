import ProjectDetail from "../../../pages/projects/projectDetail/ProjectDetail";
import { headers } from "next/headers";


// Функция для настройки метаданных страницы
export async function generateMetadata({ params }) {
  const { id } = params;

  // Получаем текущий базовый URL из заголовков
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  // const baseUrl = `${protocol}://${host}`;
  const baseUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`; // Укажите URL вашего API

  // Пример запроса на сервер для получения данных о проекте
  const response = await fetch(`${baseUrl}/api/projects/${id}`, {
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
        <ProjectDetail/>
    );
  }