import { useState } from "react";
import ClientsForm from "../../widgets/clientsForm";
import ClientsList from "../../widgets/clientsList";
import { Wrapper } from "./styled";

export default function Clients() {
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
      <ClientsList
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
      />
      <ClientsForm
        isFormVisible={isFormVisible}
        isButtonsVisible={isButtonsVisible}
        changeFormVisibility={changeFormVisibility}
      />
    </Wrapper>
  );
}
