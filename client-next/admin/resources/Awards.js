import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput, BooleanInput, SelectInput } from 'react-admin';

const apiUrl = '';


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

export const AwardsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const AwardsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название" 
                validate={[required()]} />
            <TextInput
                className="customWidth"
                source="blogUrl"
                label="Ссылка на блог"
                validate={[required()]} />
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

        </SimpleForm>
    </Create>
);

export const AwardsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput
                className="customWidth" 
                source="name" 
                label="Название" 
                validate={[required()]} />
            <TextInput
                className="customWidth"
                source="blogUrl"
                placeholder={"awwwards"}
                label='Ссылка на блог(указываем после : /news/... ) '
                validate={[required()]} />
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

        </SimpleForm>
    </Edit>
);