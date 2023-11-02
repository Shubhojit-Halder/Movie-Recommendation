import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [movie, setMovie] = useState("Avatar");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [AllMovies, setAllMovies] = useState([]);
  const [search, setSearch] = useState(false);
  const getMovieList = async () => {
    try {
      const res = await axios.get("http://localhost:5000");
      // console.log(res);
      setAllMovies(res.data);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${movie}`);
        setRecommendedMovies(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getRecommendation();
  }, [movie]);
  console.log(recommendedMovies);

  return (
    <>
      <label>Choose a movie:</label>

      <select value={movie} onChange={(e) => setMovie(e.target.value)}>
        {AllMovies != [] &&
          Object.values(AllMovies).map((data, idx) => {
            return (
              <option value={data} key={idx}>
                {data}
              </option>
            );
          })}
      </select>
      {recommendedMovies != [] &&
        recommendedMovies.map((data, idx) => {
          return (
            <option value={data} key={idx}>
              {data}
            </option>
          );
        })}
    </>
  );
};

export default App;
