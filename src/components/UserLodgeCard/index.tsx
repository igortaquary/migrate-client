import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";
import { deleteLodge } from "../../services/lodge.service";
import { useState } from "react";
import showNotification from "../GlobalAlert";
import { Lodge } from "../../types/lodge.types";
import { Carousel } from "@trendyol-js/react-carousel";
import { PhotosCarousel } from "../PhotosCarousel";

export interface IUserLodge extends Lodge {}

export const UserLodgeCard = ({
  lodge,
  onDelete,
}: {
  lodge: IUserLodge;
  onDelete: () => void;
}) => {
  const {
    title,
    description,
    location,
    institution,
    distanceFromInstitution,
    photos,
  } = lodge;

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
        <div className='col-md-3'>
          <PhotosCarousel photos={photos} />
        </div>
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
            <Button
              className='text-white'
              size='sm'
              variant='danger'
              onClick={handleDelete}
              data-toggle='tooltip'
              data-placement='bottom'
              title='Apagar anúncio'
            >
              <i className='bi bi-trash'></i>
            </Button>
            <Link
              to={"edit"}
              state={{ lodge }}
              className='btn btn-sm btn-primary text-white'
              data-toggle='tooltip'
              data-placement='bottom'
              title='Editar anúncio'
            >
              <i className='bi bi-pencil-square'></i>
            </Link>
            <Link
              to={"/lodge/" + lodge.id}
              className='btn btn-sm btn-secondary text-white'
              data-toggle='tooltip'
              data-placement='bottom'
              title='Ver anúncio'
            >
              <i className='bi bi-eye-fill'></i>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
