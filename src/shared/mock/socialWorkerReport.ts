import ISocialWorkerReport from "../interfaces/socialWorkerReport";

const mockSocialWorkerReport: ISocialWorkerReport = {
  totalCountOfVisits: 3,
  clients: [
    {
      lastName: "lastName",
      firstName: "firstName",
      middleName: "middleName",
      functionalClass: ["FC2", "FC3", "FC4"],
      countOfVisits: 3,
      favours: [
        {
          id: 1,
          date: [new Date(), new Date(), new Date()],
        },
        {
          id: 3,
          date: [new Date(), new Date(), new Date(), new Date()],
        },
      ],
      countOfFavours: 2,
    },
    {
      lastName: "lastName",
      firstName: "firstName",
      middleName: "middleName",
      functionalClass: ["FC4"],
      countOfVisits: 3,
      favours: [
        {
          id: 1,
          date: [new Date()],
        },
        {
          id: 4,
          date: [
            new Date(),
            new Date(),
            new Date(),
            new Date(),
            new Date(),
            new Date(),
            new Date(),
            new Date(),
          ],
        },
      ],
      countOfFavours: 2,
    },
    {
      lastName: "lastName",
      firstName: "firstName",
      middleName: "middleName",
      functionalClass: ["FC4"],
      countOfVisits: 3,
      favours: [
        {
          id: 3,
          date: [new Date()],
        },
      ],
      countOfFavours: 2,
    },
    {
      lastName: "lastName",
      firstName: "firstName",
      middleName: "middleName",
      functionalClass: ["FC2", "FC3"],
      countOfVisits: 3,
      favours: [
        {
          id: 3,
          date: [new Date(), new Date(), new Date()],
        },
        {
          id: 5,
          date: [new Date(), new Date()],
        },
      ],
      countOfFavours: 2,
    },
  ],
  favours: [
    {
      id: 1,
      name: "fav1",
      shortName: "",
      categoryId: 0,
      normDescription: "",
      functionalClasses: [],
      totalCount: 4,
    },
    {
      id: 2,
      name: "fav2",
      shortName: "",
      categoryId: 0,
      normDescription: "",
      functionalClasses: [],
            totalCount: 4,

    },
    {
      id: 3,
      name: "fav3",
      shortName: "",
      categoryId: 0,
      normDescription: "",
      functionalClasses: [],
            totalCount: 4,

    },
    {
      id: 4,
      name: "fav4",
      shortName: "",
      categoryId: 0,
      normDescription: "",
      functionalClasses: [],
            totalCount: 4,

    },
    {
      id: 5,
      name: "fav5",
      shortName: "",
      categoryId: 0,
      normDescription: "",
      functionalClasses: [],
            totalCount: 4,

    },
  ],
  totalCountOfFavours: 5,
};

export default mockSocialWorkerReport;
