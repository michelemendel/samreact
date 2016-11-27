import React, {Component} from "react";
import * as U from "../../common/utils";
import * as C from "../../common/constants";
import Select, {Option} from "rc-select";

const commentPre = "====> Selection:",
    inputErrorClass = 'registration__input--error',
    inputClass = 'registration__input';

export default class Selection extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
        this.formUpdate = this.props.action.registrationFormUpdate(props.id);
        this.loadFn = this.props.loadFunction;
    }

    componentWillMount() {
        this.setState({selectionList: []});
    }

    componentDidMount() {
        this.runLoadFn('');
    }

    componentWillReceiveProps(props) {
        this.runLoadFn('');
    }


    /***************************************************************
     * Event handlers
     */

    onChange() {
        return (value) => {
            this.formUpdate({target: {value: value}}); // So it looks like an event object.
        }
    }

    onSearch() {
        return (value) => {
            this.runLoadFn(value, C.INVALIDATE_CACHE_NO);
        }
    }

    /***************************************************************
     * Helper functions
     */

    // runLoadFn(searchStr, invalidateCache = true) {
    runLoadFn(searchStr) {
        if (this.loadFn) {
            this.loadFn.get(searchStr, (selectionList) => {
                this.setState({selectionList: selectionList}, () => {
                    // console.log('Selection:runLoadFn:ForceUpdate');
                    this.forceUpdate();
                });
            });
        }
    }

    /**
     * We need this to be case agnostic
     * Used by the filterOption attribute
     */
    filterOptionHandler() {
        return (text, option) => {
            return option.key.toLowerCase().indexOf(text.toLowerCase()) != -1;
        }
    }

    /**
     * RC-Select
     * ---------
     * http://react-component.github.io/select/
     *
     * Allowed combinations
     * [multiple tags combo-box showSearch]
     * [t f f f] : Can select multiple. Can not add new items. Can filter.
     * [f t f f] : Can select multiple. Can add new items. Can filter.
     * [f f f f] : Can not select multiple. Can not add new items. Can not filter.
     * [f f f t] : Can not select multiple. Can not add new items. Can filter.
     * [f f t f] : Can not select multiple. Can add new items. Can filter.
     *
     * Note:
     * Combo-box can not be combined with multiple.
     * ShowSearch can not be combined with combo-box.
     */


    /***************************************************************
     * Render
     */

    render() {
        const behaviour = this.props.behaviour,
            defaultActiveFirstOption = U.isDef(this.props.defaultActiveFirstOption) && this.props.defaultActiveFirstOption == false ? false : true,
            isError = U.isDef(this.props.error),
            classError = (isError ? inputErrorClass : '');

        // console.log(this.props.id, U.isDef(this.props.filterOption) || this.props.filterOption == true ? this.filterOption : false);

        return (
            <span className="form__row__input--can-grow">
                <label className="form__label" htmlFor={this.props.id}>{this.props.title}</label>

                <div className={'selection ' + this.props.className + ' ' + classError} id={this.props.id}>

                    <Select
                        value={this.props.value}
                        defaultActiveFirstOption={defaultActiveFirstOption}
                        allowClear={false}
                        placeholder=""
                        showArrow={true}  // Whether show arrow in single mode
                        notFoundContent={behaviour[2] ? "" : "Ingen treff"}
                        dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}

                        multiple={behaviour[0]}
                        tags={behaviour[1]}
                        combobox={behaviour[2]}
                        showSearch={behaviour[3]}

                        onSearch={this.onSearch()}
                        onChange={this.onChange()}

                        //Meaning of "false": Don't use regular filter from input, instead get data from function in onSearch
                        filterOption={U.isDef(this.props.filterOption) && this.props.filterOption ? this.filterOptionHandler() : false}

                        dropdownAlign={{offset: [0, -1]}}
                    >
                        {
                            this.state.selectionList.map((d, i) => {
                                return <Option key={d}>{d}</Option>;
                            })
                        }
                    </Select>

                    {this.displayErrorMsg(this.props.error)}
                </div>

            </span>);
    }

    displayErrorMsg(error) {
        if (U.isDef(error)) {
            return <error className="form__input__error-message">
                {error}
            </error>
        }
    }
}

