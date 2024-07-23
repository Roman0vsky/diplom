import Post from "../enums/post";

export default interface ISocialWorker {
  firstName: string;
  middleName: string;
  lastName: string;
  post: Post;
  id: number;
  workerId: number;
  inspectorId: number | string;
  longitude: number | string;
  latitude: number | string;
}
