import { useState, useEffect } from "react";

const API_URL = " http://www.omdbapi.com/?i=tt3896198&apikey=2ec4f3b";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Fetch movies from OMDB API and store in state
  async function fetchMovies(controller) {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const resp = await fetch(`${API_URL}&s=${query}`, {
        signal: controller.signal,
      });

      if (!resp.ok) throw new Error("Something went wrong fetching movies");

      const data = await resp.json();
      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
      setErrorMessage("");
      setIsLoading(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        setErrorMessage(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      const controller = new AbortController();
      if (query.length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }

      //handleCloseMovie();
      fetchMovies(controller);

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, errorMessage, movies };
}
