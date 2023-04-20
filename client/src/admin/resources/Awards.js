import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput } from 'react-admin';

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
            <TextInput source="name" label="Название" validate={[required()]} />
            <ImageInput source="image" label="Иконка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="awardProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="awardName" label="Название проекта" />
                    <TextInput source="awardPlace" label="Какое место и какая номинация" />
                    <TextInput source="awardYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const AwardsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <ImageInput source="image" label="Иконка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="awardProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="awardName" label="Название проекта" />
                    <TextInput source="awardPlace" label="Какое место и какая номинация" />
                    <TextInput source="awardYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);