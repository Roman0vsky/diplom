import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { useGetRegionsQuery } from "../../features/admin/adminService";
import { setRegions } from "../../features/admin/adminSlice";
import {
  useAssignSocialworkerMutation,
  useDetachSocialworkerMutation,
  useGetSocialWorkersAssignedToClientQuery,
  useGetSocialWorkersByRegionIDQuery,
  useGetUnFinishedSocialWorkerAssignedToClientQuery,
} from "../../features/inspector/inspectorService";
import FunctionalClassRUS from "../../shared/enums/functionalClassRUS";
import {
  ButtonDefault,
  InputDefault,
  TableDefault,
  TbodyDefault,
  TdDefault,
  TheadDefault,
  TrDefault,
} from "../../shared/globalStyles";
import CustomSelect from "../../shared/ui/customSelect";
import LoaderElement from "../../shared/ui/loaderElement";
import {
  LoaderContainer,
  SelectContainer,
  Text,
  TextContainer,
  Wrapper,
} from "./styled";
import IRegion from "../../shared/interfaces/region";
import {
  setSocialWorkers,
  setUnFinishedSocialWorker,
} from "../../features/inspector/inspectorSlice";
// import mockSocialWorkersAssignedToClient from "../../shared/mock/assignedSocialWorkers";
// import mockRegions from "../../shared/mock/regions";
// import mockSocialWorkers from "../../shared/mock/socialWorkers";
import ISocialWorkerAssignedToClient from "../../shared/interfaces/socialWorkerAssignedToClient";
import { useNavigate } from "react-router";

interface IBufferSocialWorker {
  fio: string;
  id: number;
}

