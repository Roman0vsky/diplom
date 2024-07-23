import ICategory from "../interfaces/category";

const mockCategories: ICategory[] = [
  {
    id: 1,
    name: "Категория1",
    shortName: "Кат1",
    favours: [
      {
        id: 11,
        categoryId: 1,
        name: "Услуга11",
        shortName: "Усл11",
        functionalClasses: ["FC2"],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
      {
        id: 12,
        categoryId: 1,
        name: "Услуга12",
        shortName: "Усл12",
        functionalClasses: ["FC3"],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
      {
        id: 13,
        categoryId: 1,
        name: "Услуга13",
        shortName: "Усл13",
        functionalClasses: ["FC4"],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
    ],
  },
  {
    id: 2,
    name: "Категория2",
    shortName: "Кат2",
    favours: [],
  },
  {
    id: 3,
    name: "Категория3",
    shortName: "Кат3",
    favours: [
      {
        id: 31,
        categoryId: 3,
        name: "Услуга31",
        shortName: "Усл31",
        functionalClasses: ["FC2", "FC4"],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
      {
        id: 32,
        categoryId: 3,
        name: "Услуга32",
        shortName: "Усл32",
        functionalClasses: [],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
      {
        id: 33,
        categoryId: 3,
        name: "Услуга33",
        shortName: "Усл33",
        functionalClasses: ["FC2", "FC3"],
        normDescription: "Текст Текст Текст Текст Текст Текст",
      },
    ],
  },
];

export default mockCategories;
