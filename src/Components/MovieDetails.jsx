import "./MovieDetails.css";
import unloadedImage from "./../assets/UnloadedImage.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function MovieDetails({ movieDetails }) {
  const runTimeInSeconds = movieDetails.runtimeSeconds || 0;
  const hour = Math.floor(runTimeInSeconds / 3600);
  const miniute = Math.floor(runTimeInSeconds / 3600 / 60);
  const imageUrl = movieDetails.primaryImage?.url
    ? movieDetails.primaryImage?.url
    : unloadedImage;
  function  handleButtonClick(){
    const dialog = document.getElementById('movieDetailsDialog');
    dialog.close();
  }

  return (
    <div className="details">
      <div className="closing-button">
        <IconButton aria-label="fingerprint" sx={{size : "large"}} onClick={handleButtonClick}>
          <CloseIcon sx={{color : "#ffffffff"}}/>
        </IconButton>
      </div>
      <div className="details-general">
        <img src={imageUrl} />
        <div className="details-general-name">
          <h3>{movieDetails.originalTitle}</h3>
          <p>
            {movieDetails.startYear} &nbsp; &nbsp;{`${hour}h  ${miniute}m`}
          </p>
          <p>
            {movieDetails.genres &&
              movieDetails.genres.map((gender) => gender + "  ")}
          </p>
        </div>
      </div>
      <div className="details-general-Description">
        <p>{movieDetails.plot}</p>
      </div>
      <div className="details-general-buttons">
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#383636ff",
            color: "#5799ef",
            width : "50%"
          }}
        >
          <PlayArrowIcon />
          Trailer
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#383636ff",
            color: "#5799ef",
            width : "50%"
          }}
        >
          <AddIcon />
          Watchlist
        </Button>
      </div>
    </div>
  );
}
