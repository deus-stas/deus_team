import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, required, FileInput, FileField, BooleanInput } from 'react-admin';
import { useInput } from 'react-admin';
import { useWatch } from 'react-hook-form';

const VideoPreview = ({ source }) => {
    const {
        field: { value }
    } = useInput({ source });
    const videoPath = useWatch({ name: source });

    return (
        <div>
            {videoPath && (
                <video width="320" height="240" controls>
                    <source src={`/${videoPath}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export const ShowreelsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="mainShowreel" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ShowreelsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput className="fileInput" placeholder="+" source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput className="customWidth" source="videoUrl" label="URL" />
        </SimpleForm>
    </Create>
);

export const ShowreelsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="year" label="Год" />
            <BooleanInput source="mainShowreel" label="Установить как главный шоурил?(нужно снять с других шоурилов)" />
            <FileInput className="fileInput" placeholder="+" source="video" label="Шоурил">
                <FileField source="src" title="title" />
            </FileInput>
            <VideoPreview source="video.path" />
            <TextInput className="customWidth" source="videoUrl" label="URL" />
        </SimpleForm>
    </Edit>
);