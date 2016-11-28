import * as C from '../common/constants.js';
import * as U from '../common/utils';
import model from "../data/model";
import Im from 'immutable';

const commentPre = "ssss> SAMState:";

let S = {};

/***************************************************************
 * State controller
 */

export function init(action, view) {
    S.action = action;
    S.view = view;
}

/***************************************************************
 * Registration
 */

export function registrationNew(model) {
    model.page = C.PAGE_REGISTRATION;
    presentModel(model);
}

export function registration(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = C.REGISTRATION_INIT;
    presentModel(model);
}

export function registrationFormUpdate(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = C.REGISTRATION_INIT;
    model.generalMessage = '';

    presentModel(model);
}

export function registrationSubmit(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = U.isObjEmpty(model.registration.specificErrorMessages)
        ? C.REGISTRATION_SUCCESS
        : C.REGISTRATION_VALIDATION_FAILED;

    if (model.statusCode == C.REGISTRATION_SUCCESS) {
        napNewRegistration();
    } else {
        presentModel(model);
    }
}

// Next Action Predicate
function napNewRegistration() {
    let m = model();

    m.statusCode = C.REGISTRATION_SUCCESS;
    m.generalMessage = C.REGISTRATION_SUCCESS_MESSAGE;

    S.action.registrationNew(m);
}


/***************************************************************
 * List
 */

export function list(model) {
    model.page = C.PAGE_LIST;
    model.statusCode = C.LIST_INIT;
    presentModel(model);
}


/***************************************************************
 * Pipe to view to have a single place before view to view the model
 */

function presentModel(model) {
    // console.clear(); console.log('MODEL', U.pp(model));

    S.view(model);
}



