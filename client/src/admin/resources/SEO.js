import React from 'react';
import {List, Datagrid, TextField, EditButton, required} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, AutocompleteInput  } from 'react-admin';
import SelectInput from "@material-ui/core/Select/SelectInput";

const apiUrl = ''

export const SeoList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Страница" />
            <EditButton />
        </Datagrid>
    </List>
);

const pages = [
    { id: '/project', name: 'Проекты' },
    { id: '/news', name: 'Новости' },
    { id: '/', name: 'Главная' },
    { id: '/services', name: 'Услуги' },
    { id: '/agency', name: 'Агенство' },
    { id: '/contacts', name: 'Контакты' },
]

export const SeoCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput name="name" source="name" label="Название страницы" validate={[required()]}/>
            <AutocompleteInput label="Страница" source="seoPages" choices={pages} validate={[required()]}/>
            <TextInput className="customWidth" source="seoTitle" label="TITLE" />
            <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
            <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
        </SimpleForm>
    </Create>
)

export const SeoEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput name="name" source="name" label="Название страницы" validate={[required()]}/>
            <AutocompleteInput label="Страница" source="seoPages" choices={pages} validate={[required()]}/>
            <TextInput className="customWidth" source="seoTitle" label="TITLE" />
            <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
            <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
        </SimpleForm>
    </Edit>
);
