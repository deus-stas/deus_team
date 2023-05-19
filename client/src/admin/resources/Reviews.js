import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, FunctionField, FileInput, FileField, ReferenceArrayInput, SelectInput } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                console.log(record);
                if (record.filename) {
                    return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const ReviewsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ReviewsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Компания" />
            <TextInput source="service" label="Услуга" />
            <TextInput source="type" label="Тип услуги" />
            <FileInput source="reviewFile" label="Файл отзыва">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="reviewName" label="Имя человека оставившего отзыв" />
            <TextInput source="reviewPost" label="Пост человека оставившего отзыв" />
            <ImageInput source="reviewImage" label="Фото человека оставившего отзыв" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="review" label="Отзыв" fullWidth/>
            <ReferenceArrayInput source="reviewProject" reference="projects">
                <SelectInput optionText="name" label="Проект" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="reviewService" reference="services">
                <SelectInput optionText="name" label="Услуга" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export const ReviewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Компания" />
            <TextInput source="service" label="Услуга" />
            <TextInput source="type" label="Тип услуги" />
            <FileInput source="reviewFile" label="Файл отзыва">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="reviewName" label="Имя человека оставившего отзыв" />
            <TextInput source="reviewName" label="Пост человека оставившего отзыв" />
            <ImageInput source="reviewImage" label="Фото человека оставившего отзыв" accept="image/*">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <TextInput source="review" label="Отзыв" />
        </SimpleForm>
    </Edit>
);