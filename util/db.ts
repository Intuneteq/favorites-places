import * as SQLite from "expo-sqlite";
import { Place } from "../model/Place";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  await database.execAsync(`CREATE TABLE IF NOT EXISTS places (
   id INTEGER PRIMARY KEY NOT NULL, 
   title TEXT NOT NULL,
   imageUri TEXT NOT NULL,
   address TEXT NOT NULL,
   latitude REAL NOT NULL,
   longitude REAL NOT NULL
   )`);
}

export async function storePlace(place: Place) {
  const result = await database.runAsync(
    `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.latitude,
      place.location.longitude,
    ]
  );

  return result;
}

export async function fetchPlaces() {
  const places = await database.getAllAsync<Place>("SELECT * FROM places");
  return places;
}

export async function fetchPlaceDetails(id: string) {
  try {
    const result = await database.getFirstAsync<any>(
      `SELECT * FROM places WHERE id = ?`,
      [id]
    );

    if (!result) return null;

    const location = { latitude: result.latitude, longitude: result.longitude };

    const place = new Place(
      result.title,
      result.imageUri,
      result.address,
      location,
      result.id
    );

    return place;
  } catch (error) {
    console.log(error);
    return null;
  }
}
