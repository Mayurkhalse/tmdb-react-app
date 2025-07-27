import axios from "axios";
import React, { useEffect, useState } from "react";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ee24ce8ae5b422e235fd5c71450b8d6c&language=en-US&page=1`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % 20);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentMovie = movies[currentMovieIndex];

  
  if (!currentMovie) {
    return (
      <div className="h-[25vh] md:h-[75vh] flex justify-center items-center text-white bg-black">
        Loading Banner...
      </div>
    );
  }

  return (
    <div
      className="h-[25vh] md:h-[75vh] bg-cover bg-center flex items-end transition-all duration-1000"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`,
      }}
    >
      <div className="text-white text-center w-full text-xl bg-gray-900/60 p-4">
        {currentMovie.original_title}
      </div>
    </div>
  );
}

export default Banner;
