import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

//my state reducers

import student from './modules/students/student'
import producto from './modules/producto/producto'
import compra from './modules/Stock/compras'
import producto_venta from './modules/Productos_venta/producto_venta'
import reporte from './modules/Reportes/reporte'
export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    student,
    producto,
    compra,
    producto_venta,
    reporte
});
