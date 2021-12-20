import { API_SERVER_BASE } from '/javascripts/env.js';
const URL = API_SERVER_BASE + '/users/token';
const login = document.querySelector('#accountLogin');

fetch(URL)
    .then((response) => response.status)
    .then((data) => {
        if (data === 200) {
            login.innerHTML = 'logout';
            login.href = '/users/logout';
            login.id = 'accountLogout';
        }
    })
    .catch((error) => console.log('error:', error));
