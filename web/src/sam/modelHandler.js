import React from "react";
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as db from '../db/registration';

let M = {};
const commentPre = "mmmm> modelHandler:";

export function init(stateController) {
    M.stateController = stateController;
}

/***************************************************************
 * Registration
 */

export function presentRegistrationNew(model) {
    M.model = model;
    M.stateController.registrationNew(model);
}

export function presentRegistration() {
    M.stateController.registration(M.model);
}

// presentRegistrationFormUpdate : key, target -> *
export function presentRegistrationFormUpdate(key, target) {
    if (target.type == C.INPUT_CHECKBOX) {
        M.model.registration[key] = target.checked ? 'true' : 'false';
    } else {
        M.model.registration[key] = target.value;
    }

    M.stateController.registrationFormUpdate(M.model);
}

export function presentRegistrationSubmit() {
    validate(M.model.registration)
        .then(() => {
            db.addRegistration(M.model.registration);
            M.model.registration.specificErrorMessages = {};
            M.stateController.registrationSubmit(M.model);
        })
        .catch((validatedRes) => {
            M.model.registration.specificErrorMessages = validatedRes;
            M.stateController.registrationSubmit(M.model);
        });
}

// validate : object -> object
export function validate(registration) {
    return new Promise((resolve, reject) => {
        if (registration.informationText !== "") {
            resolve('A-OK');
        } else {
            reject({informationText: "Can't be empty"});
        }
    });
}


/***************************************************************
 * List
 */

export function presentList(list) {
    M.model.listFull = list;

    M.model.list = listSort(
        listFilter(list, C.DEFAULT_COLS_TO_FILTER_BY, M.model.filterText),
        M.model.sortColumn, M.model.sortDir);

    M.stateController.list(M.model);
}

export function presentListFilter(filterText) {
    M.model.filterText = filterText;
    M.model.list = listFilter(M.model.listFull, C.DEFAULT_COLS_TO_FILTER_BY, filterText);
    M.stateController.list(M.model);
}

export function presentListSort(sortColumn, sortDir) {
    M.model.sortColumn = sortColumn;
    M.model.sortDir = sortDir;
    M.model.list = listSort(M.model.list, sortColumn, sortDir);
    M.stateController.list(M.model);
}

/**
 * filterTable :: String b => ([a], b) -> [c]
 */
function listFilter(rows, colsToFilterBy, filterText) {
    const regex = new RegExp(filterText, 'i');

    return rows.filter((row) =>
        colsToFilterBy.filter((col) =>
            regex.test(row[col])).length > 0
    );
}

function listSort(rows, sortColumn, sortDir) {
    return rows.sort((a, b) =>
        a[sortColumn] > b[sortColumn] ? sortDir : a[sortColumn] < b[sortColumn] ? -1 * sortDir : 0
    );
}
