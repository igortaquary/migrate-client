export type Photo = {
  id: string;
  url: string;
  order: number;
};

export type PhotoToUpload = {
  id?: string;
  url?: string;
  order: number;
};
