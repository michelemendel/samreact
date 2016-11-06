import React, {Component} from "react";

const commentPre = "====> InfoModal:";

export default class InfoModal extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }

    /***************************************************************
     * Render
     */

    render() {
        const willDisplay = this.props.willDisplay;

        return (
            <div className={'pop-from-top ' + (willDisplay ? 'pop-from-top--slide-down' : '')}>
                <h5>
                    <span className="icon-alert-round"></span>
                    {this.props.title}
                </h5>
            </div>
        )
    }
}

