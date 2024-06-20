import { useEffect, useState } from "react";
import { IPagination, Pagination } from "../../components/Pagination";
import { searchLodges } from "../../services/lodge.service";
import { Loader } from "../../components/Loader";
import { LodgeCard } from "../../components/LodgeCard";
import { useSearchParams } from "react-router-dom";
import "./index.scss";
import { SearchFilters } from "../../components/SearchFilters";

export const Lodges = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [lodges, setLodges] = useState([]);
  const [pageData, setPageData] = useState<IPagination>({
    currentPage: 1,
    lastPage: 0,
    nextPage: 0,
    prevPage: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    const result = await searchLodges(searchParams);
    setLodges(result.data.data);
    console.log(result.data);

    setPageData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams]);

  if (loading) return <Loader />;

  return (
    <main>
      <h1 className='my-3'>Acomodações</h1>
      <SearchFilters />
      {}
      {lodges.length ? (
        <div className='lodges-grid mb-4'>
          {lodges.map((lodge, i) => (
            <LodgeCard key={i} lodge={lodge} />
          ))}
        </div>
      ) : (
        <div className='text-dark text-center my-5'>
          Nenhuma acomodação encontrada com esses filtros
        </div>
      )}
      <Pagination
        currentPage={pageData.currentPage}
        lastPage={pageData.lastPage}
        nextPage={pageData.nextPage}
        prevPage={pageData.prevPage}
        setSearchParams={setSearchParams}
      />
    </main>
  );
};
