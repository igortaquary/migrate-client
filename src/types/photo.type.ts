export type Photo = {
  id: string;
  url: string;
  order: number;
};

export type PhotoToUpload =
  | {
      id: string;
      order: number;
    }
  | {
      base64: string;
      order: number;
    };
