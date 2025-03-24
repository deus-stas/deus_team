import React from 'react';
import {List, Datagrid, TextField, EditButton, ReferenceInput, ImageInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, ArrayInput, SimpleFormIterator, SelectArrayInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';

const apiUrl = ''

const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <a href={`${apiUrl}/uploads/${record.filename}`} target="_blank">{record.originalname}</a>;
                    // return <iframe src={`${apiUrl}/uploads/${record.filename}`} sandbox="allow-same-origin allow-scripts"/>;
                } else {
                    return `${record.src}`
                    // return <iframe src={`${record.src}`} sandbox="allow-same-origin allow-scripts" />;
                }
            }}
        />
    )
}

export const ServicesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="position" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ServicesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" fullWidth validate={[required()]} />
            <ReferenceArrayInput source="types" reference="types" label="Тип проекта" validate={[required()]}>
                <SelectInput className="customWidth" optionText="name" />
            </ReferenceArrayInput>
            <FileInput  className="fileInput" placeholder="+" source="brief" label="Ссылка для брифа">
                <FilenameField
                    source="image"
                    title="title" />
            </FileInput >
            {/* <TextInput className="customWidth" source="path" label="URL" /> */}
            <BooleanInput 
                source="isInvisible" 
                label="Показать/Скрыть"/>
            <TextInput className="customWidth" source="position" label="Позиция"/>
            <TextInput className="customWidth" source="descrTotal" label="Описание для разводящей" fullWidth />
            <TextInput className="customWidth" source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100} source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Проекты" />
            </ReferenceArrayInput>
            <TextInput className="customWidth" source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />

            <ArrayInput
                source="benefits"
                label="Преимущества"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="benefitsName" label="Название преимущества" />
                    <TextInput className="customWidth" source="benefitsDescr" label="Описание" />
                    <ReferenceArrayInput source="benefitsPersons" reference="persons">
                        <SelectInput className="customWidth" optionText="name" label="Сотрудник" />
                    </ReferenceArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput className="customWidth" source="blockTitle" label="Заголовок для блока" />
            <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Услуги" />
            </ReferenceArrayInput>
            <ArrayInput
                source="work"
                label="Как проходит работа"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="workName" label="Название" />
                    <TextInput className="customWidth" source="workDescr" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                source="tariffs"
                label="Тарифы"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="tariffsCategory" label="Категория тарифа" />
                    <TextInput className="customWidth" source="tariffDeadline" label="Срок работы" />
                    <TextInput className="customWidth" source="tariffPrice" label="Стоимость" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput className="customWidth" source="seoTitle" label="TITLE" />
            <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
            <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
        </SimpleForm>
    </Create>
);

export const ServicesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" fullWidth validate={[required()]} />
            <ReferenceInput source="types" reference="types" label="Тип проекта">
                <SelectInput className="customWidth" optionText="name" />
            </ReferenceInput>
            <FileInput  className="fileInput" placeholder="+" source="brief" label="Ссылка для брифа">
                <FilenameField
                    source="image"
                    title="title" />
            </FileInput >
            <BooleanInput 
                source="isInvisible" 
                label="Показать/Скрыть"/>
            <TextInput className="customWidth" source="path" label="URL" />
            <TextInput className="customWidth" source="position" label="Позиция"/>
            <TextInput className="customWidth" source="descrTotal" label="Описание для разводящей" fullWidth />
            <TextInput className="customWidth" source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100}  source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Проекты" />
            </ReferenceArrayInput>

            <TextInput className="customWidth" source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />

            <ArrayInput
                source="benefits"
                label="Преимущества"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="benefitsName" label="Название преимущества" />
                    <TextInput className="customWidth" source="benefitsDescr" label="Описание" />
                    <ReferenceArrayInput source="benefitsPersons" reference="persons">
                        <SelectInput className="customWidth" optionText="name" label="Сотрудник" />
                    </ReferenceArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput className="customWidth" source="blockTitle" label="Заголовок для блока" />
            <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Элементы блока" />
            </ReferenceArrayInput>
            <ArrayInput
                source="work"
                label="Как проходит работа"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="workName" label="Название" />
                    <TextInput className="customWidth" source="workDescr" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                source="tariffs"
                label="Тарифы"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="tariffsCategory" label="Категория тарифа" />
                    <TextInput className="customWidth" source="tariffDeadline" label="Срок работы" />
                    <TextInput className="customWidth" source="tariffPrice" label="Стоимость" />
                </SimpleFormIterator>
            </ArrayInput>

            <p>SEO</p>
            <p className="baseFlexWrap">
                <TextInput className="customWidth" source="seoTitle" label="TITLE" />
                <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
                <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
            </p>
        </SimpleForm>
    </Edit>
);