import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
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
// import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import PrivateRoute from "./components/privateRoutes/PrivateRoute";

// import AdminPage from './Admin';


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}





function App() {
  return (
    <Provider store={store}>
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
          <Route exact path='/projects/:id' element={<ProjectDetail />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/services/:id' element={<ServicesDetail />} />
          <Route exact path='/agency' element={<Agency />} />
          <Route exact path='/contacts' element={<Contacts />} />
          <Route exact path='/news' element={<News />} />
          <Route exact path='/news/:id' element={<NewsDetail />} />
          <Route exact path='/admin/*' element={<PrivateRoute />} />
          {/* <Route path='/admin/*' element={<AdminPage />} /> */}
          {/* <Route exact path='/register' element={<Register/>} /> */}
          <Route exact path='/login' element={<Login/>} />
        </Routes>
        <AppFooter />
      </>
    </Router>

    </Provider>
    
  );
}

export default App;