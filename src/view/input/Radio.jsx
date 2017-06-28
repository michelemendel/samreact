import React, {Component} from "react";
import * as C from "../../common/constants.js";
import * as U from "../../common/utils";

export default class Radio extends Component {

    render() {
        const values = this.props.values,
            checkedVal = this.props.checkedVal;

        return (
            <span>
                <label className="form__label">{this.props.title}</label>

                <div className="form__radioab" id={this.props.name}>
                    {Object.keys(values).map((key, i) =>
                        [
                            <input type="radio"
                                   checked={checkedVal === key ? C.RADIO_CHECKED : ''}
                                   name={this.props.name}
                                   id={this.props.name + '_' + key}
                                   value={key}
                                   //onChange={this.hc(this.props.name)}
                                   onChange={this.props.action.formUpdate(this.props.name)}
                                   key={i}
                                   className="form__radioab__input"/>,
                            <label className="form__label" htmlFor={this.props.name + '_' + key}>{values[key]}</label>
                        ]
                    )}
                </div>

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
