import { useEffect, useState } from "react";
import { Institution } from "../../types/institution.types";
import { Card } from "react-bootstrap";
import { getAllInstitutions } from "../../services/institution.service";
import showNotification from "../../components/GlobalAlert";
import "./index.scss";
import { Link } from "react-router-dom";

export const Home = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  const handleInstitutions = async () => {
    try {
      const res = await getAllInstitutions();
      setInstitutions(res.data);
    } catch (error) {
      showNotification("danger", "Não foi possível listar as instituições");
    }
  };

  useEffect(() => {
    handleInstitutions();
  }, []);

  return (
    <main>
      <section>
        <h1 className='hero-text'>
          Encontre o <span>lugar certo</span> para morar <br /> na sua nova
          cidade
        </h1>
      </section>
      <section>
        <h4>Acomodações por Universidade/Campus</h4>
        <ul>
          {institutions.map((institution, i) => (
            <li key={i}>
              <Link
                to={"/lodges?institutionId=" + institution.id}
                className='mr-4'
              >
                {institution.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section></section>
    </main>
  );
};
