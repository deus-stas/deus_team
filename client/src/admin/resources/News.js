import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, ReferenceArrayInput, SelectInput, required, FunctionField } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

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


export const NewsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const NewsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" validate={[required()]} />
            <ImageInput source="image" label="Баннер" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ReferenceArrayInput source="tags" reference="tags" label="Тэги" validate={[required()]}>
                <SelectInput optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput source="body" fullWidth validate={[required()]} />
        </SimpleForm>
    </Create>
);

export const NewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Заголовок" validate={[required()]} />
            <ImageInput source="image" label="Баннер" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>

            <ReferenceArrayInput source="tags" reference="tags" label="Тэги" validate={[required()]}>
                <SelectInput optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput source="body" fullWidth validate={[required()]} />
        </SimpleForm>
    </Edit>
);