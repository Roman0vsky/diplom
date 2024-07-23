/* eslint-disable @typescript-eslint/ban-types */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  setCurrentSocialWorker,
  setSocialWorkers,
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
import {
  ImgContainer,
  LoaderContainer,
  Text,
  TextContainer,
  Wrapper,
} from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import ISocialWorker from "../../shared/interfaces/socialWorker";
import Post from "../../shared/enums/post";
import { useGetSocialWorkersQuery } from "../../features/inspector/inspectorService";
// import mockSocialWorkers from "../../shared/mock/socialWorkers";
import { pencil, pin } from "../../shared/imgs";

interface IProps {
  isFormVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
  handleRowClick: (index: number | null) => void;
  selectedRowIndex: number | null;
}

export default function SocialWorkersList({
  isFormVisible,
  changeFormVisibility,
  changeButtonsVisibility,
  handleRowClick,
  selectedRowIndex,
}: IProps) {
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const socialWorkers = useAppSelector(
    (state) => state.inspector.socialWorkers
  );

  const {
    data: getSocialWorkersData,
    isSuccess: isGetSocialWorkersSuccess,
    isLoading: isGetSocialWorkersLoading,
    isFetching: isGetSocialWorkersFetching,
    refetch: refetchSocialWorkers,
  } = useGetSocialWorkersQuery(user!.id);

  let key = 1;

  useEffect(() => {
    if (isGetSocialWorkersSuccess && !isGetSocialWorkersFetching) {
      dispatch(setSocialWorkers(getSocialWorkersData));
    }
    // else {
    //   dispatch(setSocialWorkers(mockSocialWorkers));
    // }
  }, [isGetSocialWorkersSuccess, isGetSocialWorkersFetching]);

  function addButtonHandler() {
    dispatch(
      setCurrentSocialWorker({
        lastName: "",
        firstName: "",
        middleName: "",
        id: 0,
        workerId: 0,
        inspectorId: user!.inspectorId,
        post: Post.SOCIAL_WORKER,
        longitude: 0,
        latitude: 0,
      })
    );
    handleRowClick(null);
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function socialWorkerOnClick(socialWorker: ISocialWorker) {
    dispatch(setCurrentSocialWorker(socialWorker));
  }

  return isGetSocialWorkersLoading || isGetSocialWorkersFetching ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : socialWorkers && socialWorkers.length > 0 ? (
    <Wrapper>
      <TableDefault $width="341px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault $maxWidth="300px">
            <TdDefault $maxWidth="300px">Ф. И. О.</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...socialWorkers.map((socialWorker, index) => (
            <TrDefault
              key={"socialWorkers" + key++}
              onClick={() => {
                socialWorkerOnClick(socialWorker);
              }}
              $trWithoutHover
            >
              <TdDefault
                $maxWidth="300px"
                onClick={() => {
                  handleRowClick(index);
                }}
                $selected={selectedRowIndex === index}
              >
                {socialWorker.lastName} {socialWorker.firstName}{" "}
                {socialWorker.middleName}
              </TdDefault>
              {!isFormVisible && (
                <ImgContainer
                  $visibility={selectedRowIndex === index}
                  onClick={() => {
                    changeButtonsVisibility(true);
                    changeFormVisibility(true);
                  }}
                >
                  <img height="36px" src={pencil} />
                </ImgContainer>
              )}
              {isFormVisible && (
                <ImgContainer
                  $visibility={selectedRowIndex === index}
                  onClick={() => {
                    changeButtonsVisibility(false);
                    changeFormVisibility(false);
                  }}
                >
                  <img height="36px" src={pin} />
                </ImgContainer>
              )}
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler} $marginRight="41px" />
    </Wrapper>
  ) : socialWorkers ? (
    <Wrapper>
      <Text>Список соц. работников пуст</Text>
      <PlusButton onClick={addButtonHandler} />
    </Wrapper>
  ) : (
    <TextContainer>
      <Text>Ошибка получения данных</Text>
      <ButtonDefault
        $width="120px"
        onClick={() => {
          refetchSocialWorkers();
        }}
      >
        Обновить
      </ButtonDefault>
    </TextContainer>
  );
}
