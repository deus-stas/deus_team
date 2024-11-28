import React from 'react';
import {List, Datagrid, TextField, EditButton, FunctionField, ImageInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, FileInput, FileField } from 'react-admin';

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

export const HeaderDataList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="email" />
            <TextField source="phone" />
            <EditButton />
        </Datagrid>
    </List>
);

export const HeaderDataCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="email" label="Email" validate={[required()]} />
            <TextInput className="customWidth" source="phone" label="Телефон" />
            <TextInput className="customWidth" source="vk" label="VK" />
            <TextInput className="customWidth" source="telegram" label="Telegram" />
            <TextInput className="customWidth" source="behance" label="Behance" />
            <ImageInput className="fileInput" placeholder="+" source="presentation" label="Презентация">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
            <ImageInput className="fileInput" placeholder="+" source="headerPhoto" label="Фото на шапке">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
            <ImageInput className="fileInput" placeholder="+" source="contactPhoto" label="Фотo  в странице контакты">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const HeaderDataEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="email" label="Email" validate={[required()]} />
            <TextInput className="customWidth" source="phone" label="Телефон" />
            <TextInput className="customWidth" source="vk" label="VK" />
            <TextInput className="customWidth" source="telegram" label="Telegram" />
            <TextInput className="customWidth" source="behance" label="Behance" />
            <ImageInput className="fileInput" placeholder="+" source="presentation" label="Презентация">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
            <ImageInput className="fileInput" placeholder="+" source="headerPhoto" label="Фото на шапке">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
            <ImageInput className="fileInput" placeholder="+" source="contactPhoto" label="Фотo  в странице контакты">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);