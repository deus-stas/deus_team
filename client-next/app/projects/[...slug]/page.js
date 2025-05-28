import Projects from "../../../pages/projects/Projects";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from 'react';

export const getServerSideProps = async (context) => {
  const { query } = context;
  const someParam = query.someParam || '';

  return {
    props: {
      someParam,
    },
  };
};

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


export async function generateMetadata() {
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

  // const baseUrl = `${protocol}://${host}`;
  const baseUrl =`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`; // Укажите URL вашего API

  try {
    const response = await fetch(`${baseUrl}/api/seo`, {
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
    const data = seoData.find((el) => el.name === "Проекты");

    return {
      title: data?.seoTitle || "Проекты",
      description: data?.seoDescription || "Проекты",
      keywords: data?.seoKeywords || "Проекты",
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching SEO data",
    };
  }
}



export default async function Home({ someParam }) {
  const [projects, themes, types] = await Promise.all([
    getProjects(),
    getThemes(),
    getTypes()
  ]);

  const searchParams = someParam;
  // console.log(someParam);

  let limitProjects = projects;
  let selectedTheme = themes[0]
  let selectedType = types[0]

  const filteredProjects = (iProjects = projects) => (iProjects || []).filter(project => {
      return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
          (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
        })

  const PAGE_SIZE = 10

  const filteredProjectList = filteredProjects(projects || []);
  const initialProjects = filteredProjectList.slice(0, PAGE_SIZE);
  limitProjects = initialProjects;




const renderProject = (b) => <>{limitProjects ? limitProjects
    .filter((project, index, array) => !!b ? index % 2 === 0 : index % 2 !== 0)
    .map((project, index, array) => {
        console.log();
        const numProject = index < 9 ? "0" + (index + 1) : (index + 1);
        const isLastItem = index + 1 === array.length;

        return (
            <div key={project.id} style={{ display: "flex", flexDirection: "column", gap: '2rem' }}>
                <Link
                    href={`/projects/${project.nameInEng}`}
                    className={`projects__item projects__item__${index + 1}`}
                    key={project.id}
                >
                    <div className="projects__item-img-wrap">

                    </div>
                </Link>
                <span className="projects-decription m-text">
                <p style={{ color: "rgba(117, 118, 119, 1)" }}>{project.date} • {project.name}</p>
            <Link
                href={`/projects/${project.nameInEng}`}
                className="heading-secondary"
            >
                {project.descrProject}
            </Link>
        </span>
            </div>

    )
})
: null}</>

const odd = renderProject(true)
const even = renderProject(false)

  const sizeLarge = 'Мы гордимся каждым<br/> выполненным проектом';
  let text = sizeLarge;

    // console.log('projects', projects)
    // console.log('themes', themes)
    // console.log('types', types)

    // console.log('searchParams', searchParams)

    return (
      <>
        <Projects/>
        <div className="projects" style={{display: 'none'}}>
          <section className="projects-start">
              <div className="container">
                  <span className="projects-start__text">
                    <p className="m-text">Проекты</p>
                    <h1 className="heading-primary" dangerouslySetInnerHTML={{__html: text}}/>
                  </span>
              </div>
          </section>
          <section id="projectNav" className="projects-content">

              <div className="container">
                  {/* {<>{category}</>} */}
                  <div className="projects__wrap">
                      <span className={"projects__wrap-span"}>
                          <div className="projects__wrap-column">{odd}</div>
                      </span>
                      <span className="translateY">
                          {/* {!isMobile && <>{category}</>} */}
                          <div className="projects__wrap-column">{even}</div>
                      </span>

                  </div>
                  <div className="flex-sb margin-for-button">
                      {/* {!allProjectsLoaded && (
                          <div onClick={loadNewProject} className="m-text loadMore">Показать еще</div>
                      )} */}
                  </div>
              </div>

          </section>

        </div>

      </>
    );
  }
