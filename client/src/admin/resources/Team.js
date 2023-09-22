import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const TeamList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const TeamCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Имя" />
            <TextInput className="customWidth" source="post" label="Должность" />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Картинка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const TeamEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Имя" />
            <TextInput className="customWidth" source="post" label="Должность" />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Картинка" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);