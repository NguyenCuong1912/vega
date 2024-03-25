import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { dataMap } from "../../constants/constants";
import CommonStyles from "../../components/CommonStyles";
export default function Facility(props) {
  //! state
  const position = [21.017069714364983, 105.85504793070729];
  //! function
  //! render
  const renderMarker = () => {
    return dataMap?.map((item, index) => {
      return (
        <Marker position={item.position} key={index}>
          <Popup>
            <div>
              <h3>{item.name}</h3>
              <CommonStyles.Typograpy>{item.address}</CommonStyles.Typograpy>
            </div>
          </Popup>
        </Marker>
      );
    });
  };
  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {renderMarker()}
    </MapContainer>
  );
}
