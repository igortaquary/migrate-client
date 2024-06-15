import { Layout } from "../../components/Layout";

export const Home = () => {
  return (
    <main>
      <section>
        <h1>Encontre o lugar certo para morar na sua nova cidade</h1>
      </section>
      <section>
        <nav aria-label='Page navigation example'>
          <ul className='pagination justify-content-center'>
            <li className='page-item disabled'>
              <a className='page-link' href='#' tabIndex={-1}>
                Previous
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
                Next
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
};
