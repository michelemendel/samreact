import React, {Component} from "react";
import * as action from '../sam/action';
import * as U from "../common/utils";
import DatePicker from "react-datepicker";
import Radio from "./input/Radio.jsx";
import Text from "./input/Text.jsx";
import SelectionSimple from "./input/SelectionSimple.jsx";

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

    handleDate() {
        const updateForm = action.formUpdate('date')
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
                        <span>
                            <label className="form__input__label" htmlFor="dato">Dato</label>
                            <DatePicker
                                className="form__input__field"
                                selected={U.parseDate(registration.date)}
                                onChange={this.handleDate()}
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
                           action={action}
                    />
                </div>

                <div className="form__row">
                    <SelectionSimple
                        id="selectOne"
                        title="Choose"
                        value={registration.selectOne}
                        loadOptionsFn={m.selectOne}
                        placeholder="You may choose one"
                        error={specificError.selectOne}
                        invalidateCache={m.invalidateCache}
                        updateFn={action.formUpdate}/>
                </div>

                < div className="form__row">
                    <Text id="informationText"
                          title="Enter text"
                          placeholder="Som text"
                          val={registration.informationText}
                          error={specificError.informationText}
                          action={action}
                          className="form__element--width-full"/>
                </div>

            </div>
        )
    }
}

