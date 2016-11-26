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


        if(willDisplay){
            console.log('THE ANIMATION');

            // https://css-tricks.com/restart-css-animation/
            let element = document.getElementById("pop-from-top");
            element.classList.remove("pop-from-top--slide-down");
            element.offsetWidth;
            element.classList.add("pop-from-top--slide-down");
        }

        return (
            <div id="pop-from-top" className={'pop-from-top ' + (willDisplay ? 'pop-from-top--slide-down' : '')}>
                <h5>
                    <span className="icon-alert-round"></span>
                    {this.props.title}
                </h5>
            </div>
        )

    }
}

