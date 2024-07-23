import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { useGetClientsQuery } from "../../features/inspector/inspectorService";
import {
  setCurrentClient,
  setClients,
} from "../../features/inspector/inspectorSlice";
import {
  ButtonDefault,
  PlusButton,
  TableDefault,
  TbodyDefault,
  TdDefault,
  TheadDefault,
  TrDefault,
} from "../../shared/globalStyles";
import IClient from "../../shared/interfaces/client";
import { LoaderContainer, Text, TextContainer, Wrapper } from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import FunctionalClassRUS from "../../shared/enums/functionalClassRUS";
import { useGetRegionsQuery } from "../../features/admin/adminService";
import { setRegions } from "../../features/admin/adminSlice";
// import mockClients from "../../shared/mock/clients";
import mockRegions from "../../shared/mock/regions";
import CustomSelect from "../../shared/ui/customSelect";
import IRegion from "../../shared/interfaces/region";

interface IProps {
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
}

export default function ClientsList({
  changeFormVisibility,
  changeButtonsVisibility,
}: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [region, setRegion] = useState<IRegion | null | undefined>(
    user?.region
  );

  const {
    data: getClientsData,
    isSuccess: isGetClientsSuccess,
    isLoading: isGetClientsLoading,
    isFetching: isGetClientsFetching,
    refetch: refetchClients,
  } = useGetClientsQuery(region?.id);

  const {
    data: getRegionsData,
    isSuccess: isGetRegionsSuccess,
    isLoading: isGetRegionsLoading,
    isFetching: isGetRegionsFetching,
  } = useGetRegionsQuery();

  const clients = useAppSelector((state) => state.inspector.clients);
  const regions = useAppSelector((state) => state.admin.regions);

  let key = 1;

  useEffect(() => {
    if (isGetClientsSuccess && !isGetClientsFetching) {
      dispatch(setClients(getClientsData));
    }
    // else {
    //   dispatch(setClients(mockClients));
    // }
  }, [isGetClientsSuccess, isGetClientsFetching]);

  useEffect(() => {
    if (isGetRegionsSuccess && !isGetRegionsFetching) {
      dispatch(setRegions(getRegionsData));
    }
    else {
      dispatch(setRegions(mockRegions));
    }
  }, [isGetRegionsSuccess, isGetRegionsFetching]);

  useEffect(() => {
    if (isGetRegionsSuccess && region) {
      refetchClients();
    }
  }, [region]);

  function addButtonHandler() {
    const region = regions.find(
      (region) => region.id === user?.region?.id
    ) as IRegion;

    dispatch(
      setCurrentClient({
        address: "",
        firstName: "",
        functionalClass: "",
        lastName: "",
        middleName: "",
        id: 0,
        gpwVeteran: false,
        warVictim: false,
        lonelyInvalid: false,
        lonelyOldPerson: false,
        cottage: false,
        region,
        regionId: user!.region!.id,
      })
    );
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function clientOnClick(client: IClient) {
    const region = regions.find(
      (region) => region.id === client.regionId
    ) as IRegion;
    dispatch(
      setCurrentClient({
        ...client,
        region,
      })
    );
  }

  function handleSelect(prop: any) {
    setRegion(prop);
  }

  return isGetClientsLoading ||
    isGetClientsFetching ||
    isGetRegionsLoading ||
    isGetRegionsFetching ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : clients && clients.length > 0 ? (
    <Wrapper>
      {regions && (
        <CustomSelect
          regionsForClients={regions}
          placeholder="Регион"
          name="region"
          handleSelect={handleSelect}
          registerProps={{ value: region?.name }}
        />
      )}
      <TableDefault $width="540px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="240px">Ф. И. О.</TdDefault>
            <TdDefault $maxWidth="240px">Адрес</TdDefault>
            <TdDefault $maxWidth="60px">ФК</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...clients.map((client) => (
            <TrDefault
              key={"client" + key++}
              onClick={() => {
                clientOnClick(client);
                changeButtonsVisibility(true);
                changeFormVisibility(true);
              }}
            >
              <TdDefault $maxWidth="240px">
                {client.lastName} {client.firstName} {client.middleName}
              </TdDefault>
              <TdDefault $maxWidth="240px">{client.address}</TdDefault>
              <TdDefault $maxWidth="60px">
                {
                  FunctionalClassRUS[
                    client.functionalClass as keyof typeof FunctionalClassRUS
                  ]
                }
              </TdDefault>
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : clients ? (
    <Wrapper>
      {regions && (
        <CustomSelect
          regionsForClients={regions}
          placeholder="Регион"
          name="region"
          handleSelect={handleSelect}
          registerProps={{ value: region?.name }}
        />
      )}
      <Text>Список подопечных пуст</Text>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : (
    <Wrapper>
      {regions && (
        <CustomSelect
          regionsForClients={regions}
          placeholder="Регион"
          name="region"
          handleSelect={handleSelect}
          registerProps={{ value: region?.name }}
        />
      )}
      <TextContainer>
        <Text>Ошибка получения данных</Text>
        <ButtonDefault
          $width="120px"
          onClick={() => {
            refetchClients();
          }}
        >
          Обновить
        </ButtonDefault>
      </TextContainer>
    </Wrapper>
  );
}
