import React from 'react';
import {List, Datagrid, TextField, EditButton, SimpleFormIterator, ArrayInput, FileField, FileInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField } from 'react-admin';

const apiUrl = ''

const VideoOrImageField = ({ file }) => {

    const isVideo = (funcFile) => {
        return funcFile && funcFile.filename && funcFile.mimetype.indexOf('mp4') !== -1;
    };

    if (!!file) {
        if (isVideo(file)) {
            return (
                <video style={{ width: '300px' }} autoPlay loop playsInline>
                    <source src={`${apiUrl}/uploads/${file.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                </video>
            );
        } else {
            return <img style={{ width: '300px' }} src={`${apiUrl}/uploads/${file.filename}`} alt={file.filename} title="image" />;
        }
    }
    return null; // Return null if file is not available
};

const FunctionFieldForArrayItem = (props) => (
    <FunctionField {...props} render={(record, source) => {
        const splitter = source.split(".");
        const field = splitter[0];
        const index = splitter[1];
        console.log(record, source)
        if(!!record[field] && !!record[field][index]){
            const file = record[field][index];
            return (
                <VideoOrImageField file={file}/>
            )
        }

    }}/>
);


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                console.log('record:',record,props);
                return (<VideoOrImageField file={record} />)
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
                label="Баннер видео">
                <FileField source="src" title="title" />
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
                label="Баннер видео">
                <FileField source="src" title="title" />
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