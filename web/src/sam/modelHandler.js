import React from "react";
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as db from '../db/registration';

let M = {};
const commentPre = "mmmm> SAMModel:";

export function init(state) {
    M.state = state;
}

/***************************************************************
 * Page: Registrering
 */

export function presentNewRegistration(model) {
    M.state.newRegistration(model);
}

export function presentRegistration(model) {
    validate(model)
        .then(() => {
            db.addRegistration(model.registration);
            model.statusCode = C.REGISTRATION_SUCCESS;
            M.state.registration(model);
        })
        .catch((validatedRes) => {
            validatedRes.statusCode = C.REGISTRATION_VALIDATION_FAILED;
            M.state.registration(validatedRes);
        });
}

// validate : object -> object
export function validate(model) {
    return Promise.resolve('A-OK');
}


/***************************************************************
 * Page: List
 */

export function presentList(model) {
    model.data = sortTable(model.data, 'date', C.SORT_DIR_DESC);
    M.state.list(model);
}

/***************************************************************
 * Table
 */

export function presentFilterTable(model) {
    model.data = filterTable(model.allRows, model.colsToFilterBy, model.filterText);
    M.state.filteredTable(model);
}

export function presentSortTable(model) {
    model.data = sortTable(model.data, model.sortColumn, model.sortDir);
    M.state.sortTable(model);
    M.state.sortTable(model);
}


/***************************************************************
 * Private functions
 */

/**
 * filterTable :: String b => ([a], b) -> [c]
 */
function filterTable(rows, colsToFilterBy, filterText) {
    const regex = new RegExp(filterText, 'i');

    return rows.filter((row) =>
        colsToFilterBy.filter((col) =>
            regex.test(row[col])).length > 0
    );
}

function sortTable(rows, sortColumn, sortDir) {
    return rows.sort((a, b) =>
        a[sortColumn] > b[sortColumn] ? sortDir : a[sortColumn] < b[sortColumn] ? -1 * sortDir : 0
    );
}
