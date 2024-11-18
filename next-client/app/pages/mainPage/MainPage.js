import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { Marquee } from '@devnomic/marquee';
// import { Box, useMediaQuery } from '@material-ui/core';
import { Cursor } from '../../components/cursor/cursor';
// import { Icon } from '../../components/icon/Icon';
import Showreel from '../../components/showreel/Showreel';
import WorkingSlider from './WorkingSlider';
import RetryImage from '../../helpers/RetryImage';
// import DelayedLink from '../../components/appHeader/DelayedLink';
// import useMobile from '../../components/useMobile';

const MainPage = () => {
  const [isClient, setIsClient] = useState(false); // Проверка клиентской среды
  const [isLoading, setIsLoading] = useState(true);
  const [working, setWorking] = useState([]);
  const [showreels, setShowreels] = useState([]);
  const [clients, setClients] = useState([]);
  const [mainPage, setMainPage] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);

  // const { isMobile } = useMobile();

  // Устанавливаем состояние isClient только после монтирования
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [workingRes, showreelsRes, clientsRes, mainPageRes, servicesRes, teamRes] = await Promise.all([
        axios.get('/api/working'),
        axios.get('/api/showreels'),
        axios.get('/api/clients'),
        axios.get('/api/mainPage'),
        axios.get('/api/services'),
        axios.get('/api/team'),
      ]);

      setWorking(workingRes.data);
      setShowreels(showreelsRes.data);
      setClients(clientsRes.data);
      setMainPage(mainPageRes.data);
      setServices(servicesRes.data);
      setTeam(teamRes.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Возвращаем null до загрузки клиента
  }

//   const router = useRouter(); // Теперь router используется только в клиентской среде

  return (
    <>
      <Cursor />
      {/* {!isLoading && (
        <main className="main">
          <section className="main-banner">
            <div className="container">
              <div className="main-banner__wrap">
                <div className="main-banner__content">
                  <p className="breadcrumb">Привет — это DEUS 👋</p>
                  <h1
                    className="heading-primary"
                    dangerouslySetInnerHTML={{
                      __html: 'Мы создаём продукты и услуги, которые помогают нашим клиентам быть заметнее 🤩 в цифровом пространстве',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {!!clients.length && (
            <section className="main-clients">
              <div className="main-clients__marquee">
                <Marquee direction="left">
                  {clients.map((client) => (
                    <div key={client.id} className="main-clients__container">
                      <RetryImage
                        src={client.image ? `/uploads/${client.image.filename}` : null}
                        alt={client.name}
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </section>
          )}

          <section className="main-agency">
            <div className="container">
              <div className="main-agency__wrap whiteHeader">
                {mainPage.map((item, index) => (
                  <div key={item.id} className="main-agency__item">
                    <a href={item.pageURL} target="_blank" rel="noreferrer">
                      {item.mainVideoFile?.filename ? (
                        <video
                          className="main-agency__item-img"
                          muted
                          playsInline
                          autoPlay
                          loop
                          controls={false}
                          src={`/uploads/${item.mainVideoFile.filename}`}
                        />
                      ) : (
                        <img
                          src={`/uploads/${item.mainVideoFile.filename}`}
                          alt={item.name}
                          className="main-agency__item-img"
                        />
                      )}
                      <div className="main-agency__item-header">
                        <div className="main-agency__item-header__num s-text">
                          {index < 9 ? `0${index + 1}` : index + 1}
                        </div>
                        <div className="main-agency__item-header__text heading-secondary">
                          {item.name}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="main-projects">
            <div className="container">
              <WorkingSlider data={working} />
            </div>
          </section>

          <section className="main-showreels">
            <Showreel showreels={showreels} />
          </section>
        </main>
      )} */}
    </>
  );
};

export default MainPage;
