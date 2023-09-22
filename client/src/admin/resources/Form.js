import React from 'react';
import { List, Datagrid, TextField, FunctionField } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const Services = ({ record }) => {
    console.log(record);
    return record.ctaServices.length ? (
        record.ctaServices.map(service => {
            return (
                <div style={{maxWidth: '150px', display: 'block'}}>{service}</div>
            )
        })
    ) : null;
};

const LinkFile = ({ record }) => {
    return record.file ? (
        <a href={`${apiUrl}/uploads/${record.file.filename}`} style={{ color: "#FF4D01" }} target="_blank" rel="noreferrer">Файл</a>
    ) : null;
};

const LinkPortfolio = ({ record }) => {
    return record.link ? (
        <a href={`${record.link}`} style={{ color: "#FF4D01", }} target="_blank" rel="noreferrer">Ссылка</a>
    ) : null;
};

export const FormList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="formName" label="Форма" />
            <FunctionField
                label="Услуги"
                render={(record) => (
                    <Services record={record} />
                )}
            />
            <TextField source="name" label="Имя" />
            <TextField source="company" label="Компания" />
            <FunctionField
                label="Портфолио"
                render={(record) => (
                    <LinkPortfolio record={record} />
                )}
            />
            <TextField source="phone" label="Телефон" />
            <TextField source="email" label="Почта" />
            <TextField source="about" label="Текст" />
            <TextField source="budget" label="Бюджет" />
            <FunctionField
                label="Файл"
                render={(record) => (
                    <LinkFile record={record} />
                )}
            />
        </Datagrid>
    </List>
);