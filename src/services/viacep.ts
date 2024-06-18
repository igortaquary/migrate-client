import { Location } from "../types/location.types";

type ResultJson = {
  bairro: string; // "Sul (Águas Claras)"
  cep: string; // "71925-540"
  complemento: string; // ""
  ddd: string; // "61"
  gia: string; // ""
  ibge: string; // "5300108"
  localidade: string; // "Brasília"
  logradouro: string; // "Rua 21"
  siafi: string; // "9701"
  uf: string; // "DF"

  error?: boolean;
};

export const getAddessByCep = async (
  cep: string
): Promise<Partial<Location> | undefined> => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json: ResultJson = await response.json();
    if (json && !json.error) {
      return {
        address: json.logradouro,
        zipCode: cep,
        state: json.uf,
        city: json.localidade,
        district: json.bairro,
        country: "Brasil",
      };
    } else {
      throw new Error("Cep não encontrado");
    }
  } catch (error) {
    window.alert(error);
  }
};
