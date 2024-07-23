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
import Post from "../../shared/enums/post";
import { useGetInspectorsQuery } from "../../features/admin/adminService";
import IInspector from "../../shared/interfaces/inspector";
import {
  setCurrentInspector,
  setInspectors,
} from "../../features/admin/adminSlice";
// import mockInspectors from "../../shared/mock/inspectors";

interface IProps {
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
}

export default function InspectorList({
  changeFormVisibility,
  changeButtonsVisibility,
}: IProps) {
  const dispatch = useAppDispatch();
  const inspectors = useAppSelector((state) => state.admin.inspectors);

  const {
    data: getInspectorsData,
    isSuccess: isGetInspectorsSuccess,
    isLoading: isGetInspectorsLoading,
    isFetching: isGetInspectorsFetching,
    refetch: refetchInspectors,
  } = useGetInspectorsQuery();

  let key = 1;

  useEffect(() => {
    if (isGetInspectorsSuccess && !isGetInspectorsFetching) {
      dispatch(setInspectors(getInspectorsData));
    } 
    // else {
    //   dispatch(setInspectors(mockInspectors));
    // }
  }, [isGetInspectorsSuccess, isGetInspectorsFetching]);

  function addButtonHandler() {
    dispatch(
      setCurrentInspector({
        lastName: "",
        firstName: "",
        middleName: "",
        login: "",
        id: 0,
        workerId: 0,
        inspectorId: 0,
        region: { id: 0, name: "" },
        post: Post.INSPECTOR,
      })
    );
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function inspectorOnClick(inspector: IInspector) {
    dispatch(setCurrentInspector(inspector));
  }

  return isGetInspectorsLoading || isGetInspectorsFetching ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : inspectors && inspectors.length > 0 ? (
    <Wrapper>
      <TableDefault $width="410px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="300px">Ф. И. О.</TdDefault>
            <TdDefault $maxWidth="110px">Должность</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...inspectors.map((inspector) => (
            <TrDefault
              key={"inspectors" + key++}
              onClick={() => {
                inspectorOnClick(inspector);
                changeButtonsVisibility(true);
                changeFormVisibility(true);
              }}
            >
              <TdDefault $maxWidth="300px">
                {inspector.lastName} {inspector.firstName}{" "}
                {inspector.middleName}
              </TdDefault>
              <TdDefault $maxWidth="110px">
                {(inspector.post === Post.INSPECTOR && "Инспектор") ||
                  (inspector.post === Post.ADMIN && "Админ")}
              </TdDefault>
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : inspectors ? (
    <Wrapper>
      <Text>Список инспекторов пуст</Text>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : (
    <Wrapper>
      <TextContainer>
        <Text>Ошибка получения данных</Text>
        <ButtonDefault
          $width="120px"
          onClick={() => {
            refetchInspectors();
          }}
        >
          Обновить
        </ButtonDefault>
      </TextContainer>
    </Wrapper>
  );
}
