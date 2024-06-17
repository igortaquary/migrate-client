interface IPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}

export const Pagination = ({}: IPagination) => {
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-center'>
        <li className='page-item disabled'>
          <a className='page-link' href='#' tabIndex={-1}>
            &#11207;
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#'>
            1
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#'>
            2
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#'>
            3
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' href='#'>
            &#11208;
          </a>
        </li>
      </ul>
    </nav>
  );
};
