import URLS from "../../common/api/URLS"
import {
    FORM_SUBMIT_REQUEST,
} from "./"


/*****************************************************************************/
/*** Initials                                                              ***/
/*****************************************************************************/
let data = {
    message:        "",
    solutionRTL:    [],
    solutionLTR:    [],
}

/*****************************************************************************/
/*** Actions                                                               ***/
/*****************************************************************************/
export const formSubmit = (payload) => dispatch => {
    console.log("[---  INFO   ---] INSIDE `src.actions.solution.formSubmit()`.");
    console.log("                > PAYLOAD : ", payload);

    $.get(URLS.SOLUTION_URL, payload)
    .done(function (data) {
        console.log("[---  INFO   ---] Success");
        console.log("           Data > ", data);

        dispatch({
            type:       FORM_SUBMIT_REQUEST,
            payload:    data,
        })
    })
    .fail(function (data) {
        console.log("[---  ERROR  ---] Fail");
        console.log("           Data > ", data);
    });

    dispatch({
        type:       FORM_SUBMIT_REQUEST,
        payload:    payload,
    })
}
