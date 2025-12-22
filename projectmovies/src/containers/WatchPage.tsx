
  const [activeGenre, setActiveGenre] = useState("");
  function handleGenreChange(g: string) {
    setActiveGenre(g);
  }

  const API_URL ="https://mocki.io/v1/a74b6ea8-4d31-4e4e-a046-2f38ab864f7b";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);


  // ============= PAGINATION =========
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);


  // ===== Watch Modal ====
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // ========== FETCH ==========
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetch(API_URL)
          .then((res) => res.json());
      setMovies(data);
      setFilteredMovies(data);
    };

    fetchMovies();
  }, []);

  // ========== FILTER ==========
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

    // تحديث النتائج
    setFilteredMovies(list);

    // رجّع الصفحة لأول صفحة عند أي تغيير
    setCurrentPage(1);

  }, [movies, search, activeGenre]);




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

        

      </div>
  );
};
export default WatchPage;