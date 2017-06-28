import React from "react";
import * as U from "../../common/utils";

const inputErrorClass = 'form__input--error';
const inputClass = 'form__input';

export default (props) => {
    const isError = U.isDef(props.error);

    return (
        <span className="form__element--can-grow" tabIndex={props.tabIdx}>
            <label className="form__input__label" htmlFor={props.id}>{props.title}</label>

            <input type="text"
                className={"form__input__field " + (isError ? inputErrorClass : '') + ' ' + inputClass}
                id={props.id}
                placeholder={props.placeholder}
                value={props.val ? props.val : ''}
                onChange={props.action.formUpdate(props.id)}
            />

            {displayErrorMsg(props.error)}
        </span>
    )

    function displayErrorMsg(error) {
        if (U.isDef(error)) {
            return <error className="form__input__error-message">
                {error}
            </error>
        }
    }
}
