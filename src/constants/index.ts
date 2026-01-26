import cityImage from "../assets/city.png";
import city2Image from "../assets/city2.png";

export enum LOCATION_NAMES {
  CITY = "CITY",
  CITY2 = "CITY2",
}

export enum BUILDING_NAMES {
  QUEST_DESK = "quest_desk",
  MEDICAL_STATION = "medicalstation",
  SMITH = "smith",
  GRAVEYARD = "graveyard",
  TOWER = "tower",
  TAVERN = "tavern",
  SHOP = "shop",
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
        name: BUILDING_NAMES.SHOP,
      },
      {
        coords:
          "1235,201,1092,343,1099,425,1130,462,1235,483,1352,476,1486,439,1594,456,1693,425,1706,343,1655,289,1503,164,1425,153",
        name: BUILDING_NAMES.MEDICAL_STATION,
      },
    ],
    mapImage: cityImage,
  },
  [LOCATION_NAMES.CITY2]: {
    coords: [
      {
        // Большая область слева вверху
        coords: "145,207,179,428,430,387,423,185",
        name: BUILDING_NAMES.GRAVEYARD,
      },
      {
        // Большая область слева внизу
        coords: "31,535,289,497,413,558,454,660,148,720,38,687",
        name: BUILDING_NAMES.CITADEL,
      },
      {
        // Центральная нижняя область
        coords: "539,402,481,482,444,553,635,611,851,557,842,463",
        name: BUILDING_NAMES.TAVERN,
      },
      {
        // Большая область справа внизу
        coords: "1353,660,1395,521,1499,523,1787,565,1906,659,1695,744",
        name: BUILDING_NAMES.SMITH,
      },
      {
        // Прямоугольная область справа (средний уровень)
        coords: "1914,513,1919,331,1748,313,1552,326,1549,463,1739,496",
        name: BUILDING_NAMES.MEDICAL_STATION,
      },
      {
        // Узкая горизонтальная область в центре
        coords: "1320,470,1154,521,946,485,957,401,1102,351,1161,358",
        name: BUILDING_NAMES.QUEST_DESK,
      },
      {
        // Вертикальная область (похожа на Башню)
        coords: "1219,170,1155,87,1097,136,1071,355,1226,372,1253,365",
        name: BUILDING_NAMES.TOWER,
      },
      {
        // Область справа вверху
        coords: "1242,394,1244,321,1392,182,1607,204,1609,389,1482,412",
        name: BUILDING_NAMES.SHOP,
      },
    ],
    mapImage: city2Image,
  },
};

export const ONE_SECOND_IN_MS = 1000;

export enum FLAGS {
  // флаги относящиеся к инициации игры
  GAME_INITIATED = "GAME_INITIATED",

  // улучшение артефактов
  SMITH_ARTIFACT_ACHIEVED_TIER_1 = "SMITH_ARTIFACT_ACHIEVED_TIER_1",
  SMITH_ARTIFACT_ACHIEVED_TIER_2 = "SMITH_ARTIFACT_ACHIEVED_TIER_2",
  SMITH_ARTIFACT_ACHIEVED_TIER_3 = "SMITH_ARTIFACT_ACHIEVED_TIER_3",

  ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1 = "ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1",
  ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2 = "ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2",
  ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3 = "ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3",

  STARCOUNTER_ARTIFACT_ACHIEVED_TIER_1 = "STARCOUNTER_ARTIFACT_ACHIEVED_TIER_1",
  STARCOUNTER_ARTIFACT_ACHIEVED_TIER_2 = "STARCOUNTER_ARTIFACT_ACHIEVED_TIER_2",
  STARCOUNTER_ARTIFACT_ACHIEVED_TIER_3 = "STARCOUNTER_ARTIFACT_ACHIEVED_TIER_3",

  // спешиал энкаунтеры
  SPECIAL_ENCOUNTER_GHOST = "SPECIAL_ENCOUNTER_GHOST",
  SPECIAL_ENCOUNTER_SHOOTING = "SPECIAL_ENCOUNTER_SHOOTING",
  SPECIAL_ENCOUNTER_TRADER = "SPECIAL_ENCOUNTER_TRADER",
}
