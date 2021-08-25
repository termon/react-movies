import { IShortMovie, IMovie } from '../types'
import { Reducer } from 'react'

export enum Actions {
    SET_MOVIES = "SET_MOVIES",
    SET_MOVIE  = "SET_MOVIE",
    QUERY = "QUERY",
    SELECT = "SELECT",
    RESET = "RESET",
    PAGE = "PAGE",
    LOADING = "LOADING",
    ERROR = "ERROR"
}

// paginator type
export interface IPaginator {
    page: number
    totalPages: number
}

// action types
export type IAction = 
    | { type: Actions.SET_MOVIES, payload: IShortMovie[]}
    | { type: Actions.SET_MOVIE, payload: IMovie}
    | { type: Actions.QUERY, payload: string }
    | { type: Actions.SELECT, payload: string }
    | { type: Actions.PAGE, payload: IPaginator }
    | { type: Actions.LOADING, payload: boolean } 
    | { type: Actions.ERROR, payload: string }
    | { type: Actions.RESET}

// action function types
export type SearchAction = (query:string) => void
export type SelectAction = (id:string) => void
export type GotoPageAction = (p:number, t:number) => void
export type ResetAction = () => void

interface IStore {
    movies: IShortMovie[]
    movie: IMovie | undefined
    loading: boolean
    query: string
    paginator: IPaginator
    movieId: string
}


export const initialState: IStore = {
    movies: [],
    movie: undefined,
    loading: false,
    query: '',
    paginator: { page: 1, totalPages: 0 },
    movieId: ''
}

export const reducer: Reducer<IStore,IAction> = (state, action) => {
    console.log('reducer', action, state)
    switch(action.type) {
        case Actions.SET_MOVIES: {          
            return {...state, movies: action.payload, loading: false}   
        }     
        case Actions.SET_MOVIE: {
            return {...state, movie: action.payload, loading: false}
        }
        case Actions.QUERY: {
            return {...state, movie: undefined, query: action.payload, loading: true}
        }
        case Actions.SELECT: {
            return {...state, movieId: action.payload, loading: true}
        }
        case Actions.PAGE: {
            // logic to ensure page stays within bounds
            const { page, totalPages } = action.payload
            return (page >= 1 && page <= totalPages) ? {...state, paginator: action.payload } : state;
        }
        case Actions.RESET: {
            return { ...initialState }
        }
        case Actions.ERROR: {
            return { ...state, loading:false, error: action.payload }
        }
        default: {
            return state;
        }
    }
}
