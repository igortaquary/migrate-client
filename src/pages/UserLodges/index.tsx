import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { getUserLodges } from "../../services/lodge.service";
import { IUserLodge, UserLodgeCard } from "../../components/UserLodgeCard";
import { Link } from "react-router-dom";

export const UserLodges = () => {
  const [lodges, setLodges] = useState<IUserLodge[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const result = await getUserLodges();
      setLodges(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className='my-3'>Meus anúncios</h1>
      {lodges.length ? (
        <div>
          {lodges.map((lodge) => (
            <UserLodgeCard lodge={lodge} />
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
