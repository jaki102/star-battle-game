export type ResourceItem = {
  name: string;
  power: number;
};

export type ResourceType = {
  uid: string;
  name: string;
  url: string;
};

export enum Resource {
  People = "people",
  Starships = "starships",
}
