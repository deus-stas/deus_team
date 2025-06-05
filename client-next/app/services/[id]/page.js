import ServicesDetail from "../../../pages/services/servicesDetail/ServicesDetail";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

async function getServices(id) {
  
  const response = await fetch(`${apiUrl}/api/services/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function checkPatch(key) {
  switch (key) {
    case 'tech-support':
      return '66d588115f6a722e1a741ac3';
    case 'site-and-services':
      return '66f52f3cbd62dc9e4f0f03fd';
    case 'corporate-identity':
      return '66f52fa4bd62dc9e4f0f0586';
    case 'seo':
      return '66f52fecbd62dc9e4f0f0672';
    case 'video-production':
      return '66f5303bbd62dc9e4f0f0786';
    case 'smm':
      return '66f5306dbd62dc9e4f0f0829';
  }
}

export default async function Home({ params }) {
  const { id } = params;
  


  const [ services ] = await Promise.all([
    getServices(id),
  ]);

  // const data = services.find(el => el.path === id);
  // console.log(data)
  return (
    <>
      <ServicesDetail data={services} id={id}/>
    </>
  );
}

