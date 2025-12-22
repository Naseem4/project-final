import { useState, useEffect } from "react";

import Nav from "../components/Nav";
import Header from "../components/Header";
import Categories from "../components/Categories";
import MoviesGrid from "../components/MoviesGrid"; 
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import CardWatch from "../components/CardWatch";

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

const WatchPage = () => {
  const [search, setSearch] = useState("");
  function handleSearchChange(value: string) {
    setSearch(value);
  }

  const [activeGenre, setActiveGenre] = useState("");
  function handleGenreChange(g: string) {
    setActiveGenre(g);
  }

  const API_URL ="https://mocki.io/v1/a74b6ea8-4d31-4e4e-a046-2f38ab864f7b";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // ================== PAGINATION ==================
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // ===== Watch Modal =====
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // ================== FETCH ==================
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetch(API_URL)
        .then((res) => res.json());
      setMovies(data);
      setFilteredMovies(data);
    };

    fetchMovies();
  }, []);

  // ================== FILTER ==================
  useEffect(() => {
    let list = [...movies];

    if (activeGenre) {
      list = list.filter((m) => m.genres.includes(activeGenre));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genres.join(" ").toLowerCase().includes(q)
      );
    }

    setFilteredMovies(list);
    setCurrentPage(1); // مهم: نرجع لأول صفحة
  }, [movies, search, activeGenre]);

  // ================== PAGINATION LOGIC ==================
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedMovies = filteredMovies.slice(start, end);

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  // ================== WATCH ==================
  const handleWatch = (movie: Movie) => {
    console.log("WATCH MOVIE:", movie);
    setSelectedMovie(movie);
  };


  

  return (
    
    <div className="app">
            

      <Nav
        search={search}
        onSearchChange={handleSearchChange}
        
      />

      <Header />

      <Categories
        activeGenres={activeGenre}
        onChange={handleGenreChange}
      />

      {/* الأفلام */}
      <MoviesGrid movies={paginatedMovies} onWatch={handleWatch} />

      {/* الباجينيشن */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <Footer />

      {selectedMovie && (
        <CardWatch
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  );
};

export default WatchPage;