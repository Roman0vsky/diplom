import { useEffect, useState } from "react";
import { Button, Code, QRCodeBlock, Text, Title, Wrapper } from "./styled";
import LoaderElement from "../../shared/ui/loaderElement";
import getQRCode from "../../features/qr-code/getQRCode";
import { useGetCodeMutation } from "../../features/admin/adminService";
import { useAppSelector } from "../../app/store/hooks";
import ISocialWorker from "../../shared/interfaces/socialWorker";

export default function QR_Code() {
  const currentSocialWorker = useAppSelector(
    (state) => state.inspector.currentSocialWorker
  );
  const [worker, setWorker] = useState<ISocialWorker | null>(null);

  useEffect(() => {
    if (currentSocialWorker) {
      setWorker(currentSocialWorker);
    }
  }, [currentSocialWorker]);

  const [imgSrc, setImgSrc] = useState("");
  const [code, setCode] = useState<string | undefined>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  let result = "";

  function changeLoading(prop: boolean) {
    setLoading(prop);
  }

  const [
    getCode,
    { data: getCodeData, isLoading: isCodeLoading, error: getCodeError },
  ] = useGetCodeMutation();

  useEffect(() => {
    if (getCodeData) {
      setCode(getCodeData.code);
    } else if (getCodeError) {
      console.log(`qr-code -> getQRCodeError: ${getCodeError}`);
    }
  }, [getCodeData]);

  return (
    <Wrapper>
      <Title>Получить QR-код</Title>
      <Text>
        Наведите камеру смартфона на QR-код и скачайте приложение по ссылке
      </Text>
      <QRCodeBlock>
        {isLoading ? <LoaderElement /> : imgSrc && <img src={imgSrc} />}
      </QRCodeBlock>
      <Button
        onClick={async () => {
          result = await getQRCode({ changeLoading });
          setImgSrc(result);
        }}
      >
        Получить
      </Button>
      <Text>Введите шестизначный код в скачанное приложение</Text>
      <Code>{isCodeLoading ? <LoaderElement /> : code}</Code>
      <Button
        onClick={async () => {
          try {
            if (worker) {
              await getCode(+worker?.workerId);
            }
          } catch (e) {
            console.log(`qr-code -> getSixCodeError: ${e}`);
          }
        }}
      >
        Получить
      </Button>
    </Wrapper>
  );
}
