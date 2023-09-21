import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required, ImageInput, ImageField, FunctionField } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <img  src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const PersonsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Имя" validate={[required()]} />
            <TextInput className="customWidth" source="post" label="Должность" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Фото" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
)

export const PersonsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Имя" validate={[required()]} />
            <TextInput className="customWidth" source="post" label="Должность" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Фото" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const PersonsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Имя" />
            <TextField source="post" label="Должность" />
        </Datagrid>
    </List>
);
