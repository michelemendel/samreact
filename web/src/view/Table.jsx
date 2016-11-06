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
        this.state = props.model;
        this.state.allRows = props.model.data;

        // Details modal
        this.rows = this.props.model.data;
        this.modal = {
            show: false
        };

    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(newProps) {
        this.setState({data: newProps.model.data});
        this.forceUpdate();
    }

    /***************************************************************
     * Event handlers
     */

    handleFilterChange() {
        return function (e) {
            this.state.filterText = e.target.value;
            // console.log(commentPre + ":", U.pp(this.state.page));
            this.props.action.filterTable({
                data: this.state.data,
                allRows: this.state.allRows,
                filterText: this.state.filterText,
                colsToFilterBy: this.props.colsToFilterBy,
                page: this.state.page
            });

        }.bind(this);
    }

    handleSortChange(sortColumn) {
        return function (e) {
            e.preventDefault();

            this.state.sortDir = this.getSortDir(sortColumn);
            this.state.sortColumn = sortColumn;
            this.props.action.sortTable({
                data: this.state.data,
                sortDir: this.state.sortDir,
                sortColumn: this.state.sortColumn,
                page: this.state.page
            });
        }.bind(this);
    }

    getSortDir(sortColumn) {
        let flipSortDir = (dir) => -1 * dir;
        return !U.isDef(this.state.sortDir) ? consts.SORT_DIR_ASC : this.state.sortColumn === sortColumn ? flipSortDir(this.state.sortDir) : consts.SORT_DIR_ASC;
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
                data: selected[0]
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
            rows = model.data,
            sortColumn = model.sortColumn,
            sortDir = model.sortDir;

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
            data={this.modal.data}
        />;
    }
}
