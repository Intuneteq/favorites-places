import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { PlaceDetailsScreenProps } from "../navigation/type";
import { fetchPlaceDetails } from "../util/db";
import { Place } from "../model/Place";

type Props = PlaceDetailsScreenProps;

export default function PlaceDetails({ route: { params }, navigation }: Props) {
  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);

  const selectedPlaceId = params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      console.log("place", place);
      
      setFetchedPlace(place);
      navigation.setOptions({ title: place?.title });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  function showOnMapHandler() {
    if (fetchedPlace) {
      navigation.navigate("Map", {
        latitude: fetchedPlace.location.latitude,
        longitude: fetchedPlace.location.longitude,
      });
    }
  }

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton onPress={showOnMapHandler} icon="map">
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "30%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalStyles.colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
