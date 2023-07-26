import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const TypesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Тип проекта" validate={[required()]} />
        </SimpleForm>
    </Create>
)

export const TypesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Тип проекта" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const TypesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Тип проекта" />
        </Datagrid>
    </List>
);
