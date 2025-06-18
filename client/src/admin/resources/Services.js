import React, { useState, useEffect } from 'react';
import {List, Datagrid, TextField, EditButton, ReferenceInput} from 'react-admin';
// import './Services.css';
import { Create, SimpleForm, TextInput, Edit, required, ReferenceArrayInput, SelectInput, FunctionField, BooleanInput, FileInput, ArrayInput, SimpleFormIterator, SelectArrayInput, FormDataConsumer } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const apiUrl = ''

// Isolated Array Component to prevent form state sharing
const IsolatedArrayInput = ({ children, ...props }) => {
    const [localKey, setLocalKey] = useState(Math.random());
    
    useEffect(() => {
        // Force re-render when source changes to break state sharing
        setLocalKey(Math.random());
    }, [props.source]);
    
    return (
        <div key={localKey}>
            <ArrayInput {...props}>
                {children}
            </ArrayInput>
        </div>
    );
};

// Admin Tabs Component for navigation
const AdminTabs = ({ tabs, activeTab, setActiveTab }) => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }
        setActiveTab(sectionId);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            { 
                threshold: 0.3,
                rootMargin: '-80px 0px -50% 0px'
            }
        );

        tabs.forEach(tab => {
            const element = document.getElementById(tab.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [tabs, setActiveTab]);

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
                        return <img src={fileUrl} alt={record.filename} style={{ maxWidth: '200px', maxHeight: '150px' }}/>;
                    }
                } else {
                    const isVideo = /\.(avi|mkv|asf|mp4|flv|mov)$/i.test(record.title);
                    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(record.title);

                    if (isVideo) {
                        return (
                            <video className="customWidth" src={record.src}
                                   type={record.mimetype}>
                            </video>
                        );
                    } else if (isImage) {
                        return <img src={record.src} alt={record.title} style={{ maxWidth: '200px', maxHeight: '150px' }}/>;
                    }
                }
                return null;
            }}
        />
    )
}

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

