import { useState } from "react";
import { Button, QRCodeBlock, Text, Title, Wrapper } from "./style";
import LoaderElement from "../../shared/ui/loaderElement";
import getQRCode from "../../features/qr-code/getQRCode";

export default function QR_Code() {
  const [imgSrc, setImgSrc] = useState("");
  // eslint-disable-next-line prefer-const
  let isLoading = false;
  let result = "";

  return (
    <Wrapper>
      <Title>Получить QR-код</Title>
      <Text>Наведите камеру смартфона на QR-код и скачайте приложение по ссылке</Text>
      <QRCodeBlock>
        {isLoading ? <LoaderElement /> : imgSrc && <img src={imgSrc} />}
      </QRCodeBlock>
      <Button
        onClick={async () => {
          result = await getQRCode(isLoading);
          setImgSrc(result);
        }}
      >
        Получить
      </Button>
    </Wrapper>
  );
}
