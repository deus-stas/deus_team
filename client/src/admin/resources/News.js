import React from 'react';
import {List, Datagrid, TextField, EditButton, FileInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, ReferenceArrayInput, SelectInput, required, FunctionField } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const apiUrl = ''


const FileField = props => {
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
                            <video className="customWidth" src={fileUrl} type={record.mimetype}>

                            </video>
                        );
                    } else if (isImage) {
                        return <img src={fileUrl} alt={record.filename}/>;
                    }
                } else {
                    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(record.src);
                    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(record.src);

                    if (isVideo) {
                        return (
                            <video autoPlay loop muted playsInline>
                                <source src={`${record.src}`} alt={record.src} title="video"/>
                            </video>
                        );
                    } else if (isImage) {
                        return <img src={`${record.src}`} alt={record.src} title="image"/>;
                    }
                }
            }}
        />)
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
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <FileInput className="fileInput" placeholder="+" source="image" label="Баннер" validate={[required()]} accept="image/*,video/*">
                <FileField source="src" title="title" />
            </FileInput>
            <ReferenceArrayInput source="newsTags" reference="newsTags" label="Рубрики" validate={[required()]}>
                <SelectInput className="customWidth" optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput className="customWidth" source="body" fullWidth validate={[required()]} />
        </SimpleForm>
    </Create>
);

export const NewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <FileInput className="fileInput" placeholder="+" source="image" label="Баннер" validate={[required()]} accept="image/*,video/*">
                <FileField source="image" title="title" />
            </FileInput>

            <ReferenceArrayInput source="newsTags" reference="newsTags" label="Рубрики" validate={[required()]}>
                <SelectInput className="customWidth" optionText="name" />
            </ReferenceArrayInput>
            <RichTextInput className="customWidth" source="body" fullWidth validate={[required()]} />
        </SimpleForm>
    </Edit>
);