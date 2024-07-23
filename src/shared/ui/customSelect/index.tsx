import { SelectContainer, SelectItem, Wrapper } from "./styled";
import { InputDefault } from "../../globalStyles";
import { useEffect, useRef, useState } from "react";
import IRegion from "../../interfaces/region";
import FunctionalClassRUS from "../../enums/functionalClassRUS";
import ISocialWorker from "../../interfaces/socialWorker";

interface IProps {
  items?: string[];
  registerProps?: object;
  placeholder?: string;
  name?: string;
  isError?: boolean;
  handleSelect?: (object: object) => void;
  regions?: IRegion[];
  regionsForClients?: IRegion[];
  socialWorkers?: ISocialWorker[] | null;
  disabled?: boolean;
}

export default function CustomSelect({
  items,
  registerProps,
  placeholder,
  name = "",
  isError,
  handleSelect = () => {},
  regions,
  socialWorkers,
  regionsForClients,
  disabled = false,
}: IProps) {
  const [isContainerVisible, setContainerVisibility] = useState<boolean>(false);
  const refSelectContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isContainerVisible) {
      refSelectContainer.current!.focus();
    }
  }, [isContainerVisible]);

  function inputOnFocus() {
    setContainerVisibility(true);
  }

  function selectOnFocus() {
    setContainerVisibility(true);
  }

  function selectOnBlur() {
    setContainerVisibility(false);
  }

  function selectItem(prop: string) {
    handleSelect({ [name]: prop });
  }

  function selectItemForRegions(region: IRegion) {
    handleSelect({ region: region });
  }

  function selectItemForRegionsForClients(region: IRegion) {
    handleSelect(region);
  }

  function selectItemForSocialWorkers(socialWorker: ISocialWorker) {
    handleSelect({
      fio: `${socialWorker?.lastName} ${socialWorker?.firstName} ${socialWorker?.middleName}`,
      id: socialWorker.id,
    });
  }
  let key = 1;

  return (
    <Wrapper>
      <InputDefault
        tabIndex={1}
        readOnly
        onFocus={inputOnFocus}
        style={{ cursor: "pointer" }}
        {...registerProps}
        placeholder={placeholder}
        $redBorder={isError}
      />
      <SelectContainer
        key={"selectContainer"}
        tabIndex={2}
        $isContainerVisible={isContainerVisible}
        ref={refSelectContainer}
        onFocus={selectOnFocus}
        onBlur={selectOnBlur}
      >
        {!disabled &&
          (items?.map((item) => (
            <SelectItem
              className="custom-option"
              key={`selectItem${key++}`}
              onClick={() => {
                selectItem(item);
                setContainerVisibility(false);
              }}
            >
              {FunctionalClassRUS[item as keyof typeof FunctionalClassRUS]}
            </SelectItem>
          )) ||
            regions?.map((region) => (
              <SelectItem
                className="custom-option"
                key={`selectItem${key++}`}
                onClick={() => {
                  selectItemForRegions(region);
                  setContainerVisibility(false);
                }}
              >
                {region.name}
              </SelectItem>
            )) ||
            regionsForClients?.map((region) => (
              <SelectItem
                className="custom-option"
                key={`selectItem${key++}`}
                onClick={() => {
                  selectItemForRegionsForClients(region);
                  setContainerVisibility(false);
                }}
              >
                {region.name}
              </SelectItem>
            )) ||
            socialWorkers?.map((socialWorker) => (
              <SelectItem
                className="custom-option"
                key={`selectItem${key++}`}
                onClick={() => {
                  selectItemForSocialWorkers(socialWorker);
                  setContainerVisibility(false);
                }}
              >
                {socialWorker.lastName} {socialWorker.firstName}{" "}
                {socialWorker.middleName}
              </SelectItem>
            )))}
      </SelectContainer>
    </Wrapper>
  );
}
