import R from "ramda";
import Flat from 'flat'; //https://github.com/hughsk/flat
import * as consts from "../common/constants.js";
import moment from 'moment';

const commentPre = "----> U:",
    FLATTEN_DELIMITER = '_';


/***************************************************************
 * Test and predicate functions
 */

export function isDef(obj) {
    return !(typeof obj === "undefined" || obj === null);
}

export function isObjEmpty(obj) {
    return (typeof obj === 'undefined') ||
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
            .replace(/(^| |-)(.)/g, (c) => c.toUpperCase())
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
    case undefined:
        return '-';
        break;
    case 'true':
        return 'Ja';
        break;
    case 'false':
        return 'Nei';
        break;
    default:
        return text;
    }
}


// A hack to prevent React to complain about changes to an uncontrolled input
// Not a true Maybe
export function maybeString(obj) {
    return isDef(obj) ? obj : '';
}


/***************************************************************
 * Misc functions
 */

export function functorize(obj) {
    return R.flatten([obj]);
}

export function noOp() {}


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
    return Flat.flatten(obj, {safe: true, delimiter: FLATTEN_DELIMITER});
}

// Unflatten an object
export function unflatten(obj) {
    return Flat.unflatten(obj, {safe: true, delimiter: FLATTEN_DELIMITER});
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

export function logger(module) {
    const getFileElement = (obj) => {
        if (obj) {
            const m = obj.trim().match(/(\/.+?)\?/);
            return m ? m[1] : '?';
        } else {
            return '?';
        }
    };

    const getFnElement = (obj) => {
        if (obj) {
            const m = obj.match(/Object\.(\w.+) /);
            return m ? m[1] : '?';
        } else {
            return '?';
        }
    };

    function log(module, message, logType) {
        const stack = new Error().stack;
        // console.log(pp(stack.split('\n')));

        if (stack) {
            const elms = stack.split('\n'),
                calleeFile = getFileElement(elms[3]),
                callerFile = getFileElement(elms[4]),
                calleeFn = getFnElement(elms[3]),
                msg = module + ':' + callerFile + ':' + calleeFile + ':' + calleeFn + ':' + message;

            // console.log(calleeFn);

            switch (logType) {
            case 'debug':
                console.debug(msg);
                break;
            case 'info':
                console.info(msg);
                break;
            case 'warn':
                console.warn(msg);
                break;
            case 'error':
                console.error(msg);
                break;
            }
        } else {
            console.info(message);
        }
    }

    return {
        debug: (message) => log(module, message, 'debug'),
        info: (message) => log(module, message, 'info'),
        warn: (message) => log(module, message, 'warn'),
        error: (message) => log(module, message, 'error')
    };
}

export function pp(obj) {
    return JSON.stringify(obj, null, '\t');
}

export function ppl(obj) {
    console.log(pp(obj));
}


