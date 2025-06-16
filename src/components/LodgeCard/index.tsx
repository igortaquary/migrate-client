import { Card } from "react-bootstrap";
import "./index.scss";
import { Lodge } from "../../types/lodge.types";
import { useNavigate } from "react-router-dom";
import imagePlaceholder from "../../assets/images/house-placeholder.jpg";

interface ILodgeCard extends Lodge {
  title: string;
  description: string;
  institution: any;
}

const renderGender = (gender: string) => {
  return {
    male: "Apenas homens",
    female: "Apenas mulheres",
    any: "Aceita homens e mulheres",
  }[gender];
};

export const LodgeCard = ({ lodge }: { lodge: ILodgeCard }) => {
  const navigate = useNavigate();

  const imgUrl =
    lodge.photos && lodge.photos[0]?.url
      ? lodge.photos[0].url
      : imagePlaceholder;

  return (
    <Card className='lodge-card' onClick={() => navigate("/lodge/" + lodge.id)}>
      <Card.Body>
        <Card.Img src={imgUrl}></Card.Img>
        <Card.Title className='mt-3'>{lodge.title}</Card.Title>
        <Card.Text className='description'>{lodge.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div>{renderGender(lodge.gender)}</div>
        <div>{lodge.institution?.name}</div>
      </Card.Footer>
    </Card>
  );
};
