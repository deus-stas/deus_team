import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, FileInput, FileField, BooleanInput } from 'react-admin';

export const ShowreelsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ShowreelsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" validate={[required()]} />
            <TextInput source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="videoUrl" label="URL" />
        </SimpleForm>
    </Create>
);

export const ShowreelsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" validate={[required()]} />
            <TextInput source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="videoUrl" label="URL" />
        </SimpleForm>
    </Edit>
);