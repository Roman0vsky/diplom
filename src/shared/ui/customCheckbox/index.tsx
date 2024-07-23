import { Input, Question, Wrapper } from "./styled";

interface IProps {
  registerProps?: object;
  name: string;
  isError?: boolean;
  handleSelect?: (object: object) => void;
  question: string;
  marginBottom?: string;
}

export default function CustomCheckbox({
  registerProps,
  name,
  isError,
  handleSelect = () => {},
  question,
  marginBottom,
}: IProps) {
  function setChoice(prop: boolean) {
    handleSelect({ [name]: prop });
  }

  return (
    <Wrapper key={name} $marginBottom={marginBottom}>
      <Input
        id={name}
        style={{ cursor: "pointer" }}
        {...registerProps}
        $redBorder={isError}
        type="checkbox"
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          setChoice(e.currentTarget.checked)
        }
      />
      <Question htmlFor={name}>{question}</Question>
    </Wrapper>
  );
}
