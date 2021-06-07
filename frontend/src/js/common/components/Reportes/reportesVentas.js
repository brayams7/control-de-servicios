import React, {Component} from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table'
import {Link} from 'react-router-dom'
import Grid from '../Utils/Grid'
import {standardActions} from '../Utils/Grid/StandardActions'

class Ventas extends Component {
    
    componentWillMount = () =>{
        const {listar,totalVentasGlobal, promedioPrecios} = this.props
        listar()
        totalVentasGlobal()
        promedioPrecios()
    }
    
    render() {
        const {data, loader, item, promedio} = this.props 
        return (  
            <React.Fragment>
                <div className="pb-3">
                    Total ventas Global Q.{item.total_venta}
                </div>
                <div className="pb-3">
                    Promedio Precios Q.{promedio.promedio_precios}
                </div>
                <div className="">
                <Grid hover striped data={data} loading={loader}>
                    
                    <TableHeaderColumn
                        dataField = "name"
                        datasort
                    >
                        nombre
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField = "precio"
                        datasort
                    >
                        precio
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField = "total_venta"
                        datasort
                    >
                        Total venta
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        isKey
                        dataField = "id"
                        dataAlign="center"
                        datasort
                        dataFormat = {standardActions({
                            editar:"/", 
                            ver:"/",
                        })}
                    >
                        acciones
                    </TableHeaderColumn>
                </Grid>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Ventas;