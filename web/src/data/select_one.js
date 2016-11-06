import "whatwg-fetch";
import * as U from '../common/utils';
import selectOne from './select_one.json';

const minNofCharsRequired = 1;

/**
 * Lookup data from a local list.
 * @param searchStr
 * @param cb
 */
export function get(searchStr, cb) {

    let nofSearchChars = searchStr ? minNofCharsRequired : 0;

    cb(U.sortList(U.htmlSelectFilter(selectOne, searchStr)));
}

