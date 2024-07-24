import React, { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { AllPlacesScreenProps } from "../navigation/type";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../model/Place";
import { fetchPlaces } from "../util/db";

type Props = AllPlacesScreenProps;

export default function AllPlaces({}: Props) {
  const isFocused = useIsFocused();
  const [loadedPlaces, setloadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setloadedPlaces(places);
    }
    
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
