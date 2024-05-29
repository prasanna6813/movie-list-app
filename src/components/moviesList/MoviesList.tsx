import React, { memo } from "react";
import MovieCard from "../movieCard/MovieCard";
import "./movieList.css";
type movieListPropType = {
  data: Record<string, any>[];
};
const MoviesList = memo((props: movieListPropType) => {
  const { data } = props;
  return (
    <div>
      <h1 className="movie-list__heading">
        {data[0].release_date.substring(0, 4)}
      </h1>
      <div className="movie-list">
        {data?.map((item: Record<string, any>) => {
          return (
            <MovieCard
              title={item.title}
              poster_path={item.poster_path}
              release_date={item.release_date}
              overview={item.overview}
              vote_average={item.vote_average}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
});

export default MoviesList;
