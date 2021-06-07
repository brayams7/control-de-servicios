import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/Stock/compras';
import RealizarCompraStock from './realizarCompra';


const ms2p = (state) => {
  return {
    ...state.compra,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RealizarCompraStock);