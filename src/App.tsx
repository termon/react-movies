import React from "react";
import MovieList from "./MovieList";
import MovieView from "./MovieView";
import Paginator from "./Paginator";
import Search from "./Search";
import Spinner from "./Spinner";
import { useStateHook } from "./store";

function App() {
  const [state, {search, select, gotoPage, reset} ] = useStateHook()

  return (
    <div className="mt-5">
      <Search query={state.query} search={search} reset={reset} />
      <Spinner loading={state.loading} />
      <div className="mt-4 mb-4">
        <MovieView movie={state.movie} />
      </div>
      <MovieList movies={state.movies} select={select} />
      <Paginator paginator={state.paginator} gotoPage={gotoPage} />
    </div>
  );
}

export default App;
