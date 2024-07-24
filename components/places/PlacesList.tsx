import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { Place } from "../../model/Place";
import { useNavigation } from "@react-navigation/native";
import { PlaceDetailsNavigationProp } from "../../navigation/type";

type Props = {
  places: Place[];
};

export default function PlacesList({ places }: Props) {
  const navigation = useNavigation<PlaceDetailsNavigationProp>();

  function selectPlaceHandler(id: string) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem onSelect={selectPlaceHandler} place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
  },
});