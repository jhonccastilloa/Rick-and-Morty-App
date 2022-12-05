import "./styles/pagination.css";

interface PaginationProps {
  numPagination: number[];
  setStatePagination: (value: number) => void;
  statePagination: number;
}
const Pagination = ({
  numPagination,
  setStatePagination,
  statePagination,
}: PaginationProps) => {
  const nextPagination = () => {
    if (statePagination < numPagination.length - 1)
      setStatePagination(statePagination + 1);
  };
  const prevPagination = () => {
    if (statePagination > 0) setStatePagination(statePagination - 1);
  };
  return (
    <>
      <ul className="pagination__list">
        {statePagination !== 0 && (
          <li className="pagination__item" onClick={prevPagination}>
            <a href="#cards" className="pagination__link">
              {"<<"}
            </a>
          </li>
        )}
        {numPagination.map((el, i) => (
          <li
            className={`pagination__item ${
              el === statePagination + 1 && "pagination--active"
            }`}
            onClick={() => setStatePagination(i)}
          >
            <a href="#cards" className="pagination__link">
              {" "}
              {el}
            </a>
          </li>
        ))}
        {statePagination !== numPagination.length - 1 && (
          <li className="pagination__item" onClick={nextPagination}>
            <a href="#cards" className="pagination__link">
              {">>"}
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;
