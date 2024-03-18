import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import PlaceItem from "./PlaceItem";
import PlaceItemBig from "./PlaceItemBig";
import { useNavigation } from "@react-navigation/native";

export default function PlaceList({ placeList }) {
  const navigator = useNavigation();
  const onPlaceClick = (item) => {
    navigator.navigate("place-detail", { place: item });
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "font-bold",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Found {placeList?.length ? placeList?.length : 0} Places
      </Text>

      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
            <PlaceItem place={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
