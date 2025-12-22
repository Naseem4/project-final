interface Props {
  active: string;
  onChange: (genre: string) => void;
}

const genres = ["", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance"];

const Categories = ({ active , onChange }: Props) => {
  return (
    <section className="categories">
      {genres.map((g) => (
        <button
          key={g || "all"}
          className={`cat ${active === g ? "active" : ""}`}
          onClick={() => onChange(g)}
        >
          {g || "All"}
        </button>
      ))}
    </section>
  );
};

export default Categories;
