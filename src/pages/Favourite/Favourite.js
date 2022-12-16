import { auth, getuserFavorites, getCurrentUser } from "../../firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Favourite.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { UserAuth } from "../../context/AuthContext";

const Favourite = () => {
  const [content, setContent] = useState();
  const [setPage] = useState(1);
  const [numOfPages] = useState();
  const user = UserAuth();

  const fetchFavourites = async () => {
    if (auth.currentUser) {
      const currectUser = await getCurrentUser();
      const data = await getuserFavorites(currectUser.uid);

      var moviesArray = [];
      for (const element of data) {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${element}?api_key=e9803bdbdf280847ae72bf418504e047&external_source=imdb_id`
          )
          .then((res) => {
            if (res.status === 200) {
              moviesArray.push(res.data);
            }
          })
          .catch((e) => console.log(e));
      }
      setContent(moviesArray);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [user]);

  return (
    <div>
      <div className="favourites">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Favourite;
