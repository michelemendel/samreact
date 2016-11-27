import React, {Component} from "react";
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import RegistrationContent from "./RegistrationContent.jsx";
import PopFromTop from "./PopFromTop.jsx";

const page = C.PAGE_REGISTRATION,
    commentPre = "====> " + page + ':';

export default class Registration extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }


    /***************************************************************
     * Event handlers
     */

    submitForm(e) {
        e.preventDefault();
        this.props.action.registrationSubmit();
    }

    /***************************************************************
     * Render
     */

    render() {
        return (
            <div className="registration">

                <form className="registration_form">
                    <RegistrationContent
                        action={this.props.action}
                        model={this.props.model}
                    />

                    <button className="form__submit__button" type="submit" onClick={(e) => this.submitForm(e)}>Save</button>
                </form>

                {/* Info */}
                {this.showModal(this.props)}
            </div>
        )
    }

    showModal(props) {
        let willDisplay = false;

        switch (props.model.statusCode) {
            case C.REGISTRATION_SUCCESS :
            case C.REGISTRATION_ERROR:
                willDisplay = true;
                break;
            default:
                willDisplay = false;
        }

        return <PopFromTop
            title={props.model.generalMessage}
            willDisplay={willDisplay}
        />;
    }
};

