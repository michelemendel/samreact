import "whatwg-fetch";
import * as U from "../common/utils";
import * as C from "../common/constants.js";

const commentPre = "Rest-client:",
    defaultVersion = C.REST_VERSION;


/**
 * @returns Promise
 */
export function getItems() {
    return get(getApiUrl(C.REST_PATH_LIST));
}


/**
 * @param id
 * @returns Promise
 */
export function getItem(id) {
    if (!U.isDef(id)) {
        throw 'List: Missing id';
    }
    const path = C.REST_PATH_LIST + '/' + id;

    return get(getApiUrl(path));
}

/**
 * @param payload
 * @returns Promise
 */
export function registrationNew(payload) {
    // console.log('client:registrationNew',U.pp(payload));
    return post(getApiUrl(C.REST_PATH_LIST), payload);
}


/**
 * Private functions
 */

/**
 * @param url
 * @returns {Promise}
 */
function get(url) {
    const config = getFetchConfig(C.REST_METHOD_GET);
    const request = new Request(url, config);

    return fetch(request)
        .then(handleErrors(url))
        .then((response) => {
            // Hack for å håndtere redirects til login siden
            var contentType = response.headers.get("content-type");
            if (contentType === 'text/html') {
                console.log("redirecting for login page");
                window.location.href = "/ucp";
                cleanCookies();
            }
            return response.json();
        });
}

/**
 * @param url
 * @param payload
 * @returns {Promise}
 */
function post(url, payload) {
    const config = Object.assign(getFetchConfig(C.REST_METHOD_POST), {body: JSON.stringify(payload)});
    const request = new Request(url, config);

    // console.log('Rest:client:post: payload');

    return fetch(request)
        .then((response) => {
            if (response.status === 200) {
                // console.log(commentPre + 'Ok');
                return {errorCode: 200};
            } else if (response.status === 400) {
                return response.json();
            } else if (response.status === 500) {
                throw Error(`${commentPre} : ${response.status}, ${response.statusText}, ${response.url}`);
            }
        })
        .catch((errMsg) => {
            // console.log(errMsg);
            throw Error(errMsg);
        });
}

/**
 * Only used by get
 * @param url
 * @returns {function(*)}
 */
function handleErrors(url) {
    return (response) => {
        if (!response.ok) {
            console.log(commentPre + 'client:error ', response.status, response.statusText);
            throw Error(response.statusText)
        }
        return response;
    }
}

/**
 * @param method
 * @returns {{method: *, headers: Headers, mode: string, cache: string, credentials: string}}
 */
function getFetchConfig(method) {
    return {
        method: method,
        headers: new Headers({"Content-Type": "application/json"}),
        mode: 'cors',
        cache: 'default',

        // When using the webpack proxy setup, this is not needed
        // credentials: 'include',
        credentials: 'same-origin'
    }
}

/**
 * @param path
 * @param params
 * @param version
 * @returns {string}
 */
function getApiUrl(path, params, version = defaultVersion) {
    const baseUrl = getBaseUrl();
    // console.log(commentPre + 'client:URL: ', baseUrl + 'api/' + version + '/' + path + (U.isDef(params) ? '?' + params : ''));
    return baseUrl + 'api/' + version + '/' + path + (U.isDef(params) ? '?' + params : '');
}

/**
 * See webpack.config.js for proxy setup in dev mode between Node and Jetty.
 * @returns {string}
 */
function getBaseUrl() {
    let hostname = document.location.hostname,
        port = document.location.port,
        protocol = document.location.protocol,
        contextRoot = document.location.pathname;

    // console.log(commentPre + "client:baseURL: ", protocol + '//' + hostname + ':' + port + contextRoot);
    return protocol + '//' + hostname + ':' + port + contextRoot;
}

function getBaseUrlWithCredentials(user, password) {
    let hostname = document.location.hostname,
        port = document.location.port,
        protocol = document.location.protocol,
        contextRoot = document.location.pathname;

    // console.log(commentPre + "client:baseURL: ", protocol + '//' + user + ':' + password + '@' + hostname + ':' + port + contextRoot);
    return protocol + '//' + user + ':' + password + '@' + hostname + ':' + port + contextRoot;
}