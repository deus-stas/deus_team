import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm } from 'react-admin';

export const TagCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название тэга" />
        </SimpleForm>
    </Create>
)

export const TagEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название тэга" />
        </SimpleForm>
    </Edit>
);

export const TagList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название тэга" />
        </Datagrid>
    </List>
);
