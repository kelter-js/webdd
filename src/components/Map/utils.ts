import staticBgTier1 from "../../assets/static/dungeon_hallway/tier_1/image(2).jpg";
import staticBgTier4 from "../../assets/static/dungeon_hallway/tier_1/image(5).jpg";
import staticBgTier5 from "../../assets/static/dungeon_hallway/tier_1/image(6).jpg";
import staticBgTier6 from "../../assets/static/dungeon_hallway/tier_1/image(7).jpg";
import staticBgTier7 from "../../assets/static/dungeon_hallway/tier_1/image(8).jpg";
import staticBgTier2 from "../../assets/static/dungeon_hallway/tier_1/image(9).jpg";
import staticBgTier3 from "../../assets/static/dungeon_hallway/tier_1/image(10).jpg";
import staticBgTier8 from "../../assets/static/dungeon_hallway/tier_1/image(11).jpg";

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
      // MOCK
      return staticBgTier1;
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
