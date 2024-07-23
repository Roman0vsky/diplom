import IFavour from "./favour";

interface IFavours extends IFavour {
  totalCount: number;
}

export default interface ISocialWorkerReport {
  clients: {
    lastName: string;
    firstName: string;
    middleName: string;
    functionalClass: string[];
    countOfVisits: number;
    favours: {
      id: number;
      date: Date[];
    }[];
    countOfFavours: number;
  }[];
  totalCountOfVisits: number;
  favours: IFavours[];
  totalCountOfFavours: number;
}
