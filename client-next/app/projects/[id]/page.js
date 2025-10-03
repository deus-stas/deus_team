import ProjectDetail from "../../../pages/projects/projectDetail/ProjectDetail";
import { headers } from "next/headers";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

async function getProjectData(id) {
  try {
    const response = await fetch(`${apiUrl}/api/projects/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status}`);
    }

    const dataDetail = await response.json();
    const requests = [];

    if (dataDetail.taskPersons && dataDetail.taskPersons !== 'undefined' && dataDetail.taskPersons !== 'null') {
      requests.push(
        fetch(`${apiUrl}/api/persons/${dataDetail.taskPersons}`)
          .then(res => res.json())
          .then(data => ({ taskPersons: data }))
      );
    }

    if (dataDetail.approachList) {
      dataDetail.approachList.forEach(val => {
        if (val.approachPersons) {
          requests.push(
            fetch(`${apiUrl}/api/persons/${val.approachPersons}`)
              .then(res => res.json())
              .then(data => ({ approachPersons: data }))
          );
        }
      });
    }

    if (dataDetail.approachListSecond) {
      dataDetail.approachListSecond.forEach(val => {
        if (val.approachPersons) {
          requests.push(
            fetch(`${apiUrl}/api/persons/${val.approachPersons}`)
              .then(res => res.json())
              .then(data => ({ approachPersons: data }))
          );
        }
      });
    }

    if (dataDetail.approachListThird) {
      dataDetail.approachListThird.forEach(val => {
        if (val.approachPersons) {
          requests.push(
            fetch(`${apiUrl}/api/persons/${val.approachPersons}`)
              .then(res => res.json())
              .then(data => ({ approachPersons: data }))
          );
        }
      });
    }

    if (dataDetail.approachPersons && dataDetail.approachPersons !== 'undefined') {
      requests.push(
        fetch(`${apiUrl}/api/persons/${dataDetail.approachPersons}`)
          .then(res => res.json())
          .then(data => ({ approachPersons: data }))
      );
    }

    if (dataDetail.resultPersons && dataDetail.resultPersons !== 'undefined') {
      requests.push(
        fetch(`${apiUrl}/api/persons/${dataDetail.resultPersons}`)
          .then(res => res.json())
          .then(data => ({ resultPersons: data }))
      );
    }

    const results = await Promise.all(requests);
    const enrichedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), dataDetail);

    // Получаем тему проекта
    const themeResponse = await fetch(`${apiUrl}/api/themes/`);
    const themes = await themeResponse.json();
    const theme = themes.find(t => t.id === enrichedData.projectTheme)?.name;

    return { ...enrichedData, theme };
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const projectData = await getProjectData(id);
  const baseUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;
  console.log(projectData);
  return {
    title: projectData?.seoTitle || "Проект",
    description: projectData?.seoDescription || "Проект",
    keywords: projectData?.seoKeywords || "Проект",
    openGraph: {
      title: projectData?.seoTitle || "Проект",
      description: projectData?.seoDescription || "Проект",
      type: 'website',
      images:[baseUrl+'/'+projectData.image?.path || baseUrl+'/deus.png'],
      url: baseUrl+"/projects/"+projectData.nameInEng
    },
    twitter: {},
    alternates: {
      canonical:baseUrl+"/projects/"+projectData.nameInEng,
    },
  };
}

export default async function Home({ params }) {
  const { id } = await params;
  const projectData = await getProjectData(id);

  return (
    <>
      {/* <main id="toUp" className="project">
        <div className="container">
          <section className="project-main">
            <span className="project-maint__text">
              <p className="breadcrumb m-text">{projectData.date} • {projectData.name}</p>
              <h1 className="heading-primary"
                dangerouslySetInnerHTML={{ __html: projectData.descrProject }}></h1>
            </span>

            {projectData.about && projectData.about !== 'undefined' && (
              <div className="project-main__wrap borderBlock padding">
                <div className="project-main__subtitle heading-secondary">О клиенте</div>
                <div className="project-main__text">
                  <div className="project-main__descr l-textReg" dangerouslySetInnerHTML={{ __html: projectData.about }} />
                  <div className="project-main__info">
                    <div className="project-main__info-wrap">
                      <p className="s-text">Клиент</p>
                      <p className="m-text" dangerouslySetInnerHTML={{ __html: projectData.projectSite }} />
                    </div>
                    <div className="project-main__info-wrap">
                      <p className="s-text">Отрасль</p>
                      <p className="m-text">{projectData.theme}</p>
                    </div>
                    <div className="project-main__info-wrap">
                      <p className="s-text">Продолжительность</p>
                      <p className="m-text" dangerouslySetInnerHTML={{ __html: projectData.duration }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {projectData.bannerThirds && (
            <div className="banner-list">
              {projectData.bannerThirds.filter(val => !!val).map((banner, index) => (
                <div className="project-banner borderBlock" key={`project-banner-${index}`}>
                  <BannerComponent banner={banner} detail={projectData} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main> */}
      <ProjectDetail initialData={projectData} />
    </>
  );
}

function BannerComponent({ banner, detail }) {
  const fileUrl = `${apiUrl}/uploads/${banner.filename}`;
  const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(banner.filename);
  const isImage = /\.(jpeg|jpg|gif|png)$/i.test(banner.filename);

  return (
    <>
      {isVideo && <video autoPlay loop muted playsInline src={fileUrl} />}
      {isImage && <img src={fileUrl} alt={detail.name} />}
    </>
  );
}