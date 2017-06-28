import React from "react";
import * as U from "../common/utils";

export default (props) => {
    const title = "Registration";

    function print() {
        return () => {
            window.print();
        };
    }

    function body(row) {
        return <div>
            {
                group(row,
                    ['aOrB', 'selectOne', 'informationText'],
                    ['A,B', 'Selected', 'Text'])
            }
        </div>;
    }

    function group(row, rowKeys, rowTitles) {
        return <div>
            <ul className="details__ul">{
                rowKeys.map((rowKey, i) =>
                    <li className="details__li" key={i}>
                        <span className="details__row-title">{rowTitles[i]}</span>
                        <span className="details__row-value">{' : ' + U.startCase(U.translate(row[rowKey]))}</span>
                    </li>)
            }
            </ul>
        </div>
    }

    return (
        <div className="modal">
            <div className="details">
                <header className="details_header">
                    {title}
                </header>

                <div className="details__content">
                    <div className="details__content__body">
                        {body(props.row)}
                    </div>
                </div>

                <div className="details__buttons no-print">
                    <button
                        className="details__buttons__button"
                        onClick={window.print}>
                        Skriv ut
                        </button>
                    <button
                        className="details__buttons__button"
                        onClick={props.close}>
                        Lukk
                        </button>
                </div>
            </div>
        </div>
    )
}

