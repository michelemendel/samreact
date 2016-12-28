import React, {Component} from "react";
import * as action from '../sam/action';
import * as C from '../common/constants';
import * as consts from "../common/constants.js";
import Table from "./Table.jsx";

const page = consts.PAGE_LIST,
    commentPre = "####> " + page + ':';


export default class List extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log(commentPre + "render: ", U.pp(this.props.model));
        return (
            <Table
                model={this.props.model}
                colsToFilterBy={C.DEFAULT_COLS_TO_FILTER_BY}
                colsToShow={C.DEFAULT_COLS_TO_SHOW}
                rowClickFn={action.listShowDetails(C.LIST_DETAILS_SHOW)}
            />
        )
    }
}
