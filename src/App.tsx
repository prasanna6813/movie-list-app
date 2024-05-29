/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getGenreList } from "./api/genreListApi";
import "./App.css";
import { BASE_URL } from "./constants/base_urls";
import HorizontalScroll from "./components/horizontalScroll/HorizontalScroll";
import MoviesList from "./components/moviesList/MoviesList";
import SearchBox from "./components/searchBox/SearchBox";
import { moviesListType, dataType } from "./types/moviesListType";
import ErrorMessages from "./components/errorMessages/ErrorMessages";
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [moviesData, setMoviesData] = useState<moviesListType[]>([]); // fetch data
  const [genreList, setGenreList] = useState<Record<string, any>[]>([]); // fetch data
  const [error, setError] = useState<Record<string, boolean>>({
    genreError: false,
    moviesError: false,
  });
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number[]>([1]);
  const [selectedYears, setSelectedYears] = useState<number[]>([2012]);
  const [scrollDirection, setScrollDirection] = useState<"UP" | "DOWN" | "">(
    "",
  );
  const initialParams = useMemo(
    () => [
      { vote_count_gte: 150 },
      { sort_by: "popularity.desc" },
      { api_key: API_KEY },
    ],
    [],
  );

  const initialSelectedGenre = { id: 1, name: "All" };

  const handleGenreList = useCallback(async () => {
    try {
      const list = await getGenreList();
      setGenreList([initialSelectedGenre, ...list.genres]);
    } catch {
      setError((prevError) => ({ ...prevError, genreError: true }));
    }
  }, []);

  const fetchMovies = useCallback(
    async (isScroll: boolean = false) => {
      let data: dataType;
      try {
        const params = new URLSearchParams();
        initialParams.forEach((each: Record<string, any>) => {
          for (const key in each) params.append(key, each[key]);
        });
        params.append("with_text_query", query);
        params.append(
          "with_genres",
          selectedGenre[0] === 1 && selectedGenre.length === 1
            ? ""
            : selectedGenre.join("|"),
        );

        if (isScroll) {
          if (scrollDirection === "UP") {
            params.append("primary_release_year", selectedYears[0].toString());
          } else if (scrollDirection === "DOWN") {
            params.append(
              "primary_release_year",
              selectedYears[selectedYears.length - 1].toString(),
            );
          }
          if (
            selectedYears[selectedYears.length - 1] > new Date().getFullYear()
          )
            return;
        } else {
          if (query.length === 0) params.append("primary_release_year", "2012");
        }

        const result = await fetch(`${BASE_URL}?${params}`);
        data = await result.json();

        if (isScroll) {
          if (scrollDirection === "UP" && data.results.length) {
            setMoviesData((c) => [data.results, ...c]);
          } else if (scrollDirection === "DOWN" && data.results.length) {
            setMoviesData((c) => [...c, data.results]);
          }
        } else {
          setMoviesData([data.results]);
        }
      } catch (err) {
        console.log(err);
        setError((err) => ({ ...err, moviesError: true }));
      }
    },
    [query, selectedGenre, scrollDirection, selectedYears],
  );

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    setSelectedYears([2012]);
    fetchMovies();
  }, [debouncedQuery, selectedGenre]);

  useEffect(() => {
    if (scrollDirection) {
      fetchMovies(true);
    }
  }, [selectedYears]);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = (prop: "UP" | "DOWN") => {
      if (!isScrolling) {
        isScrolling = true;
        setScrollDirection(prop);
        switch (prop) {
          case "UP":
            setSelectedYears((arr) => [arr[0] - 1, ...arr]);
            break;
          case "DOWN":
            setSelectedYears((arr) => [...arr, arr[arr.length - 1] + 1]);
            break;
          default:
            console.log("undefined action");
            setScrollDirection("");
        }
        setTimeout(() => {
          isScrolling = false;
        }, 1000); // Prevents multiple triggers within 1 second
      }
    };

    handleGenreList();

    const onScroll = () => {
      if (window.scrollY <= 0) {
        handleScroll("UP");
      } else if (
        window.innerHeight + window.scrollY + 2 >=
        document.body.offsetHeight
      ) {
        handleScroll("DOWN");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="logoSearchContainer">
          <span className="logo">MovieFlix</span>
          <SearchBox query={query} setQuery={setQuery} />
        </div>
        {!error.genreError ? (
          <HorizontalScroll
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            items={genreList}
          />
        ) : (
          <ErrorMessages header="Failed to fetch Genres" />
        )}
      </header>
      <section className="movieListContainer">
        {moviesData?.length === 0 ? (
          <ErrorMessages header="Oops! Seems like you're out of luck." />
        ) : (
          <div className="movies-container">
            {moviesData.map((data: Record<string, any>[], index: number) => {
              return data?.length ? (
                <MoviesList data={data} key={`movies-container-${index}`} />
              ) : (
                <ErrorMessages
                  header="Seems we do not have the movie you are searching for"
                  type="error"
                  key={`movies-container-${index}`}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
