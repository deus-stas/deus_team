import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';

const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <img src={`http://localhost:5000/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const ProjectsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" fullWidth validate={[required()]} />
            <ImageInput source="image" label="Главное изображение" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ColorInput source="color" label="Цвет проекта" validate={[required()]} />
            <BooleanInput source="main" label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <ReferenceArrayInput source="projectTheme" reference="themes">
                <SelectInput optionText="name" label="Тема проекта" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="projectType" reference="types">
                <SelectInput optionText="name" label="Тип проекта" />
            </ReferenceArrayInput>
            <TextInput source="about" label="О клиенте" fullWidth />
            <ImageInput source="bannerFirst" label="Баннер">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="task" label="Задача" fullWidth />
            <ReferenceArrayInput source="taskPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ImageInput source="bannerSecond" label="Баннер">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="approach" label="Подход" fullWidth />
            <ReferenceArrayInput source="approachPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для подхода" />
            </ReferenceArrayInput>
            <ImageInput source="bannerThird" label="Баннер">
                <ImageField source="src" title="title" />
            </ImageInput>
            <RichTextInput source="body" fullWidth />
            <ImageInput source="bannerFourth" label="Баннер">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="result" label="Результаты" fullWidth />
            <ReferenceArrayInput source="resultPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ImageInput source="bannerFifth" label="Баннер">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const ProjectsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" fullWidth validate={[required()]} />
            <ImageInput source="image" label="Главное изображение" validate={[required()]} accept="image/*">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <BooleanInput source="main" label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <ColorInput source="color" label="Цвет проекта" validate={[required()]} />
            <TextInput source="about" label="О клиенте" fullWidth />
            <ImageInput source="bannerFirst" label="Баннер">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <TextInput source="task" label="Задача" fullWidth />
            <ReferenceArrayInput source="taskPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ImageInput source="bannerSecond" label="Баннер">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <TextInput source="approach" label="Подход" fullWidth />
            <ReferenceArrayInput source="approachPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для подхода" />
            </ReferenceArrayInput>
            <ImageInput source="bannerThird" label="Баннер">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <RichTextInput source="body" fullWidth />
            <ImageInput source="bannerFourth" label="Баннер">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <TextInput source="result" label="Результаты" fullWidth />
            <ReferenceArrayInput source="resultPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ImageInput source="bannerFifth" label="Баннер">
                <FilenameField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);