import React, { memo } from "react";
import "./horizontalScroll.css";
interface HorizontalScrollProps {
  items: Record<string, any>[];
  selectedGenre: number[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<number[]>>;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  items,
  selectedGenre,
  setSelectedGenre,
}: HorizontalScrollProps) => {
  const handleClick = (id: number) => {
    if (selectedGenre.includes(1) && id !== 1) {
      const indexOfOne = selectedGenre.indexOf(1);
      const newArray = [...selectedGenre];
      newArray.splice(indexOfOne, 1);
      newArray.push(id);
      setSelectedGenre(newArray);
    } else if (id !== 1) {
      if (selectedGenre.includes(id)) {
        const newArray = [...selectedGenre];
        newArray.splice(newArray.indexOf(id), 1);
        if (newArray?.length) setSelectedGenre(newArray);
        else {
          setSelectedGenre([1]);
        }
      } else {
        setSelectedGenre((old) => [...old, id]);
      }
    } else if (id === 1 && !selectedGenre.includes(1)) {
      setSelectedGenre([1]);
    }
  };
  return (
    <div className="horizontal-scroll">
      {items.map((item) => (
        <button
          type="button"
          className={`scroll-button ${
            selectedGenre.includes(item.id) ? "selected-button" : ""
          }`}
          onClick={() => handleClick(item.id)}
          key={item.id}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default memo(HorizontalScroll);
