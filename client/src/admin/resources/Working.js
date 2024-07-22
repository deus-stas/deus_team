import React from 'react';
import {List, Datagrid, TextField, EditButton} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput,  required, FunctionField } from 'react-admin';

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


export const WorkingList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const WorkingCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Работают...?" validate={[required()]} />
            <TextInput className="customWidth" source="descr" label="Описание" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="file" label="Иконка">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const WorkingEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Работают...?" validate={[required()]} />
            <TextInput className="customWidth" source="descr" label="Описание" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="file" label="Иконка">
                <FilenameField
                    source="image"
                    title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);