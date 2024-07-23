import Post from "../enums/post";
import IInspector from "../interfaces/inspector";

const mockInspectors: IInspector[] = [
  {
    lastName: "Иванова",
    firstName: "Вера",
    middleName: "Ивановна",
    login: "login",
    id: 1,
    workerId: 1,
    region: { id: 1, name: "region" },
    post: Post.INSPECTOR,
    inspectorId: 1,
  },
  {
    lastName: "Иванова2",
    firstName: "Вера2",
    middleName: "Ивановна2",
    login: "login2",
    id: 2,
    workerId: 2,
    region: { id: 2, name: "region2" },
    post: Post.INSPECTOR,
    inspectorId: 2,
  },
  {
    lastName: "Иванова3",
    firstName: "Вера3",
    middleName: "Ивановна3",
    login: "login3",
    id: 3,
    workerId: 3,
    region: { id: 3, name: "region3" },
    post: Post.INSPECTOR,
    inspectorId: 3,
  },
];

export default mockInspectors;
