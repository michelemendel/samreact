import "whatwg-fetch";
import * as U from '../common/utils';
import selectOne from './select_one.json';

/**
 * Lookup data from a local list.
 * @param searchStr
 * @param cb
 */
export function get(searchStr, cb) {
    cb(U.sortList(U.htmlSelectFilter(selectOne, searchStr)));
}

