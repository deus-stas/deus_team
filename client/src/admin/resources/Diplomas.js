import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput, BooleanInput } from 'react-admin';

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
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название" 
                validate={[required()]} />
            <BooleanInput 
                source="controlVisibility" 
                label="Скрыть/Показать"/>
            <ImageInput
                className="fileInput" 
                placeholder="+" 
                source="image" 
                label="Иконка" 
                validate={[required()]} 
                accept="image/*">
                <ImageField 
                    source="src" 
                    title="title" />
            </ImageInput>
            <ArrayInput
                source="diplomaProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator inline>
                    <TextInput
                        className="customWidth" 
                        source="diplomaName" 
                        label="Название проекта" />
                    <TextInput
                        className="customWidth" 
                        source="diplomaPlace" 
                        label="Какое место и какая номинация" />
                    <TextInput
                        className="customWidth" 
                        source="diplomaYear" 
                        label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const DiplomasEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название" 
                validate={[required()]} />
            <BooleanInput 
                source="controlVisibility" 
                label="Скрыть/Показать"/>
            <ImageInput
                className="fileInput" 
                placeholder="+" 
                source="image" 
                label="Картинка" 
                validate={[required()]} 
                accept="image/*">
                <FilenameField 
                    source="image" 
                    title="title" />
            </ImageInput>
            <ArrayInput
                source="diplomaProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator inline>
                    <TextInput
                        className="customWidth" 
                        source="diplomaName" 
                        label="Название проекта" />
                    <TextInput
                        className="customWidth" 
                        source="diplomaPlace" 
                        label="Какое место и какая номинация" />
                    <TextInput
                        className="customWidth" 
                        source="diplomaYear" 
                        label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);