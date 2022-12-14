import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import { auth, writeUserData, deleteUserData } from "../../firebase";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
  const [effect, setEffect] = useState(false);
  const [credits, setCredits] = useState([]);
  const [cast, setCast] = useState([]);

  // This function will be called when the URL path changes
  const handlePathnameChange = () => {
    setPathname(window.location.pathname);
  };
  const notifyFavouritesAlreadyExists = () =>
    toast("Movie already in your favourite list! ");

  const notifyAll = () =>
    toast(
      media_type === "tv"
        ? "TV Series added to favourites! "
        : "Movie added to favourites! "
    );
  const notifyFavourites = () =>
    toast(
      media_type === "tv"
        ? "TV Series removed from favourites! \n Please refresh the page!"
        : "Movie removed from favourites! \n Please refresh the page!"
    );
  const fetchCreditsAndCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=e9803bdbdf280847ae72bf418504e047&language=en-US`
    );
    setCredits(data.crew.filter(({job})=> job ==='Director'));
    setCast(data.cast);
  };

  // Use the useEffect hook to update the URL path state when the pathname changes
  useEffect(() => {
    window.addEventListener("popstate", handlePathnameChange);
    fetchCreditsAndCast();
    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  });

  // Use the pathname state to determine whether to show the button or not
  const showButton = pathname !== "/favourite";

  const AddtoFavs = async () => {
    await writeUserData(auth.currentUser.uid, id);
  };

  const RemoveFromFavs = async () => {
    await deleteUserData(auth.currentUser.uid, id);
  };

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

      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
      <div>Directors: </div>
      {Array.isArray(credits)
        ? credits.map((c) => (
            <p className=".media" key="{index}">
              {c.name}
            </p>
          ))
        : null}
      <div>
        {showButton && (
          <button
            className={`${
              effect && "animate-wiggle"
            } hover:text-red-500 hover:font-bold  font-semibold rounded-lg text-md px-3 py-2 cursor-pointer transition-all duration-500 ease-in w-full text-center text-base`}
            onClick={() => {
              AddtoFavs();
              setEffect(true);
              notifyAll();
            }}
            onAnimationEnd={() => setEffect(false)}
          >
            Add to favourites ????
          </button>
        )}
        {pathname === "/favourite" ? (
          <button
            className={`${
              effect && "animate-wiggle"
            } hover:text-red-500 hover:font-bold  font-semibold rounded-lg text-md px-3 py-2 cursor-pointer  transition-all duration-500 ease-in w-full text-center text-base`}
            onClick={() => {
              RemoveFromFavs();
              setEffect(true);
              notifyFavourites();
            }}
            onAnimationEnd={() => setEffect(false)}
          >
            Remove from favourites ????
          </button>
        ) : (
          ""
        )}
      </div>
      <div>Directors: </div>
      {Array.isArray(credits) ? credits.map((c) => (
        <b key="{index}">{c.name}</b>
      )) : null}
      <div>Cast: </div>
      {Array.isArray(cast) ? cast.slice(0,5).map((c) => (
        <b key="{index}">{c.name}</b>
      )) : null}
    </div>
  );
};

export default SingleContent;
