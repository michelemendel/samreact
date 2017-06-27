import React, {Component} from "react";
import * as U from "../common/utils";

const commentPre = "====> Details:";

export default class Details extends Component {

    /***************************************************************
     * Life-cycle events
     */

    constructor(props) {
        super(props);
    }

    /***************************************************************
     * Event handlers
     */

    print() {
        return () => {
            window.print();
        };
    }

    /***************************************************************
     * Render
     */

    group(row, groupTitle, rowKeys, rowTitles) {
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

    render() {
        // console.log(commentPre + "render: ", U.pp(this.props));

        let opplysningerKeys = [
            'aOrB',
            'selectOne',
            'informationText'
        ];

        let opplysningerTitles = [
            'A or B',
            'Select one',
            'Text'
        ];

        const data = this.props.list,
            title = "Registration",
            body = <div>
                {
                    this.group(data,
                        'Data',
                        ['aOrB', 'selectOne', 'informationText'],
                        ['A,B', 'Selected', 'Text'])
                }
            </div>;

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
                            onClick={this.props.cancel}>
                            Lukk
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

