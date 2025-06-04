import React from 'react';
import {List, Datagrid, TextField, EditButton, ReferenceInput, ImageInput} from 'react-admin';
// import './Services.css';
import { Create, SimpleForm, TextInput, Edit, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, ArrayInput, SimpleFormIterator, SelectArrayInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';

const apiUrl = ''

const VideoOrImageField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    const fileUrl = `${apiUrl}/uploads/${record.filename}`;
                    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(record.filename);
                    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(record.filename);

                    if (isVideo) {
                        return (
                            <video className="customWidth" src={fileUrl}
                                   type={record.mimetype}>
                            </video>
                        );
                    } else if (isImage) {
                        return <img src={fileUrl} alt={record.filename} style={{ maxWidth: '200px', maxHeight: '150px' }}/>;
                    }
                } else {
                    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(record.title);
                    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(record.title);

                    if (isVideo) {
                        return (
                            <video className="customWidth" src={record.src}
                                   type={record.mimetype}>
                            </video>
                        );
                    } else if (isImage) {
                        return <img src={record.src} alt={record.title} style={{ maxWidth: '200px', maxHeight: '150px' }}/>;
                    }
                }
                return null;
            }}
        />
    )
}

const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                return (<VideoOrImageField record={record} />)
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
            <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
            
            <p>Баннер</p>
            <FileInput
                source="serviceBanner"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            
            {/* <TextInput className="customWidth" source="path" label="URL" /> */}
            <BooleanInput 
                source="isInvisible" 
                label="Показать/Скрыть"/>
            <TextInput className="customWidth" source="position" label="Позиция"/>
            <RichTextInput className="customWidth rich-text-input" source="descrTotal" label="Описание для разводящей" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100} source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Проекты" />
            </ReferenceArrayInput>
            <TextInput className="customWidth" source="whyChooseUsTitle" label="Заголовок секции 'Почему выбирают'" fullWidth />
            
            <ArrayInput source="whyChooseUsOptions" label="Преимущества выбора">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="number" label="Номер" />
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="serviceIncludesTitle" label="Заголовок секции 'Что входит в услугу'" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="serviceIncludesDescription" label="Описание для 'Что входит в услугу'" fullWidth />
            
            <ArrayInput source="serviceIncludesOptions" label="Элементы услуги">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="asproTemplatesTitle" label="Заголовок секции 'Шаблоны Aspro'" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="asproTemplatesDescription" label="Описание для 'Шаблоны Aspro'" fullWidth />
            
            <ArrayInput source="asproTemplatesOptions" label="Шаблоны Aspro">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="faqTitle" label="Заголовок секции FAQ" fullWidth />
            
            <ArrayInput source="faqOptions" label="Вопросы и ответы">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Вопрос" />
                    <RichTextInput className="customWidth" source="description" label="Ответ" />
                </SimpleFormIterator>
            </ArrayInput>

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
            <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
            
             <p>Баннер</p>
            <FileInput
                source="serviceBanner"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            
            <BooleanInput 
                source="isInvisible" 
                label="Показать/Скрыть"/>
            <TextInput className="customWidth" source="path" label="URL" />
            <TextInput className="customWidth" source="position" label="Позиция"/>
            <RichTextInput className="customWidth rich-text-input" source="descrTotal" label="Описание для разводящей" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100}  source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput className="customWidth" optionText="name" label="Проекты" />
            </ReferenceArrayInput>

            <TextInput className="customWidth" source="whyChooseUsTitle" label="Заголовок секции 'Почему выбирают'" fullWidth />
            
            <ArrayInput source="whyChooseUsOptions" label="Преимущества выбора">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="number" label="Номер" />
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="serviceIncludesTitle" label="Заголовок секции 'Что входит в услугу'" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="serviceIncludesDescription" label="Описание для 'Что входит в услугу'" fullWidth />
            
            <ArrayInput source="serviceIncludesOptions" label="Элементы услуги">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="asproTemplatesTitle" label="Заголовок секции 'Шаблоны Aspro'" fullWidth />
            <RichTextInput className="customWidth rich-text-input" source="asproTemplatesDescription" label="Описание для 'Шаблоны Aspro'" fullWidth />
            
            <ArrayInput source="asproTemplatesOptions" label="Шаблоны Aspro">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Заголовок" />
                    <RichTextInput className="customWidth" source="description" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput className="customWidth" source="faqTitle" label="Заголовок секции FAQ" fullWidth />
            
            <ArrayInput source="faqOptions" label="Вопросы и ответы">
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput className="customWidth" source="title" label="Вопрос" />
                    <RichTextInput className="customWidth" source="description" label="Ответ" />
                </SimpleFormIterator>
            </ArrayInput>

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