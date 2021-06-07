import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";

// ------------------------------------
// Constants
// ------------------------------------

const SET_PRODUCTO = 'SET_PRODUCTO'

const baseReducer = createReducer(
    "compra", //identificador del estado
    "compra_stock", //endpoint
    "compraStockForm", //form
    "/productos",//redireccion
)


/*export const { reducers, initialState, actions } = createReducer(
    "compra", //identificador del estado
    "compra_stock", //endpoint
    "compraStockForm", //form
    "/productos",//redireccion
);*/

const getProducto = id => (dispatch) => {
    api.get(`producto/${id}`).then((response) => {
        dispatch({type:SET_PRODUCTO, item:response});
        /*if (!!formName)
            dispatch(initializeForm(formName, response));*/
    }).catch(() => {
        console.log('error')
    }).finally(() => {
    });
};

export const actions = {
    ...baseReducer.actions,
    getProducto,

}

export const reducers = {
    ...baseReducer.reducers,
    [SET_PRODUCTO]:(state, {item})=>{
        return{
            ...state,
            item
        }
    }
}

export default handleActions(reducers, baseReducer.initialState);