import R from "ramda";
import Flat from 'flat'; //https://github.com/hughsk/flat
import * as C from './constants';
import moment from 'moment';

const FLATTEN_DELIMITER = '_';

/***************************************************************
 * Test and predicate functions
 */

export function isDef(obj) {
    return !(typeof obj === C.UNDEFINED || obj === null);
}

export function isObjEmpty(obj) {
    return (typeof obj === C.UNDEFINED) ||
        (Object.keys(obj).length === 0 && obj.constructor === Object);
}

export function isBoolean(obj) {
    return typeof obj === 'boolean';
}

/**
 * Used by filters.
 * caseInsensitiveTextPredicate : string -> (string -> boolean)
 */
export function caseInsensitiveTextPredicate(searchStr) {
    return (text) => text.toLowerCase().indexOf(searchStr.toLowerCase()) != -1;
}

/***************************************************************
 * String handling functions
 */

export function titleCase(s) {
    return !isDef(s) ? 'n/a' :
        s.toLowerCase()
            .split(' ')
            .filter((n) => n !== "")
            .join(' ')
            .replace(/(^| |-)(.)/g, (c) => c.toUpperCase());
}

// Only for single word text
export function startCase(s) {
    if (typeof s !== 'string') {
        return s;
    }

    if (s.split(' ').length == 1) {
        return titleCase(s);
    } else {
        return s;
    }
}

export function translate(text) {
    switch (text) {
        case C.UNDEFINED:
            return '-';
        case 'true':
            return 'Yes';
        case 'false':
            return 'No';
        default:
            return text;
    }
}

/***************************************************************
 * Misc functions
 */

export function noOp() { }

/***************************************************************
 * Date-time functions
 */

const dateFormat = 'YYYY-MM-DDThh:mm:ss';

// -> string
export function today() {
    return date2String(moment());
}

// string -> moment object
export function parseDate(str) {
    return moment(str, dateFormat);
}

// -> moment object
export function maxDateIsToday() {
    return moment();
}

// moment object -> string
export function date2String(date) {
    return date.format(dateFormat);
}

// string -> string
export function formatDate(str) {
    return str.slice(0, 16).replace('T', ' ');
}

// moment object -> boolean
export function isAfterToday(selectedDate) {
    return moment().isBefore(selectedDate);
}


/***************************************************************
 * Collection functions
 */

// Flatten an object
export function flatten(obj) {
    return Flat.flatten(obj, { safe: true, delimiter: FLATTEN_DELIMITER });
}

// Unflatten an object
export function unflatten(obj) {
    return Flat.unflatten(obj, { safe: true, delimiter: FLATTEN_DELIMITER });
}

/**
 * Sort case agnostic
 * sortList :: (String a) => [a] -> [a]
 */
export function sortList(items) {
    return items.sort((a, b) => {
        const al = a.toLowerCase(),
            bl = b.toLowerCase();

        return al >= bl ? 1 : al < bl ? -1 : 0;
    });
}

/**
 * htmlSelectFilter :: ([a], b) -> [c]
 */
export function htmlSelectFilter(list, searchStr) {
    return list.filter(caseInsensitiveTextPredicate(searchStr));
}

export function uniq(list) {
    return R.uniq(list);
}

/***************************************************************
 * Type conversion functions
 */

export function bool2String(obj) {
    let ret = {};

    Object.keys(obj).forEach((key) => {
        ret[key] = !isBoolean(obj[key]) ? obj[key] : obj[key] ? 'true' : 'false';
    });

    return ret;
}

export function string2Bool(obj) {
    let ret = {};

    Object.keys(obj).forEach((key) => {
        ret[key] = obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
    });

    return ret;
}

export function dash2Empty(obj) {
    let ret = {};


    Object.keys(obj).forEach((key) => {
        ret[key] = !isDef(obj[key]) ? '' : obj[key] === '-' ? '' : obj[key];
    });

    return ret;
}


/***************************************************************
 * Logging and pretty print functions
 */

export function pp(obj) {
    return JSON.stringify(obj, null, '\t');
}

export function ppl(obj) {
    console.log(pp(obj));
}


