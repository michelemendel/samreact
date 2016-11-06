import * as U from "../common/utils";
import * as C from "../common/constants";

export default function registrationModel() {
    return {
        registration:
            {
                date: U.today(),                     //text : string
                aOrB: C.UNSELECTED_RADIO_BUTTON,     //radio : string, values=['true', 'false', '-']
                selectOne: C.UNSELECTED_FIELD,       //dropdown : string
                informationText: C.UNSELECTED_FIELD  //text : string
            }
    };
}

