import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div
      className='h-100 d-flex align-items-center justify-content-center'
      style={{ margin: "200px 0" }}
    >
      <Spinner />
    </div>
  );
};
