import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
//import {renderFilePicker, AsyncSelectField} from '../Utils/renderField/renderField';


const CompraForm = (props) => {
    const {handleSubmit} = props

    return (
        <form name="compraStockForm" className="form-validate" onSubmit={handleSubmit}>
            <Field 
                    name="producto" 
                    component={renderField} 
                    type="hidden"
                />
            <div className="form-group has-feedback">
                <label htmlFor="cantidad">cantidad</label>
                <Field 
                    name="cantidad" 
                    label="cantidad" 
                    component={renderField} 
                    type="number" 
                    className="form-control" 
                />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="sub_total">sub total de la compra</label>
                <Field 
                    name="sub_total" 
                    label="sub_total" 
                    component={renderField} 
                    type="number" 
                    className="form-control" 
                />
            </div>
            
            <div className="form-group has-feedback">
                <label htmlFor="total">total de la compra</label>
                <Field 
                    name="total" 
                    label="total" 
                    component={renderField} 
                    type="number" 
                    className="form-control" 
                />
            </div>
            
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">
                        agregar compra
                </button>
                <input type="reset" className="btn btn-danger m-1 align-self-center"/>
            </div>

        </form>
    );
};

export default reduxForm({
    form: 'compraStockForm', // nombre del registro de formulario para todas las asignaciones
    validate: (data) => {
        return validate(data, {
            cantidad: validators.exists()('Este campo es requerido'),
            sub_total: validators.exists()('Este campo es requerido'),
            total: validators.exists()('Este campo es requerido'),
        });
    },
})(CompraForm);