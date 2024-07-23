import Post from "../enums/post";

export default interface IAdmin {
  login: string;
  firstName: string;
  middleName: string;
  lastName: string;
  id: number;
  workerId: number;
  inspectorId: number;
  post: Post;
  region: {
    id: number;
    name: string;
  } | null;
}
