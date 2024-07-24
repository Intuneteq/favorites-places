import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { LatLng } from "react-native-maps";
import { Place } from "../model/Place";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: LatLng;
  Map: LatLng | undefined;
  PlaceDetails: { placeId: string };
};

// Screen Props
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, "Map">;
export type AddPlaceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddPlace"
>;
export type AllPlacesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AllPlaces"
>;
export type PlaceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PlaceDetails"
>;

// Navigation Props
export type AllPlacesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllPlaces"
>;

export type AddPlaceNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;

export type PlaceDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PlaceDetails"
>;

export type MapNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Map"
>;

// Route Props
export type AddPlaceRouteProp = AddPlaceScreenProps["route"];
