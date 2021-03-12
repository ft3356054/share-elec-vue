import axios from 'axios';
let http = axios.create({
    // baseURL: 'http://172.20.10.13:8083',
   baseURL: process.env.NODE_ENV==='development' ? "/":process.env.VUE_APP_URL ,
    timeout: 20000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "withCredentials": false,
        "Access-Control-Allow-Origin":"http://30.20.109.76:32265/"
    },
    transformRequest: [function (data) {
        let newData = '';
        for (let k in data) {
            if (data.hasOwnProperty(k) === true) {
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
            }
        }
        return newData;
    }]
});

function apiAxios(method, url, params, response) {
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
        response(res);
    }).catch(function (err) {
        response(err);
    })
}
export default {
    get: function (url, params, response) {
        return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
        return apiAxios('POST', url, params, response)
    },
    put: function (url, params, response) {
        return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
        return apiAxios('DELETE', url, params, response)
    }
}
