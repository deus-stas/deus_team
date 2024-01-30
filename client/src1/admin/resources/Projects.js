import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, FileField, ArrayInput, SimpleFormIterator } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';
import { MyToolbar } from '../toolbar';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    if (record.mimetype.indexOf('mp4') !== -1) {
                        return (
                            <video style={{width:'300px'}} autoPlay loop playsInline><source src="/static/media/webhands.397582827e1e32109804.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" /></video>
                        )
                    } else {
                        return <img style={{width:'300px'}} src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                    }
                } else {
                    return <img style={{width:'300px'}} src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

// const handleInputChange = (value) => {
//     const inputValue = value || ''; // If the value is null or undefined, set it to an empty string
//     // Process the input value or update your component state
//     // ...
//   };

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
            <TextInput source="name" label="Заголовок"  validate={[required()]} />
            {/* <TextInput source="customId" title="URL ID"  /> */}
            <TextInput source="nameInEng" label="URL" fullWidth  />
            <ImageInput source="image" label="Главное изображение" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <BooleanInput source="controlURL" label="Переход на URL при клике"/>
            <TextInput source="projectURL" label="URL проекта"/>
            <TextInput source="projectSite" label="Сайт проекта"/>
            <FileInput source="mainVideoFile" label="Баннер видео">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="mainVideo" label="Видео для баннера(url)"  />
            <ColorInput source="color" label="Цвет проекта" />
            <BooleanInput source="main" label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <TextInput source="bannerText" fullWidth title="Текст для баннера"  />
            <ReferenceArrayInput source="projectTheme" reference="themes">
                <SelectInput optionText="name" label="Тема проекта" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="projectType" reference="types">
                <SelectInput optionText="name" label="Тип проекта" />
            </ReferenceArrayInput>
            <TextInput source="about" label="О клиенте"  />
            <FileInput source="bannerFirst" label="Баннер">
                <FileField source="src" title="title" />
            </FileInput>
            
            <TextInput source="bannerFirstVideo" label="Видео для баннера(url)"  />
            <TextInput source="taskDescr" label="Описание для блока Цели и задачи"  />
            <TextInput source="task" label="Цитата задачи"  />
            <ReferenceArrayInput source="taskPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ArrayInput
                source="tasksList"
                label="Список задач"
            >
                <SimpleFormIterator>
                    <TextInput source="tasksItem" label="Задача" />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput source="aimColor" label="Цвет задач" />

            <FileInput source="bannerSecond" label="Баннер">
                <FileField source="src" title="title" />
            </FileInput>
                <TextInput source="bannerSecondVideo" label="Видео для баннера(url)"  />
            <TextInput source="approach" label="Подход"  />
            <ReferenceArrayInput source="approachPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для подхода" />
            </ReferenceArrayInput>
            <FileInput source="bannerThird" label="Баннер">
                <FileField source="src" title="title" />
            </FileInput>
                <TextInput source="bannerThirdVideo" label="Видео для баннера(url)"  />
            <RichTextInput source="body"  />
            {/* <RichTextInput source="workSteps" label="Этапы работ"  /> */}
            <ArrayInput
                source="workSteps"
                label="Этапы работ"
            >
                <SimpleFormIterator>
                    <TextInput source="workStepsTitle" />
                    <TextInput source="workStepsIntroText" />
                    <RichTextInput source="workStepsItem"  />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput source="workStepsColor" label="Цвет этапы работ" />
            <FileInput source="bannerFourth" label="Баннер">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerFourthVideo" label="Видео для баннера(url)"  />
            <TextInput source="result" label="Результаты"  />
            <ReferenceArrayInput source="resultPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ColorInput source="resultsColor" label="Цвет результаты" />
            <FileInput source="bannerFifth" label="Баннер">
                <FileField source="src" title="title" />
            </FileInput>
                <TextInput source="bannerFifthVideo" label="Видео для баннера(url)"  />
            <ArrayInput source="imagesExtra" label="Дополнительные изображения">
                <SimpleFormIterator>
                    <ImageInput source="imageI" label="Изображение" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="visibilityTitle1" label="Видимость 1"  />
            <FileInput source="visibilityImg1" label="Фото видимость 1">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="visibilityTitle2" label="Видимость 2"  />
            <FileInput source="visibilityImg2" label="Фото видимость 2">
                <FileField source="src" title="title" />
            </FileInput>


        </SimpleForm>
    </Create>
);

