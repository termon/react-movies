import React from 'react'
import { SearchAction } from './store'

import {IShortMovie} from './types'

interface PropTypes  {
    movies: IShortMovie[]
    select:SearchAction
}
function MovieList({ movies, select } : PropTypes ) {      
    return (
        <>
        <h3>Movie List</h3>
                            
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                <th>Id</th>
                <th>Title</th>          
                <th>Year</th>
                </tr>
            </thead>
            <tbody> 
            {
            movies.map((m: IShortMovie, i:number) =>
                <tr key={i}>
                    <td><button className="btn btn-link" onClick={() => select(`${m.id}`)}>{ m.id }</button></td>
                    <td>{ m.title }</td>
                    <td>{ m.release_date }</td>    
                </tr> 
            )} 
            </tbody>
        </table>
            
       </>
    )
}
export default MovieList
 