export default function AssignedSocialWorker() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentClient = useAppSelector(
    (state) => state.inspector.currentClient
  );
  const regions = useAppSelector((state) => state.admin.regions);
  const [region, setRegion] = useState<IRegion | null | undefined>(
    currentClient?.region
  );
  const [socialWorker, setSocialWorker] = useState<
    IBufferSocialWorker | null | undefined
  >(null);
  const socialWorkers = useAppSelector(
    (state) => state.inspector.socialWorkers
  );
  const unFinishedSocialWorker = useAppSelector(
    (state) => state.inspector.unFinishedSocialWorker
  );
  const [socialWorkersAssignedToClient, setSocialWorkersAssignedToClient] =
    useState<ISocialWorkerAssignedToClient[] | null | undefined>(null);

  const {
    data: getSocialWorkersData,
    isSuccess: isGetSocialWorkersSuccess,
    isFetching: isGetSocialWorkersFetching,
    refetch: refetchSocialWorkersByRegionID,
  } = useGetSocialWorkersByRegionIDQuery(region!.id);

  useEffect(() => {
    if (isGetSocialWorkersSuccess && !isGetSocialWorkersFetching) {
      dispatch(setSocialWorkers(getSocialWorkersData));
    }
    // else {
    //   dispatch(setSocialWorkers(mockSocialWorkers));
    // }
  }, [isGetSocialWorkersSuccess, isGetSocialWorkersFetching]);

  const {
    data: getUnFinishedSocialWorkerAssignedToClientData,
    isSuccess: isGetUnFinishedSocialWorkerAssignedToClientSuccess,
    isFetching: isGetUnFinishedSocialWorkerAssignedToClientFetching,
    refetch: refetchUnFinishedSocialWorkerAssignedToClient,
  } = useGetUnFinishedSocialWorkerAssignedToClientQuery(currentClient!.id);

  const {
    data: getSocialWorkersAssignedToClientData,
    isSuccess: isGetSocialWorkersAssignedToClientSuccess,
    isFetching: isGetSocialWorkersAssignedToClientFetching,
    refetch: refetchSocialWorkersAssignedToClient,
  } = useGetSocialWorkersAssignedToClientQuery(currentClient!.id);

  const {
    data: getRegionsData,
    isSuccess: isGetRegionsSuccess,
    isFetching: isGetRegionsFetching,
  } = useGetRegionsQuery();

  const [assignSocialworker] = useAssignSocialworkerMutation();
  const [detachSocialworker] = useDetachSocialworkerMutation();

  useEffect(() => {
    if (
      isGetSocialWorkersAssignedToClientSuccess &&
      !isGetSocialWorkersAssignedToClientFetching
    ) {
      setSocialWorkersAssignedToClient(getSocialWorkersAssignedToClientData);
    }
    // else {
    //   setSocialWorkersAssignedToClient(mockSocialWorkersAssignedToClient);
    // }
  }, [
    isGetSocialWorkersAssignedToClientSuccess,
    isGetSocialWorkersAssignedToClientFetching,
  ]);

  useEffect(() => {
    if (
      isGetUnFinishedSocialWorkerAssignedToClientSuccess &&
      !isGetUnFinishedSocialWorkerAssignedToClientFetching
    ) {
      dispatch(
        setUnFinishedSocialWorker(getUnFinishedSocialWorkerAssignedToClientData)
      );
    }
  }, [
    isGetUnFinishedSocialWorkerAssignedToClientSuccess,
    isGetUnFinishedSocialWorkerAssignedToClientFetching,
  ]);

  useEffect(() => {
    if (isGetRegionsSuccess && !isGetRegionsFetching) {
      dispatch(setRegions(getRegionsData));
    }
    // else {
    //   dispatch(setRegions(mockRegions));
    // }
  }, [isGetRegionsSuccess, isGetRegionsFetching]);

  useEffect(() => {
    if (isGetRegionsSuccess && region) {
      refetchSocialWorkersByRegionID();
      setSocialWorker(null);
    }
  }, [region]);

  useEffect(() => {
    if (
      getSocialWorkersAssignedToClientData &&
      socialWorkersAssignedToClient == null
    ) {
      refetchSocialWorkersAssignedToClient();
    }
    if (
      getUnFinishedSocialWorkerAssignedToClientData &&
      unFinishedSocialWorker == null
    ) {
      refetchUnFinishedSocialWorkerAssignedToClient();
    }
  }, []);

  function handleSelectForRegion(prop: any) {
    setRegion(prop);
  }

  function handleSelectForSocialWorker(prop: any) {
    setSocialWorker(prop);
  }

  function handleGoBack() {
    navigate("/clients");
  }

  function handleAssignSW(socialWorkerId: number) {
    assignSocialworker({
      clientId: currentClient!.id,
      socialWorkerId: socialWorkerId,
    });
  }

  function handleDetachSW(socialWorkerId: number) {
    detachSocialworker({
      clientId: currentClient!.id,
      socialWorkerId: socialWorkerId,
    });
  }

  let key = 1;

  return (
    <Wrapper>
      <TableDefault $width="780px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="300px">Ф. И. О.</TdDefault>
            <TdDefault $maxWidth="210px">Адрес</TdDefault>
            <TdDefault $maxWidth="60px">ФК</TdDefault>
            <TdDefault $maxWidth="210px">Участок</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          <TrDefault key={"client"} $trWithoutHover $tdWithoutHover>
            <TdDefault $maxWidth="300px">
              {currentClient?.lastName} {currentClient?.firstName}{" "}
              {currentClient?.middleName}
            </TdDefault>
            <TdDefault $maxWidth="210px">{currentClient?.address}</TdDefault>
            <TdDefault $maxWidth="60px">
              {
                FunctionalClassRUS[
                  currentClient?.functionalClass as keyof typeof FunctionalClassRUS
                ]
              }
            </TdDefault>
            <TdDefault $maxWidth="210px">
              {currentClient?.region.name}
            </TdDefault>
          </TrDefault>
        </TbodyDefault>
      </TableDefault>
      <SelectContainer>
        {isGetSocialWorkersFetching ? (
          <LoaderContainer>
            <LoaderElement />
          </LoaderContainer>
        ) : (
          <>
            {unFinishedSocialWorker ? (
              <>
                <>
                  <InputDefault
                    value={unFinishedSocialWorker!.region!.name}
                    disabled
                  />
                  <InputDefault
                    value={`${unFinishedSocialWorker.lastName} ${unFinishedSocialWorker.firstName} ${unFinishedSocialWorker.middleName}`}
                    disabled
                  />
                </>
                <ButtonDefault
                  $marginTop="0"
                  onClick={() => handleAssignSW(socialWorker!.id)}
                  disabled
                >
                  Закрепить
                </ButtonDefault>
              </>
            ) : (
              <>
                <>
                  <CustomSelect
                    regionsForClients={regions}
                    placeholder="Регион"
                    name="region"
                    handleSelect={handleSelectForRegion}
                    registerProps={{ value: region?.name }}
                  />
                  <CustomSelect
                    socialWorkers={socialWorkers}
                    name="socialWorker"
                    placeholder="Соц. работник"
                    handleSelect={handleSelectForSocialWorker}
                    registerProps={{ value: socialWorker?.fio }}
                  />
                </>
                <ButtonDefault
                  $marginTop="0"
                  onClick={() => handleAssignSW(socialWorker!.id)}
                >
                  Закрепить
                </ButtonDefault>
              </>
            )}
          </>
        )}
      </SelectContainer>
      
      <ButtonDefault onClick={handleGoBack}>Назад</ButtonDefault>

      {isGetSocialWorkersAssignedToClientFetching ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : socialWorkersAssignedToClient &&
        socialWorkersAssignedToClient?.length > 0 ? (
        <TableDefault $width="780px" $maxHeight="698px">
          <TheadDefault>
            <TrDefault $maxWidth="780px">
              <TdDefault $maxWidth="300px">Ф. И. О.</TdDefault>
              <TdDefault $maxWidth="240px">Дата закрепления</TdDefault>
              <TdDefault $maxWidth="240px">Дата открепления</TdDefault>
            </TrDefault>
          </TheadDefault>
          <TbodyDefault>
            {...socialWorkersAssignedToClient!.map((socialWorker) => (
              <TrDefault key={"socialWorkersAssignedToClient" + key++}>
                <TdDefault $maxWidth="300px">
                  {socialWorker.lastName} {socialWorker.firstName}{" "}
                  {socialWorker.middleName}
                </TdDefault>
                <TdDefault $maxWidth="240px">
                  {new Date(socialWorker.start).toLocaleDateString()}
                </TdDefault>
                {socialWorker.finish ? (
                  <TdDefault $maxWidth="240px">
                    {new Date(socialWorker.finish).toLocaleDateString()}
                  </TdDefault>
                ) : (
                  <TdDefault $maxWidth="240px">
                    {new Date().toLocaleDateString()}
                    <ButtonDefault
                      $red
                      $marginTop="10px"
                      onClick={() => handleDetachSW(socialWorker.id)}
                    >
                      Открепить
                    </ButtonDefault>
                  </TdDefault>
                )}
              </TrDefault>
            ))}
          </TbodyDefault>
        </TableDefault>
      ) : isGetSocialWorkersAssignedToClientSuccess &&
        socialWorkersAssignedToClient ? (
        <Text>Список соц. работников пуст</Text>
      ) : (
        <TextContainer>
          <Text>Ошибка получения данных</Text>
          <ButtonDefault
            $width="120px"
            onClick={() => {
              refetchSocialWorkersAssignedToClient();
            }}
          >
            Обновить
          </ButtonDefault>
        </TextContainer>
      )}
    </Wrapper>
  );
}
