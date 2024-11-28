import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, FileInput, FileField, BooleanInput } from 'react-admin';

export const ShowreelsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="mainShowreel"  />
            <EditButton />
        </Datagrid>
    </List>
);

export const ShowreelsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput className="fileInput" placeholder="+" source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput className="customWidth" source="videoUrl" label="URL" />
        </SimpleForm>
    </Create>
);

export const ShowreelsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput className="fileInput" placeholder="+" source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput className="customWidth" source="videoUrl" label="URL" />
        </SimpleForm>
    </Edit>
);