import { Spinner } from "react-bootstrap";
import "./index.scss";

export const Loader = ({ overlay }: { overlay?: boolean }) => {
  return (
    <div className={"loader-container " + (overlay ? "overlay" : "h-100 my-5")}>
      <Spinner />
    </div>
  );
};
