import * as modelHandler from './modelHandler';
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import * as selectOne from "../data/select_one.js";
import * as db from '../db/registration';
import model from "../data/model";

let M = {};
const commentPre = "aaaa> SAMAction:";


export function init(){
    M.model = model();
    M.model.statusCode = C.REGISTRATION_INIT;

    navigatePageRegistration();
}

/***************************************************************
 * Navigation
 */

export function navigatePageRegistration() {
    M.model.page = C.PAGE_REGISTRATION;
    modelHandler.presentRegistration(enrichRegistration(M.model));
}

export function navigatePageRegistrationList() {
    M.model.page = C.PAGE_LIST;
    M.model.list.rowsAll = db.getRegistrations();
    modelHandler.presentList(M.model);
}

/***************************************************************
 * Registration
 */

export function registrationReset() {
    M.model.registration = model(C.MODEL_REGISTRATION_RESET);
    // M.model.statusCode = C.REGISTRATION_INIT;

    navigatePageRegistration();
}

export function statusReset() {
    M.model.statusCode = C.REGISTRATION_INIT;
    modelHandler.presentRegistration(M.model);
}

export function formUpdate(key) {
    return (e) => {
        if (e.target.type == C.INPUT_CHECKBOX) {
            M.model.registration[key] = e.target.checked ? 'true' : 'false';
        } else {
            M.model.registration[key] = e.target.value;
        }

        modelHandler.presentRegistrationFormUpdate(M.model);
    };
}

export function registrationCreate() {
    modelHandler.presentRegistrationCreate(M.model);
}

function enrichRegistration() {
    M.model.selectOne = selectOne;
    return M.model;
}

/***************************************************************
 * Registration list
 */

export function filterTable(filterText) {
    M.model.list.filterText = filterText;
    modelHandler.presentListFilter(M.model);
}

export function sortTable(sortColumn, sortDir) {
    M.model.list.sortColumn = sortColumn;
    M.model.list.sortDir = sortDir;
    modelHandler.presentListSort(M.model);
}

// Details modal
export function listShowDetails(isShow) {
    return (dbId) => {
        return () => {
            M.model.list.selectedRow = Object.assign({}, M.model.list.rows.filter((row) => {
                return row.id === dbId;
            })[0]);

            modelHandler.presentList(M.model);
        }
    }
}
