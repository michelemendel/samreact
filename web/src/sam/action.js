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
 * Action functions
 * Called by GUI events and to start the application.
 */

export function tabsNavigate(page, model) {
    if (page === C.PAGE_REGISTRATION) {
        A.modelHandler.presentNewRegistration(enrichDataModel(model));
    } else if (page === C.PAGE_LIST) {
        A.modelHandler.presentList({data:db.getRegistrations()});
    }
}

export function registration(model) {
    A.modelHandler.presentRegistration(model);
}

export function filterTable(model) {
    A.modelHandler.presentFilterTable(model);
}

export function sortTable(model) {
    A.modelHandler.presentSortTable(model);
}

function enrichDataModel(model) {
    model.selectOne = selectOne;
    return model;
}

