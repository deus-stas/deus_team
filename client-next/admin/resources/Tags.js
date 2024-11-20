import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required } from 'react-admin';

export const TagsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название тэга" validate={[required()]} />
        </SimpleForm>
    </Create>
)

export const TagsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название тэга" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const TagsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название тэга" />
        </Datagrid>
    </List>
);
