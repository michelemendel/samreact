import React, {Component} from "react";
import * as action from '../sam/action';
import TableRow from "./TableRow.jsx";
import * as consts from "../common/constants.js";
import * as U from "../common/utils";
import Details from "./Details.jsx";

const commentPre = "####> table:",
    sortAscIcon = "icon-up-line",
    sortDescIcon = "icon-down-line",
    sortEmpty = 'icon-empty';

export default class Table extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }


    /***************************************************************
     * Event handlers
     */

    handleFilterChange() {
        return (e) => {
            const filterText = e.target.value;
            action.filterTable(filterText);
        };
    }

    handleSortChange(sortColumn) {
        return (e) => {
            e.preventDefault();
            action.sortTable(sortColumn, this.getSortDir(sortColumn));
        };
    }

    getSortDir(sortColumn) {
        let flipSortDir = (dir) => -1 * dir;
        return !U.isDef(this.props.model.list.sortDir)
            ? consts.SORT_DIR_ASC
            : this.props.model.list.sortColumn === sortColumn
            ? flipSortDir(this.props.model.list.sortDir)
            : consts.SORT_DIR_ASC;
    }


    headCell(i, key, text, model) {
        // console.log(commentPre + ":", key, text);

        let sortIcon = model.list.sortColumn !== key ?
            sortEmpty :
            model.list.sortDir == consts.SORT_DIR_ASC ?
                sortAscIcon :
                sortDescIcon;

        return <th className="table__body__header__row__cell" style={this.colStyle(key)} key={i}
                   onClick={this.handleSortChange(key)}>
            <a href="#">{text}<span className={sortIcon}/></a>
        </th>
    }

    colStyle(key) {
        const ws = {
            date: {width: '35%'},
            aOrB: {width: '20%'},
            selectOne: {width: '20%'},
            informationText: {width: '25%'}
        };

        return ws[key];
    }

    showModal() {
        if (!this.props.model.list.showDetails) { return; }

        return <Details
            cancel={this.cancel()}
            list={this.modal.list}
        />;
    }

    /***************************************************************
     * Render
     */

    render() {
        let model = this.props.model,
            rows = model.list.rows;

        /**
         * Select which columns to display here.
         */
        const colHeads = {
                "date": "Date",
                "aOrB": "A or B",
                "selectOne": "Selected",
                "informationText": "Text"
            },
            colsToShow = this.props.colsToShow;

        function doNothing(e) {
            e.preventDefault();
        }

        return (
            <div className="table content--max-width">
                <form className="no-print"
                      onSubmit={doNothing}>

                    <div className="table__filter">
                        <span>
                            <input type="search"
                                   placeholder="Filter"
                                   className="table__filter__input"
                                   value={this.props.model.list.filterText}
                                   onChange={this.handleFilterChange()}/>
                        </span>
                    </div>

                    <table className="table__body">
                        <thead className="table__body__header">
                        <tr className="table__body__header__row">
                            {colsToShow.map((key, i) => {
                                return this.headCell(i, key, colHeads[key], model)
                            })}
                        </tr>
                        </thead>

                        <tbody className="table__body__rows">
                        { rows.map((row, i) => <TableRow
                            key={i}
                            dbId={row.id}
                            row={row}
                            colsToShow={colsToShow}
                            rowClickFn={this.props.rowClickFn(row.id)}
                        />)}
                        </tbody>
                    </table>

                </form>

                {this.showModal()}

            </div>
        )
    }
}
