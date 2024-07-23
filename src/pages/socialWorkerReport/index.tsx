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
  ReportTR,
  ReportTable,
  ReportWrapper,
} from "../../shared/globalStyles";
import {
  useGetSocialWorkerQuery,
  useGetSocialWorkerReportMutation,
} from "../../features/inspector/inspectorService";
import { useParams } from "react-router";
import mockSocialWorkerReport from "../../shared/mock/socialWorkerReport";
import FunctionalClassRUS from "../../shared/enums/functionalClassRUS";

export default function SocialWorkerReport() {
  let { id } = useParams();
  id = id as string;
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
  const {
    data: sWData,
    isFetching: isSWFetching,
    isSuccess: isSWSuccess,
    refetch: refetchSW,
  } = useGetSocialWorkerQuery(+id);
  const [getReport, { data, isLoading, isSuccess }] =
    useGetSocialWorkerReportMutation();
  const startDate = new Date();
  const [date, setDate] = useState<Date>(startDate);
  useEffect(() => {
    getReport({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      id: +id,
    });
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
      {isSWFetching ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : isSWSuccess ? (
        <>
          <DateTitle>
            Дневник-отчёт учёта работы социального работника {sWData?.lastName}{" "}
            {sWData?.firstName} {sWData?.middleName}
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
              <ReportTable border={1} cellSpacing={0}>
                <ReportTBody>
                  <ReportTR>
                    <ReportTD width={200} height={150}>
                      Ф.И.О. обслуживаемых граждан
                    </ReportTD>
                    {data?.clients.map((client) => (
                      <ReportTD>
                        <ReportP>
                          {client.lastName}
                          <br />
                          {client.firstName}
                          <br />
                          {client.middleName}
                        </ReportP>
                      </ReportTD>
                    ))}
                    <ReportTD $width="70px">Всего</ReportTD>
                  </ReportTR>
                  <ReportTR>
                    <ReportTD height={40} $width="200px">
                      Функциональный класс
                    </ReportTD>
                    {data?.clients.map((client) => (
                      <ReportTD>
                        {client.functionalClass
                          .map(
                            (fc) =>
                              FunctionalClassRUS[
                                fc as keyof typeof FunctionalClassRUS
                              ]
                          )
                          .join()}
                      </ReportTD>
                    ))}
                    <ReportTD>—</ReportTD>
                  </ReportTR>
                  <ReportTR>
                    <ReportTD height={50}>Количество посещений всего</ReportTD>
                    {data?.clients.map((client) => (
                      <ReportTD>{client.countOfVisits}</ReportTD>
                    ))}
                    <ReportTD>{data?.totalCountOfVisits}</ReportTD>
                  </ReportTR>
                  <ReportTR>
                    <ReportTD height={50}>
                      Наименование оказанных социальных услуг
                    </ReportTD>
                    <ReportTD colSpan={data!.clients!.length + 1}>
                      Дата посещения
                    </ReportTD>
                  </ReportTR>

                  {data.favours.map((favour) => (
                    <ReportTR>
                      <ReportTD>{favour.name}</ReportTD>
                      {data.clients.map((client) => {
                        const result = client.favours.find(
                          (clientFavour) => clientFavour.id === favour.id
                        );
                        return result ? (
                          <ReportTD $width="160px">
                            {result.date
                              .map(
                                (date) =>
                                  `${date.getDate()}.${
                                    date.getMonth() + 1
                                  }.${date.getFullYear()}`
                              )
                              .join(", ")}
                          </ReportTD>
                        ) : (
                          <ReportTD>—</ReportTD>
                        );
                      })}
                      <ReportTD>{favour.totalCount}</ReportTD>
                    </ReportTR>
                  ))}

                  <ReportTR>
                    <ReportTD height={30}>Итого:</ReportTD>
                    {data.clients.map((client) => (
                      <ReportTD>{client.countOfFavours}</ReportTD>
                    ))}
                    <ReportTD>{data.totalCountOfFavours}</ReportTD>
                  </ReportTR>
                  <ReportTR>
                    <ReportTD height={30}>1</ReportTD>
                    {data?.clients.map((_, index) => (
                      <ReportTD>{index + 2}</ReportTD>
                    ))}
                    <ReportTD>{data!.clients!.length + 2}</ReportTD>
                  </ReportTR>
                </ReportTBody>
              </ReportTable>
            </ReportWrapper>
          ) : (
            // <ReportWrapper>
            //   <ReportTable border={1} cellSpacing={0}>
            //     <ReportTBody>
            //       <ReportTR>
            //         <ReportTD width={200} height={150}>
            //           Ф.И.О. обслуживаемых граждан
            //         </ReportTD>
            //         {mockSocialWorkerReport?.clients.map((client) => (
            //           <ReportTD>
            //             <ReportP>
            //               {client.lastName}
            //               <br />
            //               {client.firstName}
            //               <br />
            //               {client.middleName}
            //             </ReportP>
            //           </ReportTD>
            //         ))}
            //         <ReportTD $width="70px">Всего</ReportTD>
            //       </ReportTR>
            //       <ReportTR>
            //         <ReportTD height={40} $width="200px">
            //           Функциональный класс
            //         </ReportTD>
            //         {mockSocialWorkerReport?.clients.map((client) => (
            //           <ReportTD>
            //             {client.functionalClass
            //               .map(
            //                 (fc) =>
            //                   FunctionalClassRUS[
            //                     fc as keyof typeof FunctionalClassRUS
            //                   ]
            //               )
            //               .join()}
            //           </ReportTD>
            //         ))}
            //         <ReportTD>—</ReportTD>
            //       </ReportTR>
            //       <ReportTR>
            //         <ReportTD height={50}>Количество посещений всего</ReportTD>
            //         {mockSocialWorkerReport?.clients.map((client) => (
            //           <ReportTD>{client.countOfVisits}</ReportTD>
            //         ))}
            //         <ReportTD>
            //           {mockSocialWorkerReport?.totalCountOfVisits}
            //         </ReportTD>
            //       </ReportTR>
            //       <ReportTR>
            //         <ReportTD height={50}>
            //           Наименование оказанных социальных услуг
            //         </ReportTD>
            //         <ReportTD
            //           colSpan={mockSocialWorkerReport!.clients!.length + 1}
            //         >
            //           Дата посещения
            //         </ReportTD>
            //       </ReportTR>

            //       {mockSocialWorkerReport.favours.map((favour) => (
            //         <ReportTR>
            //           <ReportTD>{favour.name}</ReportTD>
            //           {mockSocialWorkerReport.clients.map((client) => {
            //             const result = client.favours.find(
            //               (clientFavour) => clientFavour.id === favour.id
            //             );
            //             return result ? (
            //               <ReportTD $width="160px">
            //                 {result.date
            //                   .map(
            //                     (date) =>
            //                       `${date.getDate()}.${
            //                         date.getMonth() + 1
            //                       }.${date.getFullYear()}`
            //                   )
            //                   .join(", ")}
            //               </ReportTD>
            //             ) : (
            //               <ReportTD>—</ReportTD>
            //             );
            //           })}
            //           <ReportTD>{favour.totalCount}</ReportTD>
            //         </ReportTR>
            //       ))}

            //       <ReportTR>
            //         <ReportTD height={30}>Итого:</ReportTD>
            //         {mockSocialWorkerReport.clients.map((client) => (
            //           <ReportTD>{client.countOfFavours}</ReportTD>
            //         ))}
            //         <ReportTD>
            //           {mockSocialWorkerReport.totalCountOfFavours}
            //         </ReportTD>
            //       </ReportTR>
            //       <ReportTR>
            //         <ReportTD height={30}>1</ReportTD>
            //         {mockSocialWorkerReport?.clients.map((_, index) => (
            //           <ReportTD>{index + 2}</ReportTD>
            //         ))}
            //         <ReportTD>
            //           {mockSocialWorkerReport!.clients!.length + 2}
            //         </ReportTD>
            //       </ReportTR>
            //     </ReportTBody>
            //   </ReportTable>
            // </ReportWrapper>
            <TextContainer>
              <Text>Ошибка получения данных</Text>
              <ButtonDefault
                $width="120px"
                onClick={() =>
                  getReport({
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    id: +id,
                  })
                }
              >
                Обновить
              </ButtonDefault>
            </TextContainer>
          )}
        </>
      ) : (
        <TextContainer>
          <Text>Ошибка получения данных</Text>
          <ButtonDefault $width="120px" onClick={() => refetchSW()}>
            Обновить
          </ButtonDefault>
        </TextContainer>
      )}
    </Wrapper>
  );
}
