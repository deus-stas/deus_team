import React from 'react';
import { Admin, Resource } from 'react-admin';
import { NewsList, NewsCreate, NewsEdit } from './admin/resources/News';
import { TagList, TagEdit, TagCreate } from './admin/resources/Tags';
import dataProvider from './admin/dataProvider';

const AdminPage = () => (
  <Admin dataProvider={dataProvider} basename="/admin">
    <Resource name="news" list={NewsList} create={NewsCreate} edit={NewsEdit} options={{ label: 'Новости' }} />
    <Resource name="tags" list={TagList} create={TagCreate} edit={TagEdit} options={{ label: 'Теги' }} />
  </Admin>
);

export default AdminPage;