import React, { Component } from "react";
import PropTypes from "prop-types";

import SolutionBreakdown from "../components/SolutionBreakdown"


/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class PanelRight extends Component {
    render() {
        const {
            rightPanelSolution,
        } = this.props;

        return (
            <div className="Panel__Wrapper">
                <h2>Left to Right Solution</h2>

                <SolutionBreakdown
                    panelSolution={ rightPanelSolution }
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
PanelRight.propTypes = {
    rightPanelSolution:     PropTypes.array,
}

PanelRight.defaultProps = {
    rightPanelSolution:     [],
}


/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default PanelRight;
