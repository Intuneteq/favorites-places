import React from "react";
import PlaceForm from "../components/places/PlaceForm";
import { AddPlaceScreenProps } from "../navigation/type";
import { Place } from "../model/Place";
import { storePlace } from "../util/db";

type Props = AddPlaceScreenProps;

export default function AddPlace({ navigation }: Props) {
  async function createPlaceHandler(place: Place) {
    await storePlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
