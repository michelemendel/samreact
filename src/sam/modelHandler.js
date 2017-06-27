import React from "react";
import * as stateController from './stateController';
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as db from '../db/registration';

const commentPre = "mmmm> modelHandler:";

/***************************************************************
 * Registration
 */

export function presentRegistration(model) {
    stateController.registration(model);
}

export function presentRegistrationFormUpdate(model) {
    stateController.renderModel(model);
}

export function presentRegistrationCreate(model) {
    validate(model.registration)
        .then(() => {
            db.addRegistration(model.registration);
            model.registration.specificErrorMessages = {};
            stateController.registrationCreateSuccess(model);
        })
        .catch((validatedRes) => {
            model.registration.specificErrorMessages = validatedRes;
            stateController.registrationCreateSuccess(model);
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

export function presentList(model) {
    model.list.rows = listSort(
        listFilter(model.list.rowsAll, C.DEFAULT_COLS_TO_FILTER_BY, model.list.filterText),
        model.list.sortColumn, model.list.sortDir);

    stateController.renderModel(model);
}

export function presentListFilter(model) {
    model.list.rows = listFilter(model.list.rowsAll, C.DEFAULT_COLS_TO_FILTER_BY, model.list.filterText);
    stateController.renderModel(model);
}

export function presentListSort(model) {
    model.list.rows = listSort(model.list.rowsAll, model.list.sortColumn, model.list.sortDir);
    stateController.renderModel(model);
}

/**
 * filterTable :: String b => ([a], [b], b) -> [a]
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
