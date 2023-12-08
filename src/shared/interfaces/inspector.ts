import Post from "../enums/post";

export default interface IInspector {
  firstName: string;
  middleName: string;
  lastName: string;
  post: Post;
  regionId: number;
}
