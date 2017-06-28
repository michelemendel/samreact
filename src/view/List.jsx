import React from "react";
import * as action from '../sam/action';
import * as C from '../common/constants';
import Table from "./Table.jsx";

export default (props) => {
    return (
        <Table
            model={props.model}
            colsToFilterBy={C.DEFAULT_COLS_TO_FILTER_BY}
            colsToShow={C.DEFAULT_COLS_TO_SHOW}
            rowClickFn={action.listShowDetails(C.LIST_DETAILS_SHOW)}
        />
    )
}
