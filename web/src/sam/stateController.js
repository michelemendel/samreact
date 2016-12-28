import * as action from './action';
import * as stateRepresentation from '../view/View.jsx';
import * as C from '../common/constants.js';
import * as U from '../common/utils';
import model from "../data/model";

const view = stateRepresentation.getRoot();

const commentPre = "ssss> SAMState:";

/***************************************************************
 * Registration
 */

export function registration(model) {
    presentModel(model);
}

export function registrationFormUpdate(model) {
    presentModel(model);
}

export function registrationCreate(model) {
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

    action.registrationNew(m);
}


/***************************************************************
 * List
 */

export function list(model) {
    presentModel(model);
}


/***************************************************************
 * Pipe to view to have a single place before view to view the model
 */

function presentModel(model) {
    // console.clear();
    console.log(U.pp(model));
    view(model);
}



