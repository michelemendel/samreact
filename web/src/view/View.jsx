import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as action from '../sam/action';
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import Registration from "./Registration.jsx";
import List from "./List.jsx";
import PopFromTop from "./PopFromTop.jsx";

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

    navigate(page) {
        return (e) => {
            e.preventDefault();

            if (page === C.PAGE_REGISTRATION) {
                action.navigatePageRegistration();
            } else if (page === C.PAGE_LIST) {
                action.navigatePageRegistrationList()
            }
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
                        <span className="icon icon-mug"></span>
                        SAM & React
                    </div>
                    <div className="nav">
                        <div className="nav--bottom">
                            {this.showNavButton(this.props, C.PAGE_REGISTRATION)}
                            {this.showNavButton(this.props, C.PAGE_LIST)}
                        </div>
                    </div>

                </div>

                {/* Content */}
                <div className="content">
                    {showPageContent(this.props)}
                </div>

                {/* Info */}
                {this.showInfoBox(this.props)}
            </div>
        );
    }

    showNavButton(props, page) {
        const selectedPage = this.props.model.page;

        return <button
            onClick={this.navigate(page)}
            className={('nav__button__' + page) + ' no-print ' + (page === selectedPage ? 'active' : '') + ' ' + 'nav__button'}
        />
    }

    showInfoBox(props) {
        return <PopFromTop
            title={props.model.generalMessage}
            statusCode={this.props.model.statusCode}
        />;
    }

}


/***************************************************************
 * Select page content by tab clicked
 */

// function showPageContent(props, updateParentFn) {
function showPageContent(props) {
    let component = 'undefined';

    switch (props.model.page) {
    case C.PAGE_REGISTRATION:
        component = Registration;
        break;
    case C.PAGE_LIST:
        component = List;
        break;
    }

    return React.createElement(component, {
        model: props.model
    });
}

/***************************************************************
 * The root of the view tree
 */

export function getRoot() {
    let stateRepresentation = document.getElementById('app');

    return (model) => {
        ReactDOM.render(
            <View
                model={model}
            />,
            stateRepresentation
        );
    };
}
