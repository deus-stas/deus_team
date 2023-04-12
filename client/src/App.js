import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';

import ScrollToTop from "./helpers/ScrollToTop";
import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';
import MainPage from './components/pages/mainPage/MainPage';
import Projects from './components/pages/projects/Projects';
import ProjectDetail from './components/pages/projects/projectDetail/ProjectDetail';
import Services from './components/pages/services/Services';
import ServicesDetail from './components/pages/services/servicesDetail/ServicesDetail';
import Agency from './components/pages/agency/Agency';
import Contacts from './components/pages/contacts/Contacts';
import News from './components/news/News';
import NewsDetail from './components/news/newsDetail/NewsDetail';

import AdminPage from './Admin';

function App() {

  return (
    <Router>
      <>
        <ScrollToTop />
        <CustomCursor
          targets={['.js-cursor-play']}
          customClass='custom-cursor'
          dimensions={20}
          fill='none'
          opacity={0}
        />
        <AppHeader />
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/projects' element={<Projects />} />
          <Route exact path='/projects/detail' element={<ProjectDetail />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/services/detail' element={<ServicesDetail />} />
          <Route exact path='/agency' element={<Agency />} />
          <Route exact path='/contacts' element={<Contacts />} />
          <Route exact path='/news' element={<News />} />
          <Route exact path='/news/:id' element={<NewsDetail />} />
          <Route path='/admin/*' element={<AdminPage />} />
        </Routes>
        <AppFooter />
      </>
    </Router>
  );
}

export default App;