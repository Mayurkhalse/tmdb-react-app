import React from "react";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddToWatchList ,handleRemoveToWatchList , watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  const handlePrev =()=>{
    if(pageNo == 1){
      setPageNo(1)
    }
    else{
setPageNo(pageNo-1);
    }
  }

  const handleNext = () =>{
    setPageNo(pageNo+1);  
  }

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
        )
        .then(function (res) {
          setMovies(res.data.results);
        });
    }, [pageNo]);
  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">
        Trending movies
        </div>

      <div className="flex flex-row flex-wrap justify-around gap-6 ">
        {movies.map((movieObj)=>{
          return <MovieCard key={movieObj.id} poster_path={movieObj.poster_path} name={movieObj.original_title} movieObj={movieObj} handleAddToWatchList={handleAddToWatchList} handleRemoveToWatchList={handleRemoveToWatchList} watchlist={watchlist}/>
        })}
        </div>

        <Pagination handleNext={handleNext} handlePrev={handlePrev} pageNo={pageNo}/>
    </div>
  );
}

export default Movies;
//https://api.themoviedb.org/3/movie/popular?api_key=ee24ce8ae5b422e235fd5c71450b8d6c&language=en-US&page=2
