import * as consts from "../common/constants.js";
import * as U from "../common/utils";
import * as restClient from "../rest/client";
import * as selectOne from "../data/select_one.js";
import * as db from '../rest/db';
import registrationModel from "../data/registrationModel";

let action = {};
const commentPre = "aaaa> SAMAction:",
    log = U.logger(commentPre);

export function init(model) {
    action.model = model;
}

/***************************************************************
 * Action functions
 * Called by GUI events and to start the application.
 */

export function tabsNavigate(page, model) {
    if (page === consts.PAGE_REGISTRATION) {
        enrichRegistrationModel(model, action.model.presentNewRegistration);
    } else if (page === consts.PAGE_LIST) {
        list();
    }
}

export function newRegistration(isInit = false) {
    // console.log(U.pp(registrationModel()));
    enrichRegistrationModel(registrationModel(), action.model.presentNewRegistration, isInit);
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

export function logout() {
    restClient.logout();
}


/***************************************************************
 * Private functions
 */

function enrichRegistrationModel(model, contFn, isInit = true) {
    // Callback functions used to lookup data
    model.selectOne = selectOne;
    model.statusCode = isInit ? consts.REGISTRATION_INIT : consts.REGISTRATION_SUCCESS;

    contFn(model);
}

function list() {
    action.model.presentList({data:[]});

    // restClient.getList()
    //     .then((objs) => {
    //         let root = {};
    //         root.data = objs.map((obj) => U.bool2String(U.flatten(obj)));
    //     })
    //     .catch(console.log.bind(console));
}

