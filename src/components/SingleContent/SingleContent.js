import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { auth, removeFromFavourites, writeUserData } from "../../firebase";
import { Movie } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {

    // Use the useState hook to create a state for the URL path
    const [pathname, setPathname] = useState(window.location.pathname);
    const [credits, setCredits] = useState([]);

      // This function will be called when the URL path changes
  const handlePathnameChange = () => {
    setPathname(window.location.pathname);
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=e9803bdbdf280847ae72bf418504e047&language=en-US`
    );
    setCredits(data.crew.filter(({job})=> job ==='Director'));
  };

  // Use the useEffect hook to update the URL path state when the pathname changes
  useEffect(() => {
    window.addEventListener('popstate', handlePathnameChange);
    fetchCredits();
    return () => {
      window.removeEventListener('popstate', handlePathnameChange);
    };
  }, []);

  // Use the pathname state to determine whether to show the button or not
  const showButton = pathname != '/favourite';

  const AddtoFavs = () => {
    writeUserData(auth.currentUser.uid, id);
  }
  
  return (
    <div className="media" media_type={media_type} id={id}>
      <Badge
        badgeContent={Math.round(vote_average * 10) / 10}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      {showButton&&<button className="bg-violet-300 rounded-md" onClick={AddtoFavs}>Add to favourites</button>}
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
      <div>Directors: </div>
      {Array.isArray(credits) ? credits.map((c) => (
        <b key="{index}">{c.name}</b>
      )) : null}
    </div>
  );
};

export default SingleContent;
