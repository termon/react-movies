import React from "react";
import { ResetAction, SearchAction } from "../store";

interface PropTypes {
  query: string;
  search: SearchAction;
  reset: ResetAction;
}
function Search ({ query, search, reset }: PropTypes) {
  
  return (
    <>
      <div className="row">
        <input
          className="col-10 form-input"
          value={query}
          placeholder="search...."
          onChange={ (e) => search(e.target.value) }   
        />
        <button
          type="reset"
          className="btn btn-warning btn-rounded col-1 mx-3"
          onClick={() => reset()}>
          Clear
        </button>
      </div>
      <div className="row mt-2">
        <div className="col-2">
          <input
            type="radio"
            name="customSearch"
            value="popular"
            onChange={(e) => search(`:${e.currentTarget.value}`)}
          />
          <label htmlFor="customSearch">Popular</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            name="customSearch"
            value="top"
            onChange={(e) => search(`:${e.currentTarget.value}`)}
          />
          <label htmlFor="customSearch">Top Rated</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            name="customSearch"
            value="trending"
            onChange={(e) => search(`:${e.currentTarget.value}`)}
          />
          <label htmlFor="customSearch">Trending</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            name="customSearch"
            value="playing"
            onChange={(e) => search(`:${e.currentTarget.value}`)}
          />
          <label htmlFor="customSearch">Now Playing</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            name="customSearch"
            value="upcoming"
            onChange={(e) => search(`:${e.currentTarget.value}`)}
          />
          <label htmlFor="customSearch">Upcoming</label>
        </div>
      </div>
    </>
  );
};

export default Search