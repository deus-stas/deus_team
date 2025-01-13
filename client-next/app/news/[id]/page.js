import NewsDetail from "../../../pages/news/newsDetail/NewsDetail";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { id } = params;

  if (!id) {
    console.error("Missing ID parameter");
    return {
      title: "Error",
      description: "ID parameter is missing",
    };
  }

  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");

  if (!host) {
    console.error("Host header is missing");
    return {
      title: "Error",
      description: "Invalid host configuration",
    };
  }

  const baseUrl = `${protocol}://${host}`;

  try {
    const response = await fetch(`${baseUrl}/api/url/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch SEO data: ${response.status} ${response.statusText}`);
      return {
        title: "Error",
        description: "Failed to fetch SEO data",
      };
    }

    const seoData = await response.json();
    return {
      title: seoData?.seoTitle || "Новости",
      description: seoData?.seoDescription || "Новости",
      keywords: seoData?.seoKeywords || "Новости",
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching SEO data",
    };
  }
}

export default function Home() {
  return (
    <>
      <NewsDetail />
    </>
  );
}
