import React, {Component} from "react";
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

        // Details modal
        this.rows = this.props.model.list;
        this.modal = {
            show: false
        };
    }


    /***************************************************************
     * Event handlers
     */

    handleFilterChange() {
        return function (e) {
            const filterText = e.target.value;
            this.props.action.filterTable(filterText);
        }.bind(this);
    }

    handleSortChange(sortColumn) {
        return function (e) {
            e.preventDefault();
            this.props.action.sortTable(sortColumn, this.getSortDir(sortColumn));
        }.bind(this);
    }

    getSortDir(sortColumn) {
        let flipSortDir = (dir) => -1 * dir;
        return !U.isDef(this.props.model.sortDir) ? consts.SORT_DIR_ASC : this.props.model.sortColumn === sortColumn ? flipSortDir(this.props.model.sortDir) : consts.SORT_DIR_ASC;
    }

    // Details modal
    displayDetails(dbId) {
        return (e) => {
            let selected = this.rows.filter((row) => {
                return row.id === dbId;
            });
            // console.log('DisplayRow:', dbId, U.pp(selected));
            this.modal = {
                show: true,
                list: selected[0]
            };
            this.forceUpdate();
        }
    }

    // Details modal
    cancel() {
        return () => {
            this.modal = {
                show: false,
            };
            this.forceUpdate();
        };
    }


    /***************************************************************
     * Render
     */

    render() {
        let model = this.props.model,
            rows = model.list;

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
                                   value={this.props.model.filterText}
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
                            rowClickFn={this.displayDetails.bind(this)}
                        />)}
                        </tbody>
                    </table>

                </form>

                {this.showModal()}

            </div>
        )
    }

    headCell(i, key, text, model) {
        // console.log(commentPre + ":", key, text);

        let sortIcon = model.sortColumn !== key ?
            sortEmpty :
            model.sortDir == consts.SORT_DIR_ASC ?
                sortAscIcon :
                sortDescIcon;

        return <th className="table__body__header__row__cell" style={this.colStyle(key)} key={i} onClick={this.handleSortChange(key)}>
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
        if (!this.modal.show) { return; }

        return <Details
            cancel={this.cancel()}
            list={this.modal.list}
        />;
    }
}
