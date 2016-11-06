import R from "ramda";
import Flat from 'flat'; //https://github.com/hughsk/flat
import * as consts from "../common/constants.js";
import moment from 'moment';

const commentPre = "----> U:";

/***************************************************************
 * SSN validation and categorizing
 */

const isFnrOrDnr = R.curry((listOfValidNrs, ssn) =>
    ssn.length === 11 && isValidSSN(ssn) && listOfValidNrs.indexOf(ssn.slice(0, 1)) > -1),
    isFnr = isFnrOrDnr(['0', '1', '2', '3']),
    isDnr = isFnrOrDnr(['4', '5', '6', '7']),
    isDUF = (ssn) => ssn.length === 12;

export function categorizeSSN(ssn) {
    if (isFnr(ssn)) {
        return consts.ID_FNR
    } else if (isDnr(ssn)) {
        return consts.ID_DNR
    } else if (isDUF(ssn)) {
        return consts.ID_DUF
    } else {
        return consts.ID_NOT_VALID
    }
}

/**
 * isValidSSN : string | int -> boolean
 * mod11, se https://miles.no/blogg/validering-av-norske-data
 */
function isValidSSN(ssnMaybeInt) {
    const ssn = ssnMaybeInt.toString();

    if (!ssn || ssn.length !== 11) {
        return false;
    }

    const sum = (ssn, factors) =>
        factors.reduce((acc, cur, idx) => {
            return acc + parseInt(ssn.charAt(idx), 10) * cur;
        }, 0);

    var checksum1 = sum(ssn, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11;
    checksum1 = checksum1 === 0 ? 0 : 11 - checksum1;

    var checksum2 = sum(ssn, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11;
    checksum2 = checksum2 === 0 ? 0 : 11 - checksum2;

    return checksum1 === parseInt(ssn.charAt(9), 10)
        && checksum2 === parseInt(ssn.charAt(10), 10);
}


