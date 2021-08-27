import { IShortMovie, IMovie  } from '../types'
import { Reducer } from 'react'
import { Action, IPaginator } from '.'

  
// action types
type IAction = 
    | { type: Action.SET_MOVIES, payload: IShortMovie[]}
    | { type: Action.SET_MOVIE, payload: IMovie}
    | { type: Action.QUERY, payload: string }
    | { type: Action.SELECT, payload: string }
    | { type: Action.PAGE, payload: IPaginator }
    | { type: Action.LOADING, payload: boolean } 
    | { type: Action.ERROR, payload: string }
    | { type: Action.RESET}

// store type
interface IStore {
    movies: IShortMovie[]
    movie: IMovie | undefined
    loading: boolean
    query: string
    paginator: IPaginator
    movieId: string
}

// initial store state
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
        case Action.SET_MOVIES: {          
            return {...state, movies: action.payload, loading: false}   
        }     
        case Action.SET_MOVIE: {
            return {...state, movie: action.payload, loading: false}
        }
        case Action.QUERY: {
            return {...state, movie: undefined, query: action.payload, loading: true}
        }
        case Action.SELECT: {
            return {...state, movieId: action.payload, loading: true}
        }
        case Action.PAGE: {
            // logic to ensure page stays within bounds
            const { page, totalPages } = action.payload
            return (page >= 1 && page <= totalPages) ? {...state, paginator: action.payload } : state;
        }
        case Action.RESET: {
            return { ...initialState }
        }
        case Action.ERROR: {
            return { ...state, loading:false, error: action.payload }
        }
        default: {
            return state;
        }
    }
}
