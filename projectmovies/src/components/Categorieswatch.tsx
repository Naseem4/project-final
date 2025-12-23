const GENRES = ["", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance"];

type Props = {
    activeGenres: string;
    onChange: (g: string) => void;
};

const Categories=({ activeGenres, onChange }: Props)=> {
    return (
        <section className="categories" aria-label="Categories">
            {GENRES.map((g) => (
                <button
                    key={g || "all"} className={`cat ${activeGenres === g ? "active" : ""}`} data-genre={g}
                    onClick={() => onChange(g)}> {g === "" ? "All" : g}
                </button>
            ))}
        </section>
    );
}

export default Categories;