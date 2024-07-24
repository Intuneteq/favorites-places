import { LatLng } from "react-native-maps";

export class Place {
  public id: string;
  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: LatLng,
    id?: string
  ) {
    this.id = id ?? new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
