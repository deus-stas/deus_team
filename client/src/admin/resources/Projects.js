import React, {useEffect, useState} from 'react';
import {List, Datagrid, TextField, EditButton, SimpleShowLayout, AutocompleteArrayInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, SearchInput, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, FileField, ArrayInput, SimpleFormIterator } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import {useWatch} from "react-hook-form";
import axios from "../../axios";

const apiUrl = ''

/**
 * Компонент VideoOrImageField - это многоразовый компонент React, который отображает либо видео, либо изображение на основе предоставленного объекта файла.
 * @returns {JSX.Element} - Элемент React, который отображает либо видео, либо изображение.
 * const VideoOrImageField = ({ file }) => { // ... };
 * @param props
 */
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

/**
 * Компонент FunctionFieldForArrayItem - это многоразовый компонент React, который оборачивает компонент FunctionField из библиотеки react-admin. * @param {object} file - Объект файла, который необходимо отобразить.
 * Он предназначен для работы с полями массива и предоставляет пользовательскую функцию отображения.
 * @param {object} props - Свойства, переданные компоненту FunctionField.
 * @returns {JSX.Element} - Элемент React, который отображает либо видео, либо изображение.
 * const FunctionFieldForArrayItem = (props) => { // ... };
 */

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

const postFilters = [
    <SearchInput source="name" alwaysOn />
];


export const ProjectsList = (props) => {
    const [types, setTypes] = useState([])

    useEffect(()=>{
        axios.get(`${apiUrl}/api/types/`)
            .then((res)=>{
                setTypes(res.data)
            })
    },[])

    const projectTypes = {
        'seo': "seo",
        'site-and-services': "сайты и сервисы",
        'tech-support': "Техническая поддержка",
        'video-production': "Видеопродакшн",
    };

    const getTypeName = (id) => {
        const findType = types.find((item)=> item._id == id )
        return projectTypes[findType?.key] || "другое";
    }

    return (
            <List {...props} filters={postFilters}>
                <Datagrid rowClick="edit">
                    <TextField  label="Название" source="name" />
                    <FunctionField
                        source="projectType"
                        label="тип проекта"
                        render={(record) => getTypeName(record.projectType)}
                    />
                    <EditButton />
                </Datagrid>
            </List>
        )

};

export const ProjectsCreate = (props) => {
    const [types, setTypes] = useState([])

    useEffect(()=>{
        axios.get(`${apiUrl}/api/types/`)
            .then((res)=>{
                setTypes(res.data)
            })
    },[])
    return (
        <Create {...props}>
            <SimpleForm>
                <p>Выбрать тему можно только при создании!</p>
                <ReferenceArrayInput source="projectType" reference="types" label="Тип" validate={[required()]}>
                    <SelectInput
                        className="customWidth"
                        optionText="name"
                        label="Тип проекта" />
                </ReferenceArrayInput>
                <DefaultFields/>
                <RenderFields/>
            </SimpleForm>
        </Create>
    );
};

/**
 * Компонент RenderFields - это компонент React, который отображает поля в зависимости от выбранного тега новостей.
 * @description Использует хук useWatch для получения текущего значения тега новостей и отображает соответствующие поля на основе этого значения.
 * @returns {JSX.Element} - Элемент React, с полями, соответствующими выбранному тегу новостей. / const RenderFields = () => {
 Текущее значение тега новостей, полученное с помощью хука useWatch:
 const projectType = useWatch({name: 'projectType'});
 Карта полей, где ключами являются идентификаторы тегов новостей, а значениями - компоненты React, отображающие соответствующие поля.
 */

const RenderFields = () => {
    const [types, setTypes] = useState([])

    useEffect(()=>{
        axios.get(`${apiUrl}/api/types/`)
            .then((res)=>{
                setTypes(res.data)
            })
    },[])
    const projectType = useWatch({ name: 'projectType' });
    if (!projectType){
        return null
    }
    const findType = types.find((item)=> item._id == projectType )

    const fieldsMap = {
        'seo': (<SEORender/>),
        'site-and-services': (<SaitAndServiceRender/>),
        'tech-support': (<TechSupportRender/>),
        'video-production': (<VideoRender/>),
    };
    return  fieldsMap[findType?.key] || (<><SaitAndServiceRender/></>);
};

