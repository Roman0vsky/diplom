import IRegion from "./region";

export default interface IClientForm {
  lastName: string;
  firstName: string;
  middleName: string;
  functionalClass: string;
  address: string;
  id: number;
  gpwVeteran: boolean;
  warVictim: boolean;
  lonelyInvalid: boolean;
  lonelyOldPerson: boolean;
  cottage: boolean;

  region: IRegion;
  regionId: number;
}
