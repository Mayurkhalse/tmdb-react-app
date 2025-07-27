import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  let [watchlist,setWatchList] = useState([])
  let handleAddToWatchList = (movieObj) =>{
      let newWatchlist = [...watchlist,movieObj];
      localStorage.setItem("movieApp", JSON.stringify(newWatchlist))
      setWatchList(newWatchlist)
      console.log(newWatchlist);
  }

  let handleRemoveToWatchList = (movieObj) =>{

    let filteredWatchList = watchlist.filter((movie) => 
    {return movie.id != movieObj.id})
    localStorage.setItem("movieApp",JSON.stringify(filteredWatchList))
    setWatchList(filteredWatchList)
    console.log(filteredWatchList);
  }

  useEffect(()=>{
    let movieSFromLocalStorage = localStorage.getItem("movieApp");
    if(!movieSFromLocalStorage)
    {
      return
    }

    setWatchList(JSON.parse(movieSFromLocalStorage))
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /><Movies handleAddToWatchList={handleAddToWatchList} handleRemoveToWatchList={handleRemoveToWatchList} watchlist={watchlist} /> 
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveToWatchList={handleRemoveToWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