export const ProjectsEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <SimpleShowLayout>
                    <ReferenceArrayInput source="projectType" reference="types" label="Тип" validate={[required()]}>
                        <SelectInput
                            className="customWidth"
                            optionText="name"
                            label="Тип проекта"
                            // disabled={true}
                        />
                    </ReferenceArrayInput>
                    <DefaultFields/>
                    <RenderFields/>
                </SimpleShowLayout>

            </SimpleForm>
        </Edit>
    );
};

export const SaitAndServiceRender = () => {
    return(<>
        <p>Фотогалерея</p>
        <ArrayInput
            label={""}
            source={"bannerSeconds"}
        >
            <SimpleFormIterator>
                <FileInput
                    source="imageI"
                    className="fileInput"
                    placeholder="+"
                    label="Баннер">
                    <FilenameField
                        source="src"
                        title="title"/>
                </FileInput>
                <FunctionFieldForArrayItem/>
            </SimpleFormIterator>
        </ArrayInput>
        <p>Блок цели и задачи</p>
        <TextInput
            className="customWidth"
            source="taskDescr"
            placeholder="Клиент обратился к нам..."
            label="Описание блока цели и задачи"/>
        <RichTextInput
            className="customWidth"
            label="Задача"
            source="tasksItem"/>

        <p>Второй баннер</p>
        <FileInput
            source="bannerSecond"
            className="fileInput"
            placeholder="+"
            label="Баннер">
            <FilenameField
                source="src"
                title="title"/>
        </FileInput>

        <p>Блок Этапы работ</p>
        <div className="baseFlexWrap">
        <TextInput
            className="customWidth"
            source="heading"
            label="Заголовок слева"/>
        <TextInput
            className="customWidth"
            label="Описание работ"
            placeholder="Одной из задач стал брендинг агентства..."
            source="workStepsIntroText"/>
        </div>
        <ArrayInput
            label=""
            source="workSteps">
            <SimpleFormIterator>
                <TextInput
                    label="Заголовок работ"
                    placeholder="Этап 1. Разработка семантического ядра"
                    className="customWidth"
                    source="workStepsTitle"/>
             <RichTextInput
                 label="Результаты"
                 className="customWidth"
                 source="workStepsItem"/>

            </SimpleFormIterator>
        </ArrayInput>

        <p>Третий баннер</p>
        <FileInput
            source="bannerThird"
            className="fileInput"
            placeholder="+"
            label="Баннер">
            <FilenameField
                source="src"
                title="title"/>
        </FileInput>

        <p>Блок результаты</p>
        <TextInput
            className="customWidth"
            source="awardsURL"
            placeholder="https://www.cssdesignawards.com/"
            label="Css design awards"/>
        <RichTextInput
            className="customWidth"
            source="result"
            label="результат"/>
    </>)
}

export const SEORender = () => {
    return (<>
            <p>Блок цели и задачи</p>
            <TextInput
                className="customWidth"
                source="taskDescr"
                placeholder="Клиент обратился к нам..."
                label="Описание блока цели и задачи"/>
            <RichTextInput
                className="customWidth"
                label="Задача"
                source="taskDo"/>
            <p>Блок Этапы работ</p>
            <TextInput
                className="customWidth"
                source="heading"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                label="Описание работ"
                placeholder="Одной из задач стал брендинг агентства..."
                source="workIntroText"/>
            <ArrayInput
                label=""
                source="workSteps">
                <SimpleFormIterator>
                <TextInput
                    label="Заголовок работ"
                    placeholder="Этап 1. Разработка семантического ядра"
                    className="customWidth"
                    source="workStepsTitle"/>
             <RichTextInput
                 label="Результаты"
                 className="customWidth"
                 source="workStepsItem"/>
                </SimpleFormIterator>
            </ArrayInput>

            <p>Блок метрика</p>
            <ArrayInput
                label=""
                source="metrics"
            >
                <SimpleFormIterator>
                    <TextInput
                        className="customWidth"
                        label="Поисковая система"
                        placeholder="Яндекс"
                        source="metric"/>
                    <FileInput
                        className="fileInput"
                        placeholder="+"
                        source="imageI"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                    <FunctionFieldForArrayItem/>
                </SimpleFormIterator>
            </ArrayInput>
            <p>Блок результаты</p>
            <TextInput
                className="customWidth"
                source="awardsURL"
                placeholder="https://www.cssdesignawards.com/"
                label="Css design awards"/>
            <RichTextInput
                className="customWidth"
                source="result"
                label="результат"  />
        </>
    )
}

