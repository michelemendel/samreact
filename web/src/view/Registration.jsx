import React, {Component} from "react";
import * as action from '../sam/action';
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import RegistrationContent from "./RegistrationContent.jsx";


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
        action.registrationCreate();
    }

    /***************************************************************
     * Render
     */

    render() {
        return (
            <div className="registration">

                <form className="registration_form">
                    <RegistrationContent
                        model={this.props.model}
                    />

                    <button className="form__submit__button" type="submit" onClick={(e) => this.submitForm(e)}>Save</button>
                </form>

            </div>
        )
    }

};

