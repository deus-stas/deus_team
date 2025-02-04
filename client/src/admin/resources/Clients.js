import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, BooleanInput } from 'react-admin';

const apiUrl = ''


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

export const ClientsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ClientsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название клиента" />
            <ImageInput
                className="fileInput" 
                placeholder="+" 
                source="image" 
                label="Логотип" 
                validate={[required()]} 
                accept="image/*">
                    <ImageField 
                        source="src" 
                        title="title" />
            </ImageInput>
            <BooleanInput
                source="visibility"
                label="Скрыть/Показать"/>
        </SimpleForm>
    </Create>
);

export const ClientsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название клиента" />
            <ImageInput
                className="fileInput" 
                placeholder="+" 
                source="image" 
                label="Логотип" 
                validate={[required()]} 
                accept="image/*">
                <FilenameField 
                    source="image" 
                    title="title" />
            </ImageInput>
            <BooleanInput
                source="visibility"
                label="Скрыть/Показать"/>
        </SimpleForm>
    </Edit>
);