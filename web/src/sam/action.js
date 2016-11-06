import * as consts from "../common/constants.js";
import * as U from "../common/utils";
import * as selectOne from "../data/select_one.js";
import * as db from '../db/registration';
import registrationModel from "../data/registrationModel";

let action = {};
const commentPre = "aaaa> SAMAction:";

export function init(model) {
    action.model = model;
}

/***************************************************************
 * Action functions
 * Called by GUI events and to start the application.
 */

export function tabsNavigate(page, model) {
    if (page === consts.PAGE_REGISTRATION) {
        action.model.presentNewRegistration(enrichRegistrationModel(model));
    } else if (page === consts.PAGE_LIST) {
        action.model.presentList({data:db.getRegistrations()});
    }
}

export function newRegistration(isInit = false) {
    action.model.presentNewRegistration(enrichRegistrationModel(registrationModel(), isInit));
}

export function registration(model) {
    action.model.presentRegistration(model);
}

export function filterTable(model) {
    action.model.presentFilterTable(model);
}

export function sortTable(model) {
    action.model.presentSortTable(model);
}

function enrichRegistrationModel(model, isInit = true) {
    model.selectOne = selectOne;
    model.statusCode = isInit ? consts.REGISTRATION_INIT : consts.REGISTRATION_SUCCESS;
    return model;
}

