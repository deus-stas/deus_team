import React, { useState, useEffect } from 'react';
import {List, Datagrid, TextField, EditButton, SimpleShowLayout, AutocompleteArrayInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, SearchInput, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, FileField, ArrayInput, SimpleFormIterator } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import {useWatch} from "react-hook-form";
import axios from "../../axios";
import CorporateIdentity from "../../components/pages/projects/projectDetail/detailPropsRender/CorporateIdentity";

const apiUrl = ''

// Admin Tabs Component for navigation
const AdminTabs = ({ tabs, activeTab, setActiveTab }) => {
    const scrollToSection = (sectionId) => {
        // Just set active tab - no scrolling needed anymore
        setActiveTab(sectionId);
    };

    // No need for intersection observer anymore since we'll be showing/hiding sections

    return (
        <div className="admin-tabs-container">
            <div className="admin-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(tab.id)}
                        type="button"
                    >
                        {tab.label}
                        {tab.count && <span className="admin-tab-count">{tab.count}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

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
        const findType = types.find((item)=> item._id === id )
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
    const findType = types.find((item)=> item._id === projectType )

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
    const [activeTab, setActiveTab] = useState('task-goals');
    
    const saitServiceTabs = [
        { id: 'basic-info', label: 'Основная информация' },
        { id: 'task-goals', label: 'Цели и задачи' },
        { id: 'photo-gallery', label: 'Фотогалерея' },
        { id: 'work-stages-1', label: 'Этапы работ 1' },
        { id: 'second-banner', label: 'Второй баннер' },
        { id: 'work-stages-2', label: 'Этапы работ 2' },
        { id: 'third-banner', label: 'Третий баннер' }
    ];

    return(<>
        <div className="section-tabs-container">
            <AdminTabs tabs={saitServiceTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="admin-form-content">
            {/* Task Goals Section */}
            <div id="task-goals" className="admin-section" style={{display: activeTab === 'task-goals' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок цели и задачи</div>
                <div className="admin-section-content">
                    <RichTextInput
                        className="customWidth"
                        source="taskDescr"
                        placeholder="Клиент обратился к нам..."
                        label="Описание блока цели и задачи"
                        fullWidth
                    />
                    <RichTextInput
                        className="customWidth"
                        label="Задача"
                        source="tasksItem"/>
                </div>
            </div>

            {/* Photo Gallery Section */}
            <div id="photo-gallery" className="admin-section" style={{display: activeTab === 'photo-gallery' ? 'block' : 'none'}}>
                <div className="admin-section-title">Фотогалерея</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Work Stages 1 Section */}
            <div id="work-stages-1" className="admin-section" style={{display: activeTab === 'work-stages-1' ? 'block' : 'none'}}>
                <div className="admin-section-title">1 Блок Этапы работ</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Second Banner Section */}
            <div id="second-banner" className="admin-section" style={{display: activeTab === 'second-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Второй баннер/список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Work Stages 2 Section */}
            <div id="work-stages-2" className="admin-section" style={{display: activeTab === 'work-stages-2' ? 'block' : 'none'}}>
                <div className="admin-section-title">2 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo"
                            placeholder="Мы разработали..."
                            label="Описание блока Паттерн"/>
                    </div>
                </div>
            </div>

            {/* Third Banner Section */}
            <div id="third-banner" className="admin-section" style={{display: activeTab === 'third-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Третий баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>
        </div>
    </>)
}

export const SEORender = () => {
    const [activeTab, setActiveTab] = useState('seo-goals');
    
    const seoTabs = [
        { id: 'seo-goals', label: 'Цели и задачи' },
        { id: 'seo-work-stages', label: 'Этапы работ 1' },
        { id: 'seo-second-banner', label: 'Второй баннер' },
        { id: 'seo-work-stages-2', label: 'Этапы работ 2' },
        { id: 'seo-third-banner', label: 'Третий баннер' },
        { id: 'seo-work-steps', label: 'Рабочие шаги' },
        { id: 'seo-metrics', label: 'Метрика' },
        { id: 'seo-results', label: 'Результаты' }
    ];

    return (<>
        <div className="section-tabs-container">
            <AdminTabs tabs={seoTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="admin-form-content">
            {/* SEO Goals Section */}
            <div id="seo-goals" className="admin-section" style={{display: activeTab === 'seo-goals' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок цели и задачи</div>
                <div className="admin-section-content">
                    <RichTextInput
                        className="customWidth"
                        source="taskDescr"
                        placeholder="Клиент обратился к нам..."
                        label="Описание блока цели и задачи"/>
                    <RichTextInput
                        className="customWidth"
                        label="Задача"
                        source="tasksItem"/>
                </div>
            </div>

            {/* SEO Work Stages Section */}
            <div id="seo-work-stages" className="admin-section" style={{display: activeTab === 'seo-work-stages' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="heading"
                            label="Заголовок слева"/>
                        <TextInput
                            className="customWidth"
                            source="workIntroText"
                            label="Заголовок этапов работ"/>
                    </div>
                </div>
            </div>

            {/* SEO Second Banner Section */}
            <div id="seo-second-banner" className="admin-section" style={{display: activeTab === 'seo-second-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Второй баннер/список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* SEO Work Stages 2 Section */}
            <div id="seo-work-stages-2" className="admin-section" style={{display: activeTab === 'seo-work-stages-2' ? 'block' : 'none'}}>
                <div className="admin-section-title">2 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo"
                            placeholder="Мы разработали..."
                            label="Описание блока Паттерн"/>
                    </div>
                </div>
            </div>

            {/* SEO Third Banner Section */}
            <div id="seo-third-banner" className="admin-section" style={{display: activeTab === 'seo-third-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Третий баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* SEO Work Steps Section */}
            <div id="seo-work-steps" className="admin-section" style={{display: activeTab === 'seo-work-steps' ? 'block' : 'none'}}>
                <div className="admin-section-title">Рабочие шаги</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* SEO Metrics Section */}
            <div id="seo-metrics" className="admin-section" style={{display: activeTab === 'seo-metrics' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок метрика</div>
                <div className="admin-section-content">
                    <ArrayInput
                        label=""
                        source={"metrics"}
                    >
                        <SimpleFormIterator>
                            <TextInput
                                className="customWidth"
                                label="Поисковая система"
                                placeholder="Яндекс"
                                source="metricName"
                            />
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
                </div>
            </div>

            {/* SEO Results Section */}
            <div id="seo-results" className="admin-section" style={{display: activeTab === 'seo-results' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок результаты</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="awardsURL"
                        placeholder="https://www.cssdesignawards.com/"
                        label="URL награды"/>
                    <TextInput
                        className="customWidth"
                        source="awardsTitle"
                        placeholder="css design awards"
                        label="Название награды"/>
                    <ArrayInput
                        label={""}
                        source={"awardsImage"}
                    >
                        <SimpleFormIterator>
                            <FileInput
                                source="imageI"
                                className="fileInput"
                                placeholder="+"
                                label="Лого награды (будет видно только первый)">
                                <FilenameField
                                    source="src"
                                    title="title"/>
                            </FileInput>
                            <FunctionFieldForArrayItem/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <RichTextInput
                        className="customWidth"
                        source="result"
                        label="результат"  />
                </div>
            </div>
        </div>
    </>)
}

export const VideoRender = () => {
    const [activeTab, setActiveTab] = useState('video-gallery');
    
    const videoTabs = [
        { id: 'video-gallery', label: 'Галерея' },
        { id: 'video-second-banner', label: 'Второй баннер' },
        { id: 'video-third-banner', label: 'Третий баннер' }
    ];

    return(<>
        <div className="section-tabs-container">
            <AdminTabs tabs={videoTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="admin-form-content">
            {/* Video Gallery Section */}
            <div id="video-gallery" className="admin-section" style={{display: activeTab === 'video-gallery' ? 'block' : 'none'}}>
                <div className="admin-section-title">Галерея</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Video Second Banner Section */}
            <div id="video-second-banner" className="admin-section" style={{display: activeTab === 'video-second-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Второй баннер</div>
                <div className="admin-section-content">
                    <FileInput
                        source="bannerSecond"
                        className="fileInput"
                        placeholder="+"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </div>
            </div>

            {/* Video Third Banner Section */}
            <div id="video-third-banner" className="admin-section" style={{display: activeTab === 'video-third-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Третий баннер</div>
                <div className="admin-section-content">
                    <FileInput
                        source="bannerThird"
                        className="fileInput"
                        placeholder="+"
                        label="Баннер">
                        <FilenameField
                            source="src"
                            title="title"/>
                    </FileInput>
                </div>
            </div>
        </div>
    </>)
}

export const CorporateIdentityRender = () => {
    const [activeTab, setActiveTab] = useState('corp-goals');
    
    const corpTabs = [
        { id: 'corp-goals', label: 'Цели и задачи' },
        { id: 'corp-first-banner', label: 'Первый баннер' },
        { id: 'corp-color-palette', label: 'Цветовая палитра' },
        { id: 'corp-font-details', label: 'Шрифт и детали' },
        { id: 'corp-pattern', label: 'Паттерн' },
        { id: 'corp-work-stages', label: 'Этапы работ' },
        { id: 'corp-second-banner', label: 'Второй баннер' },
        { id: 'corp-work-stages-2', label: 'Этапы работ 2' },
        { id: 'corp-third-banner', label: 'Третий баннер' },
        { id: 'corp-work-stages-3', label: 'Этапы работ 3' },
        { id: 'corp-fourth-banner', label: 'Четвертый баннер' },
        { id: 'corp-work-stages-4', label: 'Этапы работ 4' },
        { id: 'corp-fifth-banner', label: 'Пятый баннер' },
        { id: 'corp-work-stages-5', label: 'Этапы работ 5' },
        { id: 'corp-sixth-banner', label: 'Шестой баннер' },
        { id: 'corp-work-stages-6', label: 'Этапы работ 6' },
        { id: 'corp-seventh-banner', label: 'Седьмой баннер' },
        { id: 'corp-work-stages-7', label: 'Этапы работ 7' },
        { id: 'corp-eighth-banner', label: 'Восьмой баннер' },
        { id: 'corp-work-stages-8', label: 'Этапы работ 8' },
        { id: 'corp-ninth-banner', label: 'Девятый баннер' },
        { id: 'corp-work-stages-9', label: 'Этапы работ 9' },
        { id: 'corp-tenth-banner', label: 'Десятый баннер' },
        { id: 'corp-eleventh-banner', label: 'Одиннадцатый баннер' },
        { id: 'corp-twelfth-banner', label: 'Двенадцатый баннер' },
        { id: 'corp-thirteenth-banner', label: 'Тринадцатый баннер' },
        { id: 'corp-results', label: 'Результаты' }
    ];

    return(<>
        <div className="section-tabs-container">
            <AdminTabs tabs={corpTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="admin-form-content">
            {/* Corporate Goals Section */}
            <div id="corp-goals" className="admin-section" style={{display: activeTab === 'corp-goals' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок цели и задачи</div>
                <div className="admin-section-content">
                    <RichTextInput
                        className="customWidth"
                        source="taskDescr"
                        placeholder="Клиент обратился к нам..."
                        label="Описание блока цели и задачи"/>
                    <RichTextInput
                        className="customWidth"
                        label="Задача"
                        source="tasksItem"/>
                </div>
            </div>

            {/* Corporate First Banner Section */}
            <div id="corp-first-banner" className="admin-section" style={{display: activeTab === 'corp-first-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Список баннеров</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Color Palette Section */}
            <div id="corp-color-palette" className="admin-section" style={{display: activeTab === 'corp-color-palette' ? 'block' : 'none'}}>
                <div className="admin-section-title">Цветовая палитра</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="heading"
                        label="Заголовок слева"/>
                    <RichTextInput
                        className="customWidth"
                        source="workIntroText"
                        placeholder="Мы разработали..."
                        label="Описание блока Цветовая палитра"/>
                </div>
            </div>

            {/* Corporate Second Banner for Color Palette */}
            <div id="corp-second-banner" className="admin-section" style={{display: activeTab === 'corp-second-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Список баннеров для цветовой палитры</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Font and Details Section */}
            <div id="corp-font-details" className="admin-section" style={{display: activeTab === 'corp-font-details' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок Шрифт и детали</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="task"
                        label="Заголовок слева"/>
                    <RichTextInput
                        className="customWidth"
                        source="taskDo"
                        placeholder="Мы разработали..."
                        label="Описание блока Шрифт и детали"
                        multiline rows={5}
                    />
                </div>
            </div>

            {/* Corporate Third Banner Section */}
            <div id="corp-third-banner" className="admin-section" style={{display: activeTab === 'corp-third-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Список баннеров для шрифтов</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Pattern Section */}
            <div id="corp-pattern" className="admin-section" style={{display: activeTab === 'corp-pattern' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок Паттерн</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="stageName"
                        label="Заголовок слева"/>
                    <RichTextInput
                        className="customWidth"
                        source="approach"
                        placeholder="Мы разработали..."
                        label="Описание блока Паттерн"
                        multiline rows={5}
                    />
                </div>
            </div>

            {/* Corporate Fourth Banner Section */}
            <div id="corp-fourth-banner" className="admin-section" style={{display: activeTab === 'corp-fourth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Список баннеров для паттернов</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages Section */}
            <div id="corp-work-stages" className="admin-section" style={{display: activeTab === 'corp-work-stages' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="heading"
                            label="Заголовок слева"/>
                        <TextInput
                            className="customWidth"
                            source="workIntroText"
                            label="Заголовок этапов работ"/>
                    </div>
                </div>
            </div>

            {/* Corporate Work Stages 2 Section */}
            <div id="corp-work-stages-2" className="admin-section" style={{display: activeTab === 'corp-work-stages-2' ? 'block' : 'none'}}>
                <div className="admin-section-title">2 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo"
                            placeholder="Мы разработали..."
                            label="Описание блока Паттерн"/>
                    </div>
                </div>
            </div>

            {/* Corporate Fifth Banner Section */}
            <div id="corp-fifth-banner" className="admin-section" style={{display: activeTab === 'corp-fifth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Второй баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 3 Section */}
            <div id="corp-work-stages-3" className="admin-section" style={{display: activeTab === 'corp-work-stages-3' ? 'block' : 'none'}}>
                <div className="admin-section-title">3 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="stageName"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="approach"
                            placeholder="Мы разработали..."
                            label="Описание блока Паттерн"/>
                    </div>
                </div>
            </div>

            {/* Corporate Sixth Banner Section */}
            <div id="corp-sixth-banner" className="admin-section" style={{display: activeTab === 'corp-sixth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Третий баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 4 Section */}
            <div id="corp-work-stages-4" className="admin-section" style={{display: activeTab === 'corp-work-stages-4' ? 'block' : 'none'}}>
                <div className="admin-section-title">4 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task2"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo2"
                            placeholder="Мы разработали..."
                            label="Описание блока Паттерн"/>
                    </div>
                </div>
            </div>

            {/* Corporate Seventh Banner Section */}
            <div id="corp-seventh-banner" className="admin-section" style={{display: activeTab === 'corp-seventh-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Четвертый баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 5 Section */}
            <div id="corp-work-stages-5" className="admin-section" style={{display: activeTab === 'corp-work-stages-5' ? 'block' : 'none'}}>
                <div className="admin-section-title">5 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task3"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo3"
                            placeholder="Мы разработали..."
                            label="Описание блока"/>
                    </div>
                </div>
            </div>

            {/* Corporate Eighth Banner Section */}
            <div id="corp-eighth-banner" className="admin-section" style={{display: activeTab === 'corp-eighth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Пятый баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 6 Section */}
            <div id="corp-work-stages-6" className="admin-section" style={{display: activeTab === 'corp-work-stages-6' ? 'block' : 'none'}}>
                <div className="admin-section-title">6 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task4"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo4"
                            placeholder="Мы разработали..."
                            label="Описание блока "/>
                    </div>
                </div>
            </div>

            {/* Corporate Ninth Banner Section */}
            <div id="corp-ninth-banner" className="admin-section" style={{display: activeTab === 'corp-ninth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Шестой баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 7 Section */}
            <div id="corp-work-stages-7" className="admin-section" style={{display: activeTab === 'corp-work-stages-7' ? 'block' : 'none'}}>
                <div className="admin-section-title">7 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task5"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo5"
                            placeholder="Мы разработали..."
                            label="Описание блока "/>
                    </div>
                </div>
            </div>

            {/* Corporate Tenth Banner Section */}
            <div id="corp-tenth-banner" className="admin-section" style={{display: activeTab === 'corp-tenth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Седьмой баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 8 Section */}
            <div id="corp-work-stages-8" className="admin-section" style={{display: activeTab === 'corp-work-stages-8' ? 'block' : 'none'}}>
                <div className="admin-section-title">8 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task6"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo6"
                            placeholder="Мы разработали..."
                            label="Описание блока "/>
                    </div>
                </div>
            </div>

            {/* Corporate Eleventh Banner Section */}
            <div id="corp-eleventh-banner" className="admin-section" style={{display: activeTab === 'corp-eleventh-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Восьмой баннер/ список</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Corporate Work Stages 9 Section */}
            <div id="corp-work-stages-9" className="admin-section" style={{display: activeTab === 'corp-work-stages-9' ? 'block' : 'none'}}>
                <div className="admin-section-title">9 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task7"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo7"
                            placeholder="Мы разработали..."
                            label="Описание блока "/>
                    </div>
                </div>
            </div>

            {/* Corporate Twelfth Banner Section */}
            <div id="corp-twelfth-banner" className="admin-section" style={{display: activeTab === 'corp-twelfth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Девятый баннер/ список</div>
                <div className="admin-section-content">
                    <BooleanInput
                        source="control9"
                        label="по 1 в ряд/по 2 в ряд"/>
                    <ArrayInput
                        label={""}
                        source={"bannerTwelfth"}
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
            </div>

            {/* Corporate Work Stages 10 Section */}
            <div id="corp-work-stages-10" className="admin-section" style={{display: activeTab === 'corp-work-stages-10' ? 'block' : 'none'}}>
                <div className="admin-section-title">10 Блок Этапы работ</div>
                <div className="admin-section-content">
                    <div className="baseFlexWrap">
                        <TextInput
                            className="customWidth"
                            source="task8"
                            label="Заголовок слева"/>
                        <RichTextInput
                            className="customWidth"
                            source="taskDo8"
                            placeholder="Мы разработали..."
                            label="Описание блока "/>
                    </div>
                </div>
            </div>

            {/* Corporate Thirteenth Banner Section */}
            <div id="corp-thirteenth-banner" className="admin-section" style={{display: activeTab === 'corp-thirteenth-banner' ? 'block' : 'none'}}>
                <div className="admin-section-title">Десятый баннер/ список</div>
                <div className="admin-section-content">
                    <BooleanInput
                        source="control10"
                        label="по 1 в ряд/по 2 в ряд"/>
                    <ArrayInput
                        label={""}
                        source={"bannerThirteenth"}
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
            </div>

            {/* Corporate Results Section */}
            <div id="corp-results" className="admin-section" style={{display: activeTab === 'corp-results' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок результаты</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="awardsURL"
                        placeholder="https://www.cssdesignawards.com/"
                        label="URL награды"/>
                    <TextInput
                        className="customWidth"
                        source="awardsTitle"
                        placeholder="css design awards"
                        label="Название награды"/>
                    <ArrayInput
                        label={""}
                        source={"awardsImage"}
                    >
                        <SimpleFormIterator>
                            <FileInput
                                source="imageI"
                                className="fileInput"
                                placeholder="+"
                                label="Лого награды (будет видно только первый)">
                                <FilenameField
                                    source="src"
                                    title="title"/>
                            </FileInput>
                            <FunctionFieldForArrayItem/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <RichTextInput
                        className="customWidth"
                        source="result"
                        label="результат"/>
                </div>
            </div>
        </div>
    </>)
}

export const TechSupportRender = () => {
    const [activeTab, setActiveTab] = useState('tech-goals');
    
    const techTabs = [
        { id: 'tech-goals', label: 'Цели и задачи' },
        { id: 'tech-stack', label: 'Стек технологий' },
        { id: 'tech-results', label: 'Результаты' }
    ];

    return(<>
        <div className="section-tabs-container">
            <AdminTabs tabs={techTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="admin-form-content">
            {/* Tech Support Goals Section */}
            <div id="tech-goals" className="admin-section" style={{display: activeTab === 'tech-goals' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок над чем работаем/этапы</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="heading"
                        label="Заголовок слева"/>
                    <RichTextInput
                        className="customWidth"
                        source="taskDescr"
                        placeholder="Клиент обратился к нам..."
                        label="Описание блока цели и задачи"/>
                    <RichTextInput
                        className="customWidth"
                        label="Задача"
                        source="tasksItem"/>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div id="tech-stack" className="admin-section" style={{display: activeTab === 'tech-stack' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок стек технологий</div>
                <div className="admin-section-content">
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
                </div>
            </div>

            {/* Tech Results Section */}
            <div id="tech-results" className="admin-section" style={{display: activeTab === 'tech-results' ? 'block' : 'none'}}>
                <div className="admin-section-title">Блок результаты</div>
                <div className="admin-section-content">
                    <TextInput
                        className="customWidth"
                        source="awardsURL"
                        placeholder="https://www.cssdesignawards.com/"
                        label="URL награды"/>
                    <TextInput
                        className="customWidth"
                        source="awardsTitle"
                        placeholder="css design awards"
                        label="Название награды"/>


                    <ArrayInput
                        label={""}
                        source={"awardsImage"}
                    >
                        <SimpleFormIterator>
                            <FileInput
                                source="imageI"
                                className="fileInput"
                                placeholder="+"
                                label="Лого награды (будет видно только первый)">
                                <FilenameField
                                    source="src"
                                    title="title"/>
                            </FileInput>
                            <FunctionFieldForArrayItem/>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <RichTextInput
                        className="customWidth"
                        source="result"
                        label="результат"/>
                </div>
            </div>
        </div>
    </>)
}

/**
 * Компонент DefaultFields - это компонент React, который отображает поля по умолчанию для всех проектов.
 * @description Отображает набор базовых полей для заполнения карточки проекта, включая поля для SEO, заголовка, даты, описания, URL и изображений.
 * @returns {JSX.Element} - Элемент React, с набором базовых полей для заполнения карточки проекта.
 */
export const DefaultFields = () => {
    const projectType = useWatch({name: 'projectType'});
    const [activeTab, setActiveTab] = useState('basic-info');
    
    // More granular tabs for each section
    const projectTabs = [
        { id: 'basic-info', label: 'Основная информация' },
        { id: 'project-desc', label: 'Описание проекта' },
        { id: 'project-url', label: 'URL проекта' },
        { id: 'media', label: 'Медиа' },
        { id: 'banner', label: 'Баннер' },
        { id: 'client-info', label: 'Информация о клиенте' },
        { id: 'client-about', label: 'О клиенте' },
        { id: 'project-details', label: 'Детали проекта' },
        { id: 'seo', label: 'SEO' }
    ];

    // Add shadow to tab container on scroll
    const [scrollShadow, setScrollShadow] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollShadow(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<>
        {projectType && (
            <div className="projects-admin-container">
                <div className={`admin-tabs-container ${scrollShadow ? 'with-shadow' : ''}`}>
                    <AdminTabs tabs={projectTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                
                <div className="admin-form-content">
                    {/* Basic Information Section */}
                    <div id="basic-info" className="admin-section" style={{display: activeTab === 'basic-info' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Основная информация</div>
                        <div className="admin-section-content">
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
                            </span>
                        </div>
                    </div>

                    {/* Project Description Section */}
                    <div id="project-desc" className="admin-section" style={{display: activeTab === 'project-desc' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Описание проекта</div>
                        <div className="admin-section-content">
                            <RichTextInput
                                className="customWidth"
                                source="descrProject"
                                label="Описание проекта"
                            />
                            <BooleanInput
                                source="visibility"
                                label="Скрыть/Показать проекта"/>
                        </div>
                    </div>

                    {/* Project URL Section */}
                    <div id="project-url" className="admin-section" style={{display: activeTab === 'project-url' ? 'block' : 'none'}}>
                        <div className="admin-section-title">URL проекта</div>
                        <div className="admin-section-content">
                            <TextInput
                                className="customWidth"
                                source="nameInEng"
                                disabled={true}
                                placeholder="генерируется автоматически"
                                label="URL проекта" fullWidth/>
                            <TextInput
                                className="customWidth"
                                source="projectURL"
                                placeholder="https://mysite.ru/"
                                label="Ссылка для перехода на сайт"/>
                        </div>
                    </div>

                    {/* Media Section */}
                    <div id="media" className="admin-section" style={{display: activeTab === 'media' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Медиа файлы</div>
                        <div className="admin-section-content">
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
                        </div>
                    </div>

                    {/* Banner Section */}
                    <div id="banner" className="admin-section" style={{display: activeTab === 'banner' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Баннер/список</div>
                        <div className="admin-section-content">
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
                    </div>

                    {/* Client Information Section */}
                    <div id="client-info" className="admin-section" style={{display: activeTab === 'client-info' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Информация о клиенте</div>
                        <div className="admin-section-content">
                            <ReferenceArrayInput
                                source="projectTheme"
                                reference="themes">
                                <SelectInput
                                    className="customWidth"
                                    optionText="name"
                                    label="Отрасль"/>
                            </ReferenceArrayInput>
                        </div>
                    </div>

                    {/* Client About Section */}
                    <div id="client-about" className="admin-section" style={{display: activeTab === 'client-about' ? 'block' : 'none'}}>
                        <div className="admin-section-title">О клиенте</div>
                        <div className="admin-section-content">
                            <RichTextInput
                                className="customWidth"
                                source="about"
                                label="Описание о клиенте"
                            />
                        </div>
                    </div>

                    {/* Project Details Section */}
                    <div id="project-details" className="admin-section" style={{display: activeTab === 'project-details' ? 'block' : 'none'}}>
                        <div className="admin-section-title">Детали проекта</div>
                        <div className="admin-section-content">
                            <span className="baseFlexWrap">
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
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div id="seo" className="admin-section" style={{display: activeTab === 'seo' ? 'block' : 'none'}}>
                        <div className="admin-section-title">SEO настройки</div>
                        <div className="admin-section-content">
                            <span className="baseFlexWrap">
                                <TextInput className="customWidth" source="seoTitle" label="title"/>
                                <TextInput className="customWidth" source="seoDescription" label="description"/>
                                <TextInput className="customWidth" source="seoKeywords" label="keywords"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>)
}