export const ServicesList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="position" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ServicesCreate = (props) => {
    const [activeTab, setActiveTab] = useState('basic-info');

    const tabs = [
        { id: 'basic-info', label: 'Основная информация' },
        { id: 'media-section', label: 'Медиа' },
        { id: 'content-section', label: 'Контент' },
        { id: 'why-choose-us', label: 'Почему выбирают нас' },
        { id: 'service-includes', label: 'Что входит в услугу' },
        { id: 'aspro-templates', label: 'Шаблоны Aspro' },
        { id: 'faq-section', label: 'FAQ' },
        { id: 'benefits-section', label: 'Преимущества' },
        { id: 'related-services', label: 'Связанные услуги' },
        { id: 'work-process', label: 'Процесс работы' },
        { id: 'tariffs-section', label: 'Тарифы' },
        { id: 'seo-section', label: 'SEO' }
    ];

    return (
        <Create {...props}>
            <SimpleForm>
                <AdminTabs 
                    tabs={tabs} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />

                {/* Basic Information Section */}
                <div id="basic-info" className="admin-section">
                    <div className="admin-section-title">Основная информация</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="name" label="Заголовок" fullWidth validate={[required()]} />
                    </div>
                    <div className="admin-form-grid">
                        <ReferenceArrayInput source="types" reference="types" label="Тип проекта" validate={[required()]}>
                            <SelectInput className="customWidth" optionText="name" />
                        </ReferenceArrayInput>
                        <TextInput className="customWidth" source="position" label="Позиция"/>
                    </div>
                    <div className="admin-form-grid">
                        <BooleanInput source="isInvisible" label="Показать/Скрыть"/>
                    </div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                    </div>
                </div>

                {/* Media Section */}
                <div id="media-section" className="admin-section">
                    <div className="admin-section-title">Медиа файлы</div>
                    <div className="admin-form-grid">
                        <div>
                            <h4>Баннер услуги</h4>
                            <FileInput
                                source="serviceBanner"
                                className="fileInput"
                                placeholder="+"
                                label="Баннер">
                                <FilenameField
                                    source="src"
                                    title="title"/>
                            </FileInput>
                        </div>
                        <div>
                            <h4>Бриф для клиентов</h4>
                            <FileInput className="fileInput" placeholder="+" source="brief" label="Ссылка для брифа">
                                <FilenameField
                                    source="image"
                                    title="title" />
                            </FileInput>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div id="content-section" className="admin-section">
                    <div className="admin-section-title">Контент страницы</div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth" source="descrTotal" label="Описание для разводящей страницы" fullWidth />
                    </div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth" source="descr" label="Описание для детальной страницы" fullWidth />
                    </div>
                    <div className="admin-form-grid-full">
                        <ReferenceArrayInput perPage={100} source="subProjects" reference="projects" allowEmpty={true}>
                            <SelectArrayInput className="customWidth" optionText="name" label="Связанные проекты" />
                        </ReferenceArrayInput>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div id="why-choose-us" className="admin-section">
                    <div className="admin-section-title">Почему выбирают нас</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="whyChooseUsTitle" label="Заголовок секции 'Почему выбирают'" fullWidth />
                    </div>
                    <ArrayInput 
                        source="whyChooseUsOptions" 
                        label="Преимущества выбора" 
                    >
                        <SimpleFormIterator 
                            inline 
                            getItemLabel={index => `#${index + 1}`}
                            addLabel="Добавить преимущество"
                            removeLabel="Удалить"
                        >
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="number" label="Номер" />
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />       
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Service Includes Section */}
                <div id="service-includes" className="admin-section">
                    <div className="admin-section-title">Что входит в услугу</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="serviceIncludesTitle" label="Заголовок секции 'Что входит в услугу'" fullWidth />
                        <RichTextInput className="customWidth" source="serviceIncludesDescription" label="Описание для 'Что входит в услугу'" fullWidth />
                    </div>
                    <ArrayInput 
                        source="serviceIncludesOptions" 
                        label="Элементы услуги"
                    >
                        <SimpleFormIterator 
                            inline 
                            getItemLabel={index => `Элемент #${index + 1}`}
                            addLabel="Добавить элемент"
                            removeLabel="Удалить"
                        >
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Aspro Templates Section */}
                <div id="aspro-templates" className="admin-section">
                    <div className="admin-section-title">Шаблоны Aspro</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="asproTemplatesTitle" label="Заголовок секции 'Шаблоны Aspro'" fullWidth />
                        <RichTextInput className="customWidth" source="asproTemplatesDescription" label="Описание для 'Шаблоны Aspro'" fullWidth />
                    </div>
                    <ArrayInput 
                        source="asproTemplatesOptions" 
                        label="Шаблоны Aspro"
                    >
                        <SimpleFormIterator 
                            inline 
                            getItemLabel={index => `Шаблон #${index + 1}`}
                            addLabel="Добавить шаблон"
                            removeLabel="Удалить"
                        >
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* FAQ Section */}
                <div id="faq-section" className="admin-section">
                    <div className="admin-section-title">Часто задаваемые вопросы</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="faqTitle" label="Заголовок секции FAQ" fullWidth />
                    </div>
                    <ArrayInput 
                        source="faqOptions" 
                        label="Вопросы и ответы"
                    >
                        <SimpleFormIterator 
                            inline 
                            getItemLabel={index => `Вопрос #${index + 1}`}
                            addLabel="Добавить вопрос"
                            removeLabel="Удалить"
                        >
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Вопрос" />
                                <RichTextInput className="customWidth" source="description" label="Ответ" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Benefits Section */}
                <div id="benefits-section" className="admin-section">
                    <div className="admin-section-title">Преимущества</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />
                    </div>
                    <ArrayInput source="benefits" label="Преимущества">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="benefitsName" label="Название преимущества" />
                                <RichTextInput className="customWidth" source="benefitsDescr" label="Описание" fullWidth />
                                <ReferenceArrayInput source="benefitsPersons" reference="persons">
                                    <SelectInput className="customWidth" optionText="name" label="Сотрудник" />
                                </ReferenceArrayInput>
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Related Services Section */}
                <div id="related-services" className="admin-section">
                    <div className="admin-section-title">Связанные услуги</div>
                    <div className="admin-form-grid">
                        <TextInput className="customWidth" source="blockTitle" label="Заголовок для блока" />
                        <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                            <SelectArrayInput className="customWidth" optionText="name" label="Элементы блока" />
                        </ReferenceArrayInput>
                    </div>
                </div>

                {/* Work Process Section */}
                <div id="work-process" className="admin-section">
                    <div className="admin-section-title">Как проходит работа</div>
                    <ArrayInput source="work" label="Этапы работы">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="workName" label="Название" />
                                <RichTextInput className="customWidth" source="workDescr" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Tariffs Section */}
                <div id="tariffs-section" className="admin-section">
                    <div className="admin-section-title">Тарифы</div>
                    <ArrayInput source="tariffs" label="Тарифы">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="tariffsCategory" label="Категория тарифа" />
                                <TextInput className="customWidth" source="tariffDeadline" label="Срок работы" />
                                <TextInput className="customWidth" source="tariffPrice" label="Стоимость" />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* SEO Section */}
                <div id="seo-section" className="admin-section seo-section">
                    <div className="admin-section-title">SEO настройки</div>
                    <div className="admin-form-grid-3">
                        <TextInput className="customWidth" source="seoTitle" label="TITLE" />
                        <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
                        <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
                    </div>
                </div>
            </SimpleForm>
        </Create>
    );
};

