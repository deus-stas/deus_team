import React from 'react';
import { Admin, Resource, UserMenu, AppBar, Layout } from 'react-admin';
import { NewsList, NewsCreate, NewsEdit } from './admin/resources/News';
import { MainPageList, MainPageCreate, MainPageEdit } from './admin/resources/MainPage';
import { WorkingList, WorkingCreate, WorkingEdit } from './admin/resources/Working';
import { TagsList, TagsEdit, TagsCreate } from './admin/resources/Tags';
import { SeoList, SeoEdit, SeoCreate } from './admin/resources/SEO';
import { ThemesList, ThemesEdit, ThemesCreate } from './admin/resources/Themes';
import { ProjectsList, ProjectsEdit, ProjectsCreate } from './admin/resources/Projects';
import { TypesList, TypesEdit, TypesCreate } from './admin/resources/Types';
import { PersonsList, PersonsEdit, PersonsCreate } from './admin/resources/Persons';
import { SocialList, SocialEdit, SocialCreate } from './admin/resources/Social';
import { ProductsList, ProductsEdit, ProductsCreate } from './admin/resources/Products';
import { AwardsList, AwardsEdit, AwardsCreate } from './admin/resources/Awards';
import { RaitingsList, RaitingsEdit, RaitingsCreate } from './admin/resources/Raitings';
import { ClientsList, ClientsEdit, ClientsCreate } from './admin/resources/Clients';
import { TeamList, TeamEdit, TeamCreate } from './admin/resources/Team';
import { VacanciesList, VacanciesEdit, VacanciesCreate } from './admin/resources/Vacancies';
import { ShowreelsList, ShowreelsEdit, ShowreelsCreate } from './admin/resources/Showreels';
import { ServicesList, ServicesEdit, ServicesCreate } from './admin/resources/Services';
import { SubServicesList, SubServicesEdit, SubServicesCreate } from './admin/resources/SubServices';
import { ReviewsList, ReviewsEdit, ReviewsCreate } from './admin/resources/Reviews';
import { UsersList,UsersCreate} from './admin/resources/Users';
import { HeaderDataList, HeaderDataEdit, HeaderDataCreate } from './admin/resources/HeaderData';
import { FormList} from './admin/resources/Form';
import dataProvider from './admin/dataProvider';
import authProvider from './admin/authProvider';
import { theme } from "./admin/theme";
import MyLogoutButton from '../src/components/appHeader/MyLogoutButton';
import { DiplomasList, DiplomasEdit, DiplomasCreate } from './admin/resources/Diplomas';
import { ContactsList, ContactsEdit, ContactsCreate } from './admin/resources/Contacts';
import {NewsTagsCreate, NewsTagsEdit, NewsTagsList} from "./admin/resources/NewsTags";

const MyUserMenu = () => <UserMenu><MyLogoutButton /></UserMenu>;

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

const AdminPage = () => (
  <Admin layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider} basename="/admin" theme={theme}>
    <Resource name="projects" list={ProjectsList} create={ProjectsCreate} edit={ProjectsEdit} options={{ label: 'Проекты' }} />
    <Resource name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} options={{ label: 'Новости' }} />
    <Resource name="mainPage" list={MainPageList} create={MainPageCreate} edit={MainPageEdit} options={{ label: 'Главная страница' }} />
    <Resource name="working" list={WorkingList} create={WorkingCreate} edit={WorkingEdit} options={{ label: 'В работе' }} />
    <Resource name="tags" list={TagsList} create={TagsCreate} edit={TagsEdit} options={{ label: 'Теги' }} />
    <Resource name="newsTags" list={NewsTagsList} create={NewsTagsCreate} edit={NewsTagsEdit} options={{ label: 'Рубрики' }} />
    <Resource name="seo" list={SeoList} create={SeoCreate} edit={SeoEdit} options={{ label: 'SEO' }} />
    <Resource name="themes" list={ThemesList} create={ThemesCreate} edit={ThemesEdit} options={{ label: 'Темы' }} />
    <Resource name="types" list={TypesList} create={TypesCreate} edit={TypesEdit} options={{ label: 'Тип проекта' }} />
    <Resource name="persons" list={PersonsList} create={PersonsCreate} edit={PersonsEdit} options={{ label: 'Сотрудники' }} />
    <Resource name="social" list={SocialList} create={SocialCreate} edit={SocialEdit} options={{ label: 'Соц сети' }} />
    <Resource name="products" list={ProductsList} create={ProductsCreate} edit={ProductsEdit} options={{ label: 'Продукты' }} />
    <Resource name="awards" list={AwardsList} create={AwardsCreate} edit={AwardsEdit} options={{ label: 'Награды' }} />
    <Resource name="raitings" list={RaitingsList} create={RaitingsCreate} edit={RaitingsEdit} options={{ label: 'Рейтинги' }} />
    <Resource name="clients" list={ClientsList} create={ClientsCreate} edit={ClientsEdit} options={{ label: 'Клиенты' }} />
    <Resource name="team" list={TeamList} create={TeamCreate} edit={TeamEdit} options={{ label: 'Команда' }} />
    <Resource name="vacancies" list={VacanciesList} create={VacanciesCreate} edit={VacanciesEdit} options={{ label: 'Вакансии' }} />
    <Resource name="showreels" list={ShowreelsList} create={ShowreelsCreate} edit={ShowreelsEdit} options={{ label: 'Шоурилы' }} />
    <Resource name="services" list={ServicesList} create={ServicesCreate} edit={ServicesEdit} options={{ label: 'Услуги' }} />
    <Resource name="subServices" list={SubServicesList} create={SubServicesCreate} edit={SubServicesEdit} options={{ label: 'Услуги(для деталки)' }} />
    <Resource name="reviews" list={ReviewsList} create={ReviewsCreate} edit={ReviewsEdit} options={{ label: 'Отзывы' }} />
    <Resource name="form" list={FormList} options={{ label: 'Форма' }} />
    {
      localStorage.getItem('jwtToken').slice(-2) === 'ad' ? (
        <Resource name="users" list={UsersList} create={UsersCreate} options={{ label: 'Пользователи' }} />
      ) : (
        <Resource name="users" list={UsersList} options={{ label: 'Пользователи' }} />
      )
    }
    <Resource name="headerData" list={HeaderDataList} create={HeaderDataCreate} edit={HeaderDataEdit} options={{ label: 'Шапка сайта' }} />
    <Resource name="diplomas" list={DiplomasList} create={DiplomasCreate} edit={DiplomasEdit} options={{ label: 'Дипломы и бейжи' }} />
    <Resource name="contacts" list={ContactsList} create={ContactsCreate} edit={ContactsEdit} options={{ label: 'Контакты' }} />

  </Admin >
);

export default AdminPage;