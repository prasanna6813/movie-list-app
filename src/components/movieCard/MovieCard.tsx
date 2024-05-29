import React, { useState, useCallback, memo } from "react";
import { IMAGE_BASE_URL } from "../../constants/base_urls";
import "./movieCard.css";
import { MovieCardType } from "../../types/movieCardType";
const MovieCard = ({
  title,
  poster_path,
  overview,
  vote_average,
}: MovieCardType) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <div
      className="card-parent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <img
        src={`${IMAGE_BASE_URL}${poster_path}`}
        alt={title}
        loading="eager"
      />

      <div className="title-card">
        <div>
          <h3>{title}</h3>
          <p className="pt-8">Rating: {vote_average}</p>
        </div>
      </div>

      {isHovered && (
        <div className="description-card">
          <h4>Description:</h4>
          <p className="pt-8">{overview.slice(0, 200)}...</p>
        </div>
      )}
    </div>
  );
};

export default memo(MovieCard);
