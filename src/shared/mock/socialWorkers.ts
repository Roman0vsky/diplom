import Post from "../enums/post";
import ISocialWorker from "../interfaces/socialWorker";

const mockSocialWorkers: ISocialWorker[] = [
  {
    lastName: "Сидорова",
    firstName: "Любовь",
    middleName: "Содировна",
    id: 5,
    workerId: 5,
    inspectorId: 1,
    post: Post.SOCIAL_WORKER,
    latitude: 55.19,
    longitude: 30.21,
  },
  {
    lastName: "Галкин",
    firstName: "Николай",
    middleName: "Архипович",
    id: 6,
    workerId: 6,
    inspectorId: 1,
    post: Post.SOCIAL_WORKER,
    latitude: 55.19,
    longitude: 30.215,
  },
  {
    lastName: "Васильева",
    firstName: "София",
    middleName: "Васильевна",
    id: 7,
    workerId: 7,
    inspectorId: 1,
    post: Post.SOCIAL_WORKER,
    latitude: 55.19,
    longitude: 30.22,
  },
];

export default mockSocialWorkers;
