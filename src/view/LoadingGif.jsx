import React from "react";
import loadingGif from "../images/loading.gif";

export function loadingGifToggler() {
    let isLoadingVal = true;
    return {
        toggle: () => {
            isLoadingVal = !isLoadingVal;
        },
        on: () => { isLoadingVal = true },
        off: () => { isLoadingVal = false },
        isLoading: () => isLoadingVal
    }
}

export default (props) => {
    const show = props.display;

    return (
        <div className="loading-gif">
            {show ? <img className="loading-gif__image" src={loadingGif} alt="Laster data..." /> : ''}
        </div>)
}


