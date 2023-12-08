import FunctionalClass from "../enums/functionalClass";

export default interface IClient {
  firstName: string;
  middleName: string;
  lastName: string;
  functionalClass: FunctionalClass;
  cottage: boolean;
  address: string;
  regionId: number;
}
