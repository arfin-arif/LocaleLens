import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import PlaceMarker from "./PlaceMarker";
import Colors from "../../Shared/Colors";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function GoogleMapView({ placeList }) {
  // const [mapRegion, setmapRegion] = useState([]);

  const [mapRegion, setmapRegion] = useState({
    latitude: 23.7501678,
    longitude: 90.3498609,
    latitudeDelta: 0.01022,
    longitudeDelta: 0.0421,
  });

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        latitudeDelta: 0.01022,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          marginBottom: 10,
          fontWeight: "600",
          fontSize: 20,
          fontFamily: "font-bold",
        }}
      >
        Top Near By Places
      </Text>
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <MapView
          style={{
            width: Dimensions.get("screen").width * 0.89,
            height: Dimensions.get("screen").height * 0.23,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
          <Marker title="You" coordinate={mapRegion} />
          {placeList.map(
            (item, index) =>
              index <= 8 && <PlaceMarker item={item} key={index} />
          )}
        </MapView>
      </View>
    </View>
  );
}
