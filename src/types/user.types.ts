export type User = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
};

const genders = {
  male: "Homem",
  female: "Mulher",
  other: "Outro",
};

const handler = {
  get: function (target: any, name: string) {
    return target.hasOwnProperty(name) ? target[name] : "Outro";
  },
};

export const genderMap = new Proxy(genders, handler);
