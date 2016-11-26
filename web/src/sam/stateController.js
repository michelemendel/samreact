import * as C from '../common/constants.js';
import * as U from '../common/utils';
import model from "../data/model";

let S = {};

const commentPre = "ssss> SAMState:";


/***************************************************************
 * State controllers
 */

export function init(action, view) {
    S.action = action;
    S.view = view;
}

export function newRegistration(model) {
    // console.log(commentPre,'newRegistration');
    model.page = C.PAGE_REGISTRATION;
    // model.statusCode = C.REGISTRATION_INIT;

    // console.log(commentPre, 'newRegistration', U.pp(model));

    S.view(model);
}

export function registration(model) {
    model.page = C.PAGE_REGISTRATION;

    if (model.statusCode == C.REGISTRATION_SUCCESS) {
        napNewRegistration();
    } else {
        S.view(model);
    }
}

export function errorRegistration(model) {
    model.page = C.PAGE_REGISTRATION;
    S.view(model);
}

export function list(model) {
    model.page = C.PAGE_LIST;
    S.view(model);
}

export function filteredTable(model) {
    S.view(model);
}

export function sortTable(model) {
    S.view(model);
}


/***************************************************************
 * Next Action Predicate
 */

function napNewRegistration() {
    let m = model();
    m.statusCode = C.REGISTRATION_SUCCESS;
    m.generalMessage = C.REGISTRATION_SUCCESS_MESSAGE;
    S.action.tabsNavigate(C.PAGE_REGISTRATION, m);
}



