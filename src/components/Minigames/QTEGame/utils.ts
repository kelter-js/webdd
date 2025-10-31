import { getRandom } from "../../../utils";
import { QTE_SEQUENCE_TEMPLATE, VALID_KEYS } from "./constants";

export const generateSequence = () =>
  QTE_SEQUENCE_TEMPLATE.map(
    () => VALID_KEYS[getRandom(0, VALID_KEYS.length - 1)]
  );
