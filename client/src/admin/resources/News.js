import React, {useEffect} from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    FileInput,
    BooleanInput,
    SimpleFormIterator,
    ArrayInput, FormDataConsumer
} from 'react-admin';
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
}

const FunctionFieldForArrayItem = (props) => (
    <FunctionField {...props} render={(record, source) => {
        const splitter = source.split(".");
        const field = splitter[0];
        const index = splitter[1];
        if(!!record[field] && !!record[field][index]){
            const file = record[field][index];
            return (
                <FileField record={file}/>
            )
        }

    }}/>
);

const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                return (<FileField record={record} />)
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
                <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]}/>
                 <TextInput
                    className="customWidth"
                    source="description"
                    label="небольшое описание"/>
            <p className="baseFlexWrap">
                <FileInput className="fileInput edit-page" placeholder="+" source="image" label="Превью"
                           validate={[required()]} accept="image/*,video/*">
                    <FileField source="image" title="title"/>
                </FileInput>
                <FileInput className="fileInput edit-page" placeholder="+" source="mainNewsImage" label="Баннер"
                           validate={[required()]} accept="image/*,video/*">
                    <FileField source="image" title="title"/>
                </FileInput>
            </p>
            <p className="baseFlexWrap">
                <BooleanInput
                    source="mainControl"
                    label="Главная страница Превью/Видео"/>
                <BooleanInput
                    source="detailControl"
                    label="Деталка Превью/Видео"/>
            </p>


            <ReferenceArrayInput source="newsTags" reference="newsTags" label="Рубрики" validate={[required()]}>
                <SelectInput className="customWidth" label="Рубрики" optionText="name"/>
            </ReferenceArrayInput>
            <TextInput
                className="customWidth"
                source="aboutClient"
                label="Заголовок"/>
            <TextInput
                className="customWidth"
                source="underAboutClient"
                label="Подзаголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body" fullWidth/>

            <FileInput
                source="bannerSecond"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <TextInput
                className="customWidth"
                source="aboutImg"
                label="Подпись"/>

            <RichTextInput className="customWidth" label="Текст" source="body2" fullWidth/>

            <TextInput
                className="customWidth"
                source="aboutClient2"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body3" fullWidth/>

            <ArrayInput
                label="Фотогалерея"
                source="photoSlider"
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Фото">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>

                </SimpleFormIterator>
            </ArrayInput>

            <TextInput
                className="customWidth"
                source="aboutClient3"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body4" fullWidth/>

            <FileInput
                source="bannerThird"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <TextInput
                className="customWidth"
                source="aboutImg2"
                label="Подпись"/>

            <TextInput
                className="customWidth"
                source="aboutClient4"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body5" fullWidth/>
        </SimpleForm>
    </Create>
);

export const NewsEdit = (props) => {
    return (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Заголовок" validate={[required()]}/>
            <TextInput
                className="customWidth"
                source="description"
                label="небольшое описание"/>
            <p className="baseFlexWrap">
                <FileInput className="fileInput edit-page" placeholder="+" source="image" label="Превью"
                           validate={[required()]} accept="image/*,video/*">
                    <FileField source="image" title="title"/>
                </FileInput>
                <FileInput className="fileInput edit-page" placeholder="+" source="mainNewsImage" label="Баннер"
                           validate={[required()]} accept="image/*,video/*">
                    <FileField source="image" title="title"/>
                </FileInput>
            </p>
            <p className="baseFlexWrap">
                <BooleanInput
                    source="mainControl"
                    label="Главная страница Превью/Видео"/>
                <BooleanInput
                    source="detailControl"
                    label="Деталка Превью/Видео"/>
            </p>


            <ReferenceArrayInput source="newsTags" reference="newsTags" label="Рубрики" validate={[required()]}>
                <SelectInput className="customWidth" label="Рубрики" optionText="name"/>
            </ReferenceArrayInput>
            <TextInput
                className="customWidth"
                source="aboutClient"
                label="Заголовок"/>
            <TextInput
                className="customWidth"
                source="underAboutClient"
                label="Подзаголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body" fullWidth/>

            <FileInput
                source="bannerSecond"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <TextInput
                className="customWidth"
                source="aboutImg"
                label="Подпись"/>

            <RichTextInput className="customWidth" label="Текст" source="body2" fullWidth/>

            <TextInput
                className="customWidth"
                source="aboutClient2"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body3" fullWidth/>

            <ArrayInput
                label="Фотогалерея"
                source="photoSlider"
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Фото">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>

                </SimpleFormIterator>
            </ArrayInput>

            <TextInput
                className="customWidth"
                source="aboutClient3"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body4" fullWidth/>

            <FileInput
                source="bannerThird"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title"/>
            </FileInput>
            <TextInput
                className="customWidth"
                source="aboutImg2"
                label="Подпись"/>

            <TextInput
                className="customWidth"
                source="aboutClient4"
                label="Заголовок"/>
            <RichTextInput className="customWidth" label="Текст" source="body5" fullWidth/>

            <TextInput 
                className="customWidth" 
                source="seoTitle" 
                label="title"/>

            <TextInput 
                className="customWidth" 
                source="seoDescription" 
                label="description"/>

            <TextInput 
                className="customWidth" 
                source="seoKeywords" 
                label="keywords"/>

        </SimpleForm>
    </Edit>
);
}