import React, { useEffect, useState } from "react";
import genreids from "../Utility/genre";
function WatchList({ watchlist, setWatchList ,handleRemoveToWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All genres"]);
  const [currentGenre , setCurrentGenre] = useState("All genres")
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleCurrentGenre = (genre)=>{
    setCurrentGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList([...sortedIncreasing]);
  };
  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  let sortIncreasingPopularity = () => {
    let sortedIncreasingPopularity = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });

    setWatchList([...sortedIncreasingPopularity]);
  };
  let sortDecreasingPopularity = () => {
    let sortedDecreasingPopularity = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });

    setWatchList([...sortedDecreasingPopularity]);
  };

  useEffect(()=>{
    let temp = watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All genres' , ...temp])
    console.log(temp)
  },[watchlist])
  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre)=> {
          return <div onClick={()=>handleCurrentGenre(genre)} className={ currentGenre == genre ?"flex justify-center bg-blue-400 w-[9rem] h-[3rem] rounded-xl text-white font-bold items-center mx-4 hover:cursor-pointer" : "flex justify-center bg-gray-400/50 w-[9rem] h-[3rem] rounded-xl text-white font-bold items-center mx-4 hover:cursor-pointer"}>
          {genre}
        </div>
        })}
        
      </div>

      <div className="flex justify-center my-4">
        <input
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
          placeholder="Search movies"
          onChange={handleSearch}
          value={search}
        />
      </div>

      <div className="overflow-hidden rounded-lg  border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name </th>

              <th>
                <div className="flex flex-row justify-center">
                  <div
                    className="p-2 hover:cursor-pointer"
                    onClick={sortIncreasing}
                  >
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Rating</div>
                  <div
                    className="p-2 hover:cursor-pointer"
                    onClick={sortDecreasing}
                  >
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>

              <th>
                <div className="flex justify-center">
                  <div
                    className="p-2 hover:cursor-pointer"
                    onClick={sortIncreasingPopularity}
                  >
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Popularity</div>
                  <div
                    className="p-2 hover:cursor-pointer"
                    onClick={sortDecreasingPopularity}
                  >
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>

              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currentGenre == 'All genres'){
                return true
              }
              else{
                return genreids[movieObj.genre_ids[0]] == currentGenre
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      />
                      <div className="mx-10">{movieObj.original_title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    {/*
                    Code to load all genres if needed 
                    <td>
                      {movieObj.genre_ids.map((id) => genreids[id]).join(", ")}
                    </td>
                    */}

                    <td onClick={()=>{handleRemoveToWatchList(movieObj)}} className="text-red-800 font-bold hover:cursor-pointer">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
