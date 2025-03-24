import ClientWrapper from './ClientWrapper';

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/projects/`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getThemes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/themes/`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch themes');
    const data = await res.json();
    return data.map((item) => ({
      value: item.id,
      label: item.name,
      href: item.href
    }));
  } catch (error) {
    console.error('Error fetching themes:', error);
    return [];
  }
}

async function getTypes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/types/`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch types');
    const data = await res.json();
    return data.map((item) => ({
      value: item.id,
      label: item.name,
      href: item.key
    }));
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
}

export default async function ProjectsPage({ searchParams }) {
  const [projects, themes, types] = await Promise.all([
    getProjects(),
    getThemes(),
    getTypes()
  ]);

  return (
    <ClientWrapper 
      initialProjects={projects}
      initialThemes={themes}
      initialTypes={types}
      searchParams={searchParams}
    />
  );
} 