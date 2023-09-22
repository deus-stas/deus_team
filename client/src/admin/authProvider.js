import { AUTH_LOGIN } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38/api'
    : `${process.env.REACT_APP_LOCALHOST_URI}/api`;

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`${apiUrl}/authenticate`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    }
    return Promise.resolve();
}