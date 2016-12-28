import * as U from "../common/utils";
import * as C from "../common/constants";

export default function model() {
    return {
        registration: {
            date: U.today(),                     //text : string
            aOrB: C.UNSELECTED_RADIO_BUTTON,     //radio : string, values=['true', 'false', '-']
            selectOne: C.UNSELECTED_FIELD,       //dropdown : string
            informationText: C.UNSELECTED_FIELD,  //text : string
            specificErrorMessages: {}
        },

        statusCode: C.REGISTRATION_INIT,
        generalMessage: "",

        list: {
            rowsAll: [],
            rows: [],
            sortColumn: "date", // Initial sorting
            sortDir: C.SORT_DIR_DESC,
            filterText: "",
            showDetails: false,
            showDetailsEditable: false,
            selectedRow: ""
        }
    };
}

