import React, { Component } from "react";
import PropTypes from "prop-types";


/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class SolutionBreakdown extends Component {
    render() {
        const {
            panelSolution
        } = this.props;

        return (
            <div className="SolutionBreakdown__Wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    { panelSolution.map((action, index) => (
                        <tr key={ `${index}` }>
                            <td>{ action.bucketA }</td>
                            <td>{ action.bucketB }</td>
                            <td>{ action.action }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
SolutionBreakdown.propTypes = {
    panelSolution:      PropTypes.array,
}

SolutionBreakdown.defaultProps = {
    panelSolution:      [],
}


/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default SolutionBreakdown;
