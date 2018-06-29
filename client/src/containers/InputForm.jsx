import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Text } from "informed";


/*****************************************************************************/
/*** Component                                                             ***/
/*****************************************************************************/
class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    handleClick() {
        console.log(this.formApi.getState());

        if (this.formApi.getState().pristine) return;

        const values = this.formApi.getState().values;

        if (values.vola &&
            values.volx &&
            values.volb) {
            console.log("ALL SET");

            this.props.formSubmit({
                vola:   values.vola,
                volx:   values.volx,
                volb:   values.volb,
            })
        }
    }

    setFormApi(formApi){
        this.formApi = formApi;
    }

    render() {
        const {
            message,
            formSubmit,
        } = this.props;

        return (
            <div className="Form__Wrapper">
                <h2>Input Form</h2>
                <h4>{ message }</h4>

                <Form id="input-form" getApi={ this.setFormApi }>
                  <label htmlFor="vola">Volume A:</label>
                  <Text field="vola" id="vola" />

                  <br/>

                  <label htmlFor="volx">Volume X:</label>
                  <Text field="volx" id="volx" />

                  <br/>

                  <label htmlFor="volb">Volume B:</label>
                  <Text field="volb" id="volb" />

                  <br/>

                  <button onClick={ this.handleClick }>Submit</button>
                </Form>
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
InputForm.propTypes = {
    formSubmit:     PropTypes.func.isRequired,
}

InputForm.defaultProps = {
    message:        "",
}


/*****************************************************************************/
/*** Styles                                                                ***/
/*****************************************************************************/


/*****************************************************************************/
/*** Export                                                                ***/
/*****************************************************************************/
export default InputForm;
