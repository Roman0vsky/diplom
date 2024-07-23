import { useState } from "react";
import InspectorsForm from "../../widgets/inspectorsForm";
import InspectorsList from "../../widgets/inspectorsList";
import { Wrapper } from "./styled";

export default function Workers() {
  const [isFormVisible, setFormVisibility] = useState<boolean>(false);
  const [isButtonsVisible, setButtonsVisibility] = useState<boolean>(false);

  function changeFormVisibility(prop: boolean) {
    setFormVisibility(prop);
  }

  function changeButtonsVisibility(prop: boolean) {
    setButtonsVisibility(prop);
  }
  return (
    <Wrapper>
      <InspectorsList
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
      />
      <InspectorsForm
        isFormVisible={isFormVisible}
        isButtonsVisible={isButtonsVisible}
        changeFormVisibility={changeFormVisibility}
      />
    </Wrapper>
  );
}
