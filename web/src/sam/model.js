import React from "react";
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as db from '../db/registration';

let samModel = {};
const commentPre = "mmmm> SAMModel:";

export function init(state) {
    samModel.state = state;
}

/***************************************************************
 * Page: Registrering
 */

export function presentNewRegistration(model) {
    samModel.state.newRegistration(model);
}

export function presentRegistration(model) {
    validate(model)
        .then((res) => {
            storeRegistration(model);
        })
        .catch((validatedRes) => {
            validatedRes.statusCode = C.REGISTRATION_VALIDATION_FAILED;
            samModel.state.registration(validatedRes);
        });
}

// validate : object -> object
export function validate(model) {
    return Promise.resolve('A-OK');
}


function storeRegistration(model) {
    db.addRegistration(model.registration);
    model.statusCode = C.REGISTRATION_SUCCESS;
    samModel.state.registration(model);
}


/***************************************************************
 * Page: List
 */

export function presentList(model) {
    model.data = sortTable(model.data, 'date', C.SORT_DIR_DESC);
    samModel.state.list(model);
}

/***************************************************************
 * Table
 */

export function presentFilterTable(model) {
    model.data = filterTable(model.allRows, model.colsToFilterBy, model.filterText);
    samModel.state.filteredTable(model);
}

export function presentSortTable(model) {
    model.data = sortTable(model.data, model.sortColumn, model.sortDir);
    samModel.state.sortTable(model);
    samModel.state.sortTable(model);
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
