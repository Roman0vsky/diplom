import FunctionalClass from "../enums/functionalClassRUS";

export default interface IClient {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  status: string;
  functionalClass: FunctionalClass | string;
  id?: number;
}
