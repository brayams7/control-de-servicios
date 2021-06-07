import React from 'react';
import './style.css'

const Producto = ({id, name, description, precio, image, setCart, productos})=>{

    return(
        <React.Fragment>
            <div key={id} className="card producto-image">
                <img src={image} className="card-img-top image" alt="..."/>
                <div className="card-body">
                    <h3>{name}</h3>
                    <p className="card-text">
                        {description}
                    </p>
                    <p>${precio}</p>
                    <button className="btn btn-primary" onClick={(e)=>setCart(e, productos, id)}>Agregar al carro</button>
                </div>
            </div>
            <br/>
        </React.Fragment>
    )
}

export default Producto;