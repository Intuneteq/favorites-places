import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { MapNavigationProp, RootStackParamList } from "../navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconButton from "../components/UI/IconButton";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

export default function Map({ navigation, route }: Props) {
  const initialLocation = route.params;
  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>(
    initialLocation
  );

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked",
        "You jhave to pick a location by tapping on the map first"
      );

      return;
    }

    navigation.navigate("AddPlace", selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : 37.78,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    longitudeDelta: 0.0922,
    latitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if(initialLocation) return;
    
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
