export async function generateMetadata(page) {
  const res = await fetch(`http://localhost:3000/api/seo`, { cache: 'no-store' });
  const seoData = await res.json();

  // Фильтруем данные и получаем нужный блок
  const data = seoData.find((el) => el.name === page);

  return {
    title: data.seoTitle || page, // Заголовок
    description: data.seoDescription || page, // Мета-описание
    keywords: data.seoKeywords || page, // Ключевые слова
  };
}