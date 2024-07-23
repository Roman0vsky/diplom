import { useState } from "react";
import SocialWorkersForm from "../../widgets/socialWorkersForm";
import SocialWorkersList from "../../widgets/socialWorkersList";
import { Wrapper } from "./styled";
import SocialWorkersMap from "../../widgets/socialWorkersMap";

export default function SocialWorkers() {
  const [isFormVisible, setFormVisibility] = useState<boolean>(false);
  const [isButtonsVisible, setButtonsVisibility] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  function changeFormVisibility(prop: boolean) {
    setFormVisibility(prop);
  }

  function changeButtonsVisibility(prop: boolean) {
    setButtonsVisibility(prop);
  }

  function handleRowClick(index: number | null) {
    setSelectedRowIndex(index);
    isFormVisible && setButtonsVisibility(true);
  }

  return (
    <Wrapper>
      <SocialWorkersList
        isFormVisible={isFormVisible}
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
        handleRowClick={handleRowClick}
        selectedRowIndex={selectedRowIndex}
      />
      {isFormVisible && (
        <SocialWorkersForm
          isFormVisible={isFormVisible}
          isButtonsVisible={isButtonsVisible}
          changeFormVisibility={changeFormVisibility}
        />
      )}
      {!isFormVisible && (
        <SocialWorkersMap selectedRowIndex={selectedRowIndex} />
      )}
    </Wrapper>
  );
}
