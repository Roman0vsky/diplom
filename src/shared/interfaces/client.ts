export default interface IClient {
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
  regionId: number;
  
  socialWorker?: {
    id: number;
    fio: string;
  };
}
