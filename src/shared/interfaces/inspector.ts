import Post from "../enums/post";
import IRegion from "./region";

export default interface IInspector {
  lastName: string;
  firstName: string;
  middleName: string;
  login: string;
  id: number;
  inspectorId: number;
  workerId: number;
  post: Post;
  region: IRegion;
}
