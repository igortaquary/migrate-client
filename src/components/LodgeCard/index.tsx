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
    female: "Apenas homens",
    any: "",
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
        <Card.Title>{lodge.title}</Card.Title>
        <Card.Text className='description'>{lodge.description}</Card.Text>
        {renderGender(lodge.gender)}
      </Card.Body>
      <Card.Footer>{lodge.institution?.name}</Card.Footer>
    </Card>
  );
};
