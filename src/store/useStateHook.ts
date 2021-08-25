// https://www.freecodecamp.org/news/react-typescript-how-to-set-up-types-on-hooks/
// https://codersera.com/blog/react-hooks-with-typescript-use-state-and-use-effect-in-2020/
// https://fettblog.eu/typescript-react-typeing-custom-hooks/

import React, { useReducer } from 'react'

import { reducer, Actions, initialState, SearchAction, GotoPageAction, SelectAction, ResetAction } from './reducer'

export function useStateHook() {
    // export the created reducer
    const [ state, dispatch ] = useReducer(reducer, initialState)

    // load movies by query
    React.useEffect(() => {
        async function fetchQuery() {
            try {
                dispatch( { type: Actions.LOADING, payload: true })
                const resp = await fetch(_movieQueryUrl(state.query,state.paginator.page),_getTokenObj())
                const json = await resp.json()                
                dispatch( { type: Actions.SET_MOVIES, payload: json.results } ); // results contains movie list 
                dispatch( { type: Actions.PAGE, payload: { page: json.page, totalPages: json.total_pages } } ); // total_pages contains number of pages available for query
            } catch (error) {
                console.log('Error', error)
                dispatch({ type: Actions.ERROR, payload: error })
            }
        }
        if (state.query && state.query.length > 0) {
            fetchQuery();
        }
    }, [state.query,state.paginator.page]);  // effect triggered when query or page updated
   
    // load movie by id
    React.useEffect(() => {
        async function fetchQuery() {
            try {
                dispatch( { type: Actions.LOADING, payload: true })
                const resp = await fetch(_movieUrl(state.movieId), _getTokenObj())
                const json = await resp.json()               
                dispatch( { type: Actions.SET_MOVIE, payload: json } );       
            } catch (error) {
                console.log('Error', error)
                dispatch({ type: Actions.ERROR, payload: error })
            }
        }

        if (state.movieId !== "") {
            fetchQuery();
        }
    }, [state.movieId]) // effect triggered when movieId updated

    // actions
    const search: SearchAction     = (query:string) => dispatch( { type: Actions.QUERY, payload: query })
    const select: SelectAction     = (id:string) => dispatch( { type: Actions.SELECT, payload: id })
    const gotoPage: GotoPageAction = (p:number, t:number) => dispatch( { type: Actions.PAGE, payload: { page: p, totalPages: t }} )
    const reset: ResetAction       = () => dispatch( { type: Actions.RESET } )

    return [ state, { search, select, gotoPage, reset} ] as const
}

export function posterUrl(poster:string, size='original'):string {
    //return path + size + poster  
    return `https://image.tmdb.org/t/p/${size}/${poster}`
}

// ------------------ private functions --------------------

function _personUrl(id:string) {
    return `https://api.themoviedb.org/3/person/${id}?append_to_response=images`
}
function _movieUrl(id:string) {   
    return `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,images,videos`
}
function _personQueryUrl(search:string) {
    if (search === ':popular') {
        return `https://api.themoviedb.org/3/person/popular`
    } else {
       return `https://api.themoviedb.org/3/search/person?query=${search}`
    }
}
function _movieQueryUrl(search:string, page=1) {
    if (search === ':trending') {
        return `https://api.themoviedb.org/3/trending/movie/week?page=${page}`
    } else if (search === ':popular') {
        return `https://api.themoviedb.org/3/movie/popular?page=${page}`
    } else if (search === ':playing') {
        return `https://api.themoviedb.org/3/movie/now_playing?page=${page}`
    } else if (search === ':upcoming') {
        return `https://api.themoviedb.org/3/movie/upcoming?page=${page}`
    } else if (search === ':top') {
        return `https://api.themoviedb.org/3/movie/top_rated?page=${page}`
    } else {
        return `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`
    }
}

const _getTokenObj = () => {
    const TOKEN = import.meta.env.VITE_MOVIEDB_TOKEN
 
    return {
        method: 'GET',
        headers: new Headers(
            {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            })
    }
}

