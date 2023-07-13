import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, FileInput, FileField } from 'react-admin';

export const HeaderDataList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="email" />
            <TextField source="phone" />
            <EditButton />
        </Datagrid>
    </List>
);

export const HeaderDataCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" label="Email" validate={[required()]} />
            <TextInput source="phone" label="Телефон" />
            <TextInput source="vk" label="VK" />
            <TextInput source="telegram" label="Telegram" />
            <TextInput source="behance" label="Behance" />
            <FileInput source="presentation" label="Презентация">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const HeaderDataEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="email" label="Email" validate={[required()]} />
            <TextInput source="phone" label="Телефон" />
            <TextInput source="vk" label="VK" />
            <TextInput source="telegram" label="Telegram" />
            <TextInput source="behance" label="Behance" />
            <FileInput source="presentation" label="Презентация">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);