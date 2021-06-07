import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

//my components

import ListStudentContainer from './common/components/myComponents/student/StudentContainer'
import ListarProductosContenedor from './common/components/Productos/listarProductosContenedor'
import CrearProducto from './common/components/Productos/crearProductoContainer'
import RealizarCompraStock from './common/components/stock/realizarCompraContainer'

import ListarProductosVenta from './common/components/productos_venta/listarProductosVentaContenedor'
import Compra from './common/components/productos_venta/Compra/procesoCompraContainer'

import Cliente from './common/components/productos_venta/cliente/clienteContainer'

import Reportes from './common/components/Reportes/reportesVentaContainer'

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/catalogos/productos/public" component={ListarProductosVenta} />
                <Route exact path="/compra/producto/public" component={Compra} />
                <Route exact path="/cliente/public" component={Cliente} />

                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <ProtectedRoute exact path="/students" component={ListStudentContainer} />

                <ProtectedRoute exact path="/productos" component={ListarProductosContenedor} />
                <ProtectedRoute exact path="/registrar/producto" component={CrearProducto} />
                <ProtectedRoute exact path="/producto/ver/:id" component={CrearProducto} />
                <ProtectedRoute exact path="/producto/:id/:editar" component={CrearProducto} />
                
                <ProtectedRoute exact path="/compras/stock/:id" component={RealizarCompraStock} />
                
                <ProtectedRoute exact path="/catalogos/productos" component={ListarProductosVenta} />
                
                
                <ProtectedRoute exact path="/compra/producto" component={Compra} />

                <ProtectedRoute exact path="/cliente" component={Cliente} />

                <ProtectedRoute exact path="/reportes/ventas" component={Reportes} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
