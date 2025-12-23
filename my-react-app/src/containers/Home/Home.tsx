import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Controls from "../../components/Controls";
import MoviesGrid from "../../components/MovieGrid";
import Modal from "../../components/Modal";
import Footer from "../../components/Footer";
import "./Home.css";

export interface Movie {
  id: number;
  title: string;
  genres: string[];
  length: number;
  rating: string;
  lang: string;
  poster: string;
  trailer: string;
  desc: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeGenre, setActiveGenre] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/dbdf6d11-8b67-4fca-8602-fa905dbcca89") 
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  const filteredMovies = movies
    .filter(
      (m) =>
        (!activeGenre || m.genres.includes(activeGenre)) &&
        (!search ||

          (m.title + m.genres.join(" ") + m.desc)
            .toLowerCase()
            .includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "short") return a.length - b.length;
      if (sort === "alpha") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="app">
      <Header search ={search} onSearchChange={setSearch} />
      <Hero />
      <Categories active={activeGenre} onChange={setActiveGenre} />
      <Controls
        count={filteredMovies.length}
        sort={sort}
        onSortChange={setSort}
      />
      <MoviesGrid
        movies={filteredMovies}
        onAction={(movie, action) => {
          if (action === "details") setSelectedMovie(movie);
       
        }}
      />
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <Footer />
    </div>
  );
};

export default Home;