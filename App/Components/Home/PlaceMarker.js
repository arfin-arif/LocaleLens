import { View, Text, Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

export default function PlaceMarker({ item }) {
  return (
    <Marker
      title={item.name}
      coordinate={{
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      }}
    >
      <Image
        source={require("./../../../assets/location-pin.png")}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    </Marker>
  );
}
