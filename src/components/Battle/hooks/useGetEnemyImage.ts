import { useMemo } from "react";

import watcher from "../../../assets/enemies/first_tier/watcher.png";
import torso from "../../../assets/enemies/first_tier/torso.png";
import spider from "../../../assets/enemies/first_tier/spider.png";
import spirit from "../../../assets/enemies/first_tier/spirit.png";
import bird from "../../../assets/enemies/first_tier/bird.png";
import sinIcon from "../../../assets/enemies/first_tier/sin-icon.png";

import soldier from "../../../assets/enemies/second_tier/soldier.png";
import sneaker from "../../../assets/enemies/second_tier/sneaker.png";
import lost_one from "../../../assets/enemies/second_tier/lost_one.png";
import firefighter from "../../../assets/enemies/second_tier/firefighter.png";
import inventor from "../../../assets/enemies/second_tier/inventor.png";
import general from "../../../assets/enemies/second_tier/general.png";

import actress from "../../../assets/enemies/third_tier/actress.png";
import all_seeing from "../../../assets/enemies/third_tier/all_seeing.png";
import knight from "../../../assets/enemies/third_tier/knight.png";
import singer from "../../../assets/enemies/third_tier/singer.png";
import ballerina_boss from "../../../assets/enemies/third_tier/ballerina_boss.png";
import mergemass from "../../../assets/enemies/third_tier/mergemass.png";
import { ENEMIES } from "../../../entities/enemies";

export const useGetEnemyImage = (type: ENEMIES) => {
  return useMemo(() => {
    switch (type) {
      case ENEMIES.WATCHER_TIER_1:
      case ENEMIES.WATCHER_TIER_2:
      case ENEMIES.WATCHER_TIER_3: {
        return watcher;
      }

      case ENEMIES.TORSO_TIER_1:
      case ENEMIES.TORSO_TIER_2:
      case ENEMIES.TORSO_TIER_3: {
        return torso;
      }

      case ENEMIES.SPIDER_TIER_1:
      case ENEMIES.SPIDER_TIER_2:
      case ENEMIES.SPIDER_TIER_3: {
        return spider;
      }

      case ENEMIES.SPIRIT_TIER_1:
      case ENEMIES.SPIRIT_TIER_2:
      case ENEMIES.SPIRIT_TIER_3: {
        return spirit;
      }

      case ENEMIES.BIRD_TIER_1:
      case ENEMIES.BIRD_TIER_2:
      case ENEMIES.BIRD_TIER_3: {
        return bird;
      }

      case ENEMIES.SIN_ICON_TIER_1: {
        return sinIcon;
      }

      case ENEMIES.SOLDIER_TIER_1:
      case ENEMIES.SOLDIER_TIER_2:
      case ENEMIES.SOLDIER_TIER_3: {
        return soldier;
      }

      case ENEMIES.SNEAKER_TIER_1:
      case ENEMIES.SNEAKER_TIER_2:
      case ENEMIES.SNEAKER_TIER_3: {
        return sneaker;
      }

      case ENEMIES.LOST_TIER_1:
      case ENEMIES.LOST_TIER_2:
      case ENEMIES.LOST_TIER_3: {
        return lost_one;
      }

      case ENEMIES.FIREFIGHTER_TIER_1:
      case ENEMIES.FIREFIGHTER_TIER_2:
      case ENEMIES.FIREFIGHTER_TIER_3: {
        return firefighter;
      }

      case ENEMIES.INVENTOR_TIER_1:
      case ENEMIES.INVENTOR_TIER_2:
      case ENEMIES.INVENTOR_TIER_3: {
        return inventor;
      }

      case ENEMIES.GENERAL_TIER_1: {
        return general;
      }

      case ENEMIES.ACTRESS_TIER_1:
      case ENEMIES.ACTRESS_TIER_2:
      case ENEMIES.ACTRESS_TIER_3: {
        return actress;
      }

      case ENEMIES.ALL_SEEING_TIER_1:
      case ENEMIES.ALL_SEEING_TIER_2:
      case ENEMIES.ALL_SEEING_TIER_3: {
        return all_seeing;
      }

      case ENEMIES.KNIGHT_TIER_1:
      case ENEMIES.KNIGHT_TIER_2:
      case ENEMIES.KNIGHT_TIER_3: {
        return knight;
      }

      case ENEMIES.SINGER_TIER_1:
      case ENEMIES.SINGER_TIER_2:
      case ENEMIES.SINGER_TIER_3: {
        return singer;
      }

      case ENEMIES.BALLERINE_TIER_1:
      case ENEMIES.BALLERINE_TIER_2:
      case ENEMIES.BALLERINE_TIER_3: {
        return ballerina_boss;
      }

      case ENEMIES.MERGED_MASS_TIER_1: {
        return mergemass;
      }

      default:
        return watcher;
    }
  }, [type]);
};
