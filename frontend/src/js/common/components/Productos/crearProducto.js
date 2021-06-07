import { relativeTimeThreshold } from 'moment';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LoadMask from "../Utils/LoadMask/LoadMask";
import ProductForm from './productForm'

class CrearProducto extends Component {
    constructor(props){
        super(props)
        this.state = {
            creacion:true,
            image:null
        }
    }
    componentWillMount(){
        const {match, leer} = this.props
        const id = match.params.id
        if(id){
            leer(id);
            this.setState({
                creacion:false
            })
        }
    }

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    setImage = (img)=>{
        this.setState({ image: img})
    }
     
    create = (data) => {
        const {crear} = this.props
        crear({
            ...data,
            image:null
        },
        [{"file": this.state.image, "name": "image"}]
        )
    }
    update = (data) => {
        const { editar } = this.props;
        editar(data.id, {...data, image: null}, [{"file": this.state.image, "name": "image"}]);
    };

    render() {
        const {loader, item, listarUnidades_de_medida, listarCategorias} = this.props
        const creacion = this.state.creacion
        const fun = creacion == true ? this.create : this.update

        return (
            <div className="bg-light">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center text-dark">Articulo</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-md-6">
                        <h5 className="text-center pv">Agrega un nuevo producto a tu catalogo</h5>
                            <ProductForm 
                                onSubmit={fun} 
                                loader={loader} 
                                crear={creacion} 
                                setImage = {this.setImage}
                                item = {item}
                                unidad_de_medidas = {listarUnidades_de_medida}
                                categorias={listarCategorias}
                            />  
                    </div>
                </div>
            </div>
        )
        
    }
}

export default CrearProducto;