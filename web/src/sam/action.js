import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as selectOne from "../data/select_one.js";
import * as db from '../db/registration';

let A = {};
const commentPre = "aaaa> SAMAction:";

export function init(modelHandler) {
    A.modelHandler = modelHandler;
}

/***************************************************************
 * Navigation
 */

export function navigate(page, model) {

    // console.log(commentPre, 'navigate', U.pp(model));

    if (page === C.PAGE_REGISTRATION) {
        if (model) {
            A.modelHandler.presentRegistrationNew(enrichDataModel(model));
        } else {
            A.modelHandler.presentRegistration();
        }
    } else if (page === C.PAGE_LIST) {
        A.modelHandler.presentList(db.getRegistrations());
    }
}

/***************************************************************
 * Registration
 */

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

export function filterTable(colsToFilterBy, filterText) {
    A.modelHandler.presentListFilter(colsToFilterBy, filterText);
}

export function sortTable(sortColumn, sortDir) {
    A.modelHandler.presentListSort(sortColumn, sortDir);
}
