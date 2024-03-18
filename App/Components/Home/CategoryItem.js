import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";

export default function CategoryItem({ category }) {
  return (
    <View
      style={{
        padding: 5,
        alignItems: "center",
        margin: 3,
        width: 100,
        height: 95,
        justifyContent: "center",
        borderRadius: 15,
        elevation: 5,
        backgroundColor: Colors.GRAY,
      }}
    >
      <Image source={category.icon} style={{ width: 40, height: 30 }} />
      <Text style={{ fontSize: 13, fontFamily: "font-reg" }}>
        {category.name}
      </Text>
    </View>
  );
}
