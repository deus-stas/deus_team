import axios from 'axios';

const apiUrl = '';
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

export const setTeam = (team) => ({
    type: 'SET_TEAM',
    payload: team,
});



export const fetchData = () => async (dispatch) => {
    try {

        const [servicesResponse,contactResponse, teamResponse ] =
            await Promise.all([
                axios.get(`${apiUrl}/api/services/`),
                axios.get(`${apiUrl}/api/contacts/`),
                axios.get(`${apiUrl}/api/team/`),
            ]);

        dispatch(setServices(servicesResponse.data));
        dispatch(setContacts(contactResponse.data));
        dispatch(setTeam(teamResponse.data));
        const headerResponse = await axios.get(`${apiUrl}/api/headerData/`)
        dispatch(setHeaderData(headerResponse.data[0]))

    } catch (error) {
        console.log(error);
    }
};