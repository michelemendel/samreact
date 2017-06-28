import React, { Component } from "react";
import * as U from "../../common/utils";
import * as C from "../../common/constants";
import LoadingGif, { loadingGifToggler } from "../LoadingGif.jsx";

/**
 * A dropdown with filter and the possibility to save a new new value (called creatable in react-select).
 */

const commentPre = "====> Selection:";
const inputErrorClass = 'form__input--error';

export default class SelectionSimple extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.loadOptions('');

        this.setState({
            value: this.props.value,
            selectOpen: false,
            mouseIsOnSelect: false
        });
    }

    componentWillUpdate(nextProps) {
        this.updateFn = this.props.updateFn(this.props.id);
        this.state.value = nextProps.value;
    }

    componentWillReceiveProps(props) {
        if (U.isDef(props.invalidateCache) && props.invalidateCache === 'true') {
            this.loadOptions('', C.INVALIDATE_CACHE_YES);

            this.props.updateFn(C.INVALIDATE_CACHE)({
                target: {
                    type: C.INVALIDATE_CACHE, value: C.INVALIDATE_CACHE_NO
                }
            });
        }
    }

    /***************************************************************
     * Event handlers for input
     */

    inputOnChangeHandler() {
        return (e) => {
            this.setState({ selectOpen: true });
            this.setState({ value: e.target.value });
            this.ol.filter(e.target.value);

            this.updateFn({ target: { value: e.target.value } });
        }
    }

    //SelectOnMouseDown handles the click event if mouse is on the select field.
    inputOnBlurHandler() {
        return (e) => {
            this.setState({ selectOpen: false });
        }
    }

    inputOnKeyDownHandler() {
        return (e) => {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    this.scrollIntoView(this.ol.next());
                    this.setState({ selectOpen: true });
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    this.scrollIntoView(this.ol.prev());
                    this.setState({ selectOpen: true });
                    break;
                case "Enter":
                    e.preventDefault();
                    this.setState({ value: this.ol.currVal() });
                    this.updateFn({ target: { value: this.ol.currVal() } });
                    this.setState({ selectOpen: false });
                    break;
                case "Tab":
                    this.setState({ selectOpen: false });
                    this.ol.reset();
                    break;
            }
        }
    }

    inputOnMouseDownHandler() {
        return () => {
            this.ol.reset();
            this.setState({ selectOpen: true });
        }
    }


    /***************************************************************
     * Event handlers for select
     */

    selectOnMouseDown() {
        return (e) => {
            const value = e.target.attributes.getNamedItem('value').value;
            this.ol.reset();
            this.setState({ value: value });
            this.setState({ selectOpen: false });
            this.updateFn({ target: { value: value } }); // So it looks like an event object.
        }
    }

    selectOnMouseEnterHandler() {
        return (e) => {
            this.setState({ mouseIsOnSelect: true });
        }
    }

    selectOnMouseLeaveHandler() {
        return () => {
            this.setState({ mouseIsOnSelect: false });
        }
    }


    /***************************************************************
     * Helper functions
     */

    // Gets the list from the given load function.
    loadOptions(searchStr) {
        this.ol = this.optionsList([]);

        this.props.loadOptionsFn.get(searchStr, (options) => {
            this.ol = this.optionsList(options);
        });
    }

    scrollIntoView(elm) {
        if (U.isDef(elm) && U.isDef(this.refs[elm])) {
            this.refs[elm].scrollIntoViewIfNeeded();
        }
    }

    // Object that handles the list of options
    optionsList(list) {
        let currList = list,
            counter = -1;

        return {
            reset: () => {
                counter = 0;
                currList = list;
                return currList;
            },
            filter: (str) => {
                counter = 0;
                return currList = list.filter((l) => l.toLowerCase().indexOf(str.toLowerCase()) !== -1);
            },
            next: () => {
                counter = counter == currList.length - 1 ? 0 : ++counter;
                return currList[counter];
            },
            prev: () => {
                counter = counter == 0 ? currList.length - 1 : --counter;
                return currList[counter];
            },
            currVal: () => currList[counter],
            currList: () => currList
        }
    }

    /***************************************************************
     * Render
     */

    render() {
        const isError = U.isDef(this.props.error),
            classError = (isError ? inputErrorClass : '');

        return (
            <span className="simple-select form__element--can-grow">
                <label className="form__label" htmlFor={this.props.id}>{this.props.title}</label>

                <div
                    className={'simple-select__input__wrapper form__element--width-full ' + (this.props.class ? this.props.class + ' ' : '') + classError}
                    id={this.props.id}>

                    <input type="text"
                        className="simple-select__input form__input form__element--width-full"
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onKeyDown={this.inputOnKeyDownHandler()}
                        onChange={this.inputOnChangeHandler()}
                        onBlur={this.inputOnBlurHandler()}
                        onMouseDown={this.inputOnMouseDownHandler()}
                    />

                    {this.displaySelect()}
                    {this.displayErrorMsg(this.props.error)}
                </div>

            </span>);
    }

    displaySelect() {
        // To style easier in the browser, swap-comment to keep drop-down open.
        // const show = true,
        const show = this.state.selectOpen && (U.isDef(this.ol) && this.ol.currList().length > 0),
            selectedVal = U.isDef(this.ol) ? this.ol.currVal() : '';

        return show ?
            <div className="simple-select__select__wrapper"
                onMouseEnter={this.selectOnMouseEnterHandler()}
                onMouseLeave={this.selectOnMouseLeaveHandler()}
            >
                <ul className="simple-select__select__ul">
                    {

                        this.ol.currList().map((val, i) => {
                            const selectedClass = selectedVal === val ? "simple-select__select__li--selected" : '';

                            return <li className={"simple-select__select__li " + selectedClass}
                                key={val}
                                value={val}
                                onMouseDown={this.selectOnMouseDown(val)}
                                ref={val}
                            >{val}</li>;
                        })
                    }
                </ul>
            </div> : ""
    }

    displayErrorMsg(error) {
        if (U.isDef(error)) {
            return <error className="form__input__error-message">
                {error}
            </error>
        }
    }
}

