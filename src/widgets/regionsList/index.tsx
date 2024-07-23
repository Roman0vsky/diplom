import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  ButtonDefault,
  PlusButton,
  TableDefault,
  TbodyDefault,
  TdDefault,
  TheadDefault,
  TrDefault,
} from "../../shared/globalStyles";
import { LoaderContainer, Text, TextContainer, Wrapper } from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import { useGetRegionsQuery } from "../../features/admin/adminService";
import IRegion from "../../shared/interfaces/region";
import { setCurrentRegion, setRegions } from "../../features/admin/adminSlice";

interface IProps {
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
}

export default function RegionsList({
  changeFormVisibility,
  changeButtonsVisibility,
}: IProps) {
  const dispatch = useAppDispatch();
  const regions = useAppSelector((state) => state.admin.regions);

  const {
    data: getRegionsData,
    isSuccess: isGetRegionsSuccess,
    isLoading: isGetRegionsLoading,
    isFetching: isGetRegionsFetching,
    refetch: refetchRegions,
  } = useGetRegionsQuery();

  let key = 1;

  useEffect(() => {
    if (isGetRegionsSuccess && !isGetRegionsFetching) {
      dispatch(setRegions(getRegionsData));
    }
  }, [isGetRegionsSuccess, isGetRegionsFetching]);

  function addButtonHandler() {
    dispatch(setCurrentRegion({ id: 0, name: "" }));
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function regionOnClick(region: IRegion) {
    dispatch(setCurrentRegion(region));
  }

  return isGetRegionsLoading || isGetRegionsFetching ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : regions && regions.length > 0 ? (
    <Wrapper>
      <TableDefault $width="300px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="300px">Название региона</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...regions.map((region) => (
            <TrDefault
              key={"regions" + key++}
              onClick={() => {
                regionOnClick(region);
                changeButtonsVisibility(true);
                changeFormVisibility(true);
              }}
            >
              <TdDefault $maxWidth="300px">{region.name}</TdDefault>
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : regions ? (
    <Wrapper>
      <Text>Список регионов пуст</Text>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : (
    <Wrapper>
      <TextContainer>
        <Text>Ошибка получения данных</Text>
        <ButtonDefault
          $width="120px"
          onClick={() => {
            refetchRegions();
          }}
        >
          Обновить
        </ButtonDefault>
      </TextContainer>
    </Wrapper>
  );
}
