import { Pagination } from "../../components/Pagination";

export const Lodges = () => {
  const data = {
    currentPage: 1,
    lastPage: 1,
    prevPage: 0,
    nextPage: 1,
  };
  return (
    <main>
      <h1>Acomodações</h1>
      <div></div>
      <Pagination
        currentPage={data.currentPage}
        lastPage={data.lastPage}
        nextPage={data.nextPage}
        prevPage={data.prevPage}
      />
    </main>
  );
};
