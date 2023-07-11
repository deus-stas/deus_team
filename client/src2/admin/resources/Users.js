import * as React from 'react';
import { List, Datagrid, TextField, PasswordInput, Edit, SelectInput, Create, TextInput, SimpleForm, required } from 'react-admin';



export const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Имя" validate={[required()]} />
            <TextInput source="email" label="E-mail" validate={[required()]} />
            <SelectInput source="type" validate={required()} choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'manager', name: 'Manager' },
            ]} />
            <PasswordInput source="password" initiallyVisible  label="Пароль" validate={[required()]} />
            <PasswordInput source="password2" initiallyVisible label="Повтор пароль" validate={[required()]} />
        </SimpleForm>
    </Create>
)

// export const UsersEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput source="name" label="Тип проекта" validate={[required()]} />
//         </SimpleForm>
//     </Edit>
// );

export const UsersList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Имя" />
            <TextField source="email" label="E-mail" />
            {/* <TextField source="password" label="Пароль" /> */}
            <TextField source="type" label="Роль" />
        </Datagrid>
    </List>
);
