import React, {Component} from "react";
import * as U from "../common/utils";
import * as C from "../common/constants";
import DatePicker from "react-datepicker";
import Radio from "./input/Radio.jsx";
import Text from "./input/Text.jsx";
import Selection from "./input/Selection.jsx"; //https://hacker0x01.github.io/react-datepicker/

const commentPre = "====> RegistrationContent:",
    inputErrorClass = 'form__input--error';

export default class RegistrationContent extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }


    /***************************************************************
     * Event handlers
     */


    /***************************************************************
     * Render
     */

    handleDate(updateForm) {
        return (selectedDate) => {
            updateForm({target: {type: 'date', value: U.date2String(selectedDate)}});
        }
    }

    render() {
        // console.log(U.pp(this.props.model));

        let m = this.props.model,
            registration = m.registration,
            specificError = U.isDef(registration.specificErrorMessages) ? registration.specificErrorMessages : '';

        // console.log(U.pp(m));

        return (
            <div>

                <div className="form__row">
                        <span className="form__input form__row__input--width-third">
                            <label className="form__input__label" htmlFor="dato">Dato</label>
                            <DatePicker
                                className="form__input__field"
                                selected={U.parseDate(registration.date)}
                                onChange={this.handleDate(this.props.action.registrationFormUpdate('date'))}
                                dateFormat="YYYY-MM-DD" //YYYY-MM-DDThh:mm:ss
                                todayButton="idag"
                                maxDate={U.maxDateIsToday()}
                                id="dato"
                            />
                        </span>
                </div>

                <div className="form__row">
                    <Radio name="aOrB"
                           title="Is it true?"
                           values={{'true': 'Yes', 'false': 'No'}}
                           checkedVal={registration.aOrB || 'false'}
                           error={specificError.aOrB}
                           action={this.props.action}
                    />
                </div>

                <div className="form__row">
                    <Selection id="selectOne"
                               title="Choose"
                               className="form__row__input--width-full"
                               value={registration.selectOne}
                               error={specificError.selectOne}
                               action={this.props.action}
                               behaviour={[false, false, false, true]} // See explanation in Selection.js
                               loadFunction={m.selectOne}
                               useSpinner={true}/>
                </div>

                < div className="form__row">
                    <Text id="informationText"
                          title="Enter text"
                          placeholder="Som text"
                          val={registration.informationText}
                          error={specificError.informationText}
                          action={this.props.action}
                          className="form__row__input--width-full"/>
                </div>

            </div>
        )
    }
}

