import { Card } from "react-bootstrap";
import "./index.scss";

interface ILodgeCard {
  title: string;
  description: string;
  institution: any;
}

export const LodgeCard = ({ lodge }: { lodge: ILodgeCard }) => {
  return (
    <Card className='lodge-card'>
      <Card.Header>
        <Card.Img></Card.Img>
      </Card.Header>
      <Card.Body>
        <Card.Title>{lodge.title}</Card.Title>
        <Card.Text className='description'>{lodge.description}</Card.Text>
      </Card.Body>
      <Card.Footer>{lodge.institution?.name}</Card.Footer>
    </Card>
  );
};
