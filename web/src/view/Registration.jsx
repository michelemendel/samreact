import React, {Component} from "react";
import * as C from "../common/constants.js";
import * as U from "../common/utils";
import update from "immutability-helper";
import RegistrationContent from "./RegistrationContent.jsx";
import PopFromTop from "./PopFromTop.jsx";

const page = C.PAGE_REGISTRATION,
    commentPre = "====> " + page + ':';

export default class Registration extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
        this.state = props.model;
        // console.log("Constructor:this.state:");
        // console.dir(this.state);
        // console.dir(props);
        props.updateParent(C.PAGE_REGISTRATION, this.state.registration);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentWillReceiveProps(props) {
        this.state = props.model;
        this.forceUpdate();
    }

    /***************************************************************
     * Event handlers
     */

    handleChange(key) {
        return (e) => {
            // console.log(key, e.target.type, e.target.value);

            if (e.target.type == C.INPUT_CHECKBOX) {
                this.state.registrering = update(this.state.registration, {[key]: {$set: e.target.checked ? 'true' : 'false'}});
            } else if (key == C.INVALIDATE_CACHE) {
                this.state.invalidateCache = e.target.value;
            } else {
                this.state.registration = update(this.state.registration, {[key]: {$set: e.target.value}});
            }
            this.forceUpdate();
            this.props.updateParent(C.PAGE_REGISTRATION, this.state.registration);
        };
    }

    submitForm(e) {
        e.preventDefault();
        this.props.action.registration(this.state);
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
                        handleChange={this.handleChange.bind(this)}
                    />

                    <button className="form__button" type="submit" onClick={(e) => this.submitForm(e)}>Save</button>
                </form>

                {/* Info */}
                {this.showModal(this.props)}
            </div>
        )
    }

    showModal(props) {
        const title = props.model.generalErrorMessage ? props.model.generalErrorMessage.title : '';

        let willDisplay = false;

        switch (props.model.statusCode) {
            case C.REGISTRATION_SUCCESS :
            case C.REGISTRATION_ERROR:
                willDisplay = true;
                break;
            default:
                willDisplay = false;
        }

        return <PopFromTop
            newRegistration={this.props.action.newRegistration.bind(this)}
            title={title}
            willDisplay={willDisplay}
        />;
    }
};

