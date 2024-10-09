import React, {useEffect, useState} from 'react';
import {List, Datagrid, TextField, EditButton, SimpleShowLayout, AutocompleteArrayInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, SearchInput, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, FileField, ArrayInput, SimpleFormIterator } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import {useWatch} from "react-hook-form";
import axios from "../../axios";
import CorporateIdentity from "../../components/pages/projects/projectDetail/detailPropsRender/CorporateIdentity";

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
        'corporate-identity': "Создание фирменного стиля",
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
        'corporate-identity': (<CorporateIdentityRender/>),
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

        <p>1 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="heading"
                label="Заголовок этапов работ"/>
            <TextInput
                className="customWidth"
                source="workIntroText"
                label="Заголовок этапов работ"/>
        </div>

        <p>Второй баннер/список</p>
        <BooleanInput
            source="control1"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerFourths"}
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

        {/*<ArrayInput*/}
        {/*    label=""*/}
        {/*    source="workSteps">*/}
        {/*    <SimpleFormIterator>*/}
        {/*        <TextInput*/}
        {/*            className="customWidth"*/}
        {/*            source="heading"*/}
        {/*            label="Заголовок слева/или № этапа"/>*/}
        {/*        <TextInput*/}
        {/*            className="customWidth"*/}
        {/*            label="Описание работ"*/}
        {/*            placeholder="Одной из задач стал брендинг агентства..."*/}
        {/*            source="workStepsIntroText"/>*/}
        {/*        <TextInput*/}
        {/*            label="Заголовок работ"*/}
        {/*            placeholder="Этап 1. Разработка семантического ядра"*/}
        {/*            className="customWidth"*/}
        {/*            source="workStepsTitle"/>*/}
        {/*        <RichTextInput*/}
        {/*            label="Результаты"*/}
        {/*            isRequired*/}
        {/*            validate={[required()]}*/}
        {/*            className="customWidth"*/}
        {/*            source="workStepsItem"/>*/}
        {/*        <ArrayInput*/}
        {/*            label={""}*/}
        {/*            source={"bannerSixths"}*/}
        {/*        >*/}
        {/*            <SimpleFormIterator>*/}
        {/*                <FileInput*/}
        {/*                    source="imageI"*/}
        {/*                    className="fileInput"*/}
        {/*                    placeholder="+"*/}
        {/*                    label="Баннер">*/}
        {/*                    <FilenameField*/}
        {/*                        source="src"*/}
        {/*                        title="title"/>*/}
        {/*                </FileInput>*/}
        {/*                <FunctionFieldForArrayItem/>*/}
        {/*            </SimpleFormIterator>*/}
        {/*        </ArrayInput>*/}

        {/*    </SimpleFormIterator>*/}
        {/*</ArrayInput>*/}

        <p>2 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo"
                placeholder="Мы разработали..."
                label="Описание блока Паттерн"/>
        </div>

        <p>Третий баннер/ список</p>
        <BooleanInput
            source="control2"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerFifths"}
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

        <p>3 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="stageName"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="approach"
                placeholder="Мы разработали..."
                label="Описание блока Паттерн"/>
        </div>
        <p>Третий баннер/ список</p>
        <BooleanInput
            source="control3"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerSixths"}
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

        <p>4 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task2"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo2"
                placeholder="Мы разработали..."
                label="Описание блока "/>
        </div>

        <p>Четвертый баннер/ список</p>
        <BooleanInput
            source="control4"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerSevenths"}
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

        <p>5 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task3"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo3"
                placeholder="Мы разработали..."
                label="Описание блока "/>
        </div>

        <p>Пятый баннер/ список</p>
        <BooleanInput
            source="control5"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerEighths"}
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

        <p>6 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task4"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo4"
                placeholder="Мы разработали..."
                label="Описание блока "/>
        </div>

        <p>Шестой баннер/ список</p>
        <BooleanInput
            source="control6"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerNinths"}
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

        <p>7 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task5"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo5"
                placeholder="Мы разработали..."
                label="Описание блока "/>
        </div>

        <p>Седьмой баннер/ список</p>
        <BooleanInput
            source="control7"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerTenth"}
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

        <p>8 Блок Этапы работ</p>
        <div className="baseFlexWrap">
            <TextInput
                className="customWidth"
                source="task6"
                label="Заголовок слева"/>
            <TextInput
                className="customWidth"
                source="taskDo6"
                placeholder="Мы разработали..."
                label="Описание блока "/>
        </div>

        <p>Восьмой баннер/ список</p>
        <BooleanInput
            source="control8"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerEleventh"}
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
                source="tasksItem"/>
            <p>Блок Этапы работ</p>
            <TextInput
                className="customWidth"
                source="heading"
                label="Заголовок слева"/>
            <RichTextInput
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
                source={"metrics"}
            >
                <SimpleFormIterator>
                    {/* <TextInput
                        className="customWidth"
                        label="Поисковая система"
                        placeholder="Яндекс"
                        source="metric"/> */}
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

export const CorporateIdentityRender = () => {
    return(<>
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
        <p>Список баннеров</p>
        <BooleanInput
            source="control1"
            label="по 1 в ряд/по 2 в ряд"/>
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
        <p>Цветовая палитра</p>
        <TextInput
            className="customWidth"
            source="heading"
            label="Заголовок слева"/>
        <TextInput
            className="customWidth"
            source="workIntroText"
            placeholder="Мы разработали..."
            label="Описание блока Цветовая палитра"/>
        <p>Список баннеров</p>
        <BooleanInput
            source="control2"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerFourths"}
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

        <p>блок Шрифт и детали</p>
        <TextInput
            className="customWidth"
            source="task"
            label="Заголовок слева"/>
        <TextInput
            className="customWidth"
            source="taskDo"
            placeholder="Мы разработали..."
            label="Описание блока Шрифт и детали"/>

        <p>Список баннеров</p>
        <BooleanInput
            source="control3"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerFifths"}
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

        <p>блок Паттерн</p>
        <TextInput
            className="customWidth"
            source="stageName"
            label="Заголовок слева"/>
        <TextInput
            className="customWidth"
            source="approach"
            placeholder="Мы разработали..."
            label="Описание блока Паттерн"/>
        <p>Список баннеров</p>
        <BooleanInput
            source="control4"
            label="по 1 в ряд/по 2 в ряд"/>
        <ArrayInput
            label={""}
            source={"bannerSixths"}
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
                        disabled={true}
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
                    <FileInput
                        className="fileInput"
                        placeholder="+"
                        source="image"
                        label="Большая"
                        validate={[required()]}
                    >
                    <FilenameField source="src" title="title"/>
                </FileInput>
                <FileInput
                    className="fileInput"
                    placeholder="+"
                    source="imageMob"
                    label="Маленькая"
                >
                    <FilenameField source="src" title="title"/>
                </FileInput>
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
                <p>Главный баннер/список</p>
                <ArrayInput
                    label={""}
                    source={"bannerThirds"}
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

            </div>

            }

        </>
    )
}
