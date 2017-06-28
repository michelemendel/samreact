import * as U from "../common/utils";
import * as C from "../common/constants";

export default function model(mode = C.MODEL_PREFILLED_NONE) {
    switch (mode) {
    case C.MODEL_REGISTRATION_RESET :
        return registrationInit();
    default:
        return modelBasic();
    }
}

function modelBasic() {
    return {
        registration: registrationInit(),

        statusCode: C.REGISTRATION_INIT,
        generalMessage: "",
        invalidateCache:C.INVALIDATE_CACHE_NO,

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

function registrationInit() {
    return {
        id: "",
        date: U.today(),                     //text : string
        aOrB: C.UNSELECTED_RADIO_BUTTON,     //radio : string, values=['true', 'false', '-']
        selectOne: C.UNSELECTED_FIELD,       //dropdown : string
        informationText: C.UNSELECTED_FIELD,  //text : string
        specificErrorMessages: {}
    };
}

