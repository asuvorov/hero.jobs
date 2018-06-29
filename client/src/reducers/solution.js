import {
    FORM_SUBMIT_REQUEST
} from "../actions"


/*****************************************************************************/
/*** Reducers                                                              ***/
/*****************************************************************************/
export default (state = {}, action) => {
    console.log("[---  INFO   ---] INSIDE `src.reducers.solution`");
    console.log("                > STATE  : ", state);
    console.log("                > ACTION : ", action);

    let newBundleList = [];

    switch (action.type) {
        case FORM_SUBMIT_REQUEST:
            // === Add the Timestamp to the Product.
            const timestamp = new Date().getTime();

            return {
                ...state,
                message:        action.payload.message,
                solutionRTL:    action.payload.solutionRTL,
                solutionLTR:    action.payload.solutionLTR,
            }

        default:
            return {
                ...state,
            message:        "",
            solutionRTL:    [],
            solutionLTR:    [],
        }
    }
}
