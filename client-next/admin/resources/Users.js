import * as React from 'react';
import { List, Datagrid, TextField, PasswordInput, Edit, SelectInput, Create, TextInput, SimpleForm, required } from 'react-admin';



export const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Имя" validate={[required()]} />
            <TextInput className="customWidth" source="email" label="E-mail" validate={[required()]} />
            <SelectInput className="customWidth" source="type" validate={required()} choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'manager', name: 'Manager' },
            ]} />
            <PasswordInput className="customWidth" source="password" initiallyVisible  label="Пароль" validate={[required()]} />
            <PasswordInput className="customWidth" source="password2" initiallyVisible label="Повтор пароль" validate={[required()]} />
        </SimpleForm>
    </Create>
)

// export const UsersEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput className="customWidth" source="name" label="Тип проекта" validate={[required()]} />
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
