interface Props {
  count: number;
  sort: string;
  onSortChange: (value: string) => void;
}

const Controls = ({ count, sort, onSortChange }: Props) => {
  return (
    <section className="controls container">
      <div className="filter-pill">
        Showing <strong>{count}</strong> movies
      </div>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="featured">Featured</option>
        <option value="short">Shortest</option>
        <option value="alpha">A → Z</option>
      </select>
    </section>
  );
};

export default Controls;
