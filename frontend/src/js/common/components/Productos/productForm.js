import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField} from '../Utils/renderField';
import 'bootstrap/dist/css/bootstrap.css'
import {renderFilePicker, AsyncSelectField, renderNumber} from '../Utils/renderField/renderField';


const ProductForm = (props) => {
    const {handleSubmit, item, setImage, crear, unidad_de_medidas, categorias} = props

    let disabled = false
    const ver =  window.location.href.includes('ver')
    if(ver){
        disabled = true
    }
    return (
        <form name="productForm" className="form-validate" onSubmit={handleSubmit}>

            <div className="form-group has-feedback">
                <label htmlFor="name">nombre</label>
                <Field name="name" label="name" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="description">descripcion</label>
                <Field name="description" label="description" component={renderField} type="text" className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="precio">Precio</label>
                <Field name="precio" label="precio" component={renderNumber} className="form-control" disabled={disabled}/>
            </div>

            <div className="form-group has-feedback">
                    <Field
                        name="unidad_de_medida"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={unidad_de_medidas}
                        type="text"
                        disabled = {disabled}
                    />
            </div>
            
            <div className="form-group has-feedback">
                    <Field
                        name="categoria"
                        component={AsyncSelectField}
                        className="budget-form-select"
                        loadOptions={categorias}
                        type="text"
                        disabled = {disabled}
                    />
            </div>
            
            <div className="form-group has-feedback">
                <label htmlFor="image">Imagen</label>
                <Field 
                    photo={item ? item.image : null}
                    name="image" 
                    label="image" 
                    component={renderFilePicker} 
                    className="form-control"
                    setFile = {setImage}
                    disabled={disabled}
                />
            </div>
            {item &&
                <a href={item.image} target="_blank">Ver/descargar</a>

            }
            
            {disabled == false &&
                <div className="buttons-box">
                    <button type="submit" className="btn btn-primary m-1 align-self-center">
                        {crear == true ? 'registrar' :
                            'actualizar'
                        }
                        </button>
                    <input type="reset" className="btn btn-danger m-1 align-self-center"/>
                </div>
            }

        </form>
    );
};

export default reduxForm({
    form: 'productForm', // nombre del registro de formulario para todas las asignaciones
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
            image: validators.exists()('Este campo es requerido'),
            unidad_de_medida: validators.exists()('Este campo es requerido'),
        });
    },
})(ProductForm);