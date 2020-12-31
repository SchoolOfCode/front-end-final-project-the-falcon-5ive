import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  zoomControl: true,
};

function Maps({ marker, setMarker, isEditing }) {
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBn62Gatuw8cbCB2LUcuNGv1mVGgakvh4Y",
    libraries,
  });

  function onMapClick(e) {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={
          isEditing
            ? {
                lat: 52.47653701744309,
                lng: -1.890981567759743,
              }
            : marker
        }
        options={options}
        onClick={(e) => {
          isEditing && onMapClick(e);
        }}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={marker}
            icon={{
              //we can add a url: "smth"; to change the location style
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default Maps;
