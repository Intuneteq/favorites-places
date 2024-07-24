import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../../model/Place";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { PlaceDetailsNavigationProp } from "../../navigation/type";

type Props = {
  place: Place;
  onSelect: (id: string) => void;
};

export default function PlaceItem({ place, onSelect }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: GlobalStyles.colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    height: "100%",
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  address: {
    fontSize: 12,
    color: "white",
  },
});
