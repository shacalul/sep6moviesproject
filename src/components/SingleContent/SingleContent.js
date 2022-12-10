import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { auth, writeUserData } from "../../firebase";
import { Movie } from "@mui/icons-material";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {

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
      <button className="bg-violet-300 rounded-md" onClick={AddtoFavs}>Add to favourites</button>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
