import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';


export const NewsTagsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Тема рубрики" />
        </Datagrid>
    </List>
);

export const NewsTagsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Тема рубрики" validate={[required()]} />
        </SimpleForm>
    </Create>
)

export const NewsTagsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Тема рубрики" validate={[required()]} />
        </SimpleForm>
    </Edit>
);


