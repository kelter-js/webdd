export interface ResourceCollectionData {
  collected: number;
  required: number;
}

export interface ResourcesMapData {
  ore: null | ResourceCollectionData;
  soul: null | ResourceCollectionData;
  treasures: null | ResourceCollectionData;
}
