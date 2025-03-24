'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProjectsClient = dynamic(() => import('../../pages/projects/Projects.client'), {
  ssr: false,
  loading: () => <div>Загрузка...</div>
});

export default function ClientWrapper({ initialProjects, initialThemes, initialTypes, searchParams }) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ProjectsClient 
        initialProjects={initialProjects}
        initialThemes={initialThemes}
        initialTypes={initialTypes}
        searchParams={searchParams}
      />
    </Suspense>
  );
} 