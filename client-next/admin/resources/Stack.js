import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Edit,
    Create,
    TextInput,
    SimpleForm,
    required,
    FileInput,
    FunctionField
} from 'react-admin';

const apiUrl = ''

const VideoOrImageField = ({ file }) => {

    const isVideo = (funcFile) => {
        return funcFile && funcFile.filename && funcFile.mimetype.indexOf('mp4') !== -1;
    };

    if (!!file) {
        if (isVideo(file)) {
            return (
                <video style={{ width: '300px' }} autoPlay loop playsInline>
                    <source src={`${apiUrl}/uploads/${file.filename}`} type="video/mp4; " />
                </video>
            );
        } else {
            return <img style={{ width: '300px' }} src={`${apiUrl}/uploads/${file.filename}`} alt={file.filename} title="image" />;
        }
    }
    return null;
};


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

export const StackCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название стека" validate={[required()]} />
            <FileInput
                source="image"
                label="Баннер">
                <FilenameField
                    className="fileInput"
                    placeholder="+"
                    source="src"
                    title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
)

export const StackEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название стека" validate={[required()]} />
            <FileInput
                source="image"
                className="fileInput"
                placeholder="+"
                label="Баннер">
                <FilenameField
                    source="src"
                    title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const StackList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название стека" />
        </Datagrid>
    </List>
);
