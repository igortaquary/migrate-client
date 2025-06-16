import { useEffect, useState } from "react";
import { Institution } from "../../types/institution.types";
import { Card } from "react-bootstrap";
import { getAllInstitutions } from "../../services/institution.service";
import showNotification from "../../components/GlobalAlert";
import "./index.scss";
import { Link } from "react-router-dom";
import { BR_STATES } from "../../types/location.types";

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
      <section className='home-second-section'>
        <div className='container'>
          <h5 className='text-center'>
            Migrate: Encontre Quartos e Repúblicas com Facilidade
          </h5>
          <p>
            Está procurando um lugar para morar enquanto estuda ou trabalha em
            uma nova cidade? Nossa plataforma foi desenvolvida para facilitar a
            busca por quartos e repúblicas, seja para estadias temporárias ou
            permanentes. Com uma interface amigável e uma série de
            funcionalidades úteis, proporcionamos uma experiência simplificada e
            eficiente para estudantes e profissionais de todo o Brasil.
          </p>
          <div className='row text-center'>
            <div className='col-md-4 my-4'>
              <i className='bi bi-search'></i>
              <br />
              <b>Busca Personalizada</b> <br />
              Encontre a moradia ideal de acordo com suas preferências. Nossa
              plataforma permite que você filtre os resultados por tipo de
              residência, orçamento, localização e muito mais.
            </div>
            <div className='col-md-4 my-4'>
              <i className='bi bi-backpack'></i> <br />
              <b>Integração com Instituições de Ensino</b> <br />
              Facilitamos sua busca por moradia próxima à sua instituição de
              ensino, conectando você a opções que melhor se adequam às suas
              necessidades.
            </div>

            <div className='col-md-4 my-4'>
              <i className='bi bi-house'></i>
              <br />
              <b>Detalhes Precisos e Confiáveis</b>
              <br />
              Cada anúncio contém informações detalhadas, incluindo fotos,
              descrições, preços e proximidade de transporte público, garantindo
              que você tome decisões informadas.
            </div>
          </div>
          <div></div>
          <div className='text-end'></div>
        </div>
      </section>
      <section className='container my-5'>
        <div className='row'>
          <div className='col-md-6'>
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
          </div>
          <div className='col-md-6'>
            <h4>Acomodações por UF</h4>
            <p>
              {BR_STATES.map((state, i) => (
                <span key={i}>
                  <Link key={i} to={"/lodges?state=" + state}>
                    {state}
                  </Link>
                  {
                    i < BR_STATES.length - 1
                      ? " | "
                      : "" /* Add comma except for last item */
                  }
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
};