export const VideoRender = () => {
    return(<>
        <p>Галерея</p>
        <ArrayInput
            label={""}
            source={"bannerSeconds"}
        >
            <SimpleFormIterator>
                <FileInput
                    source="imageI"
                    className="fileInput"
                    placeholder="+"
                    label="Баннер">
                    <FilenameField
                        source="src"
                        title="title"/>
                </FileInput>
                <FunctionFieldForArrayItem/>
            </SimpleFormIterator>
        </ArrayInput>

        <p>Второй баннер</p>
        <FileInput
            source="bannerSecond"
            className="fileInput"
            placeholder="+"
            label="Баннер">
            <FilenameField
                source="src"
                title="title"/>
        </FileInput>
        <p>Третий баннер</p>
        <FileInput
            source="bannerThird"
            className="fileInput"
            placeholder="+"
            label="Баннер">
            <FilenameField
                source="src"
                title="title"/>
        </FileInput>
    </>)
}

export const TechSupportRender = () => {
    return (<>
        <p>Блок над чем работаем/этапы</p>
        <TextInput
            className="customWidth"
            source="heading"
            label="Заголовок слева"/>
        <TextInput
            className="customWidth"
            source="taskDescr"
            placeholder="Клиент обратился к нам..."
            label="Описание блока цели и задачи"/>
        <RichTextInput
            className="customWidth"
            label="Задача"
            source="tasksItem"/>

        <p>Блок стек технологий</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="workIntroText"
                placeholder="В рамках технической поддержки..."
                label="Небольшое описание"  />
            <ReferenceArrayInput
                source="stack"
                reference="stack"
                perPage={100000000000}>
                <AutocompleteArrayInput
                    className="customWidth"
                    optionText="name"
                    label="Стек"
                    filterToQuery={searchText => ({ name: searchText })}/>
            </ReferenceArrayInput>
        </div>

        <p>Блок результаты</p>
        <TextInput
            className="customWidth"
            source="awardsURL"
            placeholder="https://www.cssdesignawards.com/"
            label="Css design awards"/>
        <RichTextInput
            className="customWidth"
            source="result"
            label="результат"/>
    </>)
}

/**
 * Компонент DefaultFields - это компонент React, который отображает поля по умолчанию для всех проектов.
 * @description Отображает набор базовых полей для заполнения карточки проекта, включая поля для SEO, заголовка, даты, описания, URL и изображений.
 * @returns {JSX.Element} - Элемент React, с набором базовых полей для заполнения карточки проекта.
 */
