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
            <TextInput className="customWidth" source="email" label="Email" validate={[required()]} />
            <TextInput className="customWidth" source="phone" label="Телефон" />
            <TextInput className="customWidth" source="vk" label="VK" />
            <TextInput className="customWidth" source="telegram" label="Telegram" />
            <TextInput className="customWidth" source="behance" label="Behance" />
            <FileInput className="fileInput" placeholder="+" source="presentation" label="Презентация">
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput className="fileInput" placeholder="+" source="headerPhoto" label="Фото на шапке">
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput className="fileInput" placeholder="+" source="contactPhoto" label="Фотo  в странице контакты">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const HeaderDataEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="email" label="Email" validate={[required()]} />
            <TextInput className="customWidth" source="phone" label="Телефон" />
            <TextInput className="customWidth" source="vk" label="VK" />
            <TextInput className="customWidth" source="telegram" label="Telegram" />
            <TextInput className="customWidth" source="behance" label="Behance" />
            <FileInput className="fileInput" placeholder="+" source="presentation" label="Презентация">
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput className="fileInput" placeholder="+" source="headerPhoto" label="Фото на шапке">
                <FileField source="src" title="title" />
            </FileInput>
            <FileInput className="fileInput" placeholder="+" source="contactPhoto" label="Фотo  в странице контакты">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);