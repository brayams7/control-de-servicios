import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";
import {handleActions} from 'redux-actions'


const DATA = 'DATA'
const LOADER = 'LOADER'
const PAGE = 'PAGE'
const ORDERING = 'ORDERING'
const SEARCH = 'SEARCH' 
const ITEM = 'ITEM'
const formName = 'productForm'
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
    const params = { page };
    dispatch(setLoader(true));
    api.get(endpoint, params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const miCatalogo = (page = 1) => (dispatch, getStore) => {
    const params = { page };
    dispatch(setLoader(true));
    api.get('producto/miCatalogo', params).then((response) => {
        console.log(response)
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const listarUnidades_de_medida = (search) =>()=>{
    let unidades = []

    return api.get('/unidad_de_medida', {search})
            .then((response)=>{
                unidades = response.results.map( element =>({
                    value:element.id,
                    label:element.descripcion
                }))
                return unidades
            })
            .catch((err)=>{
                return unidades
            })            
}
const listarCategorias = (search) =>()=>{
    let unidades = []

    return api.get('/categoria', {search})
            .then((response)=>{
                unidades = response.results.map( element =>({
                    value:element.id,
                    label:element.descripcion
                }))
                return unidades
            })
            .catch((err)=>{
                return unidades
            })            
}


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

const crear = (data, image) => (dispatch, getStore) => {
    data.unidad_de_medida = data.unidad_de_medida.value,
    data.categoria = data.categoria.value
    dispatch(setLoader(true));
    api.postAttachments(endpoint, data, image).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const editar = (id, data, image) => (dispatch) => {
    dispatch(setLoader(true));
    console.log(id, data, image)
    data.unidad_de_medida = data.unidad_de_medida.value,
    data.categoria = data.categoria.value

    api.putAttachments(`${endpoint}/${id}`, data, image).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
    api.eliminar(`${endpoint}/${id}`).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const clearItem = ()=> (dispatch)=>{
    dispatch(setItem(null))
}

const searchChange = search => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

const onSortChange = ordering => (dispatch, getStore) => {
    const sort = getStore()[storeId].ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};

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
}

export const actions = {
    listar, 
    clearItem,
    crear,
    listarUnidades_de_medida, 
    listarCategorias,
    leer,
    editar,
    miCatalogo,
    eliminar
};

export const initialState = {
    loader: false,
    data: {
            results: [],
            count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);