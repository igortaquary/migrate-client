export interface IPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}

export const Pagination = ({
  currentPage,
  lastPage,
  nextPage,
  prevPage,
  setSearchParams,
}: IPagination & {
  setSearchParams: (a: any) => void;
}) => {
  const handlePageChange = (page: number) => {
    console.log("handlePageChange");

    setSearchParams((prev: any) => ({ ...prev, page }));
  };
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-center'>
        <li className={"page-item" + (!prevPage ? " disabled" : "")}>
          <button
            className='page-link'
            type='button'
            onClick={() => handlePageChange(prevPage)}
            disabled={!prevPage}
          >
            &#11207;
          </button>
        </li>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((p, i) => (
          <button
            key={i}
            className={`page-link ${p === currentPage ? " active" : ""}`}
            type='button'
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}

        <li className={"page-item" + (!nextPage ? " disabled" : "")}>
          <button
            className='page-link'
            type='button'
            onClick={() => handlePageChange(nextPage)}
            disabled={!nextPage}
          >
            &#11208;
          </button>
        </li>
      </ul>
    </nav>
  );
};
