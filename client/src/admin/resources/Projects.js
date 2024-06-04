import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, SearchInput, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, FileField, ArrayInput, SimpleFormIterator } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { ColorInput } from 'react-admin-color-picker';
import { MyToolbar } from '../toolbar';

const apiUrl = ''

const VideoOrImageField = ({ file }) => {

    const isVideo = (funcFile) => {
        return funcFile && funcFile.filename && funcFile.mimetype.indexOf('mp4') !== -1;
    };

    if (!!file) {
        if (isVideo(file)) {
            return (
                <video style={{ width: '300px' }} autoPlay loop playsInline>
                    <source src="/static/media/webhands.397582827e1e32109804.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
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
                return (<VideoOrImageField file={record} />)
            }}
        />
    )
}

// const handleInputChange = (value) => {
//     const inputValue = value || ''; // If the value is null or undefined, set it to an empty string
//     // Process the input value or update your component state
//     // ...
//   };

const postFilters = [
    <SearchInput source="name" alwaysOn />
];


export const ProjectsList = (props) => (
    <List {...props} filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="seoTitle" label="title" />
            <TextInput className="customWidth" source="seoDescription" label="description" />
            <TextInput className="customWidth" source="seoKeywords" label="keywords" />
            <TextInput
                className="customWidth"
                source="name"
                label="Заголовок"
                validate={[required()]}
            />
            <TextInput
                className="customWidth"
                source="descrProject"
                label="Краткое описание"
            />
            <TextInput
                className="customWidth"
                source="nameInEng"
                label="URL" fullWidth  />
            <BooleanInput
                source="visibility"
                label="Скрыть/Показать проекта проекта"/>
            <ImageInput
                className="fileInput"
                placeholder="+"
                source="image"
                label="Главное изображение"
                validate={[required()]}
                accept="image/*"
            >
                <FilenameField source="src" title="title" />
            </ImageInput>
            <BooleanInput
                source="controlURL"
                label="Переход на URL при клике"/>
            <TextInput
                className="customWidth"
                source="projectURL"
                label="URL проекта"/>
            <TextInput
                className="customWidth"
                source="projectSite"
                label="Сайт проекта"/>
            <FileInput
                source="mainVideoFile"
                label="Баннер видео">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="mainVideo"
                label="Видео для баннера(url)"  />
            <ColorInput
                source="color"
                label="Цвет проекта"
                validate={[required()]} />
            <BooleanInput
                source="main"
                label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <TextInput
                className="customWidth"
                source="bannerText"
                title="Текст для баннера"  />
            <ReferenceArrayInput
                source="projectTheme"
                reference="themes">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Тема проекта" />
            </ReferenceArrayInput>
            <ReferenceArrayInput
                source="projectType"
                reference="types">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Тип проекта" />
            </ReferenceArrayInput>
            <TextInput
                className="customWidth"
                source="about"
                label="О клиенте"  />
            <FileInput
                source="bannerFirst"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="bannerFirstVideo"
                allowEmpty
                label="Видео для баннера(url)"  />
            <TextInput
                className="customWidth"
                source="taskDescr"
                label="Описание для блока Цели и задачи"  />
            <TextInput
                className="customWidth"
                source="task"
                label="Задача"  />
            <ReferenceArrayInput
                source="taskPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ArrayInput
                source="tasksList"
                label="Список задач"
            >
                <SimpleFormIterator>
                    <RichTextInput
                        className="customWidth"
                        source="tasksItem"
                        label="Задача" />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput
                source="aimColor"
                label="Цвет задач" />
            <FileInput
                source="bannerSecond"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerSeconds"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerSecondVideo"
                label="Видео для баннера(url)"  />
            <TextInput
                className="customWidth"
                source="approach"
                label="Подход"  />
            <ReferenceArrayInput
                source="approachPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для подхода" />
            </ReferenceArrayInput>
            <ArrayInput
                label={'Список цитат'}
                source={'approachList'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет фона" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста цитаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>
            <FileInput
                source="bannerThird"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerThirds"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                label={'Список цитат'}
                source={'approachListThird'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет фона" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста цитаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>

            <TextInput
                className="customWidth"
                source="bannerThirdVideo"
                label="Видео для баннера(url)"  />
            <RichTextInput
                className="customWidth"
                 source="body"  />
            <TextInput
                className="customWidth"
                source="workStepsHeader"
                label="Подзаголовок Этапы работ"  />
            <ArrayInput
                source="workSteps"
                label="Этапы работ">
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="workStepsTitle" />
                    <TextInput
                        className="customWidth"
                        source="workStepsIntroText" />
                    <RichTextInput
                        className="customWidth"
                        source="workStepsItem"  />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput
                source="workStepsColor"
                label="Цвет этапы работ" />
            <FileInput
                source="bannerFourth"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerFourths"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerFourthVideo"
                label="Видео для баннера(url)"  />

            <ArrayInput
                label={'Список цитат'}
                source={'approachListSecond'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет фона" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста цитаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>

            <RichTextInput
                className="customWidth"
                source="result"
                label="Результаты"  />
            <ColorInput
                source="resultTextColor"
                label="Цвет текста резултаты" />
            <TextInput
                className="customWidth"
                source="resultPersonsText"
                label="Результаты прямая речь"  />
            <ReferenceArrayInput
                source="resultPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ColorInput
                source="resultsColor"
                label="Цвет результаты" />
            <RichTextInput
                className="customWidth"
                source="technologies"
                label="Технологии"  />
            <FileInput
                source="bannerFifth"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerFifths"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerFifthVideo"
                label="Видео для баннера(url)"  />

            <ArrayInput
                source="imagesExtra"
                label="Дополнительные изображения(если редактируется одна картинка, то нужно обновить/заменить и другую)">
                <SimpleFormIterator>
                    <ImageInput
                        className="fileInput"
                        placeholder="+"
                        source="imageI"
                        label="Изображение"
                        accept="image/*">
                        <FilenameField
                            source="src"
                            title="title" />
                    </ImageInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="visibilityTitle1"
                label="Видимость 1"  />
            <FileInput
                source="visibilityImg1"
                label="Фото видимость 1">
                <FileField
                    source="src"
                    title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="visibilityTitle2"
                label="Видимость 2"  />
            <FileInput
                source="visibilityImg2"
                label="Фото видимость 2">
                <FileField
                    source="src"
                    title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const ProjectsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm className='editForm' toolbar={<MyToolbar />}>
            <TextInput className="customWidth" source="seoTitle" label="title" />
            <TextInput className="customWidth" source="seoDescription" label="description" />
            <TextInput className="customWidth" source="seoKeywords" label="keywords" />
            <TextInput
                className="customWidth"
                source="name"
                label="Заголовок"
                validate={[required()]}
            />
            <TextInput
                className="customWidth"
                source="descrProject"
                label="Краткое описание"
            />
            <TextInput
                className="customWidth"
                source="nameInEng"
                label="URL" fullWidth  />
             <BooleanInput
                source="visibility"
                label="Скрыть/Показать проекта"/>
            <ImageInput
                className='fileInput'
                placeholder="+"
                source="image"
                label="Главное изображение"
                validate={[required()]}
                accept="image/*"
            >
                <FilenameField source="src" title="title" />
            </ImageInput>
            <BooleanInput
                source="controlURL"
                label="Переход на URL при клике"/>
            <TextInput
                className="customWidth"
                source="projectURL"
                label="URL проекта"/>
            <TextInput
                className="customWidth"
                source="projectSite"
                label="Сайт проекта"/>
            <FileInput
                source="mainVideoFile"
                label="Баннер видео">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="mainVideo"
                label="Видео для баннера(url)"  />
            <ColorInput
                source="color"
                label="Цвет проекта"
                validate={[required()]} />
            <BooleanInput
                source="main"
                label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
            <TextInput
                className="customWidth"
                source="bannerText"
                title="Текст для баннера"  />
            <ReferenceArrayInput
                source="projectTheme"
                reference="themes">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Тема проекта" />
            </ReferenceArrayInput>
            <ReferenceArrayInput
                source="projectType"
                reference="types">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Тип проекта" />
            </ReferenceArrayInput>
            <TextInput
                className="customWidth"
                source="about"
                label="О клиенте"  />
            <FileInput
                source="bannerFirst"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="bannerFirstVideo"
                allowEmpty
                label="Видео для баннера(url)"  />
            <TextInput
                className="customWidth"
                source="taskDescr"
                label="Описание для блока Цели и задачи"  />
            <TextInput
                className="customWidth"
                source="task"
                label="Задача"  />
            <ReferenceArrayInput
                source="taskPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для задачи" />
            </ReferenceArrayInput>
            <ArrayInput
                source="tasksList"
                label="Список задач"
            >
                <SimpleFormIterator>
                    <RichTextInput
                        className="customWidth"
                        source="tasksItem"
                        label="Задача" />
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput
                source="aimColor"
                label="Цвет задач" />
            <FileInput
                source="bannerSecond"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerSeconds"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerSecondVideo"
                label="Видео для баннера(url)"  />
            <TextInput
                className="customWidth"
                source="approach"
                label="Подход"  />

            <ReferenceArrayInput
                source="approachPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для подхода" />
            </ReferenceArrayInput>

            <ArrayInput
                label={'Список цитат'}
                source={'approachList'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет фона" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста цитаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>


            <FileInput
                source="bannerThird"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerThirds"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput
                label={'Список цитат'}
                source={'approachListThird'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет фона" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста цитаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerThirdVideo"
                label="Видео для баннера(url)"  />
            <RichTextInput
                className="customWidth"
                source="body"  />
            <TextInput
                className="customWidth"
                source="workStepsHeader"
                label="Подзаголовок Этапы работ"  />
            <ArrayInput
                source="workSteps"
                label="Этапы работ">
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        source="workStepsTitle" />
                    <TextInput
                        className="customWidth"
                        source="workStepsIntroText" />
                    <RichTextInput
                        className="customWidth"
                        source="workStepsItem"  />
                    <ArrayInput
                        source="workStepsItemTaskList"
                        label="Список выполненных задач"
                    >
                        <SimpleFormIterator>
                            <RichTextInput
                                className="customWidth"
                                source="workStepsItemTask"
                                label="Описание задачи" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>
            <ColorInput
                source="workStepsColor"
                label="Цвет этапы работ" />
            <FileInput
                source="bannerFourth"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerFourths"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerFourthVideo"
                label="Видео для баннера(url)"  />

            <ArrayInput
                label={'Список цитат'}
                source={'approachListSecond'}>
                <SimpleFormIterator>
                    <ColorInput
                        source="resultsColor"
                        label="Цвет результаты" />
                    <TextInput
                        className="customWidth"
                        source="title"
                        label="Заголовок цитаты"  />
                    <ColorInput
                        source="resultTextColor"
                        label="Цвет текста резултаты" />
                    <TextInput
                        className="customWidth"
                        source="text"
                        label="Текст цитаты"  />
                    <ReferenceArrayInput
                        source="approachPersons"
                        reference="persons">
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Чья цитата " />
                    </ReferenceArrayInput>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </SimpleFormIterator>
            </ArrayInput>

            <RichTextInput
                className="customWidth"
                source="result"
                label="Результаты"  />
            <ColorInput
                source="resultTextColor"
                label="Цвет текста резултаты" />
            <TextInput
                className="customWidth"
                source="resultPersonsText"
                label="Результаты прямая речь"  />
            <ReferenceArrayInput
                source="resultPersons"
                reference="persons">
                <SelectInput
                    className="customWidth"
                    optionText="name"
                    label="Чья цитата для результата" />
            </ReferenceArrayInput>
            <ColorInput
                source="resultsColor"
                label="Цвет результаты" />
            <RichTextInput
                className="customWidth"
                source="technologies"
                label="Технологии"  />
            <FileInput
                source="bannerFifth"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
            <ArrayInput
                label={"Список баннеров"}
                source={"bannerFifths"}
            >
                <SimpleFormIterator>
                    <FileInput
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="bannerFifthVideo"
                label="Видео для баннера(url)"  />

            <ArrayInput
                source="imagesExtra"
                label="Дополнительные изображения(если редактируется одна картинка, то нужно обновить/заменить и другую)">
                <SimpleFormIterator>
                    <ImageInput
                        className='fileInput'
                        placeholder="+"
                        source="imageI"
                        label="Изображение"
                        accept="image/*">
                        <FilenameField
                            source="src"
                            title="title" />
                    </ImageInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput
                className="customWidth"
                source="visibilityTitle1"
                label="Видимость 1"  />
            <FileInput
                source="visibilityImg1"
                label="Фото видимость 1">
                <FileField
                    source="src"
                    title="title" />
            </FileInput>
            <TextInput
                className="customWidth"
                source="visibilityTitle2"
                label="Видимость 2"  />
            <FileInput
                source="visibilityImg2"
                label="Фото видимость 2">
                <FileField
                    source="src"
                    title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);