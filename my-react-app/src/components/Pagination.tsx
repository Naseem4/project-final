type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div className="cinema-pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>
        &lt;
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button onClick={onNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;