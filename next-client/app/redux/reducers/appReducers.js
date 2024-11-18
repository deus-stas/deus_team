    const initialState = {
        isLoading: true,
        headerData: {},
        services: [],
        contacts: [],
        team: [],
    };

    export default function reducer(state = initialState, action) {
        switch (action.type) {
            case 'SET_HEADER_DATA':
                return {
                    ...state,
                    headerData: action.payload,
                };
            case 'SET_SERVICES':
                return {
                    ...state,
                    services: action.payload,
                };
            case 'SET_CONTACTS':
                return {
                    ...state,
                    contacts: action.payload,
                };
            case 'SET_LOADING':
                return {
                    ...state,
                    isLoading: action.payload,
                };
            case 'SET_TEAM':
                return {
                    ...state,
                    team: action.payload,
                };
            default:
                return state;
        }
    }