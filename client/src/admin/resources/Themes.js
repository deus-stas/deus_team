import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const ThemesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название темы" validate={[required()]} />
            <TextInput className="customWidth" source="href" label="Название ссылки" />
        </SimpleForm>
    </Create>
)

export const ThemesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название темы" validate={[required()]} />
            <TextInput className="customWidth" source="href" label="Название ссылки" />
        </SimpleForm>
    </Edit>
);

export const ThemesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название темы" />
            <TextField source="href" label="Название ссылки" />
        </Datagrid>
    </List>
);
