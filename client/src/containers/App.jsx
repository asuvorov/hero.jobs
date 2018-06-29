import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    formSubmit,
} from "../actions/solution"
import Root from "./Root";


/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class App extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            message,
            leftPanelSolution,
            rightPanelSolution,

            /*****************************************************************/
            formSubmit,
        } = this.props

        return(
            <Root
                message={ message }
                leftPanelSolution={ leftPanelSolution }
                rightPanelSolution={ rightPanelSolution }

                formSubmit={ formSubmit }
            />
        )
    }
}


/*****************************************************************************/
/*** Props                                                                 ***/
/*****************************************************************************/
const mapStateToProps = state => ({
    message:                state.solution.message,
    leftPanelSolution:      state.solution.solutionRTL,
    rightPanelSolution:     state.solution.solutionLTR,
})

/*****************************************************************************/
const mapDispatchToProps = dispatch => ({
    formSubmit: (payload) => dispatch(formSubmit(payload)),
})



/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default connect(mapStateToProps, mapDispatchToProps)(App);
