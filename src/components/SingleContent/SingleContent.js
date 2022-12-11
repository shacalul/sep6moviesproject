import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { auth, writeUserData } from "../../firebase";
import { Movie } from "@mui/icons-material";
import { useState, useEffect } from "react";

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

      // This function will be called when the URL path changes
  const handlePathnameChange = () => {
    setPathname(window.location.pathname);
  };

  // Use the useEffect hook to update the URL path state when the pathname changes
  useEffect(() => {
    window.addEventListener('popstate', handlePathnameChange);
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
    </div>
  );
};

export default SingleContent;
