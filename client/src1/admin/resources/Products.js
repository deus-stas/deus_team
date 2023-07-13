import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required, FileInput, FileField } from 'react-admin';

export const ProductsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <TextInput source="descr" label="Описание" validate={[required()]} />
            <TextInput source="link" label="Ссылка на продукт" validate={[required()]} />
            <FileInput source="img" label="Картинка">
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput source="video">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="videoUrl" label="URL"/>
        </SimpleForm>
    </Create>
)

export const ProductsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <TextInput source="descr" label="Описание" validate={[required()]} />
            <TextInput source="link" label="Ссылка на продукт" validate={[required()]} />
            <FileInput source="img"label="Картинка" >
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput source="video">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="videoUrl" label="URL"/>
        </SimpleForm>
    </Edit>
);

export const ProductsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
        </Datagrid>
    </List>
);