export const DefaultFields = () => {
    const projectType = useWatch({name: 'projectType'});

    return (<>
            {projectType && <div className="baseFlexColumn">
                <p>Настройка SEO</p>
                <span className="baseFlexWrap">
                    <TextInput className="customWidth" source="seoTitle" label="title"/>
                    <TextInput className="customWidth" source="seoDescription" label="description"/>
                    <TextInput className="customWidth" source="seoKeywords" label="keywords"/>
                </span>
                <span className="baseFlexWrap">
                    <TextInput
                        className="customWidth"
                        source="name"
                        label="Название проекта"
                        validate={[required()]}
                    />
                    <TextInput
                        className="customWidth"
                        source="date"
                        label="Дата"
                        placeholder="2024"
                    />
                    <TextInput
                        className="customWidth"
                        source="nameInEng"
                        placeholder="генерируется автоматически"
                        label="URL проекта" fullWidth/>
                </span>
                <TextInput
                    className="customWidth"
                    source="descrProject"
                    label="Описание проекта"
                />

                <BooleanInput
                    source="visibility"
                    label="Скрыть/Показать проекта проекта"/>
                <p>Обложка проекта</p>
                <span className="baseFlexWrap">
                    <ImageInput
                        className="fileInput"
                        placeholder="+"
                        source="image"
                        label="Большая"
                        validate={[required()]}
                        accept="image/*"
                    >
                    <FilenameField source="src" title="title"/>
                </ImageInput>
                <ImageInput
                    className="fileInput"
                    placeholder="+"
                    source="imageMob"
                    label="Маленькая"
                    accept="image/*"
                >
                    <FilenameField source="src" title="title"/>
                </ImageInput>
                </span>
                <TextInput
                    className="customWidth"
                    source="projectURL"
                    placeholder="https://mysite.ru/"
                    label="Ссылка для перехода на сайт"/>
                <p>Заполнение карты клиента</p>
                <ReferenceArrayInput
                    source="projectTheme"
                    reference="themes">
                    <SelectInput
                        className="customWidth"
                        optionText="name"
                        label="Отрасль"/>
                </ReferenceArrayInput>
                <span className="baseFlexWrap">
                    <TextInput
                        className="customWidth"
                        source="about"
                        label="Описание о клиенте"/>
                  <TextInput
                      className="customWidth"
                      source="projectSite"
                      label="Клиент"/>

                <TextInput
                    className="customWidth"
                    source="duration"
                    placeholder="2,5 месяца"
                    label="Продолжительность"/>
                </span>
                <p>Главный баннер</p>
                <FileInput
                    source="bannerFirst"
                    className="fileInput"
                    placeholder="+"
                    label="Видео или фото">
                    <FilenameField
                        source="src"
                        title="title"/>
                </FileInput>

            </div>

            }

        </>
    )
}


//не убирать до утверждения

