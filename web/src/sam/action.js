import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as selectOne from "../data/select_one.js";
import * as db from '../db/registration';

const commentPre = "aaaa> SAMAction:";

let A = {};

export function init(modelHandler) {
    A.modelHandler = modelHandler;
}

/***************************************************************
 * Navigation
 */

export function navigate(page) {
    if (page === C.PAGE_REGISTRATION) {
        A.modelHandler.presentRegistration();
    } else if (page === C.PAGE_LIST) {
        A.modelHandler.presentList(db.getRegistrations());
    }
}

/***************************************************************
 * Registration
 */

export function registrationNew(model) {
    A.modelHandler.presentRegistrationNew(enrichDataModel(model));
}

export function registrationFormUpdate(key) {
    return (e) => {
        A.modelHandler.presentRegistrationFormUpdate(key, e.target);
    };
}

export function registrationSubmit() {
    A.modelHandler.presentRegistrationSubmit();
}

function enrichDataModel(model) {
    model.selectOne = selectOne;
    return model;
}

/***************************************************************
 * List
 */

export function filterTable(filterText) {
    A.modelHandler.presentListFilter(filterText);
}

export function sortTable(sortColumn, sortDir) {
    A.modelHandler.presentListSort(sortColumn, sortDir);
}
