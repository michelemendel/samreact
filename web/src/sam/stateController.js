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

/***************************************************************
 * Registration
 */

export function registrationNew(model) {
    model.page = C.PAGE_REGISTRATION;
    S.view(model);
}

export function registration(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = C.REGISTRATION_INIT;
    S.view(model);
}

export function registrationFormUpdate(model){
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = C.REGISTRATION_INIT;
    model.generalMessage = '';

    S.view(model);
}

export function registrationSubmit(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = U.isObjEmpty(model.registration.specificErrorMessages)
        ? C.REGISTRATION_SUCCESS
        : C.REGISTRATION_VALIDATION_FAILED;

    if (model.statusCode == C.REGISTRATION_SUCCESS) {
        napNewRegistration();
    } else {
        S.view(model);
    }
}

// Next Action Predicate
function napNewRegistration() {
   let m = model();

   m.statusCode = C.REGISTRATION_SUCCESS;
   m.generalMessage = C.REGISTRATION_SUCCESS_MESSAGE;

   S.action.navigate(C.PAGE_REGISTRATION, m);
}


/***************************************************************
 * List
 */

export function list(model) {
    model.page = C.PAGE_LIST;
    model.statusCode = C.LIST_INIT;
    S.view(model);
}




