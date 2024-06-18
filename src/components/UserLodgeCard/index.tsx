import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";
import { deleteLodge } from "../../services/lodge.service";
import { useState } from "react";
import showNotification from "../GlobalAlert";

export interface IUserLodge {
  id: string;
  title: string;
  description: string;
}

export const UserLodgeCard = ({
  lodge,
  onDelete,
}: {
  lodge: IUserLodge;
  onDelete: () => void;
}) => {
  const { title, description } = lodge;

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja apagar esta acomodação?"
    );
    if (confirm) {
      try {
        await deleteLodge(lodge.id);
        showNotification("success", "Apagado com sucesso");
        onDelete();
      } catch (error) {
        showNotification("danger", "Não foi possível apagar");
      }
    }
  };

  return (
    <Card className='user-lodge-card'>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-5'>
          <b>{title}</b>
          <p>{description}</p>
        </div>
        <div className='col-md-4'>
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
