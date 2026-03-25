import staticBgTier1 from "../../assets/static/dungeon_hallway/tier_1/image(2).jpg";
import staticBgTier4 from "../../assets/static/dungeon_hallway/tier_1/image(5).jpg";
import staticBgTier5 from "../../assets/static/dungeon_hallway/tier_1/image(6).jpg";
import staticBgTier6 from "../../assets/static/dungeon_hallway/tier_1/image(7).jpg";
import staticBgTier7 from "../../assets/static/dungeon_hallway/tier_1/image(8).jpg";
import staticBgTier2 from "../../assets/static/dungeon_hallway/tier_1/image(9).jpg";
import staticBgTier3 from "../../assets/static/dungeon_hallway/tier_1/image(10).jpg";
import staticBgTier8 from "../../assets/static/dungeon_hallway/tier_1/image(11).jpg";

import staticBgTier2_1 from "../../assets/static/dungeon_hallway/tier_2/image (1).jpg";
import staticBgTier2_2 from "../../assets/static/dungeon_hallway/tier_2/image (2).jpg";
import staticBgTier2_3 from "../../assets/static/dungeon_hallway/tier_2/image (3).jpg";
import staticBgTier2_4 from "../../assets/static/dungeon_hallway/tier_2/image (4).jpg";
import staticBgTier2_5 from "../../assets/static/dungeon_hallway/tier_2/image (5).jpg";
import staticBgTier2_6 from "../../assets/static/dungeon_hallway/tier_2/image (6).jpg";
import staticBgTier2_7 from "../../assets/static/dungeon_hallway/tier_2/image (7).jpg";
import staticBgTier2_8 from "../../assets/static/dungeon_hallway/tier_2/image (8).jpg";
import staticBgTier2_9 from "../../assets/static/dungeon_hallway/tier_2/image (9).jpg";
import staticBgTier2_10 from "../../assets/static/dungeon_hallway/tier_2/image (10).jpg";
import staticBgTier2_11 from "../../assets/static/dungeon_hallway/tier_2/image (11).jpg";

import { getRandom } from "../../utils";

const firstTierStaticBackgrounds = [
  staticBgTier1,
  staticBgTier2,
  staticBgTier3,
  staticBgTier8,
  staticBgTier4,
  staticBgTier5,
  staticBgTier6,
  staticBgTier7,
];

const secondTierStaticBackgrounds = [
  staticBgTier2_1,
  staticBgTier2_2,
  staticBgTier2_3,
  staticBgTier2_4,
  staticBgTier2_5,
  staticBgTier2_6,
  staticBgTier2_7,
  staticBgTier2_8,
  staticBgTier2_9,
  staticBgTier2_10,
  staticBgTier2_11,
];

export const getDungeonBackgroundByTier = (tier: number) => {
  switch (tier) {
    case 1: {
      const randomImageIndex = getRandom(
        0,
        firstTierStaticBackgrounds.length - 1,
      );
      return firstTierStaticBackgrounds[randomImageIndex];
    }

    case 2: {
      const randomImageIndex = getRandom(
        0,
        secondTierStaticBackgrounds.length - 1,
      );
      return secondTierStaticBackgrounds[randomImageIndex];
    }

    case 3: {
      // MOCK
      return staticBgTier1;
    }

    default: {
      return staticBgTier1;
    }
  }
};
