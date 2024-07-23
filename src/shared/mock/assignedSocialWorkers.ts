import ISocialWorkerAssignedToClient from "../interfaces/socialWorkerAssignedToClient";

const mockSocialWorkersAssignedToClient: ISocialWorkerAssignedToClient[] = [
  {
    lastName: "Иванова",
    firstName: "Вера",
    middleName: "Ивановна",
    id: 1,
    start: new Date(),
    finish: null,
    region: {
      id: 11,
      name: "region11",
    },
  },
  {
    lastName: "Голубев",
    firstName: "Александр",
    middleName: "Филиппович",
    id: 2,
    start: new Date(),
    finish: new Date(),
    region: {
      id: 12,
      name: "region12",
    },
  },
  {
    lastName: "Петрова",
    firstName: "Надежда",
    middleName: "Петровна",
    id: 3,
    start: new Date(),
    finish: new Date(),
    region: {
      id: 13,
      name: "region13",
    },
  },
  {
    lastName: "Воробьёв",
    firstName: "Сергей",
    middleName: "Кузьмич",
    id: 4,
    start: new Date(),
    finish: new Date(),
    region: {
      id: 14,
      name: "region14",
    },
  },
];

export default mockSocialWorkersAssignedToClient;
