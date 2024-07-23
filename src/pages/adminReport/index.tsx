import { useEffect, useState } from "react";
import { useGetAdminReportMutation } from "../../features/admin/adminService";
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
} from "../../shared/globalStyles";

export default function AdminReport() {
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
  const [getReport, { data, isLoading, isSuccess }] =
    useGetAdminReportMutation();
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
        Отчёт оказания социальных услуг по отделению социальной помощи на дому
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
        <ReportTable border={1} cellSpacing={0} width={1200}>
          <ReportTHead>
            <ReportTR>
              <ReportTD width={50} height={170} rowSpan={3}>
                № п/п
              </ReportTD>
              <ReportTD width={50} rowSpan={3}></ReportTD>
              <ReportTD height={30} colSpan={6}>
                Численность обслуживаемых граждан
              </ReportTD>
              <ReportTD rowSpan={3}>
                <ReportP>
                  Общее количество посещений по отделению за месяц
                </ReportP>
              </ReportTD>
              <ReportTD rowSpan={3}>
                <ReportP>Общее количество услуг по отделению за месяц</ReportP>
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
              <ReportTD>
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
            <ReportTR>
              <ReportTD height={30}>1</ReportTD>
              <ReportTD height={30}>2</ReportTD>
              <ReportTD height={30}>3</ReportTD>
              <ReportTD height={30}>4</ReportTD>
              <ReportTD height={30}>5</ReportTD>
              <ReportTD height={30}>6</ReportTD>
              <ReportTD height={30}>7</ReportTD>
              <ReportTD height={30}>8</ReportTD>
              <ReportTD height={30}>9</ReportTD>
              <ReportTD height={30}>10</ReportTD>
              <ReportTD height={30}>11</ReportTD>
              <ReportTD height={30}>12</ReportTD>
            </ReportTR>
            <ReportTR>
              <ReportTD height={30} colSpan={2}>
                Итого:
              </ReportTD>
              <ReportTD height={30}>{data?.totalClientsCount}</ReportTD>
              <ReportTD height={30}>{data?.countGpwVeteran}</ReportTD>
              <ReportTD height={30}>{data?.countWarVictim}</ReportTD>
              <ReportTD height={30}>{data?.countLonelyInvalid}</ReportTD>
              <ReportTD height={30}>{data?.countLonelyOldPerson}</ReportTD>
              <ReportTD height={30}>{data?.countOfNurseService}</ReportTD>
              <ReportTD height={30}>{data?.totalVisitsCount}</ReportTD>
              <ReportTD height={30}>{data?.countOfProvidedServices}</ReportTD>
              <ReportTD height={30}>{data?.avgByOneClient}</ReportTD>
              <ReportTD height={30}>{data?.avgByOneVisit}</ReportTD>
              {/* 
              <ReportTD height={30}>{mockAdminReport?.totalClientsCount}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countGpwVeteran}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countWarVictim}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countLonelyInvalid}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countLonelyOldPerson}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countOfNurseService}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.totalVisitsCount}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.countOfProvidedServices}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.avgByOneClient}</ReportTD>
              <ReportTD height={30}>{mockAdminReport?.avgByOneVisit}</ReportTD> 
              */}
            </ReportTR>
          </ReportTBody>
        </ReportTable>
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
