import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Producto from './producto'
import Carrito from './carrito'
import { element } from 'prop-types';

class ListarProductosVenta extends Component {

    componentWillMount = () =>{
        const {listar, addproductoCarrito} = this.props
        listar()
        let productosLs
        productosLs = this.obtenerDatosLocalStorage() 
        addproductoCarrito(productosLs)
    }

    setCart = (e, productos, id)=>{
        const {addproductoCarrito, dataCart} = this.props
        const producto = productos.filter((producto) => producto.id === id)
        
        let encontrado = false
        dataCart.forEach(element => {
            if(element.id === id){
                encontrado = true 
            }
        });
        
        if(encontrado === false){
            let sub_total = 1 * producto[0].precio
            const productoCarrito = {
                id:producto[0].id,
                name:producto[0].name,
                precio:producto[0].precio,
                cantidad: 1,
                sub_total
            }
            const lista = [...dataCart, productoCarrito]
            addproductoCarrito(lista)
            
            //agregando productos al local storage
            let productosLs
            productosLs = this.obtenerDatosLocalStorage()
            productosLs.push(productoCarrito)
            localStorage.setItem('productos', JSON.stringify(productosLs))
        }else{
            console.log('producto ya está añadido')
        }
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

    limpiarCarrito = ()=>{
        const {addproductoCarrito} = this.props
        addproductoCarrito([])
        localStorage.setItem('productos', JSON.stringify([]))
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
        const {data, loader, dataCart} = this.props 
        return (  
            <React.Fragment>
                <div className="container">
                        <nav className="d-flex justify-content-end pb-4">
                            <button >
                                <span className="material-icons">
                                    shopping_cart
                                </span>
                                
                                <Carrito 
                                    productosAgregados={dataCart} 
                                    eliminarProducto={this.eliminarProducto}
                                    limpiarCarrito = {this.limpiarCarrito}
                                />
                                
                            </button>
                        </nav>
                        <div className="d-flex justify-content-start">
                            <div className="row">
                                
                            {
                                data.results.map((element)=>{
                                    return(
                                    <div className="col-md-4" key={element.id}>
                                        <Producto
                                            id={element.id}
                                            name={element.name}
                                            description={element.description}
                                            precio={element.precio}
                                            image={element.image}
                                            setCart={this.setCart}
                                            productos = {data.results}
                                        />
                                    </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default ListarProductosVenta;