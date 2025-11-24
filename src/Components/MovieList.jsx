import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";
import unloadedImage from "./../assets/UnloadedImage.png";
import MovieDetails from "./MovieDetails";
import RatingArea from "./RatingArea";
import "./MovieList.css";

export default function MovieList({ movies, loading }) {
  const [selectedMovie, setSelecetedMovie] = useState(undefined);
  const [ratingMovie , setRatingMovie] =useState(undefined)

  function handleEvent(movieData) {
    setRatingMovie(undefined);
    setSelecetedMovie(movieData);
    const dialog = document.getElementById("movieDetailsDialog");
    dialog.showModal();
  }

  function HanleRating(name){
    setSelecetedMovie(undefined);
    setRatingMovie(name);
    const dialog = document.getElementById("movieDetailsDialog");
    dialog.showModal();
  }

  function Listing() {
    return movies.map((movieData) => {
      const runTimeInSeconds = movieData.runtimeSeconds || 0;
      const hour = Math.floor(runTimeInSeconds / 3600);
      const miniute = Math.floor(runTimeInSeconds / 3600 / 60);
      const imageUrl = movieData.primaryImage?.url
        ? movieData.primaryImage?.url
        : unloadedImage;
      return (
        <li key={movieData.id}>
          <div className="movie">
            <img src={imageUrl} />
            <div className="movieDiscription">
              <h3 className="movieName">{movieData.originalTitle}</h3>
              <p>
                {movieData.startYear} &nbsp; &nbsp;{`${hour}h  ${miniute}m`}
              </p>
              <p>
                <StarIcon sx={{ fontSize: 18, color: "rgb(214, 214, 12)" }} />
              </p>
              <div className="movieDiscription-buttons">
                <Button
                  sx={{
                    fontSize: "14px",
                    textTransform: "none",
                    gap: "6px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 123, 255, 0.2)",
                    },
                  }}
                  onClick={() => HanleRating(movieData.primaryTitle)}
                >
                  <StarBorderIcon sx={{ fontSize: "15px" }} /> Rate
                </Button>
                <Button
                  sx={{
                    fontSize: "14px",
                    textTransform: "none",
                    borderRadius: "20px",
                    gap: "6px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 123, 255, 0.2)",
                    },
                  }}
                >
                  <RemoveRedEyeOutlinedIcon sx={{ fontSize: "18px" }} /> Mark as
                  Read
                </Button>
              </div>
            </div>
            <IconButton
              color="primary"
              fontSize="small"
              onClick={() => {
                handleEvent(movieData);
              }}
            >
              <InfoOutlineIcon />
            </IconButton>
          </div>
        </li>
      );
    });
  }

  return (
    <div className="movielist">
      {!loading && <ul>{Listing()}</ul>}
      {loading && (
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            margin: "auto",
            marginTop: "5rem",
            marginBottom: "5rem",
          }}
        >
          <LinearProgress color="primary" sx={{ flexGrow: "1" }} />
        </Box>
      )}
      <dialog id="movieDetailsDialog">
        {selectedMovie && <MovieDetails movieDetails={selectedMovie} />}
        {ratingMovie && <RatingArea movieName ={ratingMovie}/>}
      </dialog>
     
    </div>
  );
}
