import React, {Component} from "react";
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

        this.rows = this.props.model.data;
        this.modal = {
            show: false
        };
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(newProps) {
        this.forceUpdate(); // To update filter and sort
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
                colsToFilterBy={["date", "aOrB", "selectOne", "informationText"]}
                colsToShow={["date", "aOrB", "selectOne", "informationText"]}
            />
        )
    }
}
