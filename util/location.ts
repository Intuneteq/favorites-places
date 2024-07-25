import axios from "axios";
import { LatLng } from "react-native-maps";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export function getMapPreview({ latitude, longitude }: LatLng) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress({ latitude, longitude }: LatLng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

  try {
    const res = await axios(url);

    const address = res.data.results[0].formatted_address as string;
    return address;
  } catch (error) {
    throw new Error("Failed to fetch address!");
  }
}
