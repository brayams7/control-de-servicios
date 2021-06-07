import React, {Component} from 'react';

class ListStudent extends Component {

    componentWillMount(){
        const {listar} = this.props
        listar();
    }

    render() { 
        const {data}=this.props
        console.log('data',data)
        return (  
            <React.Fragment>
                <h3>
                    Listado de estudiantes
                </h3>
            </React.Fragment>
        );
    }
}
 
export default ListStudent;