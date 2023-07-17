import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput, BooleanInput, SelectInput } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
  ? 'http://188.120.232.38'
  : 'http://localhost:4554';


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
            <TextInput source="name" label="Название" validate={[required()]} />
            <BooleanInput source="controlVisibility" label="Скрыть/Показать"/>
            <ImageInput source="image" label="Иконка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="awardProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="awardName" label="Название проекта" />
                    <TextInput source="awardPlace" label="Какое место и какая номинация" />
                    <TextInput source="awardYear" label="Год" />
                    {/* <BooleanInput source="awardControlVisibility" label="Скрыть/Показать"/> */}
                    <SelectInput source="awardControlVisibility" label="Скрыть/Показать" choices={[
                        { id: true, name: 'Показать' },
                        { id: false, name: 'Скрыть' },
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const AwardsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <BooleanInput source="controlVisibility" label="Скрыть/Показать"/>
            <ImageInput source="image" label="Картинка" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
            <ArrayInput
                source="awardProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                    <TextInput source="awardName" label="Название проекта" />
                    <TextInput source="awardPlace" label="Какое место и какая номинация" />
                    <TextInput source="awardYear" label="Год" />
                    {/* <BooleanInput source="awardControlVisibility" label="Скрыть/Показать"/> */}
                    <SelectInput source="awardControlVisibility" label="Скрыть/Показать" choices={[
                        { id: true, name: 'Показать' },
                        { id: false, name: 'Скрыть' },
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);