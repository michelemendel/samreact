import * as C from '../common/constants.js';
import * as U from '../common/utils';

let state = {};

const commentPre = "ssss> SAMState:",
    log = U.logger(commentPre);


/***************************************************************
 * State controllers
 */

export function init(action, view) {
    state.action = action;
    state.view = view;
}

export function newRegistration(model) {
    // console.log(commentPre,'newRegistration');
    model.page = C.PAGE_REGISTRATION;
    model.generalErrorMessage = {
        title: C.REGISTRATION_SUCCESS_TITLE,
        body:C.REGISTRATION_SUCCESS_BODY
    };
    model.invalidateCache = "true";

    // console.log(commentPre, 'newRegistration', U.pp(model));

    state.view(model);
}

export function registration(model) {
    model.page = C.PAGE_REGISTRATION;

    if (model.statusCode == C.REGISTRATION_SUCCESS) {
        napNewRegistration();
    } else {
        state.view(model);
    }
}

export function errorRegistration(model) {
    model.page = C.PAGE_REGISTRATION;
    state.view(model);
}

export function list(model) {
    model.page = C.PAGE_LIST;
    state.view(model);
}

export function filteredTable(model) {
    state.view(model);
}

export function sortTable(model) {
    state.view(model);
}


/***************************************************************
 * Next Action Predicate
 */

function napNewRegistration() {
    state.action.newRegistration(false);
}



