import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";
import { deleteLodge } from "../../services/lodge.service";
import { useState } from "react";
import showNotification from "../GlobalAlert";
import { Lodge } from "../../types/lodge.types";

export interface IUserLodge extends Lodge {}

export const UserLodgeCard = ({
  lodge,
  onDelete,
}: {
  lodge: IUserLodge;
  onDelete: () => void;
}) => {
  const { title, description, location, institution, distanceFromInstitution } =
    lodge;

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja apagar esta acomodação?"
    );
    if (confirm) {
      setLoading(true);
      try {
        await deleteLodge(lodge.id);
        showNotification("success", "Apagado com sucesso");
        onDelete();
      } catch (error) {
        showNotification("danger", "Não foi possível apagar");
      }
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Card className='user-lodge-card'>
        <div className='text-center'>
          <Spinner />
        </div>
      </Card>
    );

  return (
    <Card className='user-lodge-card'>
      <div className='row'>
        <div className='col-md-3'>Imagem</div>
        <div className='col-md-4'>
          <b>{title}</b>
          <p className='description'>{description}</p>
          <p>
            {location?.address} {location?.district}
            <br />
            {location?.city} - {location?.state}
          </p>
        </div>
        <div className='col-md-3'>
          <p>
            {institution?.name}
            {distanceFromInstitution && ` (${distanceFromInstitution} km)`}
          </p>
        </div>
        <div className='col-md-2'>
          <div className='gap-2 d-flex justify-content-end'>
            <Button size='sm' variant='danger' onClick={handleDelete}>
              <i className='bi bi-trash'></i>
            </Button>
            <Link
              to={"edit"}
              state={{ lodge }}
              className='btn btn-sm btn-primary'
            >
              <i className='bi bi-pencil-square'></i>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
