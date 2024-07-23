import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Wrapper } from "./styled";
import L, { LatLngExpression } from "leaflet";
import { useAppSelector } from "../../app/store/hooks";
import { bluePin, redPin } from "../../shared/imgs";

interface IProps {
  selectedRowIndex: number | null;
}

export default function SocialWorkersMap({ selectedRowIndex }: IProps) {
  const centerPosition: LatLngExpression = [55.192919, 30.206];
  const socialWorkers = useAppSelector(
    (state) => state.inspector.socialWorkers
  );

  const blueIcon = L.icon({
    iconUrl: bluePin,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const redIcon = L.icon({
    iconUrl: redPin,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
  return (
    <Wrapper>
      <MapContainer
        center={centerPosition}
        zoom={13}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {socialWorkers.map(
          (socialWorker, index) =>
            socialWorker.longitude &&
            socialWorker.latitude && (
              <Marker
                position={[+socialWorker.latitude, +socialWorker.longitude]}
                icon={selectedRowIndex === index ? redIcon : blueIcon}
              >
                <Popup>{`${socialWorker.lastName} ${socialWorker.firstName} ${socialWorker.middleName}`}</Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </Wrapper>
  );
}
