import FunctionalClass from "../enums/functionalClassENG";
import IClient from "../interfaces/client";

const mockClients: IClient[] = [
  {
    lastName: "Иванова",
    firstName: "Вера",
    middleName: "Ивановна",
    address: "ул. Ленина, 123, 45",
    functionalClass: FunctionalClass.FC2,
    id: 1,
    socialWorker: {
      id: 1,
      fio: "Соц. работник1",
    },
    gpwVeteran: false,
    warVictim: false,
    lonelyInvalid: true,
    lonelyOldPerson: false,
    cottage: true,
    regionId: 1,
  },
  {
    lastName: "Голубев",
    firstName: "Александр",
    middleName: "Филиппович",
    address: "ул. Мира, 98, 76",
    functionalClass: FunctionalClass.FC3,
    id: 2,
    socialWorker: {
      id: 2,
      fio: "Соц. работник2",
    },
    gpwVeteran: true,
    warVictim: false,
    lonelyInvalid: false,
    lonelyOldPerson: false,
    cottage: false,
    regionId: 2,
  },
  {
    lastName: "Петрова",
    firstName: "Надежда",
    middleName: "Петровна",
    address: "пр-т Строителей, 10-2, 30",
    functionalClass: FunctionalClass.FC2,
    id: 3,
    socialWorker: {
      id: 3,
      fio: "Соц. работник3",
    },
    gpwVeteran: false,
    warVictim: true,
    lonelyInvalid: false,
    lonelyOldPerson: false,
    cottage: true,
    regionId: 3,
  },
  {
    firstName: "Сергей",
    middleName: "Кузьмич",
    lastName: "Воробьёв",
    address: "переул. Садовый, 10А",
    functionalClass: FunctionalClass.FC4,
    id: 4,
    socialWorker: {
      id: 4,
      fio: "Соц. работник4",
    },
    gpwVeteran: false,
    warVictim: false,
    lonelyInvalid: false,
    lonelyOldPerson: true,
    cottage: false,
    regionId: 4,
  },
];

export default mockClients;
