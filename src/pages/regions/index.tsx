import { useState } from "react";
import { Wrapper } from "./styled";
import RegionsForm from "../../widgets/regionsForm";
import RegionsList from "../../widgets/regionsList";

export default function Regions() {
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
      <RegionsList
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
      />
      <RegionsForm
        isFormVisible={isFormVisible}
        isButtonsVisible={isButtonsVisible}
        changeFormVisibility={changeFormVisibility}
      />
    </Wrapper>
  );
}
