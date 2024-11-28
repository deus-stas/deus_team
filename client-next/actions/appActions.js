import axios from 'axios';

const apiUrl = '';

export const setHeaderData = (headerData) => ({
    type: 'SET_HEADER_DATA',
    payload: headerData,
});

export const setServices = (services) => ({
    type: 'SET_SERVICES',
    payload: services,
});

export const setContacts = (contacts) => ({
    type: 'SET_CONTACTS',
    payload: contacts,
});

export const setTeam = (team) => ({
    type: 'SET_TEAM',
    payload: team,
});



export const fetchData = () => async (dispatch) => {
    try {

        const [servicesResponse,contactResponse, teamResponse, headerResponse ] =
            await Promise.all([
                axios.get(`${apiUrl}/api/services/`),
                axios.get(`${apiUrl}/api/contacts/`),
                axios.get(`${apiUrl}/api/team/`),
                axios.get(`${apiUrl}/api/headerData/`),
            ]);

        dispatch(setServices(servicesResponse.data));
        dispatch(setContacts(contactResponse.data));
        dispatch(setTeam(teamResponse.data));
        dispatch(setHeaderData(headerResponse.data[0]));

        console.log('Services:', servicesResponse.data);
        console.log('Contacts:', contactResponse.data);
        console.log('Team:', teamResponse.data);
        console.log('Header Data:', headerResponse.data);

    } catch (error) {
        console.log(error);
    }
};

