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
  const [lengthOfList, setlengthOfList] = useState(0);
  const [nextPageData, setNextPageData] = useState();

  let listeOfMovie = useRef([]);
  const [ratingMovie, setRatingMovie] = useState(undefined);
  const isACSValue = isACS ? "ASC" : "DESC";
  const name = Links.find((data) => data.name === sortingType);
  const url = isACS ? name.url : name.DESCurl;
  // Remove these:
// const { data: movies, isLoading, isSuccess } = useQuery({ ... });
// let fetchedData = useRef(undefined);
// let listeOfMovie = useRef([]); 
// const [lengthOfList, setlengthOfList] = useState(0);

// Use this hook at the top level of your component:
const {
    data : movies, // This will be an object containing all pages
    error,
    fetchNextPage, // The function to call when the user scrolls down
    hasNextPage, // Boolean: true if there is a nextPageToken
     isLoading,
    isFetchingNextPage, // Boolean: true while loading the next page
    status,
    isSuccess
} = useInfiniteQuery({
    queryKey: ["post", sortingType + (isACS ? "ASC" : "DESC")],
    queryFn: ({ pageParam }) => {
        // Find the base URL
        const name = Links.find((data) => data.name === sortingType);
        const url = isACS ? name.url : name.DESCurl;
        const pageToken = "&pageToken=";

        // Append the pageParam (which is the nextPageToken) if it exists
        const finalUrl = pageParam ? url + pageToken + pageParam : url;
        
        return GetData(finalUrl);
    },
    // This function tells React Query how to get the 'nextPageToken'
    // from the previous page's response.
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPageToken || undefined;
    },
    initialPageParam: undefined, // Start without a page token
});
    if (movies) {
    listeOfMovie.current = movies?.pages.flatMap(page => page.titles) || [];
    setNextPageData(movies.nextPageToken || null);
  }
  useEffect(()=>{    setlengthOfList(listeOfMovie.current.length);
},[listeOfMovie.current.length])


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

  /* useEffect(() => {
    const handleScroll =  () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const threshold = 1;
      if (
        scrollTop + clientHeight >= scrollHeight - threshold &&
        nextPageData
      ) {
        setIsGetting(true);
        const name = Links.find((data) => data.name === sortingType);
        const url = isACS ? name.url : name.DESCurl;
        const isACSValue = isACS ? "ASC" : "DESC";
        const pageToken = "&pageToken=";
        const {
          data: balanceMovies,
          isLoading: isGetting,
        } = useQuery({
          queryKey: ["post", sortingType + isACSValue + nextPageData],
          queryFn: () => GetData(url + pageToken + nextPageData),
        });

        let list = balanceMovies.titles;
        setNextPageData(balanceMovies.nextPageToken);
        listeOfMovie.current.push(...list);
        setlengthOfList(listeOfMovie.current.length);
        setIsGetting(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isACS, sortingType]); */

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
          {listeOfMovie.current.slice(0, lengthOfList).map((movie, index) => (
            <MovieDetailsListing movieData={movie} key={index} />
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
