import React from 'react';
import {List, Datagrid, TextField, EditButton, SimpleFormIterator, ArrayInput, FileField, FileInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField } from 'react-admin';

const apiUrl = ''

const VideoOrImageField = props => {
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
                            <video className="customWidth" src={fileUrl}
                                   type={record.mimetype}>
                            </video>
                        );
                    } else if (isImage) {

                        return <img  src={fileUrl} alt={record.filename}/>;
                    }
                } else {
                    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(record.title);
                    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(record.title);

                    if (isVideo) {
                        return (
                            <video autoPlay loop muted playsInline>
                                <source   src={`${record.src}`} alt={record.src} title="video"/>
                            </video>
                        );
                    } else if (isImage) {
                        return <img  src={`${record.src}`} alt={record.src} title="image"/>;
                    }
                }
            }}
        />)
};

const FunctionFieldForArrayItem = (props) => (
    <FunctionField {...props} render={(record, source) => {
        const splitter = source.split(".");
        const field = splitter[0];
        const index = splitter[1];
        if (!!record[field] && !!record[field][index]) {
            const file = record[field][index];
            return (
                <VideoOrImageField record={file}/>
            )
        }

    }}/>

);


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                return (<VideoOrImageField record={record} />)
            }}
        />
    )
}


export const MainPageList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const MainPageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="pageURL" label="Ссылка на страницу" placeholder="/название страницы"/>
            <FileInput
                source="mainVideoFile"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <ArrayInput
                source="textList"
                label="Описание"
            >
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="textItem"
                        label="текст" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const MainPageEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]} />
            <TextInput className="customWidth" source="pageURL" label="Ссылка на страницу" placeholder="/название страницы"/>
            <FileInput
                source="mainVideoFile"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <ArrayInput
                source="textList"
                label="Описание"
            >
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="textItem"
                        label="текст" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);