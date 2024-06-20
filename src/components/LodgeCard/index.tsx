import { Card } from "react-bootstrap";
import "./index.scss";
import { Lodge } from "../../types/lodge.types";

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
        <Card.Title>{lodge.title}</Card.Title>
        <Card.Text className='description'>{lodge.description}</Card.Text>
        {renderGender(lodge.gender)}
      </Card.Body>
      <Card.Footer>{lodge.institution?.name}</Card.Footer>
    </Card>
  );
};
