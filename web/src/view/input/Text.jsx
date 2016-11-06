import React, {Component} from "react";
import * as U from "../../common/utils";

const commentPre = "====> Text:",
    inputErrorClass = 'registration__input--error',
    inputClass = 'registration__input';

export default class Text extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const isError = U.isDef(this.props.error);

        return (
            <div className={this.props.className} tabIndex={this.props.tabIdx}>
                <label className="registration__input__label" htmlFor={this.props.id}>{this.props.title}</label>

                <input type="text"
                       className={"registration__input__field " + (isError ? inputErrorClass : '') + ' ' + inputClass}
                       id={this.props.id}
                       placeholder={this.props.placeholder}
                       value={this.props.val ? this.props.val : ''}
                       onChange={this.props.handleChange(this.props.id)}
                />

                {this.displayErrorMsg(this.props.error)}
            </div>
        )
    }

    displayErrorMsg(error) {
        if (U.isDef(error)) {
            return <error className="registration__input__error-message">
                {error}
            </error>
        }
    }
}