export const ProjectsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<MyToolbar />}>
            <TextInput source="name" label="Заголовок"  validate={[required()]} />
            {/* <TextInput source="customId" title="URL ID"  /> */}
            <TextInput source="nameInEng" label="URL" fullWidth  />
            <ImageInput source="image" label="Главное изображение" validate={[required()]} accept="image/*">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <BooleanInput source="controlURL" label="Переход на URL при клике"/>
            <TextInput source="projectURL" label="URL проекта"/>
            <TextInput source="projectSite" label="Сайт проекта"/>
            <FileInput source="mainVideoFile" label="Баннер видео">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="mainVideo" label="Видео для баннера(url)"  />
            <ColorInput source="color" label="Цвет проекта" validate={[required()]} />
            <BooleanInput source="main" label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <TextInput source="bannerText" fullWidth title="Текст для баннера"  />
            <ReferenceArrayInput source="projectTheme" reference="themes">
                <SelectInput optionText="name" label="Тема проекта" />
            </ReferenceArrayInput>
            <ReferenceArrayInput source="projectType" reference="types">
                <SelectInput optionText="name" label="Тип проекта" />
            </ReferenceArrayInput>
            <TextInput source="about" label="О клиенте"  />
            <FileInput source="bannerFirst" label="Баннер">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerFirstVideo" allowEmpty label="Видео для баннера(url)"  />
            <TextInput source="taskDescr" label="Описание для блока Цели и задачи"  />
            <TextInput source="task" label="Задача"  />
            <ReferenceArrayInput source="taskPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ArrayInput
                source="tasksList"
                label="Список задач"
            >
                <SimpleFormIterator>
                    <TextInput source="tasksItem" label="Задача" />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput source="aimColor" label="Цвет задач" />
            <FileInput source="bannerSecond" label="Баннер">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerSecondVideo" label="Видео для баннера(url)"  />
            <TextInput source="approach" label="Подход"  />
            <ReferenceArrayInput source="approachPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для подхода" />
            </ReferenceArrayInput>
            <FileInput source="bannerThird" label="Баннер">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerThirdVideo" label="Видео для баннера(url)"  />
            <RichTextInput source="body"  />
            {/* <RichTextInput source="workSteps" label="Этапы работ"  /> */}
            <ArrayInput
                source="workSteps"
                label="Этапы работ"
            >
                <SimpleFormIterator>
                    <TextInput source="workStepsTitle" />
                    <TextInput source="workStepsIntroText" />
                    <RichTextInput source="workStepsItem"  />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput source="workStepsColor" label="Цвет этапы работ" />
            <FileInput source="bannerFourth" label="Баннер">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerFourthVideo" label="Видео для баннера(url)"  />
            <TextInput source="result" label="Результаты"  />
            <ReferenceArrayInput source="resultPersons" reference="persons">
                <SelectInput optionText="name" label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ColorInput source="resultsColor" label="Цвет результаты" />
            <FileInput source="bannerFifth" label="Баннер">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput source="bannerFifthVideo" label="Видео для баннера(url)"  />
            <ArrayInput source="imagesExtra" label="Дополнительные изображения(если редактируется одна картинка, то нужно обновить/заменить и другую)">
                <SimpleFormIterator>
                    <ImageInput source="imageI" label="Изображение" accept="image/*">
                        <FilenameField source="src" title="title" />
                    </ImageInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="visibilityTitle1" label="Видимость 1"  />
            <FileInput source="visibilityImg1" label="Фото видимость 1">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput source="visibilityTitle2" label="Видимость 2"  />
            <FileInput source="visibilityImg2" label="Фото видимость 2">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);