import React, {Component} from "react";
import loadingGif from "../images/loading.gif";

const commentPre = "####> loadingGif:";

export function loadingGifToggler() {
    let isLoadingVal = true;
    return {
        toggle: () => {
            isLoadingVal = !isLoadingVal;
        },
        on: () => {isLoadingVal = true},
        off: () => {isLoadingVal = false},
        isLoading: () => isLoadingVal
    }
}

export default class LoadingGif extends Component {

    /****************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }

    /****************************************************************
     * Render
     */

    render() {
        let show = this.props.display;

        return (
            <div className="loading-gif">
                {show ? <img className="loading-gif__image" src={loadingGif} alt="Laster data..."/> : '' }
            </div>)

    }
}


