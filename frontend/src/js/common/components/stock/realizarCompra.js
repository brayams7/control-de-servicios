import { relativeTimeThreshold } from 'moment';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LoadMask from "../Utils/LoadMask/LoadMask";
import CompraForm from './compraForm'

class RealizarCompraStock extends Component {

    componentWillMount(){
        const {getProducto, match} = this.props
        const id = match.params.id
        getProducto(id);
    }

    render() {
        const {loader, item, crear, match} = this.props
        const id = match.params.id
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Agregar compra</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        {item &&
                            <h5 className="text-center pv">{item.name}</h5>    
                        }
                            <CompraForm 
                                onSubmit={crear} 
                                loader={loader}
                                initialValues={{'producto':id}}
                            />  
                    </div>
                </div>
            </div>
        )
        
    }
}
export default RealizarCompraStock;