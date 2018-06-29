import React, { Component } from "react";
import PropTypes from "prop-types";

import SolutionBreakdown from "../components/SolutionBreakdown"


/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class PanelLeft extends Component {
    render() {
        const {
            leftPanelSolution,
        } = this.props;

        return (
            <div className="Panel__Wrapper">
                <h2>Right to Left Solution</h2>

                <SolutionBreakdown
                    panelSolution={ leftPanelSolution }
                />
            </div>
        )
    }
}


/*****************************************************************************/
/*** Handlers                                                              ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Props                                                                 ***/
/*****************************************************************************/
PanelLeft.propTypes = {
    leftPanelSolution:      PropTypes.array,
}

PanelLeft.defaultProps = {
    leftPanelSolution:      [],
}


/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default PanelLeft;
