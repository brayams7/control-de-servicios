import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";
import {handleActions} from 'redux-actions'


const DATA = 'DATA'
const DATACART = 'DATACART'
const LOADER = 'LOADER'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const SEARCH = 'SEARCH' 
const ITEM = 'ITEM'
const formName = 'productForm'
const SET_EXISTENCIA = 'SET_EXISTENCIA' 
const endpoint = '/producto'
const resourceList = '/productos'

const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: DATA,
    data,
});

const setItem = item => ({
    type: ITEM,
    item,
});

const setPage = page => ({
    type: PAGE,
    page,
});

const setOrdering = ordering => ({
    type: ORDERING,
    ordering,
});

const setSearch = search => ({
    type: SEARCH,
    search,
});

const listar = (page = 1) => (dispatch, getStore) => {
    console.log('store',getStore())
    const params = { page };
        dispatch(setLoader(true));
        api.get(endpoint, params).then((response) => {
            console.log(response)
            dispatch(setData(response));
            dispatch(setPage(page));
        }).catch(() => {
        }).finally(() => {
            dispatch(setLoader(false));
        });
};

const crear = (data) => (dispatch) => {
    console.log(data)
    dispatch(setLoader(true));
    api.post('/cliente', data).then(() => {
        NotificationManager.success('compra con exito', 'Éxito', 3000);
        localStorage.setItem('productos', JSON.stringify([]))
        localStorage.setItem('totalPagar', JSON.stringify(0))
        dispatch({
            type:DATACART, 
            dataCart:[]
        })
        dispatch(push('/catalogos/productos'));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const addproductoCarrito = (producto) => (dispatch)=>{
    dispatch({
        type:DATACART,
        dataCart:producto
    })
}

const ComprobarExistencias = (id) => (dispatch, getStore) => {
    
    dispatch(setLoader(true));
    api.post('/producto/comprobarExistencias', id).then(() => {
        dispatch({
            type:SET_EXISTENCIA,
            existenciaProduto:true
        })
        NotificationManager.success('compra con exito', 'Éxito', 3000);
    }).catch(() => {
        dispatch({
            type:SET_EXISTENCIA,
            existenciaProduto:false
        })
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/${id}`).then((response) => {
        console.log(response)
        const categoria = {
            value:response.categoria.id,
            label:response.categoria.descripcion
        }
        const unidad_de_medida = {
            value:response.unidad_de_medida.id,
            label:response.unidad_de_medida.descripcion
        }
        response.categoria = categoria
        response.unidad_de_medida = unidad_de_medida
        dispatch(setItem(response));
        if (!!formName)
            dispatch(initializeForm(formName, response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};



const clearItem = ()=> (dispatch)=>{
    dispatch(setItem(null))
}


export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
    [ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },
    [DATACART]: (state, { dataCart }) => {
        return {
            ...state,
            dataCart,
        };
    },
    [SET_EXISTENCIA]: (state, { existenciaProduto }) => {
        return {
            ...state,
            existenciaProduto,
        };
    },
}

export const actions = {
    listar, 
    clearItem,
    leer,
    addproductoCarrito,
    crear
};

export const initialState = {
    loader: false,
    data: {
            results: [],
            count: 0,
    },
    dataCart:[],
    item: {},
    page: 1,
    ordering: '',
    search: '',
    existenciaProduto:null
};

export default handleActions(reducers, initialState);