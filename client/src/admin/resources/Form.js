import React from 'react';
import { List, Datagrid, TextField, FunctionField } from 'react-admin';

const apiUrl = ''

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
    return record.formFiles && record.formFiles.length ? (
        record.formFiles.map((file, index) => (
            <a key={index} href={`${apiUrl}/uploads/${file.filename}`} style={{ color: "#FF4D01" }} target="_blank" rel="noreferrer">
                Файл {index + 1}
            </a>
        ))
    ) : null;
};

// const LinkPortfolio = ({ record }) => {
//     return record.link ? (
//         <a href={`${record.link}`} style={{ color: "#FF4D01", }} target="_blank" rel="noreferrer">Ссылка</a>
//     ) : null;
// };

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
            {/*<FunctionField*/}
            {/*    label="Портфолио"*/}
            {/*    render={(record) => (*/}
            {/*        <LinkPortfolio record={record} />*/}
            {/*    )}*/}
            {/*/>*/}
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