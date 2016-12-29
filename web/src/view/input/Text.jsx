import React, {Component} from "react";
import * as U from "../../common/utils";

const commentPre = "====> Text:",
    inputErrorClass = 'form__input--error',
    inputClass = 'form__input';

export default class Text extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const isError = U.isDef(this.props.error);

        return (
            <span className="form__element--can-grow" tabIndex={this.props.tabIdx}>
                <label className="form__input__label" htmlFor={this.props.id}>{this.props.title}</label>

                <input type="text"
                       className={"form__input__field " + (isError ? inputErrorClass : '') + ' ' + inputClass}
                       id={this.props.id}
                       placeholder={this.props.placeholder}
                       value={this.props.val ? this.props.val : ''}
                       onChange={this.props.action.formUpdate(this.props.id)}
                />

                {this.displayErrorMsg(this.props.error)}
            </span>
        )
    }

    displayErrorMsg(error) {
        if (U.isDef(error)) {
            return <error className="form__input__error-message">
                {error}
            </error>
        }
    }
}
