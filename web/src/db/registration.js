import * as U from "../common/utils";

const REGISTRATION_KEY = 'registration_key';

export function addRegistration(registration) {
    checkRegistration();
    const list = JSON.parse(get(REGISTRATION_KEY)).concat(registration);
    set(REGISTRATION_KEY, JSON.stringify(list));
}

export function getRegistrations() {
    checkRegistration();
    return JSON.parse(get(REGISTRATION_KEY));
}

function checkRegistration(){
    if (get(REGISTRATION_KEY) === "") {
        set(REGISTRATION_KEY, JSON.stringify([]));
    }
}

function set(key, val) {
    localStorage.setItem(key, val);
}

function get(key) {
    const res = localStorage.getItem(key);
    return (typeof res !== "undefined" && res !== null) ? res : "";
}

export function clear() {
    return localStorage.clear();
}

export function remove(key) {
    return localStorage.removeItem(key);
}

