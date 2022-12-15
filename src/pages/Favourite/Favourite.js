import { auth, getuserFavorites,getCurrentUser } from "../../firebase";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { useEffect,useState, compo } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Favourite.css";

const Favourite = () => {
  
  const [content, setContent] = useState();

  const fetchFavourites = async () => {
    if(auth.currentUser){
      //DDDD
      const currectUser=await getCurrentUser();
      const data = await getuserFavorites(currectUser.uid);
      var moviesArray=[];
      for (const element of data) {
        
          await axios.get(
          `https://api.themoviedb.org/3/movie/${element}?api_key=e9803bdbdf280847ae72bf418504e047&external_source=imdb_id`
       
        ).then((res)=>{
          if(res.status==200){
            moviesArray.push(res.data);
          }
         
        }).catch((e)=>console.log(e));
        
      }
      setContent(moviesArray);
    }
    
  };

 

  useEffect(() => {
   
    fetchFavourites();
   
  }, [UserAuth()]);



  return (
    <div>
     
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
