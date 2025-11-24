import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./RatingArea.css";
export default function RatingArea({ movieName }) {
  const [ratingValue, setRatingValue] = useState(1);

  function HandleEvent(event) {
    setRatingValue(event.target.value);
  }
  function HandleClose() {
    const dialogss = document.getElementById("movieDetailsDialog");
    dialogss.close();
  }

  return (
    <div className="rating">
            <div className="rating-closing-button">
        <IconButton sx={{ size: "large" }} onClick={HandleClose}>
          <CloseIcon sx={{ color: "#ffffffff" }} />
        </IconButton>
      </div>
      <div className="rating-star">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon
            points="50,0 65,35 100,35 75,60 85,95 50,75 15,95 25,60 0,35 35,35"
            fill="#5799ef"
            stroke-width="2"
          />
         <text x="50" y="55" font-size="15" text-anchor="middle" fill="white">{ratingValue}</text>
       </svg>
      </div>

      <div className="rating-panel">
        <p>RATE THIS</p>
        <h3>{movieName}</h3>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={1}
            max={10}
            size="large"
            onChange={HandleEvent}
            sx={{
              color: "#4e91eaff",
              "& .MuiRating-iconEmpty": {
                color: "#858585ff",
                fill: "transparent",
              },
            }}
          />
        </Stack>
        <Button variant="contained">Rate</Button>
      </div>
    </div>
  );
}
