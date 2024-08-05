import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const VacanciesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название вакансии" validate={[required()]} />
            <TextInput className="customWidth" source="type" label="Оформление" />
            <TextInput className="customWidth" source="place" label="Место работы" />
            <TextInput className="customWidth" source="link" label="Ссылка на вакансию" />
        </SimpleForm>
    </Create>
)

export const VacanciesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название вакансии" validate={[required()]} />
            <TextInput className="customWidth" source="type" label="Оформление" />
            <TextInput className="customWidth" source="place" label="Место работы" />
            <TextInput className="customWidth" source="link" label="Ссылка на вакансию" />
        </SimpleForm>
    </Edit>
);

export const VacanciesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название вакансии" />
        </Datagrid>
    </List>
);
