import IRegion from "./region";

export default interface ISocialWorkerAssignedToClient {
  firstName: string;
  middleName: string;
  lastName: string;
  id: number;
  start: Date;
  finish: Date | null;
  region: IRegion;
}
