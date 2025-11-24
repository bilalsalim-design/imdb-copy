import "./ListningPanel.css";
import IconButton from "@mui/material/IconButton";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import MovieList from "./MovieList";
import { useState , useEffect} from "react";
import { Links } from "../Links";
import { GetData } from "../GetData";

export default function () {

    const[sortingType , setSortingType] = useState("movie");
    const[listeOfMovie,setListOfMovie] = useState([]);
    const[isLoading , setIsLoading] = useState();
    const[isACS , setIsASC] = useState(true);

    function handleChange(event){
        console.log(event.target.value);
        setSortingType(event.target.value);
        if(!isACS){
          setIsASC(!isACS);
        }
    }

    function handleEvent(){
      setIsASC(!isACS)
    }

    useEffect(() => {async function listingMovie()
    {
      setIsLoading(true);
      const name=Links.find((data)=>data.name===sortingType);
      const movies = await GetData(isACS ? name.url : name.DESCurl);
      setListOfMovie(movies);
      setIsLoading(false);
    }

    listingMovie();
  },[sortingType,isACS])

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
      <MovieList movies={listeOfMovie} loading={isLoading}/>
    </div>
  );
}
