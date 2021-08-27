import React from "react";
import { IImage } from "../types";
import { posterUrl } from "../store";

interface PropTypes {
  posters: IImage[];
}

function MovieCarousel ({ posters }: PropTypes) {
  const carouselImages = posters.map((p: IImage, i: number) => (
    <div key={i} className={`carousel-item ${i == 0 ? "active" : ""}`}>
      <img src={posterUrl(p.file_path)} className="d-block w-100" alt="..." />
    </div>
  ));

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel">
      <div className="carousel-inner">{carouselImages}</div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  )
}

export default MovieCarousel
