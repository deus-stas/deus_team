import React from 'react';
import {List, Datagrid, TextField, EditButton, SimpleFormIterator, ArrayInput} from 'react-admin';
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


export const MainPageList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const MainPageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Баннер" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="textList"
                label="Описание"
            >
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="textItem"
                        label="текст" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const MainPageEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="pageURL" label="Ссылка на страницу" placeholder="/название страницы"/>
            <ImageInput className="fileInput" placeholder="+" source="image" label="Баннер" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
            <ArrayInput
                source="textList"
                label="Описание"
            >
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="textItem"
                        label="текст" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);