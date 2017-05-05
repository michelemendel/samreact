import './style/app.scss';
import * as action from './sam/action';

const commentPre = "----> app:";

const query = document.location.search.slice(1).split('&');

/**
 * Start application
 */

action.init();




