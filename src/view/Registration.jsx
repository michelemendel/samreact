import React from "react";
import * as action from '../sam/action';
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import RegistrationContent from "./RegistrationContent.jsx";


export default (props) => {

    function submitForm(e) {
        e.preventDefault();
        action.registrationCreate();
    }

    return (
        <div className="registration">

            <form className="registration_form">
                <RegistrationContent
                    model={props.model}
                />

                <button className="button" type="submit" onClick={(e) => submitForm(e)}>Save</button>
                <button className="button" type="button" onClick={action.registrationReset}>Reset</button>
            </form>

        </div>
    )
};

