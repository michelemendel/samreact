import * as U from "../common/utils";

const REGISTRATION_KEY = 'registration_key';

export function addRegistration(registration) {
    // console.log('addRegistration:AA');
    checkRegistration();
    // console.log('addRegistration:BB');
    const list = JSON.parse(get(REGISTRATION_KEY)).concat(registration);
    // console.log('addRegistration:CC');
    set(REGISTRATION_KEY, JSON.stringify(list));
    // console.log('addRegistration:DD');
}

export function getRegistrations() {
    checkRegistration();
    return JSON.parse(get(REGISTRATION_KEY));
}

function checkRegistration() {
    // console.log('checkRegistration:AA');
    if (get(REGISTRATION_KEY) === "") {
        // console.log('checkRegistration:BB');
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

