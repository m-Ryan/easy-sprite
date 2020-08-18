import { Sprite } from "../display/Sprite";
import { Stage } from "../display/Stage";

export function isSprite(s: Sprite | Stage): s is Sprite {
  return s instanceof Sprite;
}
