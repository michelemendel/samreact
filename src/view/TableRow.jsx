import React from "react";
import * as U from "../common/utils";

const stringBool2String = function (text) {
    return text === 'true' ? 'Yes' : text === 'false' ? 'No' : text;
};

export default (props) => {
    let row = props.row;

    function rowCell(i, text) {
        return <td key={i} className="table__body__rows__row__cell">{stringBool2String(text)}</td>;
    }

    return (
        <tr
            data-dbid={props.dbId}
            className="table__body__rows__row table__body__rows__row--cursor"
            onClick={props.rowClickFn}>

            {props.colsToShow.map((key, i) => {
                row[key] = key === 'date' ? U.formatDate(row[key]) : row[key];
                return rowCell(i, row[key])
            })}
        </tr>
    )
}