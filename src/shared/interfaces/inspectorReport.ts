export default interface IInspectorReport {
  totalClientsCount: number;
  countGpwVeteran: number;
  countWarVictim: number;
  countLonelyInvalid: number;
  countLonelyOldPerson: number;
  countOfNurseService: number;
  totalVisitsCount: number;
  countOfProvidedServices: number;
  avgByOneClient: number;
  avgByOneVisit: number;
  socialWorkers: {
    lastName: string;
    firstName: string;
    middleName: string;
    totalClientsCount: number;
    countGpwVeteran: number;
    countWarVictim: number;
    countLonelyInvalid: number;
    countLonelyOldPerson: number;
    countOfNurseService: number;
    totalVisitsCount: number;
    countOfProvidedServices: number;
    avgByOneClient: number;
    avgByOneVisit: number;
  }[];
}
