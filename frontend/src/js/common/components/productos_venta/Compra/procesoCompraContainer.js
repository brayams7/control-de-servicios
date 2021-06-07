import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/Productos_venta/producto_venta';
import Compra from './procesoCompra';


const ms2p = (state) => {
  return {
    ...state.producto_venta,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Compra);