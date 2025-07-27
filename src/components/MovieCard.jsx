import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddToWatchList,
  handleRemoveToWatchList,
  watchlist,
}) {
  function isContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[150px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {isContain(movieObj) ? (
        <div
          className="m-2 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
          onClick={() => {
            handleRemoveToWatchList(movieObj);
          }}
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => {
            handleAddToWatchList(movieObj);
          }}
          className="m-2 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-center w-full bg-gray-900/60 text-xl p-2 ">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
