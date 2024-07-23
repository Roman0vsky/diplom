import IFavour from "./favour";

export default interface ICategory {
  id: number;
  name: string;
  shortName: string;
  favours: IFavour[];
}
