import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, ArrayInput, SimpleFormIterator, SelectArrayInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                console.log(record);
                if (record.filename) {
                    if (record.mimetype.indexOf('mp4') !== -1) {
                        return (
                            <video autoPlay loop playsInline><source src="/static/media/webhands.397582827e1e32109804.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" /></video>
                        )
                    } else {
                        return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                    }
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
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
            <TextInput source="name" label="Заголовок" fullWidth validate={[required()]} />
            {/* <TextInput source="path" label="URL" /> */}
            <TextInput source="position" label="Позиция"/>
            <TextInput source="descrTotal" label="Описание для разводящей" fullWidth />
            <TextInput source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100} source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput optionText="name" label="Проекты" />
            </ReferenceArrayInput>
            <TextInput source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />

            <ArrayInput
                source="benefits"
                label="Преимущества"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="benefitsName" label="Название преимущества" />
                    <TextInput source="benefitsDescr" label="Описание" />
                    <ReferenceArrayInput source="benefitsPersons" reference="persons">
                        <SelectInput optionText="name" label="Сотрудник" />
                    </ReferenceArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="blockTitle" label="Заголовок для блока" />
            <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                <SelectArrayInput optionText="name" label="Услуги" />
            </ReferenceArrayInput>

            <ArrayInput
                source="work"
                label="Как проходит работа"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="workName" label="Название" />
                    <TextInput source="workDescr" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                source="tariffs"
                label="Тарифы"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="tariffsCategory" label="Категория тарифа" />
                    <ArrayInput
                        source="tariffsItems"
                        label="Тариф"
                    >
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <TextInput source="tariffName" label="Название" />
                            <TextInput source="tariffDeadline" label="Срок работы" />
                            <TextInput source="tariffPrice" label="Стоимость" />
                            <ArrayInput
                                source="tariffList"
                                label="Что входит в тариф"
                            >
                                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                                    <TextInput source="tariffWork" label="Услуга тарифа" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

        </SimpleForm>
    </Create>
);

export const ServicesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" fullWidth validate={[required()]} />
            <TextInput source="path" label="URL" />
            <TextInput source="position" label="Позиция"/>
            <TextInput source="descrTotal" label="Описание для разводящей" fullWidth />
            <TextInput source="descr" label="Описание для деталки" fullWidth />
            <ReferenceArrayInput perPage={100}  source="subProjects" reference="projects" allowEmpty={true}>
                <SelectArrayInput optionText="name" label="Проекты" />
            </ReferenceArrayInput>

            <TextInput source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />

            <ArrayInput
                source="benefits"
                label="Преимущества"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="benefitsName" label="Название преимущества" />
                    <TextInput source="benefitsDescr" label="Описание" />
                    <ReferenceArrayInput source="benefitsPersons" reference="persons">
                        <SelectInput optionText="name" label="Сотрудник" />
                    </ReferenceArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="blockTitle" label="Заголовок для блока" />
            <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                <SelectArrayInput optionText="name" label="Элементы блока" />
            </ReferenceArrayInput>

            <ArrayInput
                source="work"
                label="Как проходит работа"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="workName" label="Название" />
                    <TextInput source="workDescr" label="Описание" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                source="tariffs"
                label="Тарифы"
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="tariffsCategory" label="Категория тарифа" />
                    <ArrayInput
                        source="tariffsItems"
                        label="Тариф"
                    >
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <TextInput source="tariffName" label="Название" />
                            <TextInput source="tariffDeadline" label="Срок работы" />
                            <TextInput source="tariffPrice" label="Стоимость" />
                            <ArrayInput
                                source="tariffList"
                                label="Что входит в тариф"
                            >
                                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                                    <TextInput source="tariffWork" label="Услуга тарифа" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

        </SimpleForm>
    </Edit>
);