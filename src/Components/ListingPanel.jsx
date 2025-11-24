import "./ListningPanel.css";
import IconButton from "@mui/material/IconButton";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import MovieList from "./MovieList";
import { useState } from "react";

export default function () {

    const[sortingType , setSortingType] = useState("movie");
    const[isACS , setIsASC] = useState(true);

    function handleChange(event){
        setSortingType(event.target.value);
        if(!isACS){
          setIsASC(!isACS);
        }
    }

    function handleEvent(){
      setIsASC(!isACS)
    }



  return (
    <div className="listingPanel">
      <h2>IMDB Charts</h2>
      <h1>IMDb Top 250 movies</h1>
      <p>As rated by regular IMDb voters.</p>
      <div className="sorting">
        <label>Sort By</label>
        <select onChange={handleChange}>
          <option value="rating">Rating</option>
          <option value="release">Release Date</option>
          <option value="ratingCount">Number of ratings</option>
          <option value="year">Year</option>
          <option value="popularity">Popularity</option>
        </select>
        <IconButton color="primary" fontSize="medium" onClick={handleEvent}>
             {isACS&& <SouthIcon />}
             {!isACS && <NorthIcon />}
        </IconButton>
      </div>
      <MovieList isACS={isACS} sortingType={sortingType}/>
    </div>
  );
}
