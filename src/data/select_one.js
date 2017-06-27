import * as U from '../common/utils';
import selectOne from './select_one.json';
import * as db from '../db/registration';

/**
 * Lookup data from a local list.
 * @param searchStr
 * @param cb
 */
export function get(searchStr, cb) {
    cb(U.sortList(
        U.htmlSelectFilter(
            U.uniq(selectOne.concat(db.getOptions())), searchStr)));
}