export const ServicesEdit = (props) => {
    const [activeTab, setActiveTab] = useState('basic-info');

    const tabs = [
        { id: 'basic-info', label: 'Основная информация' },
        { id: 'media-section', label: 'Медиа' },
        { id: 'content-section', label: 'Контент' },
        { id: 'why-choose-us', label: 'Почему выбирают нас' },
        { id: 'service-includes', label: 'Что входит в услугу' },
        { id: 'aspro-templates', label: 'Шаблоны Aspro' },
        { id: 'faq-section', label: 'FAQ' },
        { id: 'benefits-section', label: 'Преимущества' },
        { id: 'related-services', label: 'Связанные услуги' },
        { id: 'work-process', label: 'Процесс работы' },
        { id: 'tariffs-section', label: 'Тарифы' },
        { id: 'seo-section', label: 'SEO' }
    ];

    return (
        <Edit {...props}>
            <SimpleForm>
                <AdminTabs 
                    tabs={tabs} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />

                {/* Basic Information Section */}
                <div id="basic-info" className="admin-section">
                    <div className="admin-section-title">Основная информация</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="name" label="Заголовок" fullWidth validate={[required()]} />
                    </div>
                    <div className="admin-form-grid">
                        <ReferenceInput source="types" reference="types" label="Тип проекта">
                            <SelectInput className="customWidth" optionText="name" />
                        </ReferenceInput>
                        <TextInput className="customWidth" source="position" label="Позиция"/>
                    </div>
                    <div className="admin-form-grid">
                        <BooleanInput source="isInvisible" label="Показать/Скрыть"/>
                        <TextInput className="customWidth" source="path" label="URL" />
                    </div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                    </div>
                </div>

                {/* Media Section */}
                <div id="media-section" className="admin-section">
                    <div className="admin-section-title">Медиа файлы</div>
                    <div className="admin-form-grid">
                        <div>
                            <h4>Баннер услуги</h4>
                            <FileInput
                                source="serviceBanner"
                                className="fileInput"
                                placeholder="+"
                                label="Баннер">
                                <FilenameField
                                    source="src"
                                    title="title"/>
                            </FileInput>
                        </div>
                        <div>
                            <h4>Бриф для клиентов</h4>
                            <FileInput className="fileInput" placeholder="+" source="brief" label="Ссылка для брифа">
                                <FilenameField
                                    source="image"
                                    title="title" />
                            </FileInput>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div id="content-section" className="admin-section">
                    <div className="admin-section-title">Контент страницы</div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth rich-text-input" source="descrTotal" label="Описание для разводящей" fullWidth />
                    </div>
                    <div className="admin-form-grid-full">
                        <RichTextInput className="customWidth rich-text-input" source="descr" label="Описание для деталки" fullWidth />
                    </div>
                    <div className="admin-form-grid-full">
                        <ReferenceArrayInput perPage={100} source="subProjects" reference="projects" allowEmpty={true}>
                            <SelectArrayInput className="customWidth" optionText="name" label="Проекты" />
                        </ReferenceArrayInput>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div id="why-choose-us" className="admin-section">
                    <div className="admin-section-title">Почему выбирают нас</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="whyChooseUsTitle" label="Заголовок секции 'Почему выбирают'" fullWidth />
                    </div>
                    <ArrayInput source="whyChooseUsOptions" label="Преимущества выбора">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="number" label="Номер" />
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Service Includes Section */}
                <div id="service-includes" className="admin-section">
                    <div className="admin-section-title">Что входит в услугу</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="serviceIncludesTitle" label="Заголовок секции 'Что входит в услугу'" fullWidth />
                        <RichTextInput className="customWidth rich-text-input" source="serviceIncludesDescription" label="Описание для 'Что входит в услугу'" fullWidth />
                    </div>
                    <ArrayInput source="serviceIncludesOptions" label="Элементы услуги">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Aspro Templates Section */}
                <div id="aspro-templates" className="admin-section">
                    <div className="admin-section-title">Шаблоны Aspro</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="asproTemplatesTitle" label="Заголовок секции 'Шаблоны Aspro'" fullWidth />
                        <RichTextInput className="customWidth rich-text-input" source="asproTemplatesDescription" label="Описание для 'Шаблоны Aspro'" fullWidth />
                    </div>
                    <ArrayInput source="asproTemplatesOptions" label="Шаблоны Aspro">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Заголовок" />
                                <RichTextInput className="customWidth" source="description" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* FAQ Section */}
                <div id="faq-section" className="admin-section">
                    <div className="admin-section-title">FAQ</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="faqTitle" label="Заголовок секции FAQ" fullWidth />
                    </div>
                    <ArrayInput source="faqOptions" label="Вопросы и ответы">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="title" label="Вопрос" />
                                <RichTextInput className="customWidth" source="description" label="Ответ" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Benefits Section */}
                <div id="benefits-section" className="admin-section">
                    <div className="admin-section-title">Преимущества</div>
                    <div className="admin-form-grid-full">
                        <TextInput className="customWidth" source="benefitsTitle" label="Заголовок для преимуществ" fullWidth />
                    </div>
                    <ArrayInput source="benefits" label="Преимущества">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="benefitsName" label="Название преимущества" />
                                <RichTextInput className="customWidth" source="benefitsDescr" label="Описание" fullWidth />
                                <ReferenceArrayInput source="benefitsPersons" reference="persons">
                                    <SelectInput className="customWidth" optionText="name" label="Сотрудник" />
                                </ReferenceArrayInput>
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Related Services Section */}
                <div id="related-services" className="admin-section">
                    <div className="admin-section-title">Связанные услуги</div>
                    <div className="admin-form-grid">
                        <TextInput className="customWidth" source="blockTitle" label="Заголовок для блока" />
                        <ReferenceArrayInput perPage={100} source="servicesServices" reference="subServices" allowEmpty={true}>
                            <SelectArrayInput className="customWidth" optionText="name" label="Элементы блока" />
                        </ReferenceArrayInput>
                    </div>
                </div>

                {/* Work Process Section */}
                <div id="work-process" className="admin-section">
                    <div className="admin-section-title">Как проходит работа</div>
                    <ArrayInput source="work" label="Как проходит работа">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid">
                                <TextInput className="customWidth" source="workName" label="Название" />
                                <RichTextInput className="customWidth" source="workDescr" label="Описание" fullWidth />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* Tariffs Section */}
                <div id="tariffs-section" className="admin-section">
                    <div className="admin-section-title">Тарифы</div>
                    <ArrayInput source="tariffs" label="Тарифы">
                        <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                            <div className="admin-form-grid-3">
                                <TextInput className="customWidth" source="tariffsCategory" label="Категория тарифа" />
                                <TextInput className="customWidth" source="tariffDeadline" label="Срок работы" />
                                <TextInput className="customWidth" source="tariffPrice" label="Стоимость" />
                            </div>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

                {/* SEO Section */}
                <div id="seo-section" className="admin-section seo-section">
                    <div className="admin-section-title">SEO настройки</div>
                    <div className="admin-form-grid-3">
                        <TextInput className="customWidth" source="seoTitle" label="TITLE" />
                        <TextInput className="customWidth" source="seoDescription" label="DESCRIPTION" />
                        <TextInput className="customWidth" source="seoKeywords" label="KEYWORDS" />
                    </div>
                </div>
            </SimpleForm>
        </Edit>
    );
};