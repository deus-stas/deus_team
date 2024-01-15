import React, {useEffect, useState} from 'react';
import {List, Datagrid, TextField, EditButton, BooleanInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, AutocompleteInput } from 'react-admin';
import axios from "axios";

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

export const TeamList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const TeamCreate = (props) => {
    const [teamLength, setTeamLength] = useState([]);
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    useEffect(() => {

        axios.get(`${apiUrl}/api/team/`)
            .then((response) => {
                const choices = response.data.map((val, index) => ({
                    id: 'option' + index,
                    name: val.name,
                }));
                setTeamLength(choices);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput className="customWidth" source="name" label="Имя"/>
                <TextInput className="customWidth" source="post" label="Должность"/>
                <AutocompleteInput
                    debounce={500}
                    source="priority"
                    label="Приоритет"
                    choices={[]}
                    optionText="name" // Использует поле "name" для отображения результатов поиска
                />

                <ImageInput className="fileInput" placeholder="+" source="mainImg" label="Фотография"
                            accept="image/*">
                    <FilenameField source="src" title="title"/>
                </ImageInput>
                <BooleanInput
                    source="mainControl"
                    label="Показывать на главной"/>
                <BooleanInput
                    source="serviceControl"
                    label="Показывать в услугах"/>
                <BooleanInput
                    source="agencyControl"
                    label="Показывать в агенстве"/>

                <ImageInput className="fileInput" placeholder="+" source="image" label="Emoji"
                            accept="image/*">
                    <FilenameField source="src" title="title"/>
                </ImageInput>

            </SimpleForm>
        </Create>
    )
};

export const TeamEdit = (props) => {
    const [teamLength, setTeamLength] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/team/`)
            .then((response) => {
                setTeamLength(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const disableNumber = teamLength.map((val)=> Number(val.priority))

    const choices = teamLength.map((val, index) => ({
        id: index+1,
        name: index+1,

    })).filter((val)=> !disableNumber.includes(val.name));

    return (<Edit {...props}>
            <SimpleForm>
                <TextInput className="customWidth" source="name" label="Имя"/>
                <TextInput className="customWidth" source="post" label="Должность"/>
                <AutocompleteInput
                    source="priority"
                    label="Приоритет"
                    choices={choices}
                    optionText="name" // Использует поле "name" для отображения результатов поиска
                />
                <ImageInput className="fileInput" placeholder="+" source="mainImg" label="Фотография"
                            accept="image/*">
                    <FilenameField source="src" title="title"/>
                </ImageInput>
                <BooleanInput
                    source="mainControl"
                    label="Показывать на главной"/>
                <BooleanInput
                    source="serviceControl"
                    label="Показывать в услугах"/>
                <BooleanInput
                    source="agencyControl"
                    label="Показывать в агенстве"/>

                <ImageInput className="fileInput" placeholder="+" source="image" label="Emoji" accept="image/*">
                    <FilenameField source="src" title="title"/>
                </ImageInput>
            </SimpleForm>
        </Edit>
    )
};