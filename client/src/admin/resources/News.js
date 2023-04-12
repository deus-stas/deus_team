import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, ReferenceArrayInput, SelectInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const NewsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const NewsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" />
            <ImageInput source="image" label="Баннер" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ReferenceArrayInput source="tags" reference="tags" label="Тэги">
                <SelectInput optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput source="body" fullWidth/>
        </SimpleForm>
    </Create>
);

export const NewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="name" label="Заголовок" />
            <ImageInput source="image" label="Баннер" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ReferenceArrayInput source="tags" reference="tags" label="Тэги">
                <SelectInput optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput source="body" fullWidth/>
        </SimpleForm>
    </Edit>
);