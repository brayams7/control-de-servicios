import React from 'react';
import './style.css'
import {Link} from 'react-router-dom'
const Carrito = ({productosAgregados, eliminarProducto, limpiarCarrito})=>{
    console.log('carrito',productosAgregados)
    
    if (productosAgregados.length === 0){
        return (
            <React.Fragment>
                <div className="card">
                    <h5 className="card-header">Productos agregados</h5>
                    <div className="card-body">
                        <h5 className="card-title">0</h5>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else{
    return(
        <React.Fragment>
            <div className="card">
                <h5 className="card-header">Productos Agregados</h5>
                <div className="card-body">                    
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                                
                            {
                            
                                productosAgregados.map((element, index)=>{
                                    return(
                                        <tr key={element.id}>
                                        <th scope="row">{index}</th>
                                        <td>{element.name}</td>
                                        <td>{element.precio}</td>
                                        <td>
                                            <button onClick={(e)=> eliminarProducto(e,element.id)} className="btn btn-danger">
                                                quitar producto
                                            </button>
                                        </td>
                                    </tr>
                                    )    
                                })
                                        
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>
                                    <button className="btn btn-danger" onClick={()=>limpiarCarrito()}>Vaciar carrito</button>
                                </th>
                                <th>
                                    {productosAgregados.length > 0 &&
                                        (
                                            localStorage.getItem('token') ?
                                                <Link to="/compra/producto">Ir a la compra</Link>
                                            :
                                            <Link to="/compra/producto/public">Ir a la compra</Link>
                                        )
                                    }
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
    }
}

export default Carrito;