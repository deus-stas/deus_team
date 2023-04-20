import React from 'react';
import { Admin, Resource } from 'react-admin';
import { NewsList, NewsCreate, NewsEdit } from './admin/resources/News';
import { WorkingList, WorkingCreate, WorkingEdit } from './admin/resources/Working';
import { TagsList, TagsEdit, TagsCreate } from './admin/resources/Tags';
import { ThemesList, ThemesEdit, ThemesCreate } from './admin/resources/Themes';
import { ProjectsList, ProjectsEdit, ProjectsCreate } from './admin/resources/Projects';
import { TypesList, TypesEdit, TypesCreate } from './admin/resources/Types';
import { PersonsList, PersonsEdit, PersonsCreate } from './admin/resources/Persons';
import { SocialList, SocialEdit, SocialCreate } from './admin/resources/Social';
import { ProductsList, ProductsEdit, ProductsCreate } from './admin/resources/Products';
import { AwardsList, AwardsEdit, AwardsCreate } from './admin/resources/Awards';
import dataProvider from './admin/dataProvider';
import { theme } from "./admin/theme";

const AdminPage = () => (
  <Admin dataProvider={dataProvider} basename="/admin" theme={theme}>
    <Resource name="projects" list={ProjectsList} create={ProjectsCreate} edit={ProjectsEdit} options={{ label: 'Проекты' }} />
    <Resource name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} options={{ label: 'Новости' }} />
    <Resource name="working" list={WorkingList} create={WorkingCreate} edit={WorkingEdit} options={{ label: 'В работе' }} />
    <Resource name="tags" list={TagsList} create={TagsCreate} edit={TagsEdit} options={{ label: 'Теги' }} />
    <Resource name="themes" list={ThemesList} create={ThemesCreate} edit={ThemesEdit} options={{ label: 'Темы' }} />
    <Resource name="types" list={TypesList} create={TypesCreate} edit={TypesEdit} options={{ label: 'Тип проекта' }} />
    <Resource name="persons" list={PersonsList} create={PersonsCreate} edit={PersonsEdit} options={{ label: 'Сотрудники' }} />
    <Resource name="social" list={SocialList} create={SocialCreate} edit={SocialEdit} options={{ label: 'Соц сети' }} />
    <Resource name="products" list={ProductsList} create={ProductsCreate} edit={ProductsEdit} options={{ label: 'Продукты' }} />
    <Resource name="awards" list={AwardsList} create={AwardsCreate} edit={AwardsEdit} options={{ label: 'Награды' }} />
  </Admin >
);

export default AdminPage;