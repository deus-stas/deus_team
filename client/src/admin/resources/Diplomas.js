import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput, BooleanInput } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
  ? 'http://188.120.232.38'
  : 'http://localhost:4554';


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

export const DiplomasList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const DiplomasCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <BooleanInput source="controlVisibility" label="Скрыть/Показать"/>
            <ImageInput source="image" label="Иконка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="diplomaProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="diplomaName" label="Название проекта" />
                    <TextInput source="diplomaPlace" label="Какое место и какая номинация" />
                    <TextInput source="diplomaYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const DiplomasEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <BooleanInput source="controlVisibility" label="Скрыть/Показать"/>
            <ImageInput source="image" label="Картинка" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
            <ArrayInput
                source="diplomaProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="diplomaName" label="Название проекта" />
                    <TextInput source="diplomaPlace" label="Какое место и какая номинация" />
                    <TextInput source="diplomaYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);