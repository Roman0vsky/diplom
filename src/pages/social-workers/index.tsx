import SocialWorkersList from "../../widgets/socialWorkersList";
import Map from "../../widgets/map";
import { Wrapper } from "./styled";

export default function SocialWorkers() {
  return (
    <Wrapper>
      <SocialWorkersList />
      <Map />
    </Wrapper>
  );
}
