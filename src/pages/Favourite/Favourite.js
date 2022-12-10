import { auth, getuserFavorites } from "../../firebase";
import axios from "axios";
import { useEffect,useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Favourite.css";

const Favourite = () => {
  
  const [content, setContent] = useState();

  const fetchMovies = async () => {
    const data = await getuserFavorites(auth.currentUser.uid);
    var moviesArray=[];
    for (const element of data) {
      
        await axios.get(
        `https://api.themoviedb.org/3/movie/${element}?api_key=${process.env.REACT_APP_API_KEY}&external_source=imdb_id`
     
      ).then((res)=>{
        if(res.status==200){
          moviesArray.push(res.data);
        }
       
      }).catch((e)=>console.log(e));
      
    }
    setContent(moviesArray);
  };

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  return (
    <div>
      <button className="bg-violet-300 rounded-md" onClick={fetchMovies}>
        Add to favourites
        
      </button>
      <div className="favourites">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.backdrop_path}
              title={c.title}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average}
            />
            
          ))}
      </div>
      
    </div>
  );
};

export default Favourite;
