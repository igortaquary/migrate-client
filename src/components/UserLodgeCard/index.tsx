import { Card } from "react-bootstrap";

export interface IUserLodge {
  id: string;
  title: string;
}

export const UserLodgeCard = ({ lodge }: { lodge: IUserLodge }) => {
  const { title } = lodge;
  return (
    <Card>
      <b>{title}</b>
    </Card>
  );
};
