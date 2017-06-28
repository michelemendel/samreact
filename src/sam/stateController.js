import * as action from './action';
import * as stateRepresentation from '../view/View.jsx';
import * as C from '../common/constants.js';
import * as U from '../common/utils';
import model from "../data/model";

const view = stateRepresentation.getRoot();

/***************************************************************
 * Registration
 */

export function registration(model) {
    renderModel(model);
}

export function registrationCreateSuccess(model) {
    model.page = C.PAGE_REGISTRATION;
    model.statusCode = U.isObjEmpty(model.registration.specificErrorMessages)
        ? C.REGISTRATION_SUCCESS
        : C.REGISTRATION_VALIDATION_FAILED;

    if (model.statusCode == C.REGISTRATION_SUCCESS) {
        model.generalMessage = C.REGISTRATION_SUCCESS_MESSAGE;
        napNewRegistration();
    } else {
        renderModel(model);
    }
}


/****************************************************************
 * Next Action Predicates
 */

function napNewRegistration() {
    setTimeout(action.statusReset, 4000); // Longer than animation-duration in _popfromtop.scss
    action.registrationReset();
}


/***************************************************************
 * Pipe to view to have a single place before view to view the model
 */

export function renderModel(model) {
    console.clear();
    U.ppl(model.registration);

    view(model);
}



