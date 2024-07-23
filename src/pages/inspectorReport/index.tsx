import { useEffect, useState } from "react";
import {
  DateContainer,
  DateTitle,
  LoaderContainer,
  Text,
  TextContainer,
  Wrapper,
} from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import {
  ButtonDefault,
  ReportP,
  ReportTBody,
  ReportTD,
  ReportTHead,
  ReportTR,
  ReportTable,
  ReportWrapper,
} from "../../shared/globalStyles";
import { useGetInspectorReportMutation } from "../../features/inspector/inspectorService";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/store/hooks";
import mockInspectorReport from "../../shared/mock/inspectorReport";

export default function InspectorReport() {
  const user = useAppSelector((state) => state.auth.user);
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const navigate = useNavigate();
  const [getReport, { data, isLoading, isSuccess }] =
    useGetInspectorReportMutation();
  const startDate = new Date();
  const [date, setDate] = useState<Date>(startDate);

  useEffect(() => {
    getReport({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }, [date]);

  function onClickPrevious() {
    const newDate = date.setMonth(date.getMonth() - 1);
    setDate(new Date(newDate));
  }

  function onClickNext() {
    const newDate = date.setMonth(date.getMonth() + 1);
    setDate(new Date(newDate));
  }

  return (
    <Wrapper>
      <DateTitle>
        Отчёт оказания социальных услуг по участку {user?.region?.name}{" "}
        инспектора по основной деятельности
      </DateTitle>
      <DateContainer>
        <ButtonDefault onClick={onClickPrevious}>Предыдущий</ButtonDefault>
        <DateTitle>
          {months[date.getMonth()]}, {date.getFullYear()}
        </DateTitle>
        <ButtonDefault
          onClick={onClickNext}
          disabled={
            startDate.getFullYear() === date.getFullYear() &&
            startDate.getMonth() === date.getMonth()
          }
        >
          Следующий
        </ButtonDefault>
      </DateContainer>
      {isLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : isSuccess ? (
        <ReportWrapper>
          <ReportTable border={1} cellSpacing={0} width={1300}>
            <ReportTHead>
              <ReportTR>
                <ReportTD width={60} height={170} rowSpan={3}>
                  № п/п
                </ReportTD>
                <ReportTD width={200} rowSpan={3}>
                  ФИО соц. работников
                </ReportTD>
                <ReportTD height={30} colSpan={6}>
                  Численность обслуживаемых граждан
                </ReportTD>
                <ReportTD rowSpan={3} width={120}>
                  <ReportP>
                    Общее количество посещений по отделению за месяц
                  </ReportP>
                </ReportTD>
                <ReportTD rowSpan={3} width={120}>
                  <ReportP>
                    Общее количество услуг по отделению за месяц
                  </ReportP>
                </ReportTD>
                <ReportTD rowSpan={3}>
                  <ReportP>
                    Количество оказанных социальных услуг в среднем одному
                    обслуживаемому
                  </ReportP>
                </ReportTD>
                <ReportTD rowSpan={3}>
                  <ReportP>
                    В среднем одному обслуживаемому за одно посещение
                  </ReportP>
                </ReportTD>
              </ReportTR>
              <ReportTR>
                <ReportTD rowSpan={2}>
                  <ReportP>всего по отделению за месяц</ReportP>
                </ReportTD>
                <ReportTD height={30} colSpan={5}>
                  В том числе:
                </ReportTD>
              </ReportTR>
              <ReportTR>
                <ReportTD height={130}>
                  <ReportP>ветераны ВОВ</ReportP>
                </ReportTD>
                <ReportTD>
                  <ReportP>лица, пострадавшие от последствий войн</ReportP>
                </ReportTD>
                <ReportTD width={80}>
                  <ReportP>одинокие инвалиды 1 и 2 группы</ReportP>
                </ReportTD>
                <ReportTD>
                  <ReportP>одинокие пожилые</ReportP>
                </ReportTD>
                <ReportTD>
                  <ReportP>граждане, получившие услуги сиделки</ReportP>
                </ReportTD>
              </ReportTR>
            </ReportTHead>
            <ReportTBody>
              {data?.socialWorkers.map((worker, index) => (
                <ReportTR
                  $hover
                  key={`${index}row`}
                  onClick={() => navigate(`/social-worker-report/${index + 1}`)}
                >
                  <ReportTD>{index + 1}</ReportTD>
                  <ReportTD height={45}>
                    {worker.lastName} {worker.firstName} {worker.middleName}
                  </ReportTD>
                  <ReportTD>{worker?.totalClientsCount}</ReportTD>
                  <ReportTD>{worker?.countGpwVeteran}</ReportTD>
                  <ReportTD>{worker?.countWarVictim}</ReportTD>
                  <ReportTD>{worker?.countLonelyInvalid}</ReportTD>
                  <ReportTD>{worker?.countLonelyOldPerson}</ReportTD>
                  <ReportTD>{worker?.countOfNurseService}</ReportTD>
                  <ReportTD>{worker?.totalVisitsCount}</ReportTD>
                  <ReportTD>{worker?.countOfProvidedServices}</ReportTD>
                  <ReportTD>{worker?.avgByOneClient}</ReportTD>
                  <ReportTD>{worker?.avgByOneVisit}</ReportTD>
                </ReportTR>
              ))}
              <ReportTR>
                <ReportTD height={30} colSpan={2}>
                  Итого:
                </ReportTD>
                <ReportTD>{data?.totalClientsCount}</ReportTD>
                <ReportTD>{data?.countGpwVeteran}</ReportTD>
                <ReportTD>{data?.countWarVictim}</ReportTD>
                <ReportTD>{data?.countLonelyInvalid}</ReportTD>
                <ReportTD>{data?.countLonelyOldPerson}</ReportTD>
                <ReportTD>{data?.countOfNurseService}</ReportTD>
                <ReportTD>{data?.totalVisitsCount}</ReportTD>
                <ReportTD>
                  {data?.countOfProvidedServices}
                </ReportTD>
                <ReportTD>{data?.avgByOneClient}</ReportTD>
                <ReportTD>{data?.avgByOneVisit}</ReportTD>
              </ReportTR>
            </ReportTBody>
            {/* <ReportTBody>
              {mockInspectorReport?.socialWorkers.map((worker, index) => (
                <ReportTR
                  $hover
                  key={`${index}row`}
                  onClick={() => navigate(`/social-worker-report/${index + 1}`)}
                >
                  <ReportTD>{index + 1}</ReportTD>
                  <ReportTD height={45}>
                    {worker.lastName} {worker.firstName} {worker.middleName}
                  </ReportTD>
                  <ReportTD>{worker?.totalClientsCount}</ReportTD>
                  <ReportTD>{worker?.countGpwVeteran}</ReportTD>
                  <ReportTD>{worker?.countWarVictim}</ReportTD>
                  <ReportTD>{worker?.countLonelyInvalid}</ReportTD>
                  <ReportTD>{worker?.countLonelyOldPerson}</ReportTD>
                  <ReportTD>{worker?.countOfNurseService}</ReportTD>
                  <ReportTD>{worker?.totalVisitsCount}</ReportTD>
                  <ReportTD>{worker?.countOfProvidedServices}</ReportTD>
                  <ReportTD>{worker?.avgByOneClient}</ReportTD>
                  <ReportTD>{worker?.avgByOneVisit}</ReportTD>
                </ReportTR>
              ))}
              <ReportTR>
                <ReportTD height={30} colSpan={2}>
                  Итого:
                </ReportTD>
                <ReportTD>{mockInspectorReport?.totalClientsCount}</ReportTD>
                <ReportTD>{mockInspectorReport?.countGpwVeteran}</ReportTD>
                <ReportTD>{mockInspectorReport?.countWarVictim}</ReportTD>
                <ReportTD>{mockInspectorReport?.countLonelyInvalid}</ReportTD>
                <ReportTD>{mockInspectorReport?.countLonelyOldPerson}</ReportTD>
                <ReportTD>{mockInspectorReport?.countOfNurseService}</ReportTD>
                <ReportTD>{mockInspectorReport?.totalVisitsCount}</ReportTD>
                <ReportTD>
                  {mockInspectorReport?.countOfProvidedServices}
                </ReportTD>
                <ReportTD>{mockInspectorReport?.avgByOneClient}</ReportTD>
                <ReportTD>{mockInspectorReport?.avgByOneVisit}</ReportTD>
              </ReportTR>
            </ReportTBody> */}
          </ReportTable>
        </ReportWrapper>
      ) : (
        <TextContainer>
          <Text>Ошибка получения данных</Text>
          <ButtonDefault
            $width="120px"
            onClick={() =>
              getReport({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
              })
            }
          >
            Обновить
          </ButtonDefault>
        </TextContainer>
      )}
    </Wrapper>
  );
}
