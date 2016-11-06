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
        this.state = {};
    }

    componentWillReceiveProps(props) {
        this.state[props.model.page] = props.model[props.model.page];
    }

    /***************************************************************
     * Event handlers
     */

    // We need to keep the state of children when moving between tabs.
    updateParent() {
        return (key, value) => {
            this.state[key] = value;
        }
    }

    handleTabClick(page) {
        return (e) => {
            e.preventDefault();
            this.props.action.tabsNavigate(page, this.state);
        }
    }

    /***************************************************************
     * Render
     */

    render() {
        return (
            // Page Template
            <div className="page">

                <div className="page__header">
                    <div className="page__header__title">
                        UCP
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    {this.showTab(this.props, consts.PAGE_REGISTRATION)}
                    {this.showTab(this.props, consts.PAGE_LIST)}

                    {/* Tabs body */}
                    <div className="tabs__body">
                        {showPageContent(this.props, this.updateParent.bind(this))}
                    </div>
                </div>

            </div>
        );
    }

    showTab(props, page) {
        const selectedPage = this.props.model.page;

        return <button
            onClick={this.handleTabClick(page)}
            className={('tabs__button__' + page) + ' no-print ' + (page === selectedPage ? 'active' : '') + ' ' + 'tabs__button'}
        />
    }
}


/***************************************************************
 * Select page content by tab clicked
 */

function showPageContent(props, updateParentFn) {
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
        model: props.model,
        updateParent: updateParentFn()
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
