import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { getUserLodges } from "../../services/lodge.service";
import { IUserLodge, UserLodgeCard } from "../../components/UserLodgeCard";
import { Link } from "react-router-dom";
import showNotification from "../../components/GlobalAlert";

export const UserLodges = () => {
  const [lodges, setLodges] = useState<IUserLodge[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const result = await getUserLodges();
      setLodges(result.data);
      setLoading(false);
    } catch (error) {
      showNotification("danger", "Não foi possível buscar os anúncios");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between my-3'>
        <h1 className='m-0'>Meus anúncios</h1>
        <Link to={"create"} className='btn btn-secondary'>
          + novo anúncio
        </Link>
      </div>
      {lodges.length ? (
        <div>
          {lodges.map((lodge, i) => (
            <UserLodgeCard key={i} lodge={lodge} onDelete={handleFetch} />
          ))}
        </div>
      ) : (
        <div className='text-center my-5'>
          Você não tem nenhum anúncio de acomodação. <br />
          <Link to={"create"} className='btn btn-secondary mt-3'>
            + criar anúncio
          </Link>
        </div>
      )}
    </div>
  );
};
