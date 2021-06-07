import React, {Component} from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table'
import {Link} from 'react-router-dom'
import Grid from '../Utils/Grid'
import {standardActions} from '../Utils/Grid/StandardActions'

class ListarProductos extends Component {
    
    componentWillMount = () =>{
        const {miCatalogo} = this.props
        miCatalogo()
    }
    
    render() {
        const {data, loader, eliminar} = this.props 
        return (  
            <React.Fragment>
                <div className="">
                    <Link to="/" className="btn btn-primary">Nuevo</Link>
                <Grid hover striped data={data} loading={loader}>
                    <TableHeaderColumn
                        dataField = "id"
                        datasort
                    >
                        codigo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField = "name"
                        datasort
                    >
                        nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField = "description"
                        datasort
                    >
                        descripcion
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField = "precio"
                        datasort
                    >
                        precio
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField = "existencia"
                        datasort
                    >
                        Stock
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        isKey
                        dataField = "id"
                        dataAlign="center"
                        datasort
                        dataFormat = {standardActions({
                            editar:"/producto", 
                            ver:"/producto/ver",
                            eliminar: eliminar
                        })}
                    >
                        acciones
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField = "id"
                        dataAlign="center"
                        dataFormat = {(cell)=>{
                            return(
                                <React.Fragment>
                                    <a href={`/#/compras/stock/${cell}`}>
                                        <span className="material-icons">
                                        shopping_bag
                                        </span>
                                    </a>
                                </React.Fragment>
                            )
                        }}
                    >
                        comprar Stock
                    </TableHeaderColumn>
                </Grid>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default ListarProductos;