import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
//import {renderFilePicker, AsyncSelectField} from '../Utils/renderField/renderField';


const ClienteForm = (props) => {
    const {handleSubmit} = props

    return (
        <form name="clienteForm" className="form-validate" onSubmit={handleSubmit}>
            
            <div className="form-group has-feedback">
                <label htmlFor="nombre">Nombre</label>
                <Field 
                    name="nombre" 
                    label="nombre" 
                    component={renderField} 
                    type="text" 
                    className="form-control" 
                />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="apellidos">Apellidos</label>
                <Field 
                    name="apellidos" 
                    label="apellidos" 
                    component={renderField} 
                    type="text" 
                    className="form-control" 
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="direccion">Direccion</label>
                <Field 
                    name="direccion" 
                    label="direccion" 
                    component={renderField} 
                    type="text" 
                    className="form-control" 
                />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="telefono">telefono</label>
                <Field 
                    name="telefono" 
                    label="telefono" 
                    component={renderField} 
                    type="text" 
                    className="form-control" 
                />
            </div>
            
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">
                        realizar Compra
                </button>
                <input type="reset" className="btn btn-danger m-1 align-self-center"/>
            </div>

        </form>
    );
};

export default reduxForm({
    form: 'clienteForm', // nombre del registro de formulario para todas las asignaciones
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            apellidos: validators.exists()('Este campo es requerido'),
            direccion: validators.exists()('Este campo es requerido'),
            telefono: validators.exists()('Este campo es requerido')
        });
    },
})(ClienteForm);