// export const ProjectsCreate = (props) => (
//     <Create {...props}>
//         <SimpleForm>
//             <TextInput className="customWidth" source="seoTitle" label="title" />
//             <TextInput className="customWidth" source="seoDescription" label="description" />
//             <TextInput className="customWidth" source="seoKeywords" label="keywords" />
//             <TextInput
//                 className="customWidth"
//                 source="name"
//                 label="Заголовок"
//                 validate={[required()]}
//             />
//             <TextInput
//                 className="customWidth"
//                 source="date"
//                 label="Дата"
//             />
//             <TextInput
//                 className="customWidth"
//                 source="descrProject"
//                 label="Краткое описание"
//             />
//             <TextInput
//                 className="customWidth"
//                 source="nameInEng"
//                 label="URL" fullWidth  />
//             <BooleanInput
//                 source="visibility"
//                 label="Скрыть/Показать проекта проекта"/>
//             <ImageInput
//                 className="fileInput"
//                 placeholder="+"
//                 source="image"
//                 label="Главное изображение"
//                 validate={[required()]}
//                 accept="image/*"
//             >
//                 <FilenameField source="src" title="title" />
//             </ImageInput>
//             <ImageInput
//                 className="fileInput"
//                 placeholder="+"
//                 source="imageMob"
//                 label="Главное мобильное изображение"
//                 accept="image/*"
//             >
//                 <FilenameField source="src" title="title" />
//             </ImageInput>
//             <BooleanInput
//                 source="controlURL"
//                 label="Переход на URL при клике"/>
//             <TextInput
//                 className="customWidth"
//                 source="projectURL"
//                 label="URL проекта"/>
//             <TextInput
//                 className="customWidth"
//                 source="projectSite"
//                 label="Сайт проекта"/>
//             <FileInput
//                 source="mainVideoFile"
//                 label="Баннер видео">
//                 <FileField source="src" title="title" />
//             </FileInput>
//             <FileInput
//                 source="mainMobVideoFile"
//                 label="Баннер мобильное видео">
//                 <FileField source="src" title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="mainVideo"
//                 label="Видео для баннера(url)"  />
//             <ColorInput
//                 source="color"
//                 label="Цвет проекта"
//                 validate={[required()]} />
//             <BooleanInput
//                 source="main"
//                 label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
//             <TextInput
//                 className="customWidth"
//                 source="bannerText"
//                 title="Текст для баннера"  />
//             <ReferenceArrayInput
//                 source="projectTheme"
//                 reference="themes">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Тема проекта" />
//             </ReferenceArrayInput>
//             <ReferenceArrayInput
//                 source="projectType"
//                 reference="types">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Тип проекта" />
//             </ReferenceArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="about"
//                 label="О клиенте"  />
//             <FileInput
//                 source="bannerFirst"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFirstVideo"
//                 allowEmpty
//                 label="Видео для баннера(url)"  />
//             <TextInput
//                 className="customWidth"
//                 source="taskDescr"
//                 label="Описание для блока Цели и задачи"  />
//             <TextInput
//                 className="customWidth"
//                 source="task"
//                 label="Задача"  />
//             <ReferenceArrayInput
//                 source="taskPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для задачи" />
//             </ReferenceArrayInput>
//             <ArrayInput
//                 source="tasksList"
//                 label="Список задач"
//             >
//                 <SimpleFormIterator>
//                     <RichTextInput
//                         className="customWidth"
//                         source="tasksItem"
//                         label="Задача" />
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <ColorInput
//                 source="aimColor"
//                 label="Цвет задач" />
//             <FileInput
//                 source="bannerSecond"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerSeconds"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerSecondVideo"
//                 label="Видео для баннера(url)"  />
//             <TextInput
//                 className="customWidth"
//                 source="approach"
//                 label="Подход"  />
//             <ReferenceArrayInput
//                 source="approachPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для подхода" />
//             </ReferenceArrayInput>
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachList'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет фона" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста цитаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <FileInput
//                 source="bannerThird"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerThirds"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachListThird'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет фона" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста цитаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//             <TextInput
//                 className="customWidth"
//                 source="bannerThirdVideo"
//                 label="Видео для баннера(url)"  />
//             <RichTextInput
//                 className="customWidth"
//                  source="body"  />
//             <TextInput
//                 className="customWidth"
//                 source="workStepsHeader"
//                 label="Подзаголовок Этапы работ"  />
//             <ArrayInput
//                 source="workSteps"
//                 label="Этапы работ">
//                 <SimpleFormIterator>
//                     <TextInput
//                         className="customWidth"
//                         source="workStepsTitle" />
//                     <TextInput
//                         className="customWidth"
//                         source="workStepsIntroText" />
//                     <RichTextInput
//                         className="customWidth"
//                         source="workStepsItem"  />
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <ColorInput
//                 source="workStepsColor"
//                 label="Цвет этапы работ" />
//             <FileInput
//                 source="bannerFourth"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerFourths"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFourthVideo"
//                 label="Видео для баннера(url)"  />
//
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachListSecond'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет фона" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста цитаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//             <RichTextInput
//                 className="customWidth"
//                 source="result"
//                 label="Результаты"  />
//             <ColorInput
//                 source="resultTextColor"
//                 label="Цвет текста резултаты" />
//             <TextInput
//                 className="customWidth"
//                 source="resultPersonsText"
//                 label="Результаты прямая речь"  />
//             <ReferenceArrayInput
//                 source="resultPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для результата" />
//             </ReferenceArrayInput>
//             <ColorInput
//                 source="resultsColor"
//                 label="Цвет результаты" />
//             <RichTextInput
//                 className="customWidth"
//                 source="technologies"
//                 label="Технологии"  />
//             <FileInput
//                 source="bannerFifth"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerFifths"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFifthVideo"
//                 label="Видео для баннера(url)"  />
//
//             <ArrayInput
//                 source="imagesExtra"
//                 label="Дополнительные изображения(если редактируется одна картинка, то нужно обновить/заменить и другую)">
//                 <SimpleFormIterator>
//                     <ImageInput
//                         className="fileInput"
//                         placeholder="+"
//                         source="imageI"
//                         label="Изображение"
//                         accept="image/*">
//                         <FilenameField
//                             source="src"
//                             title="title" />
//                     </ImageInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="visibilityTitle1"
//                 label="Видимость 1"  />
//             <FileInput
//                 source="visibilityImg1"
//                 label="Фото видимость 1">
//                 <FileField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="visibilityTitle2"
//                 label="Видимость 2"  />
//             <FileInput
//                 source="visibilityImg2"
//                 label="Фото видимость 2">
//                 <FileField
//                     source="src"
//                     title="title" />
//             </FileInput>
//         </SimpleForm>
//     </Create>
// );

