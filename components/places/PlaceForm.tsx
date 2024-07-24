import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { LatLng } from "react-native-maps";
import { Place } from "../../model/Place";

type Props = {
  onCreatePlace: (place: Place) => void;
};

export default function PlaceForm({ onCreatePlace }: Props) {
  const [address, setAddress] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState<LatLng>();

  function changeTitleHandler(value: string) {
    setEnteredTitle(value);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback(
    (location: LatLng, address: string) => {
      setPickedLocation(location);
      setAddress(address);
    },
    []
  );

  function savePlaceHandler() {
    if (pickedLocation) {
      const place = new Place(
        enteredTitle,
        selectedImage,
        address,
        pickedLocation
      );

      onCreatePlace(place);
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: GlobalStyles.colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalStyles.colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
