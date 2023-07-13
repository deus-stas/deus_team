import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const VacancysCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название вакансии" validate={[required()]} />
            <TextInput source="lvl" label="Уровень" />
            <TextInput source="time" label="График" />
            <TextInput source="place" label="Место работы" />
            <TextInput source="link" label="Ссылка на вакансию" />
        </SimpleForm>
    </Create>
)

export const VacancysEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название вакансии" validate={[required()]} />
            <TextInput source="lvl" label="Уровень" />
            <TextInput source="time" label="График" />
            <TextInput source="place" label="Место работы" />
            <TextInput source="link" label="Ссылка на вакансию" />
        </SimpleForm>
    </Edit>
);

export const VacancysList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название вакансии" />
        </Datagrid>
    </List>
);
