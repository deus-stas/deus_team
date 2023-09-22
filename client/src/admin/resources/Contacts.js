import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput, BooleanInput, SelectInput } from 'react-admin';

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

export const ContactsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="pageName" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ContactsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput className="customWidth" 
                        label="Страница" 
                        source="pageName" 
                        choices={[
                { id: 'main', name: 'Main page' },
                { id: 'projects', name: 'Projects' },
                { id: 'services', name: 'Services' },
                { id: 'agency', name: 'Agency' },
                { id: 'contacts', name: 'Contacts' },
            ]} validate={[required()]}/>
            <TextInput
                className="customWidth" 
                source="title" 
                label="Title" 
            />
            <TextInput
                className="customWidth" 
                source="description" 
                label="Description" 
            />
            
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

export const ContactsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput className="customWidth" 
                        label="Страница" 
                        source="pageName" 
                        choices={[
                { id: 'main', name: 'Main page' },
                { id: 'projects', name: 'Projects' },
                { id: 'services', name: 'Services' },
                { id: 'agency', name: 'Agency' },
                { id: 'contacts', name: 'Contacts' },
            ]} validate={[required()]}/>
            <TextInput
                className="customWidth" 
                source="title" 
                label="Title" 
            />
            <TextInput
                className="customWidth" 
                source="description" 
                label="Description" 
            />
            
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
    </Edit>
);