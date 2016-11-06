import React, {Component} from "react";
import * as U from "../common/utils";
import * as C from "../common/constants";
import DatePicker from "react-datepicker";
import Radio from "./input/Radio.jsx";
import Text from "./input/Text.jsx";
import Selection from "./input/Selection.jsx"; //https://hacker0x01.github.io/react-datepicker/

const commentPre = "====> RegistrationContent:",
    inputErrorClass = 'registration__input--error';

export default class RegistrationContent extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);

        this.state = props.model;
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillReceiveProps(props) {
        this.state = props.model;
        // this.forceUpdate();
    }

    /***************************************************************
     * Event handlers
     */


    /***************************************************************
     * Render
     */

    handleDate(hc) {
        return (selectedDate) => {
            hc({target: {type: 'date', value: U.date2String(selectedDate)}});
        }
    }

    render() {
        // console.log(U.pp(this.props.model));

        let hc = this.props.handleChange.bind(this),
            m = this.props.model,
            registration = m.registration,
            specificError = U.isDef(registration.specificErrorMessages) ? registration.specificErrorMessages : '';

        // console.log(U.pp(m));
        // console.log(m.invalidateCache);

        return (
            <div className="registration">

                <fieldset className="registration__fieldset">
                    <legend className="registration__fieldset__label">registration</legend>

                    <div className="registration__row">
                        <span className="registration__input registration__row__input--width-third">
                            <label className="registration__input__label" htmlFor="dato">Dato</label>
                            <DatePicker
                                className="registration__input__field"
                                selected={U.parseDate(registration.date)}
                                onChange={this.handleDate(hc('date'))}
                                dateFormat="YYYY-MM-DD" //YYYY-MM-DDThh:mm:ss
                                todayButton="idag"
                                maxDate={U.maxDateIsToday()}
                                id="dato"
                            />
                        </span>
                    </div>

                    <div className="registration__row">
                        <Radio name="aOrB"
                               title="A or B?"
                               values={{'true': 'Yes', 'false': 'No'}}
                               checkedVal={registration.aOrB || 'false'}
                               error={specificError.aOrB}
                               handleChange={hc}/>
                    </div>

                    <div className="registration__row">
                        <Selection id="selectOne"
                                   title="Choose"
                                   value={registration.selectOne}
                                   error={specificError.selectOne}
                                   handleChange={hc}
                                   behaviour={[false, false, false, true]} // See explanation in Selection.js
                                   loadFunction={m.selectOne}
                                   useSpinner={true}/>
                    </div>

                    < div className="registration__row">
                        <Text id="informationText"
                              title="Enter text"
                              placeholder="Som text"
                              val={registration.informationText}
                              error={specificError.informationText}
                              handleChange={hc}
                              className="registration__row__input--can-grow"/>
                    </div>

                </fieldset>
            </div>
        )
    }
}

