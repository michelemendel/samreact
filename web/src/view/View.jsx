import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as consts from "../common/constants.js";
import * as U from "../common/utils";
import Registration from "./Registration.jsx";
import List from "./List.jsx";

class View extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }

    /***************************************************************
     * Event handlers
     */

    handleTabClick(page) {
        return (e) => {
            e.preventDefault();
            this.props.action.navigate(page);
        }
    }

    /***************************************************************
     * Render
     */

    render() {

        // console.log('View', U.pp(this.props.model));

        return (
            // Page Template
            <div className="page">

                <div className="page__header">
                    <div className="page__header__title">
                        Sam & React
                    </div>
                    <div className="nav">
                        <div className="nav--bottom">
                            {this.showTab(this.props, consts.PAGE_REGISTRATION)}
                            {this.showTab(this.props, consts.PAGE_LIST)}
                        </div>
                    </div>

                </div>

                {/* Content */}
                <div className="content">
                    {showPageContent(this.props)}
                </div>

            </div>
        );
    }

    showTab(props, page) {
        const selectedPage = this.props.model.page;

        return <button
            onClick={this.handleTabClick(page)}
            className={('nav__button__' + page) + ' no-print ' + (page === selectedPage ? 'active' : '') + ' ' + 'nav__button'}
        />
    }
}


/***************************************************************
 * Select page content by tab clicked
 */

// function showPageContent(props, updateParentFn) {
function showPageContent(props) {
    let component = 'undefined';

    switch (props.model.page) {
    case consts.PAGE_REGISTRATION:
        component = Registration;
        break;
    case consts.PAGE_LIST:
        component = List;
        break;
    }

    return React.createElement(component, {
        action: props.action,
        model: props.model
    });
}

/***************************************************************
 * The root of the view tree
 */

export function getRoot(action) {
    let stateRepresentation = document.getElementById('app');

    return (model) => {
        ReactDOM.render(
            <View
                action={action}
                model={model}
            />,
            stateRepresentation
        );
    };
}
