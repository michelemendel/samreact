import './style/app.scss';
import * as U from './common/utils';
import * as C from './common/constants.js';
import * as action from './sam/action';
import * as modelHandler from './sam/modelHandler';
import * as stateController from './sam/stateController';
import * as view from './view/View.jsx';
import model from "./data/model";

const commentPre = "----> app:";

const query = document.location.search.slice(1).split('&');


/**
 * Wiring
 */

stateController.init(action, view.getRoot(action));
modelHandler.init(stateController);
action.init(modelHandler);


/**
 * Start application
 */

action.navigate(C.PAGE_REGISTRATION, model());