// export const ProjectsEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm className='editForm' toolbar={<MyToolbar />}>
//             <TextInput className="customWidth" source="seoTitle" label="title" />
//             <TextInput className="customWidth" source="seoDescription" label="description" />
//             <TextInput className="customWidth" source="seoKeywords" label="keywords" />
//             <TextInput
//                 className="customWidth"
//                 source="name"
//                 label="Заголовок"
//                 validate={[required()]}
//             />
//             <TextInput
//                 className="customWidth"
//                 source="date"
//                 label="Дата"
//             />
//             <TextInput
//                 className="customWidth"
//                 source="descrProject"
//                 label="Краткое описание"
//             />
//             <TextInput
//                 className="customWidth"
//                 source="nameInEng"
//                 label="URL" fullWidth  />
//              <BooleanInput
//                 source="visibility"
//                 label="Скрыть/Показать проекта"/>
//             <ImageInput
//                 className='fileInput'
//                 placeholder="+"
//                 source="image"
//                 label="Главное изображение"
//                 validate={[required()]}
//                 accept="image/*"
//             >
//                 <FilenameField source="src" title="title" />
//             </ImageInput>
//             <ImageInput
//                 className="fileInput"
//                 placeholder="+"
//                 source="imageMob"
//                 label="Главное мобильное изображение"
//                 accept="image/*"
//             >
//                 <FilenameField source="src" title="title" />
//             </ImageInput>
//             <BooleanInput
//                 source="controlURL"
//                 label="Переход на URL при клике"/>
//             <TextInput
//                 className="customWidth"
//                 source="projectURL"
//                 label="URL проекта"/>
//             <TextInput
//                 className="customWidth"
//                 source="projectSite"
//                 label="Сайт проекта"/>
//             <FileInput
//                 source="mainVideoFile"
//                 label="Баннер видео">
//                 <FileField source="src" title="title" />
//             </FileInput>
//             <FileInput
//                 source="mainMobVideoFile"
//                 label="Баннер мобильное видео">
//                 <FileField source="src" title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="mainVideo"
//                 label="Видео для баннера(url)"  />
//             <ColorInput
//                 source="color"
//                 label="Цвет проекта"
//                 validate={[required()]} />
//             <BooleanInput
//                 source="main"
//                 label="Установить на баннер главного экрана?(нужно снять с других проектов)" />
//             <TextInput
//                 className="customWidth"
//                 source="bannerText"
//                 title="Текст для баннера"  />
//             <ReferenceArrayInput
//                 source="projectTheme"
//                 reference="themes">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Тема проекта" />
//             </ReferenceArrayInput>
//             <ReferenceArrayInput
//                 source="projectType"
//                 reference="types">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Тип проекта" />
//             </ReferenceArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="about"
//                 label="О клиенте"  />
//             <FileInput
//                 source="bannerFirst"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFirstVideo"
//                 allowEmpty
//                 label="Видео для баннера(url)"  />
//             <TextInput
//                 className="customWidth"
//                 source="taskDescr"
//                 label="Описание для блока Цели и задачи"  />
//             <TextInput
//                 className="customWidth"
//                 source="task"
//                 label="Задача"  />
//             <ReferenceArrayInput
//                 source="taskPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для задачи" />
//             </ReferenceArrayInput>
//             <ArrayInput
//                 source="tasksList"
//                 label="Список задач"
//             >
//                 <SimpleFormIterator>
//                     <RichTextInput
//                         className="customWidth"
//                         source="tasksItem"
//                         label="Задача" />
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <ColorInput
//                 source="aimColor"
//                 label="Цвет задач" />
//             <FileInput
//                 source="bannerSecond"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerSeconds"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerSecondVideo"
//                 label="Видео для баннера(url)"  />
//             <TextInput
//                 className="customWidth"
//                 source="approach"
//                 label="Подход"  />
//
//             <ReferenceArrayInput
//                 source="approachPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для подхода" />
//             </ReferenceArrayInput>
//
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachList'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет фона" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста цитаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//
//             <FileInput
//                 source="bannerThird"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerThirds"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachListThird'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет фона" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста цитаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerThirdVideo"
//                 label="Видео для баннера(url)"  />
//             <RichTextInput
//                 className="customWidth"
//                 source="body"  />
//             <TextInput
//                 className="customWidth"
//                 source="workStepsHeader"
//                 label="Подзаголовок Этапы работ"  />
//             <ArrayInput
//                 source="workSteps"
//                 label="Этапы работ">
//                 <SimpleFormIterator>
//                     <TextInput
//                         className="customWidth"
//                         source="workStepsTitle" />
//                     <TextInput
//                         className="customWidth"
//                         source="workStepsIntroText" />
//                     <RichTextInput
//                         className="customWidth"
//                         source="workStepsItem"  />
//                     <ArrayInput
//                         source="workStepsItemTaskList"
//                         label="Список выполненных задач"
//                     >
//                         <SimpleFormIterator>
//                             <RichTextInput
//                                 className="customWidth"
//                                 source="workStepsItemTask"
//                                 label="Описание задачи" />
//                         </SimpleFormIterator>
//                     </ArrayInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <ColorInput
//                 source="workStepsColor"
//                 label="Цвет этапы работ" />
//             <FileInput
//                 source="bannerFourth"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerFourths"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFourthVideo"
//                 label="Видео для баннера(url)"  />
//
//             <ArrayInput
//                 label={'Список цитат'}
//                 source={'approachListSecond'}>
//                 <SimpleFormIterator>
//                     <ColorInput
//                         source="resultsColor"
//                         label="Цвет результаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="title"
//                         label="Заголовок цитаты"  />
//                     <ColorInput
//                         source="resultTextColor"
//                         label="Цвет текста резултаты" />
//                     <TextInput
//                         className="customWidth"
//                         source="text"
//                         label="Текст цитаты"  />
//                     <ReferenceArrayInput
//                         source="approachPersons"
//                         reference="persons">
//                         <SelectInput
//                             className="customWidth"
//                             optionText="name"
//                             label="Чья цитата " />
//                     </ReferenceArrayInput>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                 </SimpleFormIterator>
//             </ArrayInput>
//
//             <RichTextInput
//                 className="customWidth"
//                 source="result"
//                 label="Результаты"  />
//             <ColorInput
//                 source="resultTextColor"
//                 label="Цвет текста резултаты" />
//             <TextInput
//                 className="customWidth"
//                 source="resultPersonsText"
//                 label="Результаты прямая речь"  />
//             <ReferenceArrayInput
//                 source="resultPersons"
//                 reference="persons">
//                 <SelectInput
//                     className="customWidth"
//                     optionText="name"
//                     label="Чья цитата для результата" />
//             </ReferenceArrayInput>
//             <ColorInput
//                 source="resultsColor"
//                 label="Цвет результаты" />
//             <RichTextInput
//                 className="customWidth"
//                 source="technologies"
//                 label="Технологии"  />
//             <FileInput
//                 source="bannerFifth"
//                 label="Баннер">
//                 <FilenameField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <ArrayInput
//                 label={"Список баннеров"}
//                 source={"bannerFifths"}
//             >
//                 <SimpleFormIterator>
//                     <FileInput
//                         source="imageI"
//                         label="Баннер">
//                         <FilenameField
//                             source="src"
//                             title="title"/>
//                     </FileInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="bannerFifthVideo"
//                 label="Видео для баннера(url)"  />
//
//             <ArrayInput
//                 source="imagesExtra"
//                 label="Дополнительные изображения(если редактируется одна картинка, то нужно обновить/заменить и другую)">
//                 <SimpleFormIterator>
//                     <ImageInput
//                         className='fileInput'
//                         placeholder="+"
//                         source="imageI"
//                         label="Изображение"
//                         accept="image/*">
//                         <FilenameField
//                             source="src"
//                             title="title" />
//                     </ImageInput>
//                     <FunctionFieldForArrayItem/>
//                 </SimpleFormIterator>
//             </ArrayInput>
//             <TextInput
//                 className="customWidth"
//                 source="visibilityTitle1"
//                 label="Видимость 1"  />
//             <FileInput
//                 source="visibilityImg1"
//                 label="Фото видимость 1">
//                 <FileField
//                     source="src"
//                     title="title" />
//             </FileInput>
//             <TextInput
//                 className="customWidth"
//                 source="visibilityTitle2"
//                 label="Видимость 2"  />
//             <FileInput
//                 source="visibilityImg2"
//                 label="Фото видимость 2">
//                 <FileField
//                     source="src"
//                     title="title" />
//             </FileInput>
//         </SimpleForm>
//     </Edit>
// );