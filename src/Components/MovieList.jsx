import { useState, useEffect, useRef, memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";
import unloadedImage from "./../assets/UnloadedImage.png";
import MovieDetails from "./MovieDetails";
import RatingArea from "./RatingArea";
import { Links } from "../Links";
import { GetData } from "../GetData";
import "./MovieList.css";

export default function MovieList({ isACS, sortingType }) {
  const [selectedMovie, setSelecetedMovie] = useState(undefined);
  const [isGetting, setIsGetting] = useState();
  const [ratingMovie, setRatingMovie] = useState(undefined);
  const {
    data: movies,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["post", sortingType + (isACS ? "ASC" : "DESC")],
    queryFn: ({ pageParam }) => {
      const name = Links.find((data) => data.name === sortingType);
      const url = isACS ? name.url : name.DESCurl;
      const pageToken = "&pageToken=";
      const finalUrl = pageParam ? url + pageToken + pageParam : url;

      return GetData(finalUrl);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPageToken || undefined;
    },
    initialPageParam: undefined,
  });
  const listeOfMovie = movies?.pages.flatMap((page) => page.titles) || [];

  function handleEvent(movieData) {
    setRatingMovie(undefined);
    setSelecetedMovie(movieData);
    const dialog = document.getElementById("movieDetailsDialog");
    dialog.showModal();
  }

  function HanleRating(name) {
    setSelecetedMovie(undefined);
    setRatingMovie(name);
    const dialog = document.getElementById("movieDetailsDialog");
    dialog.showModal();
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isAtBottom && hasNextPage && !isFetchingNextPage) {
        setIsGetting(true);
        fetchNextPage();
        setIsGetting(false);

      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  function Listing({ movieData }) {
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
  }

  const MovieDetailsListing = memo(Listing);
  return (
    <div className="movielist">
      {!isLoading && (
        <ul>
          {listeOfMovie.map((movie, index) => (
            <MovieDetailsListing movieData={movie} key={movie.id} />
          ))}
          {isGetting && (
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                margin: "auto",
                marginTop: "5rem",
                marginBottom: "5rem",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </ul>
      )}
      {isLoading && (
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
        {ratingMovie && <RatingArea movieName={ratingMovie} />}
      </dialog>
    </div>
  );
}
