import React, {Component} from "react";
import * as C from '../common/constants';
import * as consts from "../common/constants.js";
import Table from "./Table.jsx";

const page = consts.PAGE_LIST,
    commentPre = "####> " + page + ':';


export default class List extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);

        this.rows = this.props.model.list;
        this.modal = {
            show: false
        };
    }


    /***************************************************************
     * Event handlers
     */


    /***************************************************************
     * Render
     */

    render() {
        // console.log(commentPre + "render: ", U.pp(this.props.model));
        return (
            <Table
                model={this.props.model}
                action={this.props.action}
                colsToFilterBy={C.DEFAULT_COLS_TO_FILTER_BY}
                colsToShow={C.DEFAULT_COLS_TO_SHOW}
            />
        )
    }
}
