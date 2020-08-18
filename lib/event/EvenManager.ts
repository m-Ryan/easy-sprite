import { Stage } from "../display/Stage";
import { getBoundingRect } from "../utils/getBoundingRect";
import { Sprite } from "../display/Sprite";
import { GlobalState } from "../state/GlobalState";


export type EventType = 'click' | 'mousedown' | 'mousemove' | 'mouseup' | 'mouseenter' | 'mouseleave' | 'mouseout' | 'mouseover' | 'touchstart' | 'touchend' | 'touchmove' | 'touchcancel';

export interface ParseEvent {
  type: EventType;
  stageX: number;
  stageY: number;
  offsetX: number;
  offsetY: number;
  target: Sprite;
}

export const eventTypes: EventType[] = ['click', 'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave', 'mouseout', 'mouseover', 'touchstart', 'touchend', 'touchmove', 'touchcancel']

export class EvenManager {

  public static eventTypeMap = {

  }

  public static addEventListener(stage: Stage) {
    eventTypes.forEach(type => {
      GlobalState.canvas.addEventListener(type, (e: MouseEvent | TouchEvent) => {
        const { x, y } = getBoundingRect(e);
        const target = stage.findTarget(x, y);
        if (target) {
          target.dispatchEvent({
            type,
            offsetX: x - target._x,
            offsetY: y - target._y,
            stageX: x,
            stageY: y,
            target: target,
          })
        }
      });
    })
  }
}