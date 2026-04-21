import { TEMPLATE_DAMAGE, TEMPLATE_NAME, TEMPLATE_TARGET } from "..";
import { CLASSES } from "../../entities/characterClasses";
import { GUN_TYPES } from "../../entities/guns";

export const TANK_ALLOWED_GUNS = [GUN_TYPES.MACHINE_GUN, GUN_TYPES.SHOTGUN];
export const MEDIC_ALLOWED_GUNS = [GUN_TYPES.PISTOL, GUN_TYPES.SMG];
export const SNIPER_ALLOWED_GUNS = [
  GUN_TYPES.ASSAULT_RIFLE,
  GUN_TYPES.SNIPER_RIFLE,
];

export const CLASS_GUN_RESTRICTIONS = {
  [CLASSES.TANK]: TANK_ALLOWED_GUNS,
  [CLASSES.MEDIC]: MEDIC_ALLOWED_GUNS,
  [CLASSES.SNIPER]: SNIPER_ALLOWED_GUNS,
};

export const CLASS_BY_GUN_TYPE_MAPPING = {
  [GUN_TYPES.ASSAULT_RIFLE]: CLASSES.SNIPER,
  [GUN_TYPES.SNIPER_RIFLE]: CLASSES.SNIPER,
  [GUN_TYPES.PISTOL]: CLASSES.MEDIC,
  [GUN_TYPES.SMG]: CLASSES.MEDIC,
  [GUN_TYPES.MACHINE_GUN]: CLASSES.TANK,
  [GUN_TYPES.SHOTGUN]: CLASSES.TANK,
};

export const CLASS_DESCRIPTIONS = {
  [CLASSES.TANK]: "Танк",
  [CLASSES.MEDIC]: "Медик",
  [CLASSES.SNIPER]: "Снайпер",
};

export const CHARACTER_MESSAGES = [
  `${TEMPLATE_NAME} попадает выстрелом по ${TEMPLATE_TARGET} причиняя тому ${TEMPLATE_DAMAGE} урона`,
  `Выравнивая дыхание, успокаивая дрожь рук и хорошенько прицеливаясь, ${TEMPLATE_NAME} попадает по ${TEMPLATE_TARGET} нанося ${TEMPLATE_DAMAGE} урона`,
  `В пылу боя, ${TEMPLATE_NAME} пытается устранить возникший клин, дрожащими руками ему удается это сделать в последний момент, осуществляя ряд выстрелов, он наносит ${TEMPLATE_DAMAGE} урона.`,
  `Поглядывая себе под ноги и следя за окружением, ${TEMPLATE_NAME} выпускает очередь в ${TEMPLATE_TARGET}, даруя ему ${TEMPLATE_DAMAGE} урона`,
  `Выкрикивая что-то нечленораздельное, ${TEMPLATE_NAME} наносит ${TEMPLATE_TARGET} ${TEMPLATE_DAMAGE} урона`,
  `Выцеливая сухожилия, ${TEMPLATE_NAME} стреляет в ${TEMPLATE_TARGET}, нанося ${TEMPLATE_DAMAGE} урона`,
  `Играючи и ловко, ставит оружие в залихватское положение и делает ряд выстрелов, которые лишь удачным стечением обстоятельств попадают по ${TEMPLATE_TARGET}, нанося ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_NAME} внезапно подскальзывается, от падения палец попадает на курок и делает очередь в сторону ${TEMPLATE_TARGET}, причиняя ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_NAME} пытается попасть в ${TEMPLATE_TARGET}, вместо этого пули рикошетят в потолок и оттуда падают кирпичи, нанося противнику ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} успешно уворачивается от части выстрелов ${TEMPLATE_NAME}, но последняя пуля всё-таки попадает в него, заставляя его получить ${TEMPLATE_DAMAGE} урона`,
];
