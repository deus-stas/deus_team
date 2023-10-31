import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production'
    ? ''
    : process.env.REACT_APP_LOCALHOST_URI;
export const setHeaderData = (headerData) => {
    return {
        type: 'SET_HEADER_DATA',
        payload: headerData,
    }
};

export const setServices = (services) => ({
    type: 'SET_SERVICES',
    payload: services,
});

export const setContacts = (contacts) => ({
    type: 'SET_CONTACTS',
    payload: contacts,
});

export const fetchData = () => async (dispatch) => {
    try {

        const [servicesResponse,contactResponse ] =
            await Promise.all([
                axios.get(`${apiUrl}/api/services/`),
                axios.get(`${apiUrl}/api/contacts/`),
            ]);

        dispatch(setServices(servicesResponse.data));
        dispatch(setContacts(contactResponse.data));
        const headerResponse = await axios.get(`${apiUrl}/api/headerData/`)
        dispatch(setHeaderData(headerResponse.data[0]))

    } catch (error) {
        console.log(error);
    }
};