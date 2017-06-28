import React from "react";
import * as action from '../sam/action';
import TableRow from "./TableRow.jsx";
import * as consts from "../common/constants.js";
import * as U from "../common/utils";
import Details from "./Details.jsx";

const sortAscIcon = "icon-up-line";
const sortDescIcon = "icon-down-line";
const sortEmpty = 'icon-empty';

export default (props) => {

    /***************************************************************
     * Event handlers
     */

    function handleFilterChange() {
        return (e) => {
            const filterText = e.target.value;
            action.filterTable(filterText);
        };
    }

    function handleSortChange(sortColumn) {
        return (e) => {
            e.preventDefault();
            action.sortTable(sortColumn, getSortDir(sortColumn));
        };
    }

    function getSortDir(sortColumn) {
        let flipSortDir = (dir) => -1 * dir;
        return !U.isDef(props.model.list.sortDir)
            ? consts.SORT_DIR_ASC
            : props.model.list.sortColumn === sortColumn
                ? flipSortDir(props.model.list.sortDir)
                : consts.SORT_DIR_ASC;
    }


    function headCell(i, key, text, model) {
        let sortIcon = model.list.sortColumn !== key ?
            sortEmpty :
            model.list.sortDir == consts.SORT_DIR_ASC ?
                sortAscIcon :
                sortDescIcon;

        return <th className="table__body__header__row__cell" style={colStyle(key)} key={i}
            onClick={handleSortChange(key)}>
            <a href="#">{text}<span className={sortIcon} /></a>
        </th>
    }

    function colStyle(key) {
        const ws = {
            date: { width: '35%' },
            aOrB: { width: '20%' },
            selectOne: { width: '20%' },
            informationText: { width: '25%' }
        };

        return ws[key];
    }

    function showModal() {
        if (!props.model.list.showDetails) { return; }

        return <Details
            close={close}
            row={props.model.list.selectedRow}
        />;
    }

    function close() {
        action.hideDetails();
    }

    /***************************************************************
     * Helper functions
     */

    let model = props.model;
    let rows = model.list.rows;

    /**
     * Select which columns to display here.
     */
    const colHeads = {
        "date": "Date",
        "aOrB": "A or B",
        "selectOne": "Selected",
        "informationText": "Text"
    };

    const colsToShow = props.colsToShow;

    function doNothing(e) {
        e.preventDefault();
    }

    /***************************************************************
     * Render
     */

    return (
        <div className="table content--max-width">
            <form className="no-print"
                onSubmit={doNothing}>

                <div className="table__filter">
                    <span>
                        <input type="search"
                            placeholder="Filter"
                            className="table__filter__input"
                            value={props.model.list.filterText}
                            onChange={handleFilterChange()} />
                    </span>
                </div>

                <table className="table__body">
                    <thead className="table__body__header">
                        <tr className="table__body__header__row">
                            {colsToShow.map((key, i) => {
                                return headCell(i, key, colHeads[key], model)
                            })}
                        </tr>
                    </thead>

                    <tbody className="table__body__rows">
                        {rows.map((row, i) => <TableRow
                            key={i}
                            dbId={row.id}
                            row={row}
                            colsToShow={colsToShow}
                            rowClickFn={props.rowClickFn(row.id)}
                        />)}
                    </tbody>
                </table>

            </form>

            {showModal()}

        </div>
    )
}

