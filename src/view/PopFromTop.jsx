import React from "react";
import * as C from "../common/constants.js";

export default (props) => {
    let willDisplay = false;

    switch (props.statusCode) {
        case C.REGISTRATION_SUCCESS:
        case C.REGISTRATION_ERROR:
            willDisplay = true;
            break;
        default:
            willDisplay = false;
    }

    if (willDisplay) {
        // https://css-tricks.com/restart-css-animation/
        let element = document.getElementById("pop-from-top");
        element.classList.remove("pop-from-top--slide-down");
        element.offsetWidth;
        element.classList.add("pop-from-top--slide-down");
    }

    return (
        <div id="pop-from-top" className={'pop-from-top ' + (willDisplay ? 'pop-from-top--slide-down' : '')}>
            <h5>
                <span className="icon-alert-round"></span>
                &#9432; {props.title}
            </h5>
        </div>
    )

}

