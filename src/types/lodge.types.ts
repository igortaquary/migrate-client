import { Institution } from "./institution.types";
import { Location } from "./location.types";

export enum LodgeType {
  ENTIRE = 1,
  ROOM = 2,
  SHARED_ROOM = 3,
}

export enum SpaceType {
  APARTMENT = 1,
  HOUSE = 2,
  OTHER = 3,
}

export enum Gender {
  FEMALE = "female",
  MALE = "male",
  ANY = "any",
}

export enum ContactInfo {
  EMAIL = "email",
  PHONE = "phone",
  ALL = "all",
}

export type Lodge = {
  id: string;
  title: string;
  description: string;
  type: LodgeType;
  space: SpaceType;
  gender: Gender;
  contactInfo: ContactInfo;
  price?: number;
  distanceFromInstitution?: number;
  location?: Location;
  institution?: Institution;
};
