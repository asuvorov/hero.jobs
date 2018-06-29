import React, { Component } from "react";
import PropTypes from "prop-types";

import {
    Grid,
    Row,
    Col,
} from "react-flexbox-grid"

import Header from "../components/Header"
import InputForm from "./InputForm"
import PanelLeft from "./PanelLeft"
import PanelRight from "./PanelRight"

/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class Root extends Component {
    render() {
        const {
            message,
            leftPanelSolution,
            rightPanelSolution,

            /*****************************************************************/
            formSubmit,
        } = this.props;

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Header />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <InputForm
                            message={ message }
                            formSubmit={ formSubmit }
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <PanelLeft
                            leftPanelSolution={ leftPanelSolution }
                        />
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <PanelRight
                            rightPanelSolution={ rightPanelSolution }
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}


/*****************************************************************************/
/*** Props                                                                 ***/
/*****************************************************************************/
Root.propTypes = {
    leftPanelSolution:          PropTypes.array,
    rightPanelSolution:         PropTypes.array,

    formSubmit:                 PropTypes.func.isRequired,
}

Root.defaultProps = {
    message:                    "",
    leftPanelSolution:          [],
    rightPanelSolution:         [],
}


/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default Root;
