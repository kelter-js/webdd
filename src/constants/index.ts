import cityImage from "../assets/city.png";

export enum LOCATION_NAMES {
  CITY = "CITY",
}

export enum BUILDING_NAMES {
  QUEST_DESK = "quest_desk",
  MEDICAL_STATION = "medicalstation",
  SMITH = "smith",
  GRAVEYARD = "graveyard",
  TOWER = "tower",
  TAVERN = "tavern",
  RANGER = "ranger",
  CITADEL = "citadel",
}

export const LOCATIONS = {
  [LOCATION_NAMES.CITY]: {
    coords: [
      {
        coords: "385,696,556,643,560,548,475,450,227,373,109,384,14,494,24,579",
        name: BUILDING_NAMES.CITADEL,
      },
      {
        coords:
          "1494,838,991,701,1058,643,1435,500,1684,439,1859,553,1895,661,1730,731",
        name: BUILDING_NAMES.SMITH,
      },
      {
        coords: "753,590,746,493,919,454,921,543",
        name: BUILDING_NAMES.QUEST_DESK,
      },
      {
        coords: "47,161,76,331,458,287,585,131,251,39",
        name: BUILDING_NAMES.GRAVEYARD,
      },
      {
        coords: "936,203,1055,224,1133,218,1160,101,1150,62,1047,33,946,61",
        name: BUILDING_NAMES.TOWER,
      },
      {
        coords:
          "889,453,882,401,902,389,926,338,865,258,755,200,582,195,511,221,458,324,473,438,738,497",
        name: BUILDING_NAMES.TAVERN,
      },
      {
        coords:
          "850,245,924,337,916,371,962,381,1072,352,1086,282,1041,228,865,209",
        name: BUILDING_NAMES.RANGER,
      },
      {
        coords:
          "1235,201,1092,343,1099,425,1130,462,1235,483,1352,476,1486,439,1594,456,1693,425,1706,343,1655,289,1503,164,1425,153",
        name: BUILDING_NAMES.MEDICAL_STATION,
      },
    ],
    mapImage: cityImage,
  },
};

export const ONE_SECOND_IN_MS = 1000;
