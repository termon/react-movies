import React from "react";
import { IMovie } from "../types";
import { posterUrl } from "../store/";
import { MovieCarousel } from ".";

interface PropTypes {
  movie: IMovie | undefined;
}

function MovieView({ movie }: PropTypes) {
  if (movie === undefined) return null;

  // display carousel if more than one image otherwise display poster
  const images = movie.images.backdrops.length > 1  
    ? <MovieCarousel posters={movie.images.backdrops}></MovieCarousel>  
    : <img src={posterUrl(movie.poster_path)} className="card-img-top img-fluid" alt="..."></img>

  // create cast spans
  const cast = movie.credits.cast.slice(0, 4).map((a, i) => 
    <span key={i}>{a.name} </span>
  )

  // create crew spans
  const crew = movie.credits.crew.slice(0,4).map((a,i) =>
    <span key={i}>{a.name} </span>
  )

  return (
    <div className="card shadow-lg p-3 mb-5">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="row g-0 mb-4">
            {images}
          </div>
          <p>{movie.videos.results.length} Videos available</p>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title">
              {movie.title}{" "}
              <span className="badge bg-info fs-6">{movie.vote_average}</span>
            </h4>
            <h5 className="fs-5">
              Released{" "}
              <span className="fs-6 text-muted">{movie.release_date}</span>
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              Cast ({cast})
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Crew ({crew})
            </h6> 
            <p className="card-text">{movie.overview}</p>
            <p>
              Runtime{" "}
              <span className="badge rounded-pill bg-primary">
                {movie.runtime}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieView;
