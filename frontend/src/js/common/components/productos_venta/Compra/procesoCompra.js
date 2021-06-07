import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Compra extends Component {

    constructor(props){
        super(props)
        this.state = {
            totalPagar:0
        }
        this.totalTemporal = 0 
    }

    componentWillMount(){
        const {addproductoCarrito} = this.props
        let productosAgregados
        productosAgregados = this.obtenerDatosLocalStorage()
        addproductoCarrito(productosAgregados)
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

    handleChange = (e, id) =>{
        const {dataCart, addproductoCarrito} = this.props
        //let productos = this.obtenerDatosLocalStorage() 
        let total = 0
        for (let i = 0; i < dataCart.length; i++) {
            if (dataCart[i].id === id){
                //console.log('hola')
                dataCart[i].cantidad = parseInt(e.target.value,10)
                dataCart[i].sub_total = e.target.value * dataCart[i].precio
                //console.log(this.totalPagar)
            }
            total += dataCart[i].sub_total  
        }
        this.setState({totalPagar:total})
        localStorage.setItem('totalPagar', JSON.stringify(total))
        console.log(dataCart)
        addproductoCarrito(dataCart)
        localStorage.setItem('productos', JSON.stringify(dataCart))
        
    }

    eliminarProducto = (e, id)=>{
        const {dataCart, addproductoCarrito} = this.props
        console.log(dataCart)

        let productos = dataCart.filter((element, index)=>{
            return element.id !== id
        })

        console.log('prod', productos)
        addproductoCarrito(productos)
        localStorage.setItem('productos', JSON.stringify(productos))
    }

    render() {
            const {dataCart} = this.props

            let total = this.state.totalPagar === 0 ? this.state.totalPagar: 0
        return ( 
            <React.Fragment>
                <div className="container pt-3">
                    <div className="card">
                        <div className="card-header">
                            Productos agregados al carrito
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary">Seguir comprado</button>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">precio</th>
                                <th scope="col">cantidad</th>
                                <th scope="col">sub-total</th>
                                <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                       
                                    dataCart.map((element, index)=>{
                                        total += element.sub_total
                                        return(
                                            <tr key={element.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.precio}</td>
                                                <td>
                                                    
                                                    <input type="number" name={element.id} value={element.cantidad} onChange={(e)=>this.handleChange(e, element.id)} min={1} required/>
                                                    
                                                </td>
                                                <td>{element.sub_total}</td>
                                                <td>
                                                    <button onClick={(e)=>this.eliminarProducto(e, element.id)} className="btn btn-primary">
                                                        Quitar
                                                    </button>
                                                </td>
                                            </tr>
                                            
                                        )
                                        
                                    })
                                }
                                
                            </tbody>
                            
                        </table>
                        <h4 className="text-center d-flex justify-content-end">
                            Total {total}
                        </h4>
                        <button className="btn btn-success d-flex justify-content-end pt-3 pb-3">
                            {
                                localStorage.getItem('token') ?
                                    <Link to="/cliente" className="text-white">Seguir con la compra</Link>
                                    :
                                    <Link to="/cliente/public" className="text-white">Seguir con la compra</Link>
                                }       
                        </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Compra;