import './style/app.scss';
import * as U from './common/utils';
import * as C from './common/constants.js';
import * as action from './sam/action';
import * as model from './sam/model';
import * as state from './sam/state';
import * as view from './view/View.jsx';

const commentPre = "----> app:",
    log = U.logger(commentPre);

const query = document.location.search.slice(1).split('&');


/**
 * Wiring
 */

state.init(action, view.getRoot(action));
model.init(state);
action.init(model);


/**
 * Set start page
 */

const init = true;

action.newRegistration(init);


