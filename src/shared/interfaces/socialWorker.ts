import Post from "../enums/post";

export default interface ISocialWorker {
  firstName: string;
  middleName: string;
  lastName: string;
  post: Post;
  inspectorId: number;
}
