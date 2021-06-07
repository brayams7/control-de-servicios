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
const endpoint = "/user"

const listar = (page = 1) => (dispatch, getStore) => {
    console.log(getStore())
    const params = { page };
    dispatch({type:LOADER, loader:true});
    api.get(endpoint, params).then((response) => {
        console.log(response)
        dispatch({type:DATA, data:response});
        dispatch({TYPE:PAGE, page});
        NotificationManager.success('Correcto', )
    }).catch((err) => {
        NotificationManager.error(
            'error',
            0
        )
    }).finally(() => {
            dispatch({type:LOADER, loader:false});
    });
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
}

export const actions = {
    listar
};

export const initialState = {
    loader:false,
    data: {
        results: [],
        count: 0,
    },
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);