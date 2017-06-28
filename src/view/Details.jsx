import React from "react";
import * as U from "../common/utils";

export default (props) => {

    function print() {
        return () => {
            window.print();
        };
    }

    const opplysningerKeys = [
        'aOrB',
        'selectOne',
        'informationText'
    ];

    const opplysningerTitles = [
        'A or B',
        'Select one',
        'Text'
    ];

    const data = this.props.list;
    const title = "Registration";
    const body = <div>
        {
            group(data,
                'Data',
                ['aOrB', 'selectOne', 'informationText'],
                ['A,B', 'Selected', 'Text'])
        }
    </div>;

    function group(row, groupTitle, rowKeys, rowTitles) {
        return <div>
            <div className="details__group-title">{groupTitle}</div>
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
                        {body}
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
                        onClick={props.cancel}>
                        Lukk
                        </button>
                </div>
            </div>
        </div>
    )
}

