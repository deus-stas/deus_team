import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const ThemesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название темы" validate={[required()]} />
        </SimpleForm>
    </Create>
)

export const ThemesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название темы" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const ThemesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название темы" />
        </Datagrid>
    </List>
);
