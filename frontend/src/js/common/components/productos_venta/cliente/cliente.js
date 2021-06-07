import { relativeTimeThreshold } from 'moment';
import React, { Component } from 'react';
import ClienteForm from './clienteForm'

class RealizarCompraStock extends Component {
    
    componentWillMount(){
        const {addproductoCarrito} = this.props
        let productosAgregados
        productosAgregados = this.obtenerDatosLocalStorage()
        addproductoCarrito(productosAgregados)
    }

    realizarCompra = (data) =>{
        const {crear, dataCart} = this.props
        let totalPagar = localStorage.getItem('totalPagar')
        crear(
            {
                ...data,
                productosCarrito:dataCart,
                totalPagar
            }
        )
    }

    obtenerDatosLocalStorage = ()=>{
        let productos
        if (localStorage.getItem('productos')===null){
            productos = []
        }else{
            productos = JSON.parse(localStorage.getItem('productos'))
        }
        return productos
    }

    render() {
        const {loader, dataCart} = this.props
        console.log(dataCart)
        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Datos del cliente</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <ClienteForm 
                            onSubmit={this.realizarCompra} 
                            loader={loader}
                        />   
                    </div>
                </div>
            </div>
        )
        
    }
}
export default RealizarCompraStock;