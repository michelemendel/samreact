import React, {Component} from "react";
import * as U from "../common/utils";

const commentPre = "####> tableRow:";

const stringBool2String = function (text) {
    return text === 'true' ? 'Yes' : text === 'false' ? 'No' : text;
};

export default class TableRow extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }

    /***************************************************************
     * Event handlers
     */

    /***************************************************************
     * Render
     */

    render() {
        let row = this.props.row;

        return (<tr
            data-dbid={this.props.dbId}
            className="table__body__rows__row table__body__rows__row--cursor"
            onClick={this.props.rowClickFn(this.props.dbId)}
        >
            {this.props.colsToShow.map((key, i) => {
                row[key] = key === 'date' ? U.formatDate(row[key]) : row[key];
                return this.rowCell(i, row[key])
            })}
        </tr>)
    }

    rowCell(i, text) {
        return <td key={i} className="table__body__rows__row__cell">{stringBool2String(text)}</td>;
    }
}