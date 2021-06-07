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
const PROMEDIO = 'PROMEDIO'

const endpoint = '/reportes'

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


const listar = (page = 1) => (dispatch, getStore) => {
    const params = { page };
    dispatch(setLoader(true));
    api.get(`${endpoint}/totalVentaProducto`, params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const totalVentasGlobal = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/totalVentaGlobal`).then((response) => {
        console.log(response)
        dispatch(setItem(response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const promedioPrecios = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`${endpoint}/promedioPrecios`).then((response) => {
        console.log(response)
        dispatch({type:PROMEDIO, promedio:response});
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
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
    },[PROMEDIO]: (state, { promedio }) => {
        return {
            ...state,
            promedio,
        };
    },
}

export const actions = {
    listar,
    totalVentasGlobal,
    promedioPrecios
};

export const initialState = {
    loader: false,
    data: {
            results: [],
            count: 0,
    },
    item: {},
    promedio:{},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);