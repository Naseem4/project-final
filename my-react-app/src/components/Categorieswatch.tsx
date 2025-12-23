const GENRES = ["", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance"];

type CategoriesProps = {
  activeGenres: string;
  onChange: (g: string) => void;
};

const Categories = ({ activeGenres, onChange }: CategoriesProps) => {
  return (
    <section className="cinema-categories" aria-label="Categories">
      {GENRES.map((g) => (
        <button
          key={g || "all"}
          className={'cinema-cat ${activeGenres === g ? "cinema-cat-active" : ""}'}
          data-genre={g}
          onClick={() => onChange(g)}
        >
          {g === "" ? "All" : g}
        </button>
      ))}
    </section>
  );
};

export default Categories;