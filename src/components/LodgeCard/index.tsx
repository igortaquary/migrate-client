import { Card } from "react-bootstrap";
import "./index.scss";
import { Lodge } from "../../types/lodge.types";
import { Link } from "react-router-dom";

interface ILodgeCard extends Lodge {
  title: string;
  description: string;
  institution: any;
}

const renderGender = (gender: string) => {
  return {
    male: "Apenas homens",
    female: "Apenas homens",
    any: "Qualquer",
  }[gender];
};

export const LodgeCard = ({ lodge }: { lodge: ILodgeCard }) => {
  return (
    <Card className='lodge-card'>
      <Card.Header>
        <Card.Img></Card.Img>
      </Card.Header>
      <Card.Body>
        <Link to={"/lodge/" + lodge.id}>
          <Card.Title>{lodge.title}</Card.Title>
          <Card.Text className='description'>{lodge.description}</Card.Text>
          {renderGender(lodge.gender)}
        </Link>
      </Card.Body>
      <Card.Footer>{lodge.institution?.name}</Card.Footer>
    </Card>
  );
};
