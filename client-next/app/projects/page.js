import { Suspense } from 'react';
import ProjectsClient from '../../pages/projects/Projects.client';  

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/projects/`);
  return res.json();
}

async function getThemes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/themes/`);
  const data = await res.json();
  return data.map((item, i) => ({
    value: item.id,
    label: item.name,
    href: item.href
  }));
}

async function getTypes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/types/`);
  const data = await res.json();
  return data.map((item, i) => ({
    value: item.id,
    label: item.name,
    href: item.key
  }));
}

export default async function ProjectsPage({ searchParams }) {
  const [projects, themes, types] = await Promise.all([
    getProjects(),
    getThemes(),
    getTypes()
  ]);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ProjectsClient 
        initialProjects={projects}
        initialThemes={themes}
        initialTypes={types}
        searchParams={searchParams}
      />
    </Suspense>
  );
